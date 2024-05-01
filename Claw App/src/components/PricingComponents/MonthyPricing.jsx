import { View, Text, StyleSheet, StatusBar, Pressable, ImageBackground, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import {connect, useDispatch, useSelector} from 'react-redux';
import { moderateScale } from '../../styles/mixins';
import Ripple from 'react-native-material-ripple'
import Slider from '@react-native-community/slider';
import { useNavigation} from '@react-navigation/native';
import tealBackground from '../../assets/tealBackground.png';
// import { useStripe } from '@stripe/stripe-react-native';
import { CREATE_PAYMENT_DEV, CREATE_PAYMENT_PROD } from '../../actions';
import {CFEnvironment, CFSession, } from 'cashfree-pg-api-contract';
import {  CFPaymentGatewayService,  } from 'react-native-cashfree-pg-sdk';
  const MonthlyPricing = () => {


    const jwtToken = useSelector(state => state.variables.jwtToken );
    const [value, setValue] = useState(1);
    const [session, setSession] = useState(1);
    const [request, setRequest] = useState(500);
    const [typesOfTokens,setTokens] = useState([1,2,3,4]);
    const [typesOfSessions,setSessionType] = useState([1,2,3,4]);
    const [price,setPrice] = useState(199);
    const navigation = useNavigation();

    const setTotalTokens = () => {

        if(value==1)
        {
            setRequest(500);
        }else if(value==2)
        {
            setRequest(1000);
        }else if(value==3)
        {
            setRequest(5000);
        }else if(value==4)
        {
            setRequest('unlimited');
        }
    }
    const calculatePrice = () => {

        if(session==1){
            if(value==1){
                setPrice(199)
            }else if(value==2){
                setPrice(349)
            }else if(value==3){
                setPrice(499)
            }else if(value==4){
                setPrice(999)
            }
        }
        else if(session==2){
            if(value==1){
                setPrice(249)
            }else if(value==2){
                setPrice(399)
            }else if(value==3){
                setPrice(599)
            }else if(value==4){
                setPrice(1499)
            }
        }
        else if(session==3){
            if(value==1){
                setPrice(299)
            }else if(value==2){
                setPrice(449)
            }else if(value==3){
                setPrice(699)
            }else if(value==4){
                setPrice(1999)
            }
        }
        else if(session==4){
            if(value==1){
                setPrice(349)
            }else if(value==2){
                setPrice(499)
            }else if(value==3){
                setPrice(799)
            }else if(value==4){
                setPrice(2999)
            }
        }

        
    }
    console.log(request,session);
        
   const createOrder = () => {
    console.log('first')
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwtToken}`);
    const raw = JSON.stringify({
    "amount": price,
    "request": request,
    "session": session,
    "billingCycle": "monthly",
    "plan": `PRO_${request}_${session}`
    });
    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(CREATE_PAYMENT_PROD, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        const payment_session_id= result.data.payment_session_id;
        const order_id = result.data.order_id;
        try {
            const session = new CFSession(
              payment_session_id,
              order_id,
              CFEnvironment.PRODUCTION
            );
            console.log('Session', JSON.stringify(session));
            CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
          } catch (e) {
            console.log('e',e);
            ToastAndroid.show('Something went wrong, please try again later.',ToastAndroid.SHORT);
          }
    })
    .catch((error) => console.error(error));
   }
    
   useEffect(() => {
    CFPaymentGatewayService.setCallback({
        onVerify(orderID){
         console.log('orderId is :' + orderID);
         navigation.navigate('PaymentStatus',{status:'success'});
        },
        onError(error, orderID) {
          console.log('exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID);
          navigation.navigate('PaymentStatus',{status:'fail'});

        },
      });
   })

    useEffect(()=>{
        setTotalTokens();
        calculatePrice();
    },[value])

    useEffect(() => {

        calculatePrice();
    },[session])

    return (
        <View style={localStyles.pricingContainer}>
                
                <Text style={localStyles.title}>Monthy</Text>

                <View style={{height:moderateScale(10)}}></View>

                <Text style={{color:'black',fontSize:moderateScale(22)}}>Request</Text>

                <View style={{width:'70%',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
                
                    <Slider
                        style={{ width: '100%', height: 30,paddingHorizontal:moderateScale(20) }}
                        minimumValue={1}
                        maximumValue={4}
                        step={1}
                        thumbTintColor="#008080" // Change the color of the thumb
                        minimumTrackTintColor="#008080" // Change the color of the track before the thumb
                        maximumTrackTintColor="#B3BCBC" // Change the color of the track after the thumb
                        value={value}
                        onValueChange={newValue => setValue(newValue)}
                    />

                    <View style={[localStyles.markContainer,{position:'absolute',top:moderateScale(10),left:1,paddingHorizontal:moderateScale(10),}]}>
                        {typesOfTokens.map(item => {
                            return(
                                <Milestone key={item} item={item} value={value} />
                            )
                        })}
                    </View>

                </View>

                <View style={[localStyles.markContainer,{paddingLeft: moderateScale(53),paddingRight:moderateScale(35)}]}>
                    <Text style={localStyles.mark}>500</Text>
                    <Text style={localStyles.mark}>1000</Text>
                    <Text style={localStyles.mark}>5000</Text>
                    <Text style={localStyles.mark}>Unlimited</Text>
                </View>
                
                <View style={{height:moderateScale(35)}}></View>

                <Text style={{color:'black',fontSize:moderateScale(22)}}>Users/Sessions</Text>

                <View style={{width:'80%',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
                
                <Slider
                    style={{ width: '100%', height: 30,paddingHorizontal:moderateScale(20) }}
                    minimumValue={1}
                    maximumValue={4}
                    step={1}
                    thumbTintColor="#008080" // Change the color of the thumb
                    minimumTrackTintColor="#008080" // Change the color of the track before the thumb
                    maximumTrackTintColor="#B3BCBC" // Change the color of the track after the thumb
                    value={session}
                    onValueChange={newValue => setSession(newValue)}
                />

                <View style={[localStyles.markContainer,{position:'absolute',top:moderateScale(10),left:1,paddingHorizontal:moderateScale(10),}]}>
                    {typesOfSessions.map(item => {
                        return(
                            <Milestone key={item} item={item} value={session}/>
                        )
                    })}
                
                </View>
                <View style={[localStyles.markContainer,{paddingHorizontal:moderateScale(10)}]}>
                    <Text style={localStyles.mark}>1</Text>
                    <Text style={localStyles.mark}>2</Text>
                    <Text style={localStyles.mark}>3</Text>
                    <Text style={localStyles.mark}>4</Text>
                </View>
                </View>

                <View style={{marginTop:moderateScale(26),alignItems:'center'}}>
                    <Text style={{fontSize:moderateScale(27),fontWeight:'500',color:'black'}}>You're paying</Text>
                    <View style={{flexDirection:'row',marginTop:moderateScale(13)}}>
                        <Text style={{color:'black',fontSize:moderateScale(30)}}>₹</Text>
                        <Text style={localStyles.priceText}>{price}</Text>
                    </View>
                </View>
                
                <ImageBackground source={tealBackground}
                style={localStyles.btnContainer}>
                    
                        <Ripple 
                            style={{paddingHorizontal:moderateScale(44),}} 
                            rippleColor='white' 
                            onPress={createOrder}
                        >
                            <Text style={localStyles.btnText}>Get it now</Text>
                        </Ripple>
                </ImageBackground>
                
            </View>
    );
}

const Milestone = ({item,value}) => {
    return (
        <View key={item} style={[localStyles.milestone,{backgroundColor:value>=item?'#008080':'white'}]}></View>
    )
}
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
    pricingContainer:{
        flex:1,
        backgroundColor:'#ffffff',
        width:'100%',
        alignItems:'center',
        borderRadius:moderateScale(15),
        marginTop:moderateScale(28)
    },
    markContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      milestone:{
        height:10,
        width:10,
        borderColor:'#008080',
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:5,
      },
      mark: {
        fontSize: 12,
        color: 'black',
      },

      title: {
        color:'#008080',
        fontSize:moderateScale(45),
        fontWeight:'bold',
        marginTop:moderateScale(15)
    },
    priceText:{
        fontSize:moderateScale(30),
        color:'black',
        paddingHorizontal:moderateScale(40),
        marginLeft:moderateScale(10),
        borderWidth:1,
        borderColor:'#00808040',
        borderRadius:10
    },
    btnContainer:{
        borderRadius:10,
        overflow:'hidden',
        marginTop:moderateScale(40),
        marginBottom:moderateScale(39)
    },
    btnText:{
        color:'white',
        fontSize:moderateScale(20),
        fontWeight:'500',
        marginVertical:moderateScale(16)
    }


})
export default connect(null,{

})(MonthlyPricing);
