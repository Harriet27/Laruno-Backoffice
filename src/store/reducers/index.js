import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import user from './user';
import roles from './roles';

export default combineReducers({
    topic,
    product,
    user,
    roles,
});
