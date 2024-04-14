import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, Keyboard, LayoutAnimation, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import caseSearchIcon from '../assets/caseSearchIcon.png';
import searchIconWhite from '../assets/searchIconWhite.png';
import tealBackground from '../assets/tealBackground.png';
import { moderateScale } from '../styles/mixins';
const CaseSearchComponent = () => {

const [searchBtnWidth, setSearchBtnWidth] = useState(130);
const [searchBtnPadding, setSearchBtnPadding] = useState(23);
const [searchBtnBorder, setSearchBtnBorder] = useState(1);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const navigation = useNavigation();
  console.log('keybaord', isKeyboardVisible)

  const animateButton_Hide = () => {

   
        LayoutAnimation.configureNext({
            duration: 400,
            create: {type: 'linear', property: 'scaleXY'},
            update: {type: 'spring', springDamping: 0.8},
          });
      setSearchBtnWidth(0);
      setSearchBtnPadding(0);
      setSearchBtnBorder(0);
    }

    const animateButton_Show = () => {

   
      LayoutAnimation.configureNext({
          duration: 50,
          create: {type: 'linear', property: 'scaleX'},
          update: {type: 'spring', springDamping: 0.8},
        });
    setSearchBtnWidth(130);
    setSearchBtnPadding(23);
    setSearchBtnBorder(1);
  }

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        animateButton_Hide();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
        animateButton_Show();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    return (
        // <View >

          
        //     <TouchableOpacity style={{flexDirection:'row',alignItems:'center',height:moderateScale(50),marginRight:isKeyboardVisible? moderateScale(20): 0}} onPress={() => navigation.navigate('CaseSearchScreen')}>
              
        //         <View style={{height:moderateScale(45),width:moderateScale(45),borderRadius:25,backgroundColor:'white',paddingVertical:moderateScale(6),paddingHorizontal:moderateScale(5),borderWidth:3,borderColor:'#008080'}}>
        //             <Image source={caseSearchIcon} style={{height:moderateScale(35),width:moderateScale(35)}}/>
        //         </View>
        //         <ImageBackground source={tealBackground} resizeMode='cover' style={{width:searchBtnWidth,height:moderateScale(43),marginLeft:moderateScale(-18),zIndex:-1,borderTopRightRadius:25,borderBottomRightRadius:25,overflow:'hidden',alignItems:'center',justifyContent:'center'}}>
        //           <Text style={{textAlignVertical:'center', color:'white',marginLeft:5,fontWeight:'500',fontSize:moderateScale(17)}}>Case Search</Text>             
        //     </ImageBackground>         
        //   </TouchableOpacity> 
        // </View>
        <View>
          
          <TouchableOpacity onPress={() => navigation.navigate('CaseSearchScreen')}>
          <ImageBackground source={tealBackground} resizeMode='cover' style={{flexDirection:'row',alignItems:'center',paddingHorizontal:moderateScale(18),borderRadius:15,overflow:'hidden',paddingVertical:moderateScale(8)}}>
            <Image source={searchIconWhite} style={{width:moderateScale(13),height:moderateScale(11),marginHorizontal:moderateScale(5)}}/>
            <Text style={{color:'white'}}>Case Search</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({})

export default CaseSearchComponent;
