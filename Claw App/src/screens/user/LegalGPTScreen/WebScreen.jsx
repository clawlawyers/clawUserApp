import React, {useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { BackHandler } from 'react-native';
import { moderateScale } from '../../../styles/mixins';
import cancel from '../../../assets/cancel.png';
import {useNavigation, useIsFocused, useFocusEffect} from '@react-navigation/native'
const MyWebComponent = () => {

  const [_timer, _setTimer] = useState(10);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  useFocusEffect(
    React.useCallback(() => {
        const onBackPress = () => {
            return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
);
   
    useEffect(() =>{
      _setTimer(10);
    },[isFocused]);

    useEffect(() => {

      const interval= setInterval(() => {
           if (_timer > 0) {
             _setTimer(_timer - 1);
           }
       }, 1000)
      
       return () => {
           clearInterval(interval)
         };
     }, [_timer]);

  return (
    <View  style={{ flex: 1 }}>
      <Pressable style={{zIndex:2,position:'absolute', top:10,right:10,alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}  disabled={_timer==0? false : true} onPress={() => navigation.navigate('Legal GPT')}>
        { _timer==0 ? <Image source={cancel} style={{width:30,height:30}}/> : <Text style={{textAlign:'center',color:'black',paddingHorizontal:13,paddingTop:4, backgroundColor:'grey',height:moderateScale(30),borderRadius:15}}>Rewards in {_timer}</Text>}</Pressable>
      <WebView source={{ uri: 'https://www.clawlaw.in/' }} style={{ flex: 1, zIndex:1, }} />
      
    </View>
    );
}

export default MyWebComponent;