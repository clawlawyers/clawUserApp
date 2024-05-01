import { View, Text,Image, StyleSheet, ImageBackground, ToastAndroid } from 'react-native'
import React from 'react'
import referralIcon from '../../assets/referralIcon.png'
import shoppingCart from '../../assets/shoppingCart.png'
import caseReport from '../../assets/CaseReport.png'
import tealBackground from '../../assets/tealBackground.png';
import LinearGradient from 'react-native-linear-gradient'
import logoutIcon from '../../assets/logout.png';
import Delete from '../../assets/delete.png';
import Ripple from 'react-native-material-ripple'
import { moderateScale } from '../../styles/mixins';
import {useNavigation, DrawerActions} from '@react-navigation/native'
import { fetchData, removeData } from '../../actions/async-storage';
import auth from '@react-native-firebase/auth';
import {useSelector ,useDispatch, connect } from 'react-redux'
import { changeVariable } from '../../actions';
import { clearConversation } from '../../actions/legalGPT'
const DrawerFooter = (props) => {

  console.log(props);
    const navigation=useNavigation();
    const referralModalVisible = useSelector( state => state.variables.referralModalVisible);
    const jwtToken = useSelector( state => state.variables.jwtToken);

    const dispatch = useDispatch()

    const clearConversationfnc = () =>{

      props.clearConversation(jwtToken);

    }
    const logout = () => {
    
        removeData('userId');
        auth().signOut();
        navigation.replace('InitialLandingScreen');
        console.log('logged out');
      }

      const showReferralModal = () => {

        dispatch(changeVariable('referralModalVisible',true))
        navigation.dispatch(DrawerActions.closeDrawer());

      }

      
  return (
    <View style={{borderTopColor:'#ffffff20',borderTopWidth:1,paddingTop:moderateScale(10),paddingBottom:moderateScale(20)}}>

      <FooterItem icon={Delete} onClickFunc={clearConversationfnc} title={'Clear all conversations'}/>
      <FooterItem icon={referralIcon} onClickFunc={showReferralModal} title={'Add referral code'}/>
      <FooterItem icon={shoppingCart}  onClickFunc={()=> navigation.navigate('PricingScreen')} title={'Buy credits'}/>
      <FooterItem icon={caseReport} onClickFunc={()=> navigation.navigate('CourtListScreen')} title={'Case details'}/>
      
      <ImageBackground 
        source={tealBackground} 
        resizeMode='cover' 
        style={{marginHorizontal:moderateScale(20),borderRadius:10,overflow:'hidden'}}
      >
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

const FooterItem = ({icon,onClickFunc, title}) => {

  return(
    < Ripple 
      style={localStyles.footerItem}
      rippleColor='white'
      onPress={onClickFunc}
    >
      <Image source={icon} style={{height:20,width:20,marginRight:15}}/>
      <Text style={{color:'white'}}>{title}</Text>
    </ Ripple>    
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

export default connect( null,{
  
  clearConversation
})(DrawerFooter)