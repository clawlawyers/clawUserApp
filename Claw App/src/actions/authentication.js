import {  REGISTER_URL, PHONE_VERIFY_URL } from './variables';
import { CHANGEVARIABLE } from './type';
import { removeData, storeData } from './async-storage';
import { Alert, ToastAndroid } from 'react-native';
import { changeVariable } from './variables';
import { createNewGPTUser } from './legalGPT';
import { getUserProfile } from './userProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';


 const registerUserHelper = async ({ data, navigation, dispatch }) => {

  console.log('inside register');
    console.log('helper data',data);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "phoneNumber": data.phoneNumber,
      "state": data.state,
      "city": data.city,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "email": data.email
    });

    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    try{const res = await fetch( REGISTER_URL, requestOptions);
    const response = await res.json();
    console.log('res',response);
    if(response.success){
      storeData('userId',data.jwtToken);
      createNewGPTUser(data.jwtToken);
      navigation.navigate('UserFlow');
    }else{
      Alert.alert('error');
    }
    }catch(err){
      console.log('err',err);
    }
     
  };
  
  const phoneVerificationHelper = async({data, navigation, dispatch}) =>{

    // if(data.phoneNumber != '')
    // {
      
      // ToastAndroid.show('inside phoneverifcation',ToastAndroid.SHORT);
      console.log('inside phoneverifcation')
      const _phoneNumber = await AsyncStorage.getItem('phoneNumber');

      const body =  {
       phoneNumber: _phoneNumber,
        verified: data.verified
      };
      console.log(body)
  
      const headers = { 'Content-Type': 'application/json'};
  
      const config = { method: 'POST', body: JSON.stringify(body), headers };

      try{
        dispatch(changeVariable('loginLoader',true))
        fetch(PHONE_VERIFY_URL,config)
        .then(response => response.json())
        .then(responseJson =>{

          console.log(responseJson);
          if(responseJson.success){
            storeData('userId',responseJson.data.jwt);
            storeData('jwt_exp_time',JSON.stringify(responseJson.data.expiresAt));
            storeData('phone_no',body.phoneNumber)
            dispatch(changeVariable('jwtToken',responseJson.data.jwt))
            dispatch(changeVariable('phone_no',body.phoneNumber))
            createNewGPTUser(responseJson.data.jwt);
            dispatch(changeVariable('loginLoader',false))
                    //  dispatch(changeVariable('isUserLoggedIn',true))
                      // ToastAndroid.show('before navigation',ToastAndroid.SHORT);
            ToastAndroid.show('OTP verified!',ToastAndroid.SHORT);
            navigation.replace('UserFlow')
          }
          else{

            if(_phoneNumber!='')
           {
             ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
            dispatch(changeVariable('loginLoader',false))
          }
          }
        })

      }catch{

        console.log('err', err);
          //  ToastAndroid.show('outer ctach'+err,ToastAndroid.SHORT);
        dispatch(changeVariable('loginLoader',false))
      }
     
    
}



const localSigninHelper = async({data,navigation,dispatch}) =>{

  console.log('first')
  const userId = data;
  console.log('LocalSignin',userId);
  const currentTimeStamp = Date.parse(new Date());
  console.log(currentTimeStamp);
  let jwt_exp_time = await AsyncStorage.getItem('jwt_exp_time');
  let phone_no = await AsyncStorage.getItem('phone_no');
  jwt_exp_time = JSON.parse(jwt_exp_time)
  console.log(currentTimeStamp,jwt_exp_time)
  if(currentTimeStamp > jwt_exp_time){

    Alert.alert('Session expired!', 'Please sign in again to continue', [
      {text: 'OK', onPress: () => navigation.replace('SignupFlow')},
    ]);
    removeData('userId');
    removeData('jwt_exp_time')
    auth().signOut();
    return;
  }
  if(userId){
    dispatch(changeVariable('jwtToken',userId));
    dispatch(changeVariable('phone_no',phone_no));
    //createNewGPTUser(userId);
    // getUserProfile();
    navigation.replace('UserFlow');
  }else{
    navigation.replace('SignupFlow');
  }

}

  export const registerUser = (data, navigation) => dispatch => {
    registerUserHelper({ data,navigation, dispatch });
  };

  export const validatePhoneNumber = (data, navigation) => dispatch=> {

    phoneVerificationHelper({data,navigation,dispatch});

  }

  export const LocalSignIn = (data,navigation) => dispatch => {

    localSigninHelper({data, navigation, dispatch});
  }