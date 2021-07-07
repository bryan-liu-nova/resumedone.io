import { SET_EXPANDED_ITEM } from './constants';

const initialState = {
  expandedItem: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_EXPANDED_ITEM:
      return {
        ...state,
        expandedItem: action.expandedItem
      };
    default:
      return state;
  }
}
