import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { moderateScale } from '../../../styles/mixins';
import FastImage from 'react-native-fast-image';
import paymentSuccess from '../../../assets/payment-success.gif';
import paymentFail  from '../../../assets/payment-fail.gif';
import { useNavigation } from '@react-navigation/native';
const PaymentStatus = ({route}) => {

    const {status} = route.params;
    console.log(status);
    const navigation = useNavigation()
    useEffect(() => {

        setTimeout(()=>{
            navigation.navigate('Legal GPT')
        },2000)
       
    },[])
    return (
        <View style={{backgroundColor:'#1b202c',flex:1,justifyContent:'center',alignItems:'center'}}>
            <StatusBar  backgroundColor='#1B202C'/>
            <View style={{alignItems:'center'}}>
                <FastImage 
                    source={status=='success'?paymentSuccess:paymentFail} 
                    style={{height:moderateScale(90),width:moderateScale(90),borderRadius:45}}
                />
                <Text style={{color:'white',fontSize:moderateScale(28),fontWeight:'500',marginTop:moderateScale(20)}}>{status=='success'?'Payment Successful!':'Payment Failed!'}</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default PaymentStatus;
