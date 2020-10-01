import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import user from './user';
import roles from './roles';
import contents from './contents';
import agents from './agents';
import reseller from './reseller';
import orders from './order';
import coupons from './coupons';

export default combineReducers({
    topic,
    product,
    user,
    roles,
    contents,
    agents,
    reseller,
    orders,
    coupons,
});
