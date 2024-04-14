import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Image, Dimensions, Text, NativeModules, LayoutAnimation, Pressable, ImageBackground} from 'react-native';
import features from '../data/features';
import { moderateScale } from '../styles/mixins';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'

import tealBackground from '../assets/tealBackground.png'
import Onboardingchevron from '../assets/Onbordingchevron.png'

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


const OnBoardingComponent2 = () => {

    const [currentItemIndex , setCurrentItemIndex] = useState(0);
    const {width} = Dimensions.get('window');
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [outerCircleRadius, setOuterCircleRadius] = useState(0);
    const [innerCircleRadius, setInnerCircleRadius] = useState(0);
    const [imageRadius, setImageRadius] = useState(0);
    const animateButton = () => {

    //     setOuterCircleRadius(outerCircleRadius-320);
    //    setInnerCircleRadius(innerCircleRadius-250);
        LayoutAnimation.configureNext({
            duration: 300,
            create: {type: 'linear', property: 'opacity'},
            update: {type: 'spring', springDamping: 0.9},
          });
       setOuterCircleRadius(outerCircleRadius+320);
       setInnerCircleRadius(innerCircleRadius+250);
       setImageRadius(imageRadius+272);
       
    }

    const goNextSlide = () => {
        if( currentItemIndex==3) {
            
            navigation.replace('SignupUser');
            setInnerCircleRadius(0);
        setOuterCircleRadius(0); 
        setImageRadius(0);
       // animateButton()
        }else{
            setCurrentItemIndex(currentItemIndex+1);
            setInnerCircleRadius(0);
        setOuterCircleRadius(0); 
        setImageRadius(0);
       // animateButton()
        }
        
    }

    const goPrevSlide = () => {
        if(currentItemIndex==0)
        {
            setCurrentItemIndex(3);
            setInnerCircleRadius(0);
            setOuterCircleRadius(0); 
            setImageRadius(0);
            //animateButton()
        }
        else if( currentItemIndex>0) 
        {
            setCurrentItemIndex(currentItemIndex-1);
            setInnerCircleRadius(0);
        setOuterCircleRadius(0); 
        setImageRadius(0);
     
        }
        
    }
    
    const RenderItem = () => {

            const currentItem = features[currentItemIndex];
            console.log(innerCircleRadius, outerCircleRadius,currentItem)
            
            return (
                <View style={[localStyles.container,{alignItems:'center'}]}>
                    <View style={{height:moderateScale(320),width:moderateScale(320),alignItems:'center'}}>
                    <View style={[localStyles.imageContainerOuter,{width:moderateScale(outerCircleRadius),height:moderateScale(outerCircleRadius)}]}>
                        <View style={[localStyles.imageContainerInner,{width:moderateScale(innerCircleRadius),height:moderateScale(innerCircleRadius)}]}>
                            <Image source={currentItem.img} style={[{width:moderateScale(imageRadius),height:moderateScale(imageRadius)}]}/>
                        </View>
                    </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:moderateScale(49),marginBottom:moderateScale(19)}}>
                        {features.map((item) => {
                            return(
                                <View key={item.id} style={{height:moderateScale(10),width:item.id==currentItem.id ?moderateScale(20):moderateScale(10),backgroundColor:item.id==currentItem.id ?'#008080':'#00808040',marginHorizontal:moderateScale(3),borderRadius:5}}/>
                            )
                        })}
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:moderateScale(23),color:'#D9D9D9',fontWeight:'500',marginBottom:3,textAlign:'center',maxWidth:moderateScale(330)}}>{currentItem.title}</Text>
                        <Text style={{fontSize:moderateScale(18),textAlign:'center',color:'#C8C0C0',maxWidth:moderateScale(320)}}>{currentItem.details}</Text>
                    </View>
                </View>
            );
        
    }

    useEffect(() => {

        console.log('useeffect')
        animateButton()
    },[currentItemIndex])
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
            <RenderItem />

            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:moderateScale(20),marginBottom:moderateScale(25)}}>

                <Pressable onPress={goPrevSlide} style={{height:moderateScale(50),alignItems:'center',justifyContent:'center',  borderRadius:13}}><Text style={{color:'white'}}>{currentItemIndex==0 ? 'Skip':'Back'}</Text></Pressable>
                <ImageBackground source={tealBackground} resizeMode='cover' style={{borderRadius:25,height:moderateScale(50),minWidth:moderateScale(50),alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                <Pressable onPress={goNextSlide}>{currentItemIndex==3 ? <Text style={{color:'white',marginHorizontal:moderateScale(20)}}>Get started</Text>:<Image source={Onboardingchevron} style={{height:moderateScale(23),width:moderateScale(23)}}/>}</Pressable>
                </ImageBackground>
            </View>
            
        </View>
    );
}

const localStyles = StyleSheet.create({
    container : {
        
        flexDirection:'column',
        justifyContent:'center',
        
    },
    image :{
       
        // justifyContent:'center',
        height:moderateScale(272),
        width:moderateScale(272),
        
    },
    imageContainerOuter:{

        // width: moderateScale(320),
        // height:moderateScale(320),
        // backgroundColor:'#8940ff20',
        backgroundColor:'#00808020',
        borderRadius:160,
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(25),
    },
    imageContainerInner:{

        // width: moderateScale(250),
        // height:moderateScale(250),
        backgroundColor:'#8940ff40',
        backgroundColor:'#00808050',
        borderRadius:160,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default OnBoardingComponent2;
