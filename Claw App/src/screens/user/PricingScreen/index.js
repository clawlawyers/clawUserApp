import { View, Text, StyleSheet, StatusBar, Pressable, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux';
import { moderateScale } from '../../../styles/mixins';
import Ripple from 'react-native-material-ripple'
import YearlyPricing from '../../../components/PricingComponents/YearlyPricing';
import tealBackground from '../../../assets/tealBackground.png';
import MonthyPricing from '../../../components/PricingComponents/MonthyPricing';
const PricingScreen = () => {
  
  return (
    <View style={localStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>  
            <StatusBar backgroundColor='#1B202C' />
            <Text style={localStyles.heading}>Find the Perfect Pricing Option for Your Legal Needs</Text>
            <Text style={localStyles.subHeading}>Explore our flexible pricing options designed to cater to a range of legal requirements. Select the plan that best fits your needs and budget.</Text>

            {/* Monthly pricing */}
            <MonthyPricing/>

            {/* annual*/}
            <YearlyPricing/>

            {/* Enterprise */}
            <View style={{alignItems:'center',backgroundColor:'#ffffff',borderRadius:15,marginTop:moderateScale(29),marginBottom:moderateScale(39)}}>
                <Text style={{color:'#008080',fontSize:moderateScale(45),fontWeight:'bold',marginTop:moderateScale(10)}}>Enterprise</Text>

                <ImageBackground source={tealBackground} style={{backgroundColor:'#008080',borderRadius:10,overflow:'hidden',marginTop:moderateScale(35),marginBottom:moderateScale(39)}}>
                    <Ripple style={{paddingHorizontal:moderateScale(44),}} rippleColor='white'>
                        <Text style={{color:'white',fontSize:moderateScale(22),fontWeight:'500',marginVertical:moderateScale(16)}}>Contact us</Text>
                    </Ripple>
                </ImageBackground>
            </View>
        </ScrollView>
    </View>
  )
}
const borderWidth =4;
const localStyles = StyleSheet.create({

    container:{
        backgroundColor:'#1B202C',
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        paddingHorizontal:moderateScale(15)
    },
    heading:{
        color:'white',
        fontSize:moderateScale(27),
        fontWeight:'500',
        textAlign:'center',
        marginTop:moderateScale(80)
    },
    subHeading:{
        color:'#B7B2B2',
        fontSize:moderateScale(13.2),
        fontWeight:'normal',
        textAlign:'center',
        marginTop:moderateScale(6)
    },
  
})
export default connect(null,{

})(PricingScreen)