import { View, Text } from 'react-native'
import React from 'react'
import Onboarding from './src/screens/client/Onboarding/index.jsx'
import NewsScreen from './src/screens/client/NewsScreen/index.jsx'
import { NavigationContainer } from '@react-navigation/native';
import Base from './src/screens/Base/index.jsx';
import SearchScreen from './src/screens/client/SearchScreen/index.jsx';
import UserProfile from './src/screens/user/Profile/index.jsx';
import AuthFlow from './src/screens/AuthFlow/AuthFlow.jsx';
// import Signup from './src/screens/AuthFlow/Signup.jsx';
// import Login from './src/screens/AuthFlow/Login.jsx';
import CallLogScreen from './src/screens/user/CallLog/index.jsx';
import ContactList from './src/screens/client/Onboarding/ContactList.jsx';
import { LogBox } from 'react-native';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './src/reducer';
import { thunk } from 'redux-thunk';

const App = () => {
 const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk),
 });
 LogBox.ignoreAllLogs();
 return (
    <Provider store={store}>
        <Base />  
    </Provider>
 );
};


export default App