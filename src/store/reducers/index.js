import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import user from './user';
import roles from './roles';
import contents from './contents';
import agents from './agents';
import reseller from './reseller';
import order from './order';

export default combineReducers({
    topic,
    product,
    user,
    roles,
    contents,
    agents,
    reseller,
    order,
});
