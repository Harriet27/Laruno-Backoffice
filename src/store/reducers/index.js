import { combineReducers } from 'redux';

import topic from './topic';
import product from './product';
import detailtopic from './detailtopic';
import user from './user';

export default combineReducers({
    topic,
    detailtopic,
    product,
    user,
});
