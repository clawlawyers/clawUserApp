import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, useIsFocused } from '@react-navigation/native'
import add from '../../assets/add.png';
import chatBubble from '../../assets/chatBubble.png';
import Ripple from 'react-native-material-ripple';
import tealBackground from '../../assets/tealBackground.png'

import GavelIconDark from '../../assets/GavelIcon.png';
import MoneyIconDark from '../../assets/MoneyIcon.png';
import DrawerFooter from './DrawerFooter';
import LinearGradient from 'react-native-linear-gradient'
import {useSelector, useDispatch,connect} from 'react-redux';
import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { Image,View,Text,Dimensions,   StatusBar, NativeModules, LayoutAnimation, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { moderateScale, padding } from '../../styles/mixins';
import { RetreiveAllSessions, setActiveSessionID,setSessionLoader } from '../../actions/legalGPT';
import DrawerShimmerUI from './DrawerShimmerUI';
import TokenComponent from './TokenComponent';


const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);



  function LegalGPTDrawer(props) {

    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const GPTHistory_ID = useSelector(state => state.variables.GPTHistory_ID);
    const active_chatID = useSelector(state => state.variables.active_chatID);
    const firstName = useSelector(state => state.variables.firstName);
    const lastName = useSelector(state => state.variables.lastName);
    const userDetailLoader = useSelector(state => state.variables.userDetailLoader);
   //console.log(GPTHistory_ID)
   
  
    const createNewChat = () => {
    props.setActiveSessionID('newSession');
     navigation.dispatch(DrawerActions.closeDrawer());
     navigation.navigate('Legal GPT');
    }

    const setActiveChat = (item) => {

      console.log(item)
      props.setActiveSessionID(item);
      setSessionLoader(true)
      navigation.dispatch(DrawerActions.closeDrawer());
      navigation.navigate('Legal GPT');
    }

    useEffect(() => {

      props.RetreiveAllSessions();
    },[GPTHistory_ID])
   

    return (
      <View {...props}  style={{backgroundColor:'#222222',height:windowHeight,flex:1,}} >
        <StatusBar backgroundColor='#222222'/>
        <View>
          <TokenComponent />
         
        </View>
      <DrawerContentScrollView {...props} >
        
        <ImageBackground source={tealBackground} resizeMode='cover' style={[localStyles.newChatbtn]}>
          <Ripple 
            style={localStyles.newChatRipple}
            onPress={(item) => createNewChat(item)} 
            rippleColor='white'
            rippleDuration={1000}
            rippleSize={1000}
          >
            <Image source={add} style={{height:moderateScale(25),width:moderateScale(25)}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Start a new chat</Text>
          </Ripple>
        </ImageBackground>
        <View style={{}}>
            {userDetailLoader ? <DrawerShimmerUI /> : null}
          {GPTHistory_ID?.length>0? GPTHistory_ID.map(item => {
          return(
            <View style={{flexDirection:'row'}}  key={item.id}>
              {/* sidebar decorator */}
              <View style={{width:5,height:'100%',backgroundColor:'#008080',display: item.id == active_chatID ? 'block':'none'}}></View>
              
              < Ripple
                style={localStyles.chatItemcontainer}
                onPress={() => setActiveChat(item.id)}
                rippleColor='white'
              >
                <Image source={chatBubble} style={{height:moderateScale(23),width:moderateScale(23)}}/>
                <Text style={localStyles.chatName} numberOfLines={1}>{item.name}</Text>
              </ Ripple>
            </View>
            
          )

          }): null}

           
                    
          {/* separator */}
          <View style={{height:1,width:'100%',backgroundColor:'#ffffff20',marginVertical:moderateScale(15)}}></View>

          {/* News heading */}
          <View style={{paddingHorizontal:moderateScale(20),marginBottom:moderateScale(16)}}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:moderateScale(23)}}>News</Text>
          </View>

          {/* financial news container */}
          < Ripple 
            style={localStyles.newsTypeContainer}
            onPress={() => navigation.navigate('NewsScreen',{newsType : 0})}
            rippleColor='#008080'
          >
            <View style={localStyles.newsDecorator}></View>
            <Image source={MoneyIconDark} style={{width:28,height:26}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Financial News</Text>
          </ Ripple>

          {/* legal news container */}
          < Ripple 
            style={localStyles.newsTypeContainer}
            onPress={() => navigation.navigate('NewsScreen',{newsType : 1})}
            rippleColor='#008080'
          >
            <View style={localStyles.newsDecorator}></View>
            <Image source={GavelIconDark} style={{width:25,height:26}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Legal News</Text>

          </ Ripple>        
        </View>
        
      </DrawerContentScrollView>

      <DrawerFooter />
       
      </View>
     
    );
  }


  const localStyles = StyleSheet.create({

    chatItemcontainer : {
      
      flexDirection:'row',
      paddingVertical:moderateScale(12),
      paddingLeft:moderateScale(12),
      paddingRight:moderateScale(50),
      marginHorizontal:moderateScale(16),
      alignItems:'center',
      width:'100%'
    },
    
    chatName : {
      
      marginLeft:moderateScale(12), 
      color:'white',fontSize:16
    },
    newChatbtn: {
      
      flexDirection:'row', 
      backgroundColor:'#00808060',
      marginHorizontal:moderateScale(16),
      borderRadius:10,
      marginBottom:moderateScale(16),
      overflow:'hidden'
    },
    newChatRipple :{
      flex:1,
      flexDirection:'row',
      paddingVertical:moderateScale(12),
      paddingLeft:moderateScale(12),
      paddingRight:moderateScale(50)
    },

    newsTypeContainer : {
      flexDirection:'row',
      paddingVertical:moderateScale(12),
      paddingLeft:moderateScale(0),
      paddingRight:moderateScale(50),
      marginHorizontal:moderateScale(16),
      borderRadius:10
    },

    newsDecorator : {
      width:2,
      height:'100%',
      backgroundColor:'#008080', 
      marginRight:moderateScale(10)
    },
    userContainer :{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:moderateScale(22),
      paddingLeft:moderateScale(12),
      paddingRight:moderateScale(10) 
    }

  })

  
  export default connect(null,{
    setActiveSessionID,
    RetreiveAllSessions,
    setSessionLoader
  })(LegalGPTDrawer);