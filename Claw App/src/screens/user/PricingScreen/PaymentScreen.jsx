import React, { useCallback, useRef, useState } from 'react';
import {View, StyleSheet, BackHandler, Image, Pressable, Alert, Text, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid} from 'react-native';
import {connect} from 'react-redux'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import BackButton from '../../../assets/back-button.png';
import { moderateScale } from '../../../styles/mixins';
import mastercard from '../../../assets/mastercard.png'
import Ripple from 'react-native-material-ripple'
const PaymentScreen = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvc, setCVC] = useState('');
    const [discountCode, setDiscountCode] = useState('');

    const monthRef = useRef();
    const yearRef = useRef();
    const [isNameValid, setIsNameValid] = useState(true);
    const [isNumberValid, setIsNumberValid] = useState(true);
    const [isCVCValid, setIsCVCValid] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);

    const handleCardNumber = () => {

        if(cardNumber.length==12){
            setIsNumberValid(true);
        }else{
            setIsNumberValid(false);
        }
    }

    const handleName = () => {

        if(name.length==0){
            setIsNameValid(false);
        }else{
            setIsNameValid(true);
        }
    }

    const handleExpiryDate = (e) => {

        
        // if(expiryDate.length==2){
        //     const date = expiryDate+'/';
        //     setExpiryDate(date);
        // }else{
        //     setExpiryDate(e)
        // }

        if(month.length==2 && year.length==2){
            setIsDateValid(true);
        }else{
            setIsDateValid(false);
        }
    }

    const handleCVC = () => {

        if(cvc.length==3){
            setIsCVCValid(true);
        }else{
            setIsCVCValid(false);
        }
    }

    const initiatePayment = () => {

        if(name=='' || cardNumber=='' || month=='' || year=='' || cvc==0)
        {
            ToastAndroid.show('Please fill the required fields!',ToastAndroid.SHORT);
        }else{

            const accDetails = {
                name : name,
                cardNumber : cardNumber,
                month: month,
                year: year,
                cvc: cvc,
                discountCode : discountCode.length>0 ? discountCode:null
            }
            console.log('accDetails',accDetails)
        }
    }
    // useFocusEffect(
    //     useCallback(() => {
    //         const onBackPress = () => {
    //             return true;
    //         };
    //         BackHandler.addEventListener('hardwareBackPress', onBackPress);
        
    //         return () =>
    //             BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     }, []),
    // );

    const confirmExit = () => {

        Alert.alert('Are you sure?', 'Payment is incomplete.', [
            {
              text: 'Take me back',
            },
            {text: 'Yes', onPress: () => navigation.navigate('PricingScreen')},
          ]);
    }
    return (
        <KeyboardAvoidingView behavior='position' style={localStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={confirmExit}>
                <Image source={BackButton} style={localStyles.backButton}/>
            </Pressable>
            <View style={{alignItems:'center',marginTop:moderateScale(40)}}>
                <Text style={localStyles.heading}>Let's Make Payment</Text>
                <Text style={localStyles.subHeading}>To start your subscription, input your card details to make payment. </Text>
            </View>

            <View style={localStyles.detailContainer}>
                <View style={localStyles.inputContainer}>
                    <Text style={localStyles.inputLabel}>Cardholder's Name<Text style={{color:'red'}}>*</Text></Text>
                    <TextInput 
                        style={[localStyles.inputStyle,{borderColor:isNameValid?'#008080':'red'}]} placeholder='PRIYA SHARMA' placeholderTextColor='#00000030'
                        value={name}
                        onChangeText={(name) => setName(name)}
                        onEndEditing={handleName}
                    />
                </View>

                <View style={localStyles.inputContainer}>
                    <Text style={localStyles.inputLabel}>Card Number<Text style={{color:'red'}}>*</Text></Text>
                    <View style={[localStyles.inputStyle,{flexDirection:'row',alignItems:'center',borderColor:isNumberValid==true?'#008080':'red'}]}>
                        <Image source={mastercard} style={{height:moderateScale(30),width:moderateScale(50)}}/>
                        
                        <TextInput 
                            style={{width:'80%'}} 
                            maxLength={12} 
                            keyboardType='number-pad' 
                            placeholder='9870 3456 7890 6473' placeholderTextColor='#00000030'
                            value={cardNumber}
                            onChangeText={(number) => setCardNumber(number)}
                            onEndEditing={handleCardNumber}
                        />
                    </View>
                   
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={localStyles.inputContainer}>
                        
                        <Text style={localStyles.inputLabel}>Expiry<Text style={{color:'red'}}>*</Text></Text>
                        <View style={[localStyles.inputStyle,{width:moderateScale(158),flexDirection:'row',borderColor:isDateValid?'#008080':'red',alignItems:'center'}]}>
                            <TextInput 
                                ref={monthRef}
                                style={{}} keyboardType='number-pad' 
                                maxLength={2} 
                                placeholder='MM /' placeholderTextColor='#00000030'
                                value={month}
                                onChangeText={(month) => {
                                    setMonth(month);
                                    if(month?.length==2){
                                        yearRef.current.focus();
                                    }
                                }}
                                onEndEditing={handleExpiryDate}
                            />
                             {month.length > 0 && <Text style={{marginLeft:-20}}>/</Text>}
                            <TextInput 
                                ref={yearRef}
                                style={{}} keyboardType='number-pad'
                                
                                maxLength={2} 
                                placeholder='YY' placeholderTextColor='#00000030'
                                value={year}
                                onChangeText={(year) => {
                                    setYear(year);
                                    if(year?.length==0){
                                        monthRef.current.focus();

                                    }
                                }}

                                onEndEditing={handleExpiryDate}
                            />

                        </View>
                            
                    
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={localStyles.inputLabel}>CVC<Text style={{color:'red'}}>*</Text></Text>
                        
                            <TextInput 
                                style={[localStyles.inputStyle,{width:moderateScale(138),borderColor:isCVCValid?'#008080':'red'}]} keyboardType='number-pad' 
                                maxLength={3} 
                                placeholder='895' placeholderTextColor='#00000030'
                                value={cvc}
                                onChangeText={(cvc) => setCVC(cvc)}
                                onEndEditing={handleCVC}
                                />
                    </View>
                </View>
                
                <View style={localStyles.inputContainer}>
                    <Text style={localStyles.inputLabel}>Discount Code</Text>
                    <TextInput 
                        style={localStyles.inputStyle} placeholder='CHIKAMSO-20-OFF' placeholderTextColor='#00000030'
                        value={discountCode}
                        onChangeText={(disc) => setDiscountCode(disc)}
                    />
                </View>

            </View>

            <View style={{alignItems:'center'}}>
                <Pressable 
                    style={{backgroundColor:'#008080',borderRadius:10,overflow:'hidden',marginTop:moderateScale(42),marginBottom:moderateScale(39),width:moderateScale(184)}} >
                    <Ripple style={{alignItems:'center',}} rippleColor='white' onPress={initiatePayment}>
                        <Text style={{color:'white',fontSize:moderateScale(20),fontWeight:'500',marginVertical:moderateScale(16)}}>Pay</Text>
                    </Ripple>
                </Pressable>
            </View>
            
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const localStyles = StyleSheet.create({

    container: {
        backgroundColor:'#18202c',
        flex:1,
        paddingHorizontal:moderateScale(20),
        paddingTop:moderateScale(20)
    },
    backButton:{
        height:moderateScale(30),
        width:moderateScale(35)
    },
    heading:{
        color:'white',
        fontSize:moderateScale(28),
        fontWeight:'bold'
    },
    subHeading:{
        color:'#A6A4A4',
        marginTop:moderateScale(12),
        fontSize:moderateScale(12),
        marginHorizontal:moderateScale(10),
        textAlign:'center'
    },
    detailContainer:{
        marginTop:moderateScale(65),

    },
    inputLabel:{
        color:'white',
        fontSize: moderateScale(20)
    },
    inputStyle:{
        backgroundColor:'#ffffff',
        borderRadius:10,
        height:moderateScale(60),
        paddingHorizontal:moderateScale(10),
        borderWidth:1,
        borderColor:'#008080',
        elevation:8
    },
    inputContainer:{
        marginBottom:moderateScale(27)
    }
})

export default connect(null,{

})(PaymentScreen);
