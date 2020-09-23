import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import user from './user';
import roles from './roles';
import fulfillments from './fulfillments';

export default combineReducers({
    topic,
    product,
    user,
    roles,
    fulfillments,
});
