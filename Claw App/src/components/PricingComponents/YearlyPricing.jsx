import { View, Text, StyleSheet, StatusBar, Pressable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux';
import { moderateScale } from '../../styles/mixins';
import Ripple from 'react-native-material-ripple'
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import tealBackground from '../../assets/tealBackground.png';

const YearlyPricing = () => {

    const [value, setValue] = useState(1);
    const [session, setSession] = useState(1);
    const [typesOfTokens,setTokens] = useState([1,2,3,4]);
    const [typesOfSessions,setSessionType] = useState([1,2,3,4]);
    const [price,setPrice] = useState(199);
    const navigation = useNavigation()

    const calculatePrice = () => {

        if(session==1){
            if(value==1){
                setPrice(199*9)
            }else if(value==2){
                setPrice(349*9)
            }else if(value==3){
                setPrice(499*9)
            }else if(value==4){
                setPrice(999*9)
            }
        }
        else if(session==2){
            if(value==1){
                setPrice(249*9)
            }else if(value==2){
                setPrice(399*9)
            }else if(value==3){
                setPrice(599*9)
            }else if(value==4){
                setPrice(1499*9)
            }
        }
        else if(session==3){
            if(value==1){
                setPrice(299*9)
            }else if(value==2){
                setPrice(449*9)
            }else if(value==3){
                setPrice(699*9)
            }else if(value==4){
                setPrice(1999*9)
            }
        }
        else if(session==4){
            if(value==1){
                setPrice(349*9)
            }else if(value==2){
                setPrice(499*9)
            }else if(value==3){
                setPrice(799*9)
            }else if(value==4){
                setPrice(2999*9)
            }
        }
    }

    const Milestone = ({item,value}) => {
        return (
            <View key={item} style={[localStyles.milestone,{backgroundColor:value>=item?'#008080':'white'}]}></View>
        )
    }
    
    useEffect(()=>{
        // updateTokens();
        calculatePrice();
    },[value])

    useEffect(() => {

        calculatePrice();
    },[session])

    return (
        <View style={localStyles.pricingContainer}>
                <Text style={localStyles.title}>Yearly</Text>

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

                <ImageBackground source={tealBackground}  style={{backgroundColor:'#008080',borderRadius:10,overflow:'hidden',marginTop:moderateScale(40),marginBottom:moderateScale(39)}} >             
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
    }
})
export default connect(null,{

})(YearlyPricing);
