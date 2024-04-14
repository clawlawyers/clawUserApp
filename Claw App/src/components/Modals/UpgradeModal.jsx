
import Modal from 'react-native-modal';
import { Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
// import {useSelector, useDispatch} from '@react-navigation/native';
import { changeVariable } from '../../actions';
import {useSelector, useDispatch} from 'react-redux';
import { moderateScale } from '../../styles/mixins';
import tealBackground from '../../assets/tealBackground.png'
import lock from '../../assets/lock.png'
import crossGrey from '../../assets/crossGrey.png'
import { useState } from 'react';
import { CODE_REDEEM_URL } from '../../actions';
import { useNavigation } from '@react-navigation/native';

const UpgradeModal = ({isVisible}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const jwtToken = useSelector(state => state.variables.jwtToken);
    const [referralCode, setReferralCode] = useState('');
    const showReferralModal = () => {

         dispatch(changeVariable('upgradeModalVisible',false));
         dispatch(changeVariable('referralModalVisible',true));
         
    }

    const close = () => {
        dispatch(changeVariable('upgradeModalVisible',false));
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
                style={localStyles.modal}
            >
                {/* <ImageBackground source={referralBackground} opacity={0.2}> */}
                    <View style={{marginHorizontal:moderateScale(20),opacity:1,paddingTop:moderateScale(150)}}>
                        <TouchableOpacity 
                            onPress={close}    
                            style={{alignItems:'flex-end'}}
                        >
                            <Image source={crossGrey} style={localStyles.closeIcon}/>
                        
                        </TouchableOpacity>

                        <View style={{marginTop:moderateScale(0),}}>
                            <Image source={lock} style={localStyles.image}/>
                            <Text style={{fontSize:moderateScale(20),fontWeight:'500',color:'black',alignSelf:'center'}}>Upgrade Now!</Text>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                <ImageBackground source={tealBackground} style={localStyles.button}>
                                    <TouchableOpacity onPress={showReferralModal} >

                                    <Text style={localStyles.buttonText}>Student referral</Text>
                                    </TouchableOpacity>
                                </ImageBackground>

                                <ImageBackground source={tealBackground} style={localStyles.button}>
                                    <TouchableOpacity onPress={() => navigation.navigate('PricingScreen')} >

                                    <Text style={localStyles.buttonText}>Buy credits</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            
                        </View>
                        
                    </View>
                {/* </ImageBackground> */}
                    
                
                
                
            </Modal>
        // </View>
    )

}

const localStyles = StyleSheet.create({

    modal : {
        borderWidth:2,
        borderColor:'teal',
        backgroundColor:'white',
        borderRadius:15,
        maxHeight:moderateScale(350),
        alignSelf:'center',
        width:'85%',
        marginHorizontal:moderateScale(20), 
        marginTop:moderateScale(200),
        overflow:'hidden'
    },
    closeIcon:{
        height:moderateScale(20),
        width:moderateScale(20),
        bottom:moderateScale(-20)
    },
    image:{
        height:moderateScale(220),
        width:moderateScale(220),
        alignSelf:'center',
        bottom:moderateScale(-20)
    },
    button: {
        marginBottom:moderateScale(200),
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(10),
        borderRadius:10,
        overflow:'hidden', 
        alignSelf:'center',
        marginVertical:moderateScale(20)
    },
    buttonText:{
        color:'white',
        fontWeight:'500',
        fontSize:moderateScale(13)
    }

})

export default UpgradeModal;