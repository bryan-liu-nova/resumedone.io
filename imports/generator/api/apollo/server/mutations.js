import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import sortBy from 'lodash/sortBy';
import set from 'lodash/set';
import last from 'lodash/last';
import max from 'lodash/max';

import { BLOCK_NAMES, DEFAULT_ITEMS, TEMPLATES } from '/imports/generator/api/constants';
import { Resumes } from '/imports/core/api/models/resumes/collection';
import { processUpload, processUploadImage } from '/imports/generator/api/upload';
import { analyticsServer } from '/imports/core/api/analytics_server';

export const mutationText = `
  addBlock(resumeId: ID!, blockType: BlockType!, animationKey: ID!): Resume
  addBlockItem(resumeId: ID!, blockId: ID!, animationKey: ID!): AddBlockItemResponse
  removeBlock(resumeId: ID!, blockId: ID!): Resume
  updateResumeDetail(docId: ID!, path: String!, value: String!): Resume
  updateWizardSteps(docId: ID!, value: String!): Resume
  updateBlockField(docId: ID!, blockId: ID!, field: String!, value: Value!): Resume
  updateBlockItemField(docId: ID!, blockId: ID!, itemId: ID!, field: String!, value: Value!): Resume
  reorderBlock(resumeId: ID!, blockId: ID!, direction: ReorderDirection!): Resume
  reorderBlockItem(resumeId: ID!, blockId: ID!, itemId: ID!, direction: ReorderDirection!): Resume
  removeBlockItem(resumeId: ID!, blockId: ID!, itemId: ID!): Resume
  uploadFile(file: Upload!): String!
  uploadImage(image: String!): String!
  getDownloadLink(resumeId: ID!): GetDownloadLinkResponse!
  updateAutosuggest(resumeId: ID!, city: String, country: String, zip: String, address: String): Resume
  updateAutosuggestSchool(resumeId: ID!, itemId: ID!, location: String, school: String): Resume
`;

export const mutations = {
  async addBlock(root, { resumeId: _id, blockType, animationKey }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const title = blockType === 'CUSTOM' ? 'Untitled' : BLOCK_NAMES[blockType];
    if (blockType !== 'CUSTOM' && resume.blocks.find(b => b.type === blockType)) {
      return;
    }
    const newItem = {
      _id: Random.id(),
      animationKey,
      order: 0,
    };
    if (DEFAULT_ITEMS[blockType]) {
      newItem.fields = DEFAULT_ITEMS[blockType]();
    }
    const newBlock = {
      _id: Random.id(),
      type: blockType,
      title,
      animationKey: Random.id(),
      order: (max(resume.blocks.map(b => b.order)) || -1) + 1,
      items: [newItem],
    };
    resume.blocks.push(newBlock);
    await Resumes.update(
      { _id },
      {
        $addToSet: { blocks: newBlock },
        $inc: { updatesCount: 1, restructureCount: 1 }
      },
    );
    return resume;
  },

  async addBlockItem(root, { resumeId, blockId, animationKey }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const { blocks, author } = await Resumes.findOne({ _id: resumeId });
    if (author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const currentBlock = blocks.find(b => b._id === blockId);
    const itemId = Random.id();
    const order = currentBlock.items && max(currentBlock.items.map(b => b.order)) || 0;
    const newItem = {
      _id: itemId,
      animationKey,
      order: currentBlock.items && order + 1 || 0,
    };
    if (DEFAULT_ITEMS[currentBlock.type]) {
      newItem.fields = DEFAULT_ITEMS[currentBlock.type]();
    }
    await Resumes.update(
      { _id: resumeId, 'blocks._id': blockId },
      {
        $addToSet: { 'blocks.$.items': newItem },
        $inc: { updatesCount: 1, restructureCount: 1 }
      },
    );
    return {
      resumeId,
      blockId,
      itemId,
      items: [...(currentBlock.items || []), newItem],
    };
  },

  async updateResumeDetail(root, { docId: _id, path, value }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const updateFields = {
      [path]: value,
    };
    const color = 'black';
    if(path === 'settings.template') {
      const { defaultColor } = TEMPLATES.find(t => t.id === value) || {};
      updateFields['settings.color'] = defaultColor || color;
    }
    await Resumes.update({ _id }, { $set: { ...updateFields }, $inc: { updatesCount: 1 } });
    set(resume, path, value);
    resume.updatesCount = resume.updatesCount + 1;
    if(path === 'settings.template') {
      const { defaultColor } = TEMPLATES.find(t => t.id === value) || {};
      resume.settings.color = defaultColor || color;
    }
    const field = last(path.split('.'));
    if (['firstName', 'lastName', 'email', 'phone'].includes(field)) {
      analyticsServer.identify({
        userId: user._id,
        traits: { [field]: value }
      });
    } else if (field === 'userPic') {
      analyticsServer.identify({
        userId: user._id,
        traits: { photo_uploaded: true }
      });
    } else if (field === 'professionalSummary') {
      analyticsServer.identify({
        userId: user._id,
        traits: { summary_filled: true }
      });
    }
    return resume;
  },

  async updateWizardSteps(root, { docId, value }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id: docId });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    await Resumes.update({ _id: docId }, { $set: { currentStep: value }, $addToSet: { steps: value }, $inc: { updatesCount: 1 } });
    resume.currentStep = value;
    resume.updatesCount = resume.updatesCount + 1;
    if(!resume.steps.some(step => step === value)) {
      resume.steps.push(value);
    }
    return resume;
  },

  async updateBlockField(root, { docId: _id, blockId, field, value }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const { blocks } = resume;
    const block = blocks.find(b => b._id === blockId);
    block[field] = value;
    await Resumes.update(
      { _id, 'blocks._id': blockId },
      { $set: { [`blocks.$.${field}`]: value }, $inc: { updatesCount: 1 } },
    );
    return { ...resume, ...blocks };
  },

  async updateBlockItemField(root, { docId: _id, blockId, itemId, field, value }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const { blocks } = resume;
    const currentBlock = blocks.find(b => b._id === blockId);
    const currentItem = currentBlock.items.find(i => i._id === itemId);
    currentItem.fields = currentItem.fields || {};
    currentItem.fields[field] = value;
    await Resumes.update(
      { _id, 'blocks._id': blockId },
      { $set: { 'blocks.$.items': currentBlock.items }, $inc: { updatesCount: 1 } },
    );
    return { ...resume, ...blocks };
  },

  async reorderBlock(root, { resumeId: _id, blockId, direction }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (!resume || resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const { blocks } = resume;
    const currentBlock = blocks.find(b => b._id === blockId);
    if (direction === 'DOWN') {
      if (currentBlock.order + 1 < blocks.filter(b => b.order != null).length) {
        const nextBlock = blocks.find(b => b.order === currentBlock.order + 1);
        currentBlock.order = currentBlock.order + 1;
        nextBlock.order = nextBlock.order - 1;
      }
    } else if (direction === 'UP') {
      if (currentBlock.order) {
        const prevBlock = blocks.find(b => b.order === currentBlock.order - 1);
        currentBlock.order = currentBlock.order - 1;
        prevBlock.order = prevBlock.order + 1;
      }
    }
    await Resumes.update({ _id }, { $set: { blocks }, $inc: { updatesCount: 1, restructureCount: 1 } });
    return { ...resume, blocks };
  },

  async reorderBlockItem(root, { resumeId: _id, blockId, itemId, direction }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const { blocks } = resume;
    const { items } = blocks.find(b => b._id === blockId);
    const currentItem = items.find(i => i._id === itemId);
    if (direction === 'DOWN') {
      if (currentItem.order + 1 < items.length) {
        const nextItem = items.find(i => i.order === currentItem.order + 1);
        currentItem.order = currentItem.order + 1;
        nextItem.order = nextItem.order - 1;
      }
    } else if (direction === 'UP') {
      if (currentItem.order) {
        const prevItem = items.find(i => i.order === currentItem.order - 1);
        currentItem.order = currentItem.order - 1;
        prevItem.order = prevItem.order + 1;
      }
    }
    await Resumes.update(
      { _id, 'blocks._id': blockId },
      { $set: { 'blocks.$.items': items }, $inc: { updatesCount: 1, restructureCount: 1 } },
    );
    return { ...resume, blocks };
  },

  async removeBlock(root, { resumeId: _id, blockId }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const { blocks } = resume;
    const block = blocks.find(b => b._id === blockId);
    if (block.fixedOrder) {
      throw new ApolloError('block-is-fixed');
    }
    blocks.splice(blocks.findIndex(i => i._id === blockId), 1);
    await Resumes.update({ _id }, { $set: { blocks }, $inc: { updatesCount: 1, restructureCount: 1 } });
    return { ...resume, blocks };
  },

  async removeBlockItem(root, { resumeId: _id, blockId, itemId }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const { blocks } = resume;
    const { items } = blocks.find(b => b._id === blockId);
    items.splice(items.findIndex(i => i._id === itemId), 1);
    await Resumes.update(
      { _id, 'blocks._id': blockId },
      { $set: { 'blocks.$.items': items }, $inc: { updatesCount: 1, restructureCount: 1 } },
    );
    return { ...resume, blocks };
  },

  async getDownloadLink(root, { resumeId }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    // if (!user.personalData.subscriptionId) {
    //   throw new AuthenticationError('need-subscription');
    // }
    const resume = await Resumes.findOne({ _id: resumeId });
    if (resume.author !== user._id) {
      throw new AuthenticationError('not-an-author');
    }
    const downloadKey = Random.id();
    Meteor.users.update(
      { _id: user._id },
      { $set: { 'serviceData.downloadKey': downloadKey, 'serviceData.resumeId': resumeId } }
    );
    return {
      downloadKey,
      resumeId
    };
  },

  async uploadFile(parent, { file }) {
    return await processUpload(file);
  },

  async uploadImage(parent, { image }) {
    return await processUploadImage(image);
  },

  async updateAutosuggest(root, { resumeId, city, country, zip, address }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    // if (!user.personalData.subscriptionId) {
    //   throw new AuthenticationError('need-subscription');
    // }
    const resume = await Resumes.findOne({ _id: resumeId });
    if (resume.author !== user._id) {
      throw new AuthenticationError('not-an-author');
    }
    const $set = {};
    if (city) $set['details.city'] = city;
    if (country) $set['details.country'] = country;
    if (zip) $set['details.postalCode'] = zip;
    if (address) $set['details.address'] = address;
    await Resumes.update(
      { _id: resumeId },
      {
        $set,
        $inc: { updatesCount: 1 }
      },
    );
    return await Resumes.findOne({ _id: resumeId });
  },

  async updateAutosuggestSchool(root, { resumeId, itemId, location, school }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    // if (!user.personalData.subscriptionId) {
    //   throw new AuthenticationError('need-subscription');
    // }
    const resume = await Resumes.findOne({ _id: resumeId });
    if (resume.author !== user._id) {
      throw new AuthenticationError('not-an-author');
    }
    const { blocks } = resume;
    const { items } = blocks.find(b => b.type === 'EDUCATION');
    const currentItem = items.find(i => i._id === itemId);
    currentItem.fields = currentItem.fields || {};
    currentItem.fields['school'] = school;
    currentItem.fields['city'] = location;
    await Resumes.update(
      { _id: resumeId, 'blocks.type': 'EDUCATION' },
      { $set: { 'blocks.$.items': items }, $inc: { updatesCount: 1 } },
    );
    return await Resumes.findOne({ _id: resumeId });
  },
};
