import { combineReducers } from 'redux';
// redux persist for localStorage
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// reducers
import alert from './alert';
import auth from './auth';
// import subscribe from './subscription';
// import profile from './profile';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart']
// }

const rootReducer = combineReducers({
  alert,
  auth
  // subscribe
  // profile
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;