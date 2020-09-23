import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import user from './user';
import roles from './roles';
import fullfilments from './fullfilments';

export default combineReducers({
    topic,
    product,
    user,
    roles,
    fullfilments,
});
