import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import styles from '../../styles'
import {moderateScale, verticalScale } from '../../styles/mixins'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';

const AuthFlow = () => {
    const navigation = useNavigation();
    return (
        <LinearGradient
        colors={['#8940FF', '#29085E']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}
      >
      <View style={[styles.alignViewCenter, styles.alignItemsCenter, localStyles.container]}>
          <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
            <Text style={localStyles.heading}>Welcome</Text>
          </View>
          
          <Image
              source={require('../../assets/start-screen-img2.png')}
              style={localStyles.onboardingImage}
          />
          <View style={[styles.alignViewCenter, styles.alignItemsCenter,{marginTop:moderateScale(18)}]}>
              <Text style={[styles.textWhite,{fontSize:moderateScale(30)}]}>
              find your financial and legal
              </Text>
              <Text style={[styles.textWhite,{fontSize:moderateScale(30)}]}>
              partners effortlessly.
              </Text>
          </View>
          
          <View style={[styles.alignItemsCenter, styles.alignViewCenter]}>
             
             <TouchableOpacity onPress={()=>navigation.navigate('SignupUser')} style={[styles.loginButton, styles.alignViewCenter, styles.alignItemsCenter,{marginTop:moderateScale(30),}]}>
                  <Text style={[styles.font_25, styles.textWhite, styles.font_600]}>
                      Get Started
                  </Text>
              </TouchableOpacity>
              
          </View>
          
      </View>
      </LinearGradient>
    )
}

const localStyles = StyleSheet.create({

    container : {
        flex:1,
        justifyContent:'flex-start',
        paddingTop:moderateScale(80)
    },

    heading :{
        color:'white',
        fontSize:moderateScale(48),
        fontWeight:'600'
    },

    onboardingImage :{
        width:moderateScale(350),
        height:moderateScale(300),
        marginTop:moderateScale(15)
    }
})

export default AuthFlow