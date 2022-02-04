import React from 'react';
import {Provider} from 'react-redux';
  
import store from './BaseStore';
import App from './App'

const Redux= () => {
  return (
    <Provider store={store}>
    <App/>
    </Provider>
  );
};
    
  
export default Redux;