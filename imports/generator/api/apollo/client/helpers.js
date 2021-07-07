import sortBy from 'lodash/sortBy';
import set from 'lodash/set';

import { client } from '/imports/core/api/apollo/client/init';
import { GET_RESUME } from '/imports/generator/api/apollo/client/queries';
import max from 'lodash/max';
import { BLOCK_NAMES, DEFAULT_ITEMS, EMPTY_FIELDS, TEMPLATES } from '/imports/generator/api/constants';

// Adding typenames to resume to get correct result
const addTypenamesToResume = resume => ({
  __typename: 'Resume',
  ...resume,
  details: {
    ___typename: 'ResumeDetails',
    ...resume.details,
  },
  settings: {
    ___typename: 'ResumeSettings',
    ...resume.settings,
  },
  blocks: resume.blocks.map(b => ({
    __typename: 'Block',
    ...b,
    items: b.items
      ? b.items.map(i => ({
        ___typename: 'BlockItem',
        ...i,
        fields: {
          __typename: 'BlockFields',
          ...i.fields
        }
      }))
      : null
  }))
});

const updateCachedResume = (cache, resume, resumeId) => {
  const currentData = cache.readQuery({
    query: GET_RESUME,
    variables: {
      resumeId
    }
  });

  cache.writeQuery({
    query: GET_RESUME,
    variables: {
      resumeId
    },
    data: {
      getResume: {
        ...currentData.getResume,
        ...resume
      }
    },
  });
};

export const updateAfterDetailSave = resumeId => (cache, { data: { updateResumeDetail } }) => {
  updateCachedResume(cache, updateResumeDetail, resumeId);
};

export const updateAfterBlockItemFieldSave = resumeId => (cache, { data: { updateBlockItemField } }) => {
  updateCachedResume(cache, updateBlockItemField, resumeId);
};

export const updateBlocksAfterReorder = resumeId => (cache, { data: { reorderBlock } }) => {
  updateCachedResume(cache, reorderBlock, resumeId);
};

export const updateBlocksAfterRemove = resumeId => (cache, { data: { removeBlock } }) => {
  updateCachedResume(cache, removeBlock, resumeId);
};

export const updateBlockItemsAfterReorder = resumeId => (cache, { data: { reorderBlockItem } }) => {
  updateCachedResume(cache, reorderBlockItem, resumeId);
};

export const updateBlockItemsAfterRemove = resumeId => (cache, { data: { removeBlockItem } }) => {
  updateCachedResume(cache, removeBlockItem, resumeId);
};

export const updateResume = (resumeId, mutationName) => (cache, { data }) => {
  updateCachedResume(cache, data[mutationName], resumeId);
};

export const blockReorderOptimistic = (resume, blockId, direction) => {
  const { blocks } = resume;
  const fixedBlocks = blocks.filter(b => b.fixedOrder != null);
  const modifiedBlocks = blocks.filter(b => b.order != null);
  const currentBlock = modifiedBlocks.find(b => b._id === blockId);
  if (direction === 'UP' && currentBlock.order <= 0) return;
  else if (direction === 'DOWN' && currentBlock.order + 1 >= modifiedBlocks.length) return;
  const modifiedBlock = direction === 'UP'
    ? modifiedBlocks.find(b => b.order === currentBlock.order - 1)
    : modifiedBlocks.find(b => b.order === currentBlock.order + 1);
  currentBlock.order = currentBlock.order + (direction === 'UP' ? -1 : 1);
  modifiedBlock.order = modifiedBlock.order + (direction === 'UP' ? 1 : -1);
  return {
    __typename: 'Mutation',
    reorderBlock: {
      __typename: 'Resume',
      ...resume,
      restructureCount: (resume.restructureCount || 0) + 1,
      details: {
        ___typename: 'ResumeDetails',
        ...resume.details,
      },
      blocks: [...fixedBlocks, ...modifiedBlocks].map(b => ({
        __typename: 'Block',
        ...b,
        items: b.items ? b.items.map(i => ({ ___typename: 'BlockItem', ...i })) : null
      }))
    }
  };
};

export const blockRemoveOptimistic = (resume, blockId) => {
  const { blocks } = resume;
  blocks.splice(blocks.findIndex(i => i._id === blockId), 1);
  return {
    __typename: 'Mutation',
    removeBlock: {
      __typename: 'Resume',
      ...resume,
      details: {
        ___typename: 'ResumeDetails',
        ...resume.details,
      },
      restructureCount: (resume.restructureCount || 0) + 1,
      blocks: blocks.map((b, order) => ({
        __typename: 'Block',
        ...b,
        order,
        items: b.items ? b.items.map(i => ({ ___typename: 'BlockItem', ...i })) : null
      }))
    }
  };
};

export const blockItemReorderOptimistic = (resume, blockId, itemId, direction) => {
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
  console.log(resume.restructureCount);
  return {
    __typename: 'Mutation',
    reorderBlockItem: {
      __typename: 'Resume',
      ...resume,
      restructureCount: (resume.restructureCount || 0) + 1,
      details: {
        ___typename: 'ResumeDetails',
        ...resume.details,
      },
      blocks: blocks.map(b => ({
        __typename: 'Block',
        ...b,
        items: b.items ? sortBy(b.items.map(i => ({ ___typename: 'BlockItem', ...i })), 'order') : null
      }))
    }
  };
};

export const blockItemRemoveOptimistic = (resume, blockId, itemId) => {
  const blocks = resume.blocks.map(block => {
    if (block._id === blockId) {
      block.items.splice(block.items.findIndex(i => i._id === itemId), 1);
    }
    return block;
  });
  return {
    __typename: 'Mutation',
    removeBlockItem: {
      __typename: 'Resume',
      ...resume,
      restructureCount: (resume.restructureCount || 0) + 1,
      details: {
        ___typename: 'ResumeDetails',
        ...resume.details,
      },
      blocks: blocks.map((b, order) => ({
        __typename: 'Block',
        ...b,
        order,
        items: b.items ? b.items.map(i => ({ ___typename: 'BlockItem', ...i })) : null
      }))
    }
  };
};

export const updateDetailsOptimisticResponse = (resumeId, path) => value => {
  const { getResume: resume } = client.readQuery({
    query: GET_RESUME,
    variables: {
      resumeId
    }
  });
  const addSettings = {};
  if(path === 'settings.template') {
    const { defaultColor } = TEMPLATES.find(t => t.id === value) || {};
    addSettings.color = defaultColor || 'black';
  }
  let res = {
    __typename: 'Mutation',
    updateResumeDetail: {
      __typename: 'Resume',
      ...resume,
      _id: resumeId,
      details: {
        ___typename: 'ResumeDetails',
        ...resume.details,
      },
      settings: {
        ___typename: 'ResumeSettings',
        ...resume.settings,
        ...addSettings,
      },
      blocks: resume.blocks
    }
  };
  set(res, `updateResumeDetail.${path}`, value);
  return res;
};

export const updateBlockItemOptimisticResponse = (resumeId, blockId, itemId, field) => value => {
  const { getResume: resume } = client.readQuery({
    query: GET_RESUME,
    variables: {
      resumeId
    }
  });
  const block = resume.blocks.find(b => b._id === blockId);
  const item = block.items.find(i => i._id === itemId);
  if(item.fields) {
    item.fields[field] = value;
  } else {
    item.fields = { __typename: 'BlockFields', ...EMPTY_FIELDS };
    item.fields[field] = value;
  }
  return {
    __typename: 'Mutation',
    updateBlockItemField: {
      __typename: 'Resume',
      ...resume,
      _id: resumeId,
      updatesCount: resume.updatesCount + 1,
      details: {
        ___typename: 'ResumeDetails',
        ...resume.details,
      },
      settings: {
        ___typename: 'ResumeSettings',
        ...resume.settings,
      },
      blocks: resume.blocks
    }
  };
};

export const updateBlocksAfterItemAdd = (cache, { data }) => {
  if (data) {
    const { addBlockItem: { resumeId, blockId, items } } = data;
    try {
      const { getResume: resume } = cache.readQuery({
        query: GET_RESUME,
        variables: {
          resumeId
        }
      });

      const newResume = Object.assign({}, resume);
      newResume.updatesCount = newResume.updatesCount + 1;
      newResume.restructureCount = (newResume.restructureCount || 0) + 1;
      const currentBlock = newResume.blocks.find(b => b._id === blockId);
      currentBlock.items = items;
      cache.writeQuery({
        query: GET_RESUME,
        variables: {
          resumeId
        },
        data: {
          getResume: newResume
        },
      });
    }
    catch(e) {
      console.log(e);
    }
  }
};

export const addBlockItemOptimisticResponse = (resumeId, blockId, animationKey) => {
  const { getResume: resume } = client.readQuery({
    query: GET_RESUME,
    variables: {
      resumeId
    }
  });
  const currentBlock = resume.blocks.find(b => b._id === blockId);
  const itemId = Random.id();
  const newItem = {
    __typename: 'BlockItem',
    _id: itemId,
    animationKey,
    fields: null,
    order: (max(currentBlock.items && currentBlock.items.map(b => b.order)) || -1) + 1,
  };
  return {
    __typename: 'Mutation',
    addBlockItem: {
      __typename: 'AddBlockItemResponse',
      resumeId,
      blockId,
      itemId,
      items: [...(currentBlock.items || []), newItem]
    }
  };
};

export const addBlockOptimistic = (resumeId, blockType) => {
  const { getResume } = client.readQuery({
    query: GET_RESUME,
    variables: {
      resumeId
    }
  });
  const resume = addTypenamesToResume(getResume);
  const { blocks } = resume;
  const title = blockType === 'CUSTOM' ? 'Untitled' : BLOCK_NAMES[blockType];
  if (blockType !== 'CUSTOM' && resume.blocks.find(b => b.type === blockType)) {
    return;
  }
  const newItem = {
    __typename: 'BlockItem',
    _id: Math.random(),
    animationKey: Math.random(),
    order: 0,
    fields: {
      __typename: 'BlockFields',
      title: null,
      employer: null,
      city: null,
      startDate: null,
      endDate: null,
      current: null,
      description: null,
      label: null,
      url: null,
      skill: null,
      skillLevel: null,
      school: null,
      degree: null,
      hobbies: null,
      language: null,
      languageLevel: null,
      course: null,
      institution: null,
      fullName: null,
      company: null,
      phone: null,
      email: null,
    }
  };
  if (DEFAULT_ITEMS[blockType]) {
    newItem.fields = DEFAULT_ITEMS[blockType]();
  }
  const newBlock = {
    __typename: 'Block',
    _id: Random.id(),
    type: blockType,
    title,
    animationKey: Math.random(),
    order: (max(resume.blocks.map(b => b.order)) || -1) + 1,
    fixedOrder: null,
    items: [newItem],
    hideLevel: null,
    hideReferences: null,
    required: null
  };
  blocks.push(newBlock);
  console.log('OPTIM', resume);
  return {
    __typename: 'Mutation',
    addBlock: {
      __typename: 'Resume',
      ...resume,
      details: {
        ___typename: 'ResumeDetails',
        ...resume.details,
      },
      settings: {
        ___typename: 'ResumeSettings',
        ...resume.settings,
      },
      restructureCount: (resume.restructureCount || 0) + 1,
    }
  };
};
