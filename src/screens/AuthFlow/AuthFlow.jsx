import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../styles'
import CLAW from '../../assets/app-icon.png'
import {moderateScale, verticalScale } from '../../styles/mixins'
import Graphic from '../../assets/start-screen-img.png'
import { useNavigation } from '@react-navigation/native'

const AuthFlow = () => {
    const navigation = useNavigation();
    return (
      <View style={[styles.alignViewCenter, styles.alignItemsCenter,{backgroundColor:'#FFFFFF',backgroundColor:'white',flex:1,justifyContent:'flex-start',paddingTop:moderateScale(50)}]}>
          <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
            <Image  
              source={CLAW}
              style={[styles.startLogo,{width:moderateScale(223),height:moderateScale(71),marginTop: 1}]} 
            />
          </View>
          <Image
              source={require('../../assets/start-screen-img2.png')}
              style={{width:moderateScale(350),height:moderateScale(300),marginTop:moderateScale(45)}}
          />
          <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
              <Text style={[styles.textBlack,styles.font_35, styles.font_bold ]}>
                  Welcome to CLAW!
              </Text>
              <Text style={[styles.textBlack,styles.font_20]}>
              find your financial and legal partners
              </Text>
              <Text style={[styles.textBlack,styles.font_20]}>
              effortlessly.
              </Text>
          </View>
          {/* login signup button */}
          <View style={[styles.alignItemsCenter, styles.alignViewCenter]}>
             
             <TouchableOpacity onPress={()=>navigation.navigate('SignupUser')} style={[styles.loginButton, styles.alignViewCenter, styles.alignItemsCenter,{height:51,paddingHorizontal:2,marginTop:30}]}>
                  <Text style={[styles.font_25, styles.textWhite, styles.font_600]}>
                      Get Started
                  </Text>
              </TouchableOpacity>
              
          </View>
          
      </View>
    )
}

export default AuthFlow