import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import user from './user';
import roles from './roles';
import fulfillments from './fulfillments';
import agents from './agents';
import reseller from './reseller';

export default combineReducers({
    topic,
    product,
    user,
    roles,
    fulfillments,
    agents,
    reseller,
});
