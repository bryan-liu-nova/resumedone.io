import { SET_SAVING_STATUS } from './constants';

const initialState = {
  savingStatus: 'SAVED'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SAVING_STATUS:
      return {
        ...state,
        savingStatus: action.savingStatus
      };
    default:
      return state;
  }
}
