import { NEW_MESSAGE_URL, NEW_SESSION_URL, NEW_USER_URL, RETREIVE_MESSAGES, RETREIVE_SESSIONS, TOKEN_URL} from './variables';
import { CHANGEVARIABLE } from './type';
import { storeData } from './async-storage';
import { Alert, ToastAndroid } from 'react-native';
import { changeVariable } from './variables';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a new legal GPT user
export const createNewGPTUser = async(jwtToken) => {

    const userJwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+userJwtToken;
    console.log('legal gpt',userProfileToken);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
      };
     console.log(requestOptions)
      try{
        
        const response = await fetch(NEW_USER_URL,requestOptions)
        const responseJSON = await response.json();
     console.log('legalgpt responseJson',responseJSON)
       

    }catch(err){
        console.log('createNewGPTUser error',err);
    }

    
 }

//  Create a new session
const createNewSessionHelper = async({prompt,dispatch}) => {
   
    console.log('createNewSession')
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    myHeaders.append("Content-Type", "application/json");
    var raw =  JSON.stringify({
        "prompt": prompt,
        "model": "legalGPT"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body : raw
    };
   
    try{
        
        const response = await fetch(NEW_SESSION_URL,requestOptions)
        console.log(response)
        const responseJSON = await response.json();
        console.log('createNewSessionHelper responseJson',responseJSON)
        dispatch(changeVariable('active_chatID',responseJSON.data.id))
        const sessionid = responseJSON.data.id;
        var raw =  JSON.stringify({
            "prompt": prompt,
            "sessionId": responseJSON.data.id
          });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body : raw
        };
        await fetch(NEW_MESSAGE_URL,requestOptions)
        .then(response2 => response2.json())
        .then(response2 => {
            RetreiveMessagesHelper(sessionid,dispatch)
            dispatch(changeVariable('botLoader',false));
        })
        .catch(error => {
          console.error('appendNewMessageHelper error',error);
          ToastAndroid.show('Something went wrong, please try again later. create1 ',ToastAndroid.BOTTOM);
            dispatch(changeVariable('botLoader',false));
        });
        
       
    }catch(err){
        console.log('createNewSessionHelper error',err);
        ToastAndroid.show('Something went wrong, please try again later. create2',ToastAndroid.BOTTOM);
        dispatch(changeVariable('botLoader',false));
    }

}


// Retreiving All sessions
const RetreiveAllSessionsHelper = async({dispatch}) => {

    
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
   // console.log(requestOptions)
    try{
        
        const response = await fetch(RETREIVE_SESSIONS,requestOptions)
        //console.log(response)
        const responseJSON = await response.json();
        //console.log('RetreiveAllSessionsHelper responseJson',responseJSON.data)
        dispatch(changeVariable('GPTHistory_ID',responseJSON.data))

    }catch(err){
        console.log('RetreiveAllSessionsHelper error',err);
    }
}


// Retreiving messages of a given session
const RetreiveMessagesHelper = async(active_chatID,dispatch) => {

    if(active_chatID=='newSession'){
        dispatch(changeVariable('active_chatHistory',[]))
        return;
    }
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    try{
        
        const response = await fetch(RETREIVE_MESSAGES+active_chatID,requestOptions)
        const responseJSON = await response.json();
        
       const messages = responseJSON.data.messages
       dispatch(changeVariable('active_chatHistory',messages))
       setSessionLoader(false)
    }catch(err){
        console.log('RetreiveMessagesHelper error',err);
        ToastAndroid.show('Something went wrong, please try again later. ',ToastAndroid.BOTTOM);
        dispatch(changeVariable('botLoader',false));
    }
}

// Retrieving gpt tokens
const getGPTTokensHelper = async(dispatch) => {

    const JwtToken = await AsyncStorage.getItem('userId');
    const userJwtToken = "Bearer "+JwtToken;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userJwtToken);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    const res = await fetch(TOKEN_URL, requestOptions);
    const responseJson = await res.json();

    if(responseJson.success){

        // console.log(responseJson.data.plan)
        const gptTokens = {
            plan : responseJson?.data?.plan,
            token_used: responseJson?.data?.token?.used,
            tokens_withAds: responseJson?.data?.token?.total?.withAds,            
            tokens_withoutAds: responseJson?.data?.token?.total?.withoutAds
        }
        dispatch(changeVariable('gptTokens', gptTokens))
        
    }else{
        console.log('something went wrong...',responseJson?.error);
    }

    // fetch("https://claw-app-dev.onrender.com/api/v1/gpt/user/", requestOptions)
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error));

}



export const setActiveSessionID = (sessionId) => dispatch => {

    dispatch(changeVariable('active_chatID',sessionId))
}

export const RetreiveAllSessions = () => dispatch => {

    RetreiveAllSessionsHelper({dispatch})
}

export const createNewSession = (prompt) => dispatch => {

    createNewSessionHelper({prompt,dispatch})
}

export const setSessionLoader = (status) => dispatch => {

    dispatch(changeVariable('sessionLoader',status))
}

export const RetreiveMessages = (active_chatID) => dispatch => {

    RetreiveMessagesHelper(active_chatID,dispatch)
}

export const getTokens = () => dispatch => {

    getGPTTokensHelper(dispatch)
}
