import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'], // incluindo os reducers cujas informações interessam que sejam persistidas
    },
    reducers
  );

  return persistedReducer;
};
