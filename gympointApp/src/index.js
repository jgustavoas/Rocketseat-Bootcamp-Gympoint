import React from 'react';
// "PersistGate" faz com que os componentes não sejam renderizados antes de se obter os estados (armazenados em "store")
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

// import { store, persistor } from './store';
import { store } from './store';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <App />
      {/* </PersistGate> */}
    </Provider>
  );
}
