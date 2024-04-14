import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ToastAndroid,Text, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { CASE_RETREIVAL_URL } from '../../../actions';
import {useSelector} from 'react-redux'
import BackIcon from '../../../assets/back-button.png';
import { useNavigation} from '@react-navigation/native'
import { moderateScale } from '../../../styles/mixins';
import {MaterialIndicator} from 'react-native-indicators';import { WebView } from 'react-native-webview';
const CaseDetail = ({route}) => {

    const {caseId} = route.params;
    const jwtToken = useSelector( state =>  state.variables.jwtToken);
    const [caseDetail, setCaseDetail] = useState(''); 
    const navigation = useNavigation()
    console.log(caseId)

    const caseDetailHTML = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width"><style>
    body { font-size: 110%; word-wrap: break-word; overflow-wrap: break-word; color:white; background-color:#1b202c; font-family: times; }
</style></head><body>${caseDetail}</body></html>`;
    const getCaseDetails = async() => {

        console.log('getcase');
        const BearerToken = 'Bearer ' + jwtToken;
        console.log('getcase1');
        const myHeaders = new Headers();
        console.log('getcase2');
        myHeaders.append('Content-Type','application/json');
        console.log('getcase3');

        myHeaders.append('Authorization',BearerToken);
        console.log('getcase4');

        const url = CASE_RETREIVAL_URL+caseId;
        console.log('getcase5');

        const requestOptions = {
            method : 'GET',
            headers : myHeaders
        }
        console.log(url)
        try{
            const response = await fetch( url,requestOptions);
            console.log(response);
            const responseJSON = await response.json();
            console.log(responseJSON);
            if(responseJSON.success)
            {
                setCaseDetail(responseJSON.data.content);
            }
            else{
                ToastAndroid.show('Something went wrong!',ToastAndroid.SHORT);
            }
            
        }catch(err){

            console.log('error')
        }
        

    }

    useEffect(() => {
        console.log('useeffect')
        getCaseDetails();
    },[caseId])

    return (
        <View style={localStyles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('CaseSearchScreen')} style={{}}>
                <Image source={BackIcon} style={{width:moderateScale(40),height:moderateScale(30),marginBottom:moderateScale(20)}}/>
            </TouchableOpacity>
            {caseDetail.length>0? <WebView
                originWhitelist={['*']}
                source={{ html: caseDetailHTML }}
                style={{ flex: 1 }}
                font-size={25}
            /> :
            <View style={{alignSelf:'center',marginTop:moderateScale(-150)}}>
                <MaterialIndicator color='white'/>
            </View>
            }
            
            {/* <Text style={{color:'white'}}><HTML source={{ html: caseDetail }} ignoredDomTags={["center"]} contentWidth={Dimensions.get('window').width}/></Text>
            
            <ScrollView style={{width:Dimensions.get('window').width}}>
                
                <Text style={{color:'white'}}>{caseDetail}</Text>
            </ScrollView> */}
            
        </View>
    );
}

const localStyles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#1b202c',
        paddingHorizontal:moderateScale(15),
        paddingTop:moderateScale(20)
    }
})

export default CaseDetail;
