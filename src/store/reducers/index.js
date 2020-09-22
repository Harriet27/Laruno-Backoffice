import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import user from './user';

export default combineReducers({
    topic,
    product,
    user,
});
