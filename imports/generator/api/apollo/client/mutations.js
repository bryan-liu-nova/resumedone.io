import gql from 'graphql-tag';

import { allBlockFields, userFull } from '/imports/core/api/apollo/client/fragments';
import { resumeFull } from '/imports/generator/api/apollo/client/fragments';

export const ADD_BLOCK = gql`
  mutation AddBlock($resumeId: ID!, $blockType: BlockType!, $animationKey: ID!) {
    addBlock(resumeId: $resumeId, blockType: $blockType, animationKey: $animationKey) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const ADD_BLOCK_ITEM = gql`
  mutation AddBlockItem($resumeId: ID!, $blockId: ID!, $animationKey: ID!) {
    addBlockItem(resumeId: $resumeId, blockId: $blockId, animationKey: $animationKey) {
      resumeId
      blockId
      itemId
      items {
        _id
        order
        animationKey
        fields {
          ...AllBlockFields
        }
      }
    }
  }
  ${allBlockFields}
`;

export const UPDATE_RESUME_DETAIL = gql`
  mutation UpdateResumeDetail($docId: ID!, $path: String!, $value: String!) {
    updateResumeDetail(docId: $docId, path: $path, value: $value) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const UPDATE_WIZARD_STEPS = gql`
  mutation UpdateWizardSteps($docId: ID!, $value: String!) {
    updateWizardSteps(docId: $docId, value: $value) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const UPDATE_BLOCK_FIELD = gql`
  mutation UpdateBlockField($docId: ID!, $blockId: ID!, $field: String!, $value: Value!) {
    updateBlockField(docId: $docId, blockId: $blockId, field: $field, value: $value) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const UPDATE_BLOCK_ITEM_FIELD = gql`
  mutation UpdateBlockItemField($docId: ID!, $blockId: ID!, $itemId: ID!, $field: String!, $value: Value!) {
    updateBlockItemField(docId: $docId, blockId: $blockId, itemId: $itemId, field: $field, value: $value) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const REORDER_BLOCK = gql`
  mutation ReorderBlock($resumeId: ID!, $blockId: ID!, $direction: ReorderDirection!) {
    reorderBlock(resumeId: $resumeId, blockId: $blockId, direction: $direction) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const REMOVE_BLOCK = gql`
  mutation RemoveBlock($resumeId: ID!, $blockId: ID!) {
    removeBlock(resumeId: $resumeId, blockId: $blockId) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const REORDER_BLOCK_ITEM = gql`
  mutation ReorderBlockItem($resumeId: ID!, $blockId: ID!, $itemId: ID!, $direction: ReorderDirection!) {
    reorderBlockItem(resumeId: $resumeId, blockId: $blockId, itemId: $itemId, direction: $direction) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const REMOVE_BLOCK_ITEM = gql`
  mutation RemoveBlockItem($resumeId: ID!, $blockId: ID!, $itemId: ID!) {
    removeBlockItem(resumeId: $resumeId, blockId: $blockId, itemId: $itemId) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($image: String!) {
    uploadImage(image: $image)
  }
`;

export const GET_DOWNLOAD_LINK = gql`
  mutation GetDownloadLink($resumeId: ID!) {
    getDownloadLink(resumeId: $resumeId) {
      downloadKey
      resumeId
    }
  }
`;

export const UPDATE_AUTOSUGGEST = gql`
  mutation UpdateAutosuggest($resumeId: ID!, $city: String, $country: String, $zip: String, $address: String) {
    updateAutosuggest(resumeId: $resumeId, city: $city, country: $country, zip: $zip, address: $address) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const UPDATE_AUTOSUGGEST_SCHOOL = gql`
  mutation UpdateAutosuggestSchools($resumeId: ID!, $itemId: ID!, $location: String, $school: String) {
    updateAutosuggestSchool(resumeId: $resumeId, itemId: $itemId, location: $location, school: $school) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;
