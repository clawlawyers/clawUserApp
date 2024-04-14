import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Base from './src/screens/Base/index.jsx';

import { LogBox } from 'react-native';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './src/reducer';
import { thunk } from 'redux-thunk';
import {StripeProvider} from '@stripe/stripe-react-native';
import { PUBLISHABLE_KEY } from './src/actions/variables.js';

const App = () => {
 const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk),
 });
 LogBox.ignoreAllLogs();
 return (
    <Provider store={store}>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
         <Base />   
      </StripeProvider>
    </Provider>
 );
};


export default App