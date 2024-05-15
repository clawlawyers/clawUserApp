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
      
        <View>
          
          <TouchableOpacity onPress={() => navigation.navigate('CaseSearchScreen')} style={{borderRadius:15, overflow:'hidden'}}>
          <ImageBackground 
            source={tealBackground} 
            resizeMode='cover' 
            style={localStyles.btnContainer}
          >
            <Image source={searchIconWhite} style={localStyles.searchIcon}/>
            <Text style={{color:'white',fontSize:12}}>Case Search</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
    );
}

const localStyles = StyleSheet.create({
  
  btnContainer: {
    flexDirection:'row',
    paddingHorizontal:18,
    alignItems:'center',
    paddingVertical:7
  },
  searchIcon: {
    width:moderateScale(18),
    height:moderateScale(18),
    marginHorizontal:moderateScale(5)
  }
})

export default CaseSearchComponent;
