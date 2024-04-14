import { View, Text, StyleSheet, StatusBar, Pressable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import {connect, useSelector} from 'react-redux';
import { moderateScale } from '../../styles/mixins';
import Ripple from 'react-native-material-ripple'
import Slider from '@react-native-community/slider';
import { useNavigation} from '@react-navigation/native';
import tealBackground from '../../assets/tealBackground.png';
import { useStripe } from '@stripe/stripe-react-native';
import { PAYMENT_INTENT_URL } from '../../actions';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
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

        const { initPaymentSheet, presentPaymentSheet } = useStripe();
        // const [loading, setLoading] = useState(false);
      
        const fetchPaymentSheetParams = async () => {
        
            console.log('first')
          const myHeaders = new Headers();
          myHeaders.append('Authorization' , `Bearer ${jwtToken}`);
          console.log(`Bearer ${jwtToken}`);
          myHeaders.append("Content-Type","application/json");
            const plan = 'monthly'
          const body = JSON.stringify({ 
            amount: price, 
            plan: `PRO_${request}_${session}`, 
            billingCycle: 
                plan ,
                request, 
                session
             
        })
          console.log(body);
          const requestOptions = {

            method: 'POST',
            headers : myHeaders,
            body: body
          }
          console.log(requestOptions);
          const response =await fetch(PAYMENT_INTENT_URL, requestOptions);
          const responseJSON = await response.json();
          console.log('responseJSON::::::::::::::::::::::',responseJSON)
          const { paymentIntent, ephemeralKey, customer} = await response.json();
      
          return {
            paymentIntent,
            ephemeralKey,
            customer,
          };
        };
      
        const fetchPaymentIntentClientSecret = async () => {
            console.log('inside fetch')
        //     const myHeaders = new Headers();
        //   myHeaders.append('Authorization' , `Bearer ${jwtToken}`);
        //   console.log(`Bearer ${jwtToken}`);
        //   myHeaders.append("Content-Type","application/json");
            const plan = 'monthly'
        //   const body = JSON.stringify({ 
        //     amount: price, 
        //     plan: `PRO_${request}_${session}`, 
        //     billingCycle: 
        //         plan ,
        //         request, 
        //         session
             
        // })
        //   console.log(body);
        //   const requestOptions = {

        //     method: 'POST',
        //     headers : myHeaders,
        //     body: body
        //   }
        //   console.log(requestOptions);
        //   const response =await fetch(PAYMENT_INTENT_URL, requestOptions);
        //   const responseJSON = await response.json();
        //   console.log('responseJSON::::::::::::::::::::::',responseJSON)
        // const res = await fetch(`http://localhost:4242/create-payment-intent`, {
        //     method: "POST",
        //     headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ amount: price, plan: `PRO_${request}_${session}`, billingCycle: plan, request, session })
        // });
        const res = await fetch(PAYMENT_INTENT_URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: price, plan: `PRO_${request}_${session}`, billingCycle: plan, request, session })
        });
        console.log(res);
        // const res2 = await res.json()
        // console.log(res2);
            const {clientSecret} = await res.json();
            return clientSecret;
          };
        
          const {confirmPayment, loading} = useConfirmPayment();
        
          const handlePayPress = async () => {
            // Gather the customer's billing information (for example, email)
            const billingDetails = {
              email: 'sshrutissingh2002@gmail.com',
            };
        
            // Fetch the intent client secret from the backend
            const clientSecret = await fetchPaymentIntentClientSecret();
            console.log(clientSecret);
            // Confirm the payment with the card details
            const {paymentIntent, error} = await confirmPayment(clientSecret, {
              paymentMethodType: 'Card',
              paymentMethodData: {
                billingDetails,
              },
            });
        
            if (error) {
              console.log('Payment confirmation error', error);
            } else if (paymentIntent) {
              console.log('Success from promise', paymentIntent);
            }
          };

        
    const Milestone = ({item,value}) => {
        return (
            <View key={item} style={[localStyles.milestone,{backgroundColor:value>=item?'#008080':'white'}]}></View>
        )
    }
    
    useEffect(()=>{
        // updateTokens();
        // calculatePrice();
        setTotalTokens();
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
                        <Text style={{fontSize:moderateScale(30),color:'black',paddingHorizontal:moderateScale(40),marginLeft:moderateScale(10),borderWidth:1,borderColor:'#00808040',borderRadius:10}}>{price}</Text>
                    </View>
                </View>
                {/* <CardField
        postalCodeEnabled={false}
        
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      /> */}
                <ImageBackground source={tealBackground}
                style={{borderRadius:10,overflow:'hidden',marginTop:moderateScale(40),marginBottom:moderateScale(39)}}>
                    
                        <Ripple style={{paddingHorizontal:moderateScale(44),}} rippleColor='white' onPress={() => navigation.navigate('PaymentScreen')}>
                            <Text style={{color:'white',fontSize:moderateScale(20),fontWeight:'500',marginVertical:moderateScale(16)}}>Get it now</Text>
                        </Ripple>
                </ImageBackground>
                
            </View>
    );
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

})
export default connect(null,{

})(MonthlyPricing);
