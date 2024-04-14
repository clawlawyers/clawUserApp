import { View, Text, Image, StyleSheet, StatusBar, NativeModules, LayoutAnimation } from 'react-native'
import React, { useEffect } from 'react';
import TitleBackground from '../../assets/TitleBackground.png';
import gptGavelIcon from '../../assets/gptGavelIcon.png';
import gptSupportIcon from '../../assets/gptSupportIcon.png';
import gptDownloadIcon from '../../assets/gptDownloadIcon.png';
import { moderateScale } from '../../styles/mixins';
// import Typewriter from './TypeWriter';
import {useIsFocused} from '@react-navigation/native';
// import TypeWriter from 'react-native-typewriter'
import LinearGradient from 'react-native-linear-gradient'
// import { LinearTextGradient } from "react-native-text-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
// import Typewriter from 'typewriter-effect';
import Typewriter from '../useTypeWriter';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


export default function GPTBackground() {

    const isFocused = useIsFocused();

    const Feature = ({icon, title, detail}) =>{

        return(

            <View style={localStyles.featureContainer}>
                <Image source={icon} style={{height:moderateScale(20),width:moderateScale(20)}}/>
                <Text style={{color:'#E5E5E5',marginTop:moderateScale(8),fontWeight:'500'}}>{title}</Text>
                <Text style={localStyles.detailText}>{detail}</Text>
             </View>
        );
    }

    

    useEffect(()=>{
        
        LayoutAnimation.configureNext({
            duration: 900,
            create: {type: 'easeIn', property: 'opacity'},
            update: {type: 'spring', springDamping: 0.3},
        });

    },[])
  return (
    <View style={localStyles.container}>
        
        <View style={localStyles.headingContainer}>
            <Text style={localStyles.headingText}>Welcome to </Text>
            <View style={{alignItems:'flex-start'}}>
                <View style={{marginLeft:moderateScale(-5)}}>
                    <MaskedView
                    style={{ flexDirection: 'row', width: '100%',height:moderateScale(100) }}
                    maskElement={
                    <View
                        style={{
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <Text
                        style={{
                            fontSize: 56,
                            color: 'black',
                            fontWeight: 'bold'
                        }}
                        >
                            <Typewriter text= "LegalGPT"/>
                        </Text>
                    </View>
                    }
                >
                    <LinearGradient
                    colors={ ['#008080','#009880','#00B780']}
                    style={{ height:'100%',flex:1}}
                    />
                </MaskedView>
                </View>
               
                
            </View>
        </View>

        <View style={{alignItems:'center',marginTop:moderateScale(6)}}>
            <Text style={{color:'#E5E5E5',fontSize:moderateScale(13)}}>The power of AI at your Legal service</Text>
        </View>

        <Feature icon={gptGavelIcon} title='Legal Perspectives' detail='Acquire invaluable legal perspectives on any scenario.'/>
        <Feature icon={gptSupportIcon} title='Tailored Support' detail='Obtain legal insights tailored to your specific circumstances.'/>
        <Feature icon={gptDownloadIcon} title='Case Retrieval' detail='Access highly contextual and relevant cases with just a single click.'/>
    </View> 
  )
}

const localStyles= StyleSheet.create({

    container: {
        flexDirection:'column',
        alignItems:'center',
        marginVertical:moderateScale(5),
        marginTop:moderateScale(0),
        justifyContent:'center'
    },
    featureContainer: {
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(45)
    },
    detailText: {
        color:'#E5E5E5',
        marginTop:moderateScale(4),
        fontSize:moderateScale(12),
        maxWidth:moderateScale(180),
        textAlign:'center'
    },
    headingContainer: {
        flexDirection:'column',
        alignItems:'center',
        marginTop:moderateScale(0),
    },
    headingText: { 
        color:'#E5E5E5',
        fontSize:moderateScale(45),
        fontWeight:'500',
        textAlign:'center'
    },
    subHeadingImage: {
        position:'absolute',
        width:moderateScale(359),
        height:moderateScale(72),
        
    },
    subHeadingText: { 
        color:'#E5E5E5',
        fontSize:moderateScale(56),
        fontWeight:'500',
        zIndex:2,
        marginLeft:moderateScale(10)
    },
    titleBackgroundBar:{
        height:moderateScale(75),
        width:moderateScale(3),
        backgroundColor:'#008080',
        position:'absolute'
    }
})