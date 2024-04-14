import { View, Text, ScrollView, TouchableOpacity,Image,  TextInput, ImageBackground,Pressable, StyleSheet, StatusBar, Keyboard, NativeModules, LayoutAnimation, ToastAndroid } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import styles from '../../../styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {connect, useSelector, useDispatch} from 'react-redux';
import {moderateScale, verticalScale } from '../../../styles/mixins';
import FastImage from 'react-native-fast-image';
import SidebarIcon from '../../../assets/SidebarIcon.png';
import GPTSendIcon from '../../../assets/GPTSendIcon.png';
import { getUserProfile } from '../../../actions/userProfile';
import Robot from '../../../assets/Robot.png';
import { lawFacts } from '../../../data/lawFactList';
import LinearGradient from 'react-native-linear-gradient'
import { DotIndicator, MaterialIndicator} from 'react-native-indicators';
import Clipboard from '@react-native-clipboard/clipboard';
import TypeWriter from "../../../components/TypeWriter";
// import TypeWriter from 'react-native-typewriter'
import { createNewSession, RetreiveMessages,setSessionLoader } from '../../../actions/legalGPT';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { changeVariable, NEW_MESSAGE_URL } from '../../../actions';
import GPTBackground from '../../../components/Drawer/GPTBackground';
import CaseSearchComponent from '../../../components/CaseSearchComponent';
import ReferralModal from '../../../components/Modals/ReferralModal';
import UpgradeModal from '../../../components/Modals/UpgradeModal';
// import Typewriter from '../../../components/useTypeWriter';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


//---------------------------for LEGAL GPT APP----------------------------------------

const LegalGPTScreen = (props) => {
  
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const active_chatID = useSelector( state => state.variables.active_chatID);
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  const userDetailLoader = useSelector( state => state.variables.userDetailLoader);
  const referralModalVisible = useSelector( state => state.variables.referralModalVisible);
  const upgradeModalVisible = useSelector( state => state.variables.upgradeModalVisible);
  const GPTChatHistory = useSelector( state => state.variables.active_chatHistory);
  const botLoader = useSelector( state => state.variables.botLoader);
  const token_used = useSelector( state => state.variables.gptTokens.token_used);



  const copyToClipboard = (content) => {
    Clipboard.setString(content);
  };

  const sendMessageRequest = async() => {


    if(token_used==100){

      dispatch(changeVariable('upgradeModalVisible',true));
      setQuery('');
      return;
    }
    dispatch(changeVariable('botLoader',true));
   
    if(active_chatID=='newSession'){
        props.createNewSession(query);
          setQuery('');        
        return;
    }
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    myHeaders.append("Content-Type", "application/json");
    var raw =  JSON.stringify({
        "prompt": query,
        "sessionId": active_chatID
      });

      console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body : raw
    };

    try{
        
        const response = await fetch(NEW_MESSAGE_URL,requestOptions)
        setQuery('')
        const responseJSON = await response.json();
        console.log('message response',responseJSON)
        props.RetreiveMessages(active_chatID)
        // setWaiting(false)
        dispatch(changeVariable('botLoader',false));
    }catch(err){
        setQuery('')

        console.log('appendNewMessageHelper error',err);
        // setWaiting(false);
        ToastAndroid.show('Something went wrong, please try again later. screen ',ToastAndroid.BOTTOM);
        dispatch(changeVariable('botLoader',false));
    }
  }

  

 useEffect(() => {
      props.RetreiveMessages(active_chatID);
  },[active_chatID,isFocused]);

  return (
    <View style={[{backgroundColor:'#222222',flex:1}]}>
      <StatusBar backgroundColor="#222222" />

      {userDetailLoader ? 
        <View style={localStyles.loadingItem}>
          <View style={{height:moderateScale(50),marginBottom:moderateScale(10)}}>
            <MaterialIndicator color='white'/>
          </View>
          <Text style={{color:'white',fontSize:18}}>Please wait...</Text>
        </View> : null}
      <LinearGradient
        colors={ ['#222222','#222222','#222222','#222222', '#222222']}
        style={localStyles.backgroundStyle}
      >     
        <View style={[styles.alignViaRow, styles.alignItemsCenter,styles.alignViewCenter, {width: '100%',justifyContent:'space-between',},]}>
          <TouchableOpacity 
            style={[styles.alignItemsLeft, styles.alignViewCenter,]}
            onPress={() => navigation.openDrawer()}
          >
            <Image 
              source={SidebarIcon}
              style={localStyles.sidebarIcon}
            />
          </TouchableOpacity>     

          <CaseSearchComponent />
        </View>

       
          <ReferralModal isVisible={referralModalVisible}/>
          <UpgradeModal isVisible={upgradeModalVisible} />
        <ScrollView 
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}          
          showsVerticalScrollIndicator={false}
          style={{}}
        >
          <View style={{marginBottom:10,marginTop:40,}}>
            {GPTChatHistory.length>0 ?
              GPTChatHistory.map(item => {
                return (
                  item.isUser ? 
                    <Pressable onLongPress={() => copyToClipboard(item.text)} key={item.id} style={{alignSelf:'flex-end',marginVertical:moderateScale(5)}}>
                      <Text style={[localStyles.userTextBox,{backgroundColor:!botLoader?'white':'grey',}]}>{item.text}</Text>
                    </Pressable>
                  : 
                  <View key={item.id} style={{alignSelf:'flex-start',flexDirection:'row',marginVertical:moderateScale(5)}}>
                    
                    <View style={[localStyles.botImage,{backgroundColor:botLoader?'#009090':'#008080',}]} >
                      <Image source={Robot} style={{height:moderateScale(50),width:moderateScale(50)}}/>
                    </View>
                      <LinearGradient
                      colors={!botLoader? ['#008080', '#006666']:['#009090','#009090']}
                      style={localStyles.botTextContainer}
                      
                    > 
                    <Pressable onLongPress={() => copyToClipboard(item.text)}>
                    <Text style={{color:!botLoader?'white':'grey'}} selectable={true}>
                      {item.text}
                    </Text>
                    </Pressable>
                    </LinearGradient>
                  </View>
                  
                  )
                
              })
            :
            <GPTBackground/>
          }
              
          {botLoader ?  
            <View style={{alignSelf:'flex-start',flexDirection:'row',marginVertical:moderateScale(5),width:'30%'}}>
              <View style={{backgroundColor:botLoader?'#00808080':'#008080',height:moderateScale(50),width:moderateScale(50),alignItems:'center',justifyContent:'center',borderRadius:25,marginRight:6,marginTop:9}} >
                <Image source={Robot} style={{height:moderateScale(50),width:moderateScale(50)}}/>
              </View>
              <DotIndicator color={botLoader?'#00808080':'#008080'} size={7} count={3}/>
              </View> : null }
            </View>

        </ScrollView>

        <View>
          {botLoader ? 
            <View style={{zIndex:2,flexDirection:'row'}}>
              <FastImage source={require('../../../assets/botAnimation.gif')} style={{height:80,width:80,bottom:moderateScale(-15),position:'absolute',left:moderateScale(-15)}}/> 
              <View style={{flexDirection:'row',alignItems:'flex-end',bottom:moderateScale(40),marginLeft:moderateScale(40)}}>
                 <View style={{backgroundColor:'#00808095',height:6,width:6,borderRadius:10,marginLeft:moderateScale(9),bottom:moderateScale(10)}}></View>
                  <View style={{backgroundColor:'#00808095',height:10,width:10,borderRadius:10,
                  marginLeft:moderateScale(-1),margin:moderateScale(2),bottom:moderateScale(15)}}></View>
                  <View style={{borderWidth:1,borderColor:'#00808095',marginRight:moderateScale(50),paddingHorizontal:moderateScale(20),paddingVertical:moderateScale(10),borderRadius:moderateScale(20),backgroundColor:'white'}}>

                  <Text style={{color:'black',fontSize:moderateScale(18)}}>
                  <TypeWriter text={Math.floor(Math.random() * 10)} delay={1} /></Text>
                  {/* <Typewriter text={lawFacts[Math.floor(Math.random() * 10)]} /> */}
                </View>
              </View>
              </View>:null}
          
          <View style={{borderWidth:1,borderColor:'#e5e5e540',borderRadius:10,width:'100%',flexDirection:'row',height:moderateScale(52),zIndex:1,backgroundColor:'#43353340',marginBottom:moderateScale(30)}}>
            <TextInput 
              placeholder='Type Your Legal Queries...' 
              cursorColor='grey'
              style={{width:'85%',color:'white',paddingLeft:moderateScale(10)}} 
              value={query}
              onChangeText={(query) => setQuery(query)}
              placeholderTextColor='#ffffff40'
            />
            <TouchableOpacity 
              style={{backgroundColor:query.length>0?'#008080':'grey',width:'11%',justifyContent:'center',alignItems:'center',borderRadius:10,margin:moderateScale(5)}}
              onPress={sendMessageRequest}
              disabled = { query.length>0 && botLoader==false ? false : true}
            >
              {botLoader? <MaterialIndicator size={18} color='white' />:<Image source={GPTSendIcon} style={{width:moderateScale(15),height:moderateScale(14)}}/>}
            </TouchableOpacity>
          </View>
        </View>
        {/* </ImageBackground> */}
        </LinearGradient>
       </View>
  )
}

const localStyles = StyleSheet.create({

  loadingItem : {
    flex:1,
    position:'absolute',
    zIndex:3,
    height:'100%',
    width:'100%',
    backgroundColor:'#00000060',
    alignItems:'center',
    justifyContent:'center'
  },
  backgroundStyle: {
    flex: 1, 
    justifyContent: 'center',
    paddingHorizontal:15,
    paddingTop:20,
    paddingBottom:moderateScale(10)
  },
  sidebarIcon: {
    height:moderateScale(20),
    width:moderateScale(60),
    marginTop:moderateScale(5)
  },
  userTextBox: {
    maxWidth:'80%',
    borderRightWidth:1,
    borderBottomWidth:1,
    borderColor:'#00000030',
    color:'black',
    paddingHorizontal:moderateScale(15),
    paddingVertical:moderateScale(8),
    borderRadius:10,
    elevation:9
  },
  botImage: {
    height:moderateScale(46),
    width:moderateScale(46),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25,
    marginRight:6,
    marginTop:9
  },
  botTextContainer: {
    width:'80%',
    backgroundColor:'#008080',
    color:'white',
    paddingHorizontal:moderateScale(15),
    paddingVertical:moderateScale(8),
    borderRadius:10,
    elevation:12
  } 

})

export default connect(null,{
  getUserProfile,
  createNewSession,
  RetreiveMessages,
  setSessionLoader
})(LegalGPTScreen)