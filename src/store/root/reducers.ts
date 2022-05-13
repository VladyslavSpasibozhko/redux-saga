import { combineReducers } from 'redux';
import { reducer as Todo } from '../todos';
import { reducer as Loading } from '../loading';
import { reducer as Error } from '../error';
import { reducer as Counter } from '../counter';
import { reducer as Modal } from '../modal';

export const reducers = combineReducers({
  Counter,
  Todo,
  Loading,
  Error,
  Modal,
});
