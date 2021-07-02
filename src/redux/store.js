import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers
import chatID from '../redux/reducers/chatID';
import chatMsgs from '../redux/reducers/chatMsgs';
import profile from '../redux/reducers/profile';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({chatID, chatMsgs, profile});

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};

// export const Store = createStore(reducers, applyMiddleware(thunk));
