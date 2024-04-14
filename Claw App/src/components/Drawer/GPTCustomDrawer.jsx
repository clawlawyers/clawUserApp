import React, { useEffect } from 'react';
import { useNavigation, DrawerActions, useIsFocused } from '@react-navigation/native'
import add from '../../assets/add.png';
import chatBubble from '../../assets/chatBubble.png';
import Ripple from 'react-native-material-ripple';
import MenuProfileIcon from '../../assets/profile-icon-unselected.png'
import MenuArrow from '../../assets/rightArrow.png'
import GavelIconDark from '../../assets/GavelIcon.png';
import MoneyIconDark from '../../assets/MoneyIcon.png';
import LinearGradient from 'react-native-linear-gradient'
import {useSelector, useDispatch,connect} from 'react-redux';
import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { Image,View,Text,Dimensions,   StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { moderateScale, padding } from '../../styles/mixins';
import { RetreiveAllSessions, setActiveSessionID,setSessionLoader } from '../../actions/legalGPT';
import DrawerShimmerUI from './DrawerShimmerUI';
import TokenComponent from './TokenComponent';
  function CustomDrawer(props) {

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
    }

    const setActiveChat = (item) => {

      console.log(item)
      props.setActiveSessionID(item);
      setSessionLoader(true)
      navigation.dispatch(DrawerActions.closeDrawer());

    }

    useEffect(() => {

      props.RetreiveAllSessions();
    },[GPTHistory_ID])
    // return (
    //   <DrawerContentScrollView {...props} 
    //     style={{backgroundColor:'#1B202C',height:windowHeight,flex:1,borderWidth:1,borderColor:'red',}}
    //   >
        
    //     <View style={{borderWidth:1,borderColor:'white',flexDirection:'column',justifyContent:'space-between',paddingTop:moderateScale(20),marginBottom:0}}>
    //       <View style={{borderWidth:1,borderColor:'yellow',}}>
    //       {GPTHistory_ID.length>0? GPTHistory_ID.map(item => {
    //       return(
    //         < Ripple key={item.id}
    //           style={{flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(12),paddingRight:moderateScale(50),marginHorizontal:moderateScale(16),alignItems:'center'}}
    //           onPress={() => setActiveChat(item.id)}
    //           rippleColor='white'
    //         >
    //           <Image source={chatBubble} style={{height:moderateScale(23),width:moderateScale(23)}}/>
    //           <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}} numberOfLines={1}>{item.name}</Text>
    //       </ Ripple>
    //       )

    //       }):null}

        
    //         <LinearGradient
    //           colors={['#8940FF', '#5920B5']}
    //           style={{flexDirection:'row', backgroundColor:'#8940FF60',marginHorizontal:moderateScale(16),borderRadius:10,marginTop:moderateScale(16),overflow:'hidden'}}
              
    //         >  
    //             <Ripple 
    //               style={{flex:1,flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(12),paddingRight:moderateScale(50)}}
    //               onPress={(item) => createNewChat(item)} 
    //               rippleColor='white'
    //               rippleDuration={1000}
    //               rippleSize={1000}
    //             >
    //             <Image source={add} style={{height:moderateScale(25),width:moderateScale(25)}}/>
    //             <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Start a new chat</Text>
    //             </Ripple>
    //         </LinearGradient>
        
    //       <View style={{height:1,width:'100%',backgroundColor:'#00000020',marginVertical:moderateScale(15)}}></View>
    //       <View style={{paddingHorizontal:moderateScale(20)}}>
    //         <Text style={{color:'white',fontWeight:'bold',fontSize:moderateScale(23)}}>News</Text>
    //       </View>
    //       < Ripple 
    //         style={{flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(0),paddingRight:moderateScale(50),marginHorizontal:moderateScale(16),borderRadius:10,marginTop:moderateScale(16)}}
    //         onPress={() => navigation.navigate('NewsScreen',{newsType : 0})}
    //         rippleColor='#8940ff'
    //       >
    //         <View style={{width:2,height:'100%',backgroundColor:'#8940FF', marginRight:moderateScale(10)}}></View>
    //           <Image source={MoneyIconDark} style={{width:28,height:26}}/>
    //           <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Financial News</Text>
    //       </ Ripple>

    //       < Ripple 
    //         style={{flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(0),paddingRight:moderateScale(50),marginHorizontal:moderateScale(16),borderRadius:10,}}
    //         onPress={() => navigation.navigate('NewsScreen',{newsType : 1})}
    //         rippleColor='#8940ff'
    //       >
    //         <View style={{width:2,height:'100%',backgroundColor:'#8940FF', marginRight:moderateScale(10)}}></View>
    //           <Image source={GavelIconDark} style={{width:25,height:26}}/>
    //           <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Legal News</Text>
    //       </ Ripple>
    //       </View>

    //       <View style={{borderWidth:1,borderColor:'orange',}}>
    //       < Ripple 
    //         style={{flexDirection:'row', borderTopWidth:1,paddingLeft:moderateScale(12),marginHorizontal:moderateScale(16),borderRadius:10, borderColor:'#ffffff20', paddingVertical:moderateScale(17),}}
    //         rippleColor='red'
    //         rippleOpacity={0.10}
    //       >
    //           <Image source={Delete} style={{width:25,height:26}} />
    //           <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Clear all Conversations</Text>
    //       </Ripple>

    //       <LinearGradient
    //       colors={['#8940FF', '#5920B5']}  
    //       >
    //         <Ripple 
    //           onPress={() => navigation.navigate('GPTProfileScreen')} 
    //           style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:moderateScale(22),paddingLeft:moderateScale(12),paddingRight:moderateScale(10) }} 
    //           rippleColor='white'
    //         >
    //         <View style={{flexDirection:'row'}}>
    //           <Image source={MenuProfileIcon} style={{width:25,height:25}}/>
    //           <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>User</Text>
    //         </View>
            
    //           <Image source={MenuArrow} style={{marginTop:moderateScale(4)}} />
    //           </Ripple>
    //       </LinearGradient>
    //       </View>
    //     </View>
        
    //   </DrawerContentScrollView>
    // );

    return (
      <View {...props}  style={{backgroundColor:'#1B202C',height:windowHeight,flex:1,}} >
        <StatusBar backgroundColor='#1B202C'/>
        {/* <View>
          <TokenComponent />
        </View> */}
      <DrawerContentScrollView {...props} >
        
        <View style={{}}>
            {userDetailLoader ? <DrawerShimmerUI /> : null}
          {GPTHistory_ID?.length>0? GPTHistory_ID.map(item => {
          return(
            <View style={{flexDirection:'row'}}  key={item.id}>
              {/* sidebar decorator */}
              <View style={{width:5,height:'100%',backgroundColor:'#8940ff',display: item.id == active_chatID ? 'block':'none'}}></View>
              
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

        
            <LinearGradient
              colors={['#8940FF', '#5920B5']}
              style={localStyles.newChatbtn}
              
            >  
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
            </LinearGradient>
                    
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
            rippleColor='#8940ff'
          >
            <View style={localStyles.newsDecorator}></View>
            <Image source={MoneyIconDark} style={{width:28,height:26}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Financial News</Text>
          </ Ripple>

          {/* legal news container */}
          < Ripple 
            style={localStyles.newsTypeContainer}
            onPress={() => navigation.navigate('NewsScreen',{newsType : 1})}
            rippleColor='#8940ff'
          >
            <View style={localStyles.newsDecorator}></View>
            <Image source={GavelIconDark} style={{width:25,height:26}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Legal News</Text>

          </ Ripple>        
        </View>
        
      </DrawerContentScrollView>


        <View >
          {/* < Ripple 
            style={{flexDirection:'row', borderTopWidth:1,paddingLeft:moderateScale(12),marginHorizontal:moderateScale(16),borderRadius:10, borderColor:'#ffffff20', paddingVertical:moderateScale(17),}}
            rippleColor='red'
            rippleOpacity={0.10}
          >
              <Image source={Delete} style={{width:25,height:26}} />
              <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Clear all Conversations</Text>
          </Ripple> */}

          <LinearGradient
          colors={['#8940FF', '#5920B5']}  
          >
            <Ripple 
              onPress={() => navigation.navigate('GPTProfileScreen')} 
              style={localStyles.userContainer} 
              rippleColor='white'
            >
            <View style={{flexDirection:'row'}}>
              <Image source={MenuProfileIcon} style={{width:25,height:25}}/>
              <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>{ firstName =='' ?'User': `${firstName} ${lastName}`}</Text>
            </View>
            
              <Image source={MenuArrow} style={{marginTop:moderateScale(4)}} />
            </Ripple>
          </LinearGradient>
        </View>
      </View>
     
    );
  }

  export default connect(null,{
    setActiveSessionID,
    RetreiveAllSessions,
    setSessionLoader
  })(CustomDrawer);

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
      backgroundColor:'#8940FF60',
      marginHorizontal:moderateScale(16),
      borderRadius:10,
      marginTop:moderateScale(16),
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
      backgroundColor:'#8940FF', 
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