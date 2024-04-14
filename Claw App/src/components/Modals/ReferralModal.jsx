
import Modal from 'react-native-modal';
import { Image, ImageBackground, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
// import {useSelector, useDispatch} from '@react-navigation/native';
import { changeVariable } from '../../actions';
import {useSelector, useDispatch} from 'react-redux';
import { moderateScale } from '../../styles/mixins';
import tealBackground from '../../assets/tealBackground.png'
import referralGift from '../../assets/referralGift.png'
import crossGrey from '../../assets/crossGrey.png'
import { useState } from 'react';
import { CODE_REDEEM_URL } from '../../actions';

const ReferralModal = ({isVisible}) => {

    const dispatch = useDispatch();
    const jwtToken = useSelector(state => state.variables.jwtToken);
    const [referralCode, setReferralCode] = useState('');
    const close = () => {
         dispatch(changeVariable('referralModalVisible',false));
    }

    const redeemCode = async()=>{

        if(referralCode.length==0){

            ToastAndroid.show('Please enter a valid code.',ToastAndroid.TOP);
            return;
        }

        body = JSON.stringify({

            referralCode: referralCode
        })
        const BearerToken = 'Bearer ' + jwtToken;
        const myHeaders = new Headers();
        myHeaders.append('Authorization', BearerToken);
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {

            method: "POST",
            headers : myHeaders,
            body: body
        }

        try{
            const response = await fetch(CODE_REDEEM_URL,requestOptions);
            console.log(response);
            const responseJSON = await response.json();
            console.log(responseJSON)
            if(responseJSON.success){

            }
        }catch(err){
             console.log(err);
             ToastAndroid.show('Something went wrong!',ToastAndroid.SHORT);
        }
        
    }
    return (
            <Modal
                testID={'modal'}
                isVisible={isVisible}
                coverScreen={false}
                backdropColor="#222222"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={300}
                animationOutTiming={300}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={300}
                style={{borderWidth:2,borderColor:'teal',backgroundColor:'white',borderRadius:15,maxHeight:moderateScale(380),alignSelf:'center',width:'85%',marginHorizontal:moderateScale(20), marginTop:moderateScale(200),overflow:'hidden'}}
            >
                {/* <ImageBackground source={referralBackground} opacity={0.2}> */}
                    <View style={{marginHorizontal:moderateScale(20),opacity:1,paddingTop:moderateScale(150)}}>
                        <TouchableOpacity onPress={close} style={{alignItems:'flex-end'}}><Image source={crossGrey} style={{height:moderateScale(20),width:moderateScale(20),bottom:moderateScale(-20)}}/></TouchableOpacity>
                        <View style={{marginTop:moderateScale(0),}}>
                            <Image source={referralGift} style={{height:moderateScale(220),width:moderateScale(220),alignSelf:'center',bottom:moderateScale(-20)}}/>
                            <TextInput 
                                style={{borderColor:'teal',borderWidth:1,borderRadius:15,fontWeight:'bold',textAlign:'center',fontSize:moderateScale(20),marginHorizontal:moderateScale(50)}}
                                placeholder='Referral code'
                                placeholderTextColor='#00000050'
                                value={referralCode}
                                onChangeText={(text) => setReferralCode(text)}
                            />
                            <ImageBackground source={tealBackground} style={{marginBottom:moderateScale(200),justifyContent:'center',alignItems:'center',paddingVertical:moderateScale(10),borderRadius:10,overflow:'hidden',width:moderateScale(150), alignSelf:'center',marginVertical:moderateScale(20)}}>
                                <TouchableOpacity onPress={redeemCode} >

                                <Text style={{color:'white',fontWeight:'bold',fontSize:moderateScale(20)}}>Redeem</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        
                    </View>
                {/* </ImageBackground> */}
                    
                
                
                
            </Modal>
        // </View>
    )

}

export default ReferralModal;