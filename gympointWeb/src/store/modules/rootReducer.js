import { combineReducers } from 'redux';

import auth from './auth/reducer';
import data from './data/reducer';

export default combineReducers({ auth, data });
