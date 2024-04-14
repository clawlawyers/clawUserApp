import { View, Text,Image, StyleSheet, ImageBackground, ToastAndroid } from 'react-native'
import React from 'react'
import referralIcon from '../../assets/referralIcon.png'
import shoppingCart from '../../assets/shoppingCart.png'
import tealBackground from '../../assets/tealBackground.png';
import LinearGradient from 'react-native-linear-gradient'
import logoutIcon from '../../assets/logout.png';
import Delete from '../../assets/delete.png';
import Ripple from 'react-native-material-ripple'
import { moderateScale } from '../../styles/mixins';
import {useNavigation, DrawerActions} from '@react-navigation/native'
import { fetchData, removeData } from '../../actions/async-storage';
import auth from '@react-native-firebase/auth';
import {useSelector ,useDispatch } from 'react-redux'
import { changeVariable } from '../../actions';
export default function DrawerFooter() {

    const navigation=useNavigation();
    const referralModalVisible = useSelector( state => state.variables.referralModalVisible);
    const jwtToken = useSelector( state => state.variables.jwtToken);

    const dispatch = useDispatch()
    const logout = () => {
    
        console.log(fetchData('userId'));
        removeData('userId');
        auth().signOut();
        navigation.replace('InitialLandingScreen');
        console.log('logged out');
        console.log(fetchData('userId'));
      }

      const showReferralModal = () => {

        dispatch(changeVariable('referralModalVisible',true))
        navigation.dispatch(DrawerActions.closeDrawer());

      }

      const clearConversation = async() => {

        const BearerToken = 'Bearer ' + jwtToken;
        const myHeaders = new Headers();
        myHeaders.append('Authorization',BearerToken);
        myHeaders.append("Content-Type", "application/json");
        
        const requestOptions = {
          
          method: "DELETE",
          headers : myHeaders,
        }

        try{

          const response = await fetch('https://claw-backend.onrender.com/api/v1/gpt/sessions/legalGPT',requestOptions);
          console.log(response);
          const responseJSON = await response.json();
          console.log(responseJSON)
        }catch(err){
          console.log(err);
          ToastAndroid.show('Something went wrong!',ToastAndroid.SHORT);
        }
      }
  return (
    <View style={{borderTopColor:'#ffffff20',borderTopWidth:1,paddingTop:moderateScale(10),paddingBottom:moderateScale(20)}}>
    < Ripple 
      style={localStyles.footerItem}
      rippleColor='white'
      onPress={clearConversation}
    >
      <Image source={Delete} style={{height:20,width:20,marginRight:15}}/>
      <Text style={{color:'white'}}>Clear all conversations</Text>
    </ Ripple>    

    < Ripple 
      style={localStyles.footerItem}
      rippleColor='white'
      onPress = { showReferralModal}
    >
      <Image source={referralIcon} style={{height:20,width:20,marginRight:15}} />
      <Text style={{color:'white'}}>Add referral code</Text>
    </ Ripple> 

    < Ripple style={localStyles.footerItem} 
      rippleColor='white'
    onPress={()=> navigation.navigate('PricingScreen')}
    >
      <Image source={shoppingCart} style={{height:20,width:20,marginRight:15}} />
      <Text style={{color:'white'}}>Buy credits</Text>
    </ Ripple> 

    {/* <LinearGradient
        colors={['#008080', '#006666']}  
        style={{marginHorizontal:moderateScale(20),borderRadius:10}}
    > */}

  <ImageBackground source={tealBackground} resizeMode='cover' style={{marginHorizontal:moderateScale(20),borderRadius:10,overflow:'hidden'}}>
        <Ripple 
            onPress={logout} 
            style={localStyles.signout} 
            rippleColor='white'
        >
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={logoutIcon} style={{width:15,height:15}}/>
              <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Sign out</Text>
            </View>
{/*             
            <Image source={MenuArrow} style={{marginTop:moderateScale(4)}} /> */}
        </Ripple>
        </ImageBackground>
    {/* </LinearGradient> */}
  </View>
  )
}

const localStyles = StyleSheet.create({

    footerItem :{
        paddingLeft:moderateScale(22),
        flexDirection:'row',
        paddingVertical:moderateScale(12)
    },
    signout: {
        paddingVertical:moderateScale(10),
        paddingHorizontal:moderateScale(19),
    }
})