import {
    createStore,
    combineReducers,
} from 'redux';

import generatorReducer from '/imports/generator/api/redux/reducer';
import pdfReducer from '/imports/pdf/core/api/redux/reducer';

const store = createStore(
  combineReducers({
    generator: generatorReducer,
    pdf: pdfReducer,
  })
);

export { store };
