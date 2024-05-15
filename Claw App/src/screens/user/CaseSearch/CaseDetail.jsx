import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ToastAndroid,Text, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { CASE_RETREIVAL_URL } from '../../../actions';
import {useSelector} from 'react-redux'
import BackIcon from '../../../assets/back-button.png';
import { useNavigation} from '@react-navigation/native'
import { moderateScale } from '../../../styles/mixins';
import {MaterialIndicator} from 'react-native-indicators';
import { WebView } from 'react-native-webview';
import warning from '../../../assets/warning.gif';
import FastImage from 'react-native-fast-image';
const CaseDetail = ({route}) => {

    const {driveId,caseId} = route.params;
    const jwtToken = useSelector( state =>  state.variables.jwtToken);
    const [caseDetail, setCaseDetail] = useState(''); 
    const navigation = useNavigation();
    const [status, setStatus] = useState('success');
    console.log(driveId,caseId)

    const caseDetailHTML = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width"><style>
    body { font-size: 110%; word-wrap: break-word; overflow-wrap: break-word; color:white; background-color:#1b202c; font-family: times; }
</style></head><body>${caseDetail}</body></html>`;
    const getCaseDetails = async() => {

        const BearerToken = 'Bearer ' + jwtToken;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json');
        myHeaders.append('Authorization',BearerToken);

        const url = `${CASE_RETREIVAL_URL}${driveId}/${caseId}`;
        console.log(url)
        const requestOptions = {
            method : 'GET',
            headers : myHeaders
        }
        try{
            const response = await fetch( url,requestOptions);
            const responseJSON = await response.json();
            console.log(responseJSON);
            if(responseJSON.success)
            {
                setCaseDetail(responseJSON.data.content);

            }
            else{
                setStatus('failed');
                // ToastAndroid.show('Something went wrong!',ToastAndroid.SHORT);
                setTimeout(()=> navigation.navigate('CaseSearchScreen'),2000)
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
            {status=='success'?
            <View>
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
            </View>
            :
            <View style={{alignSelf:'center',height:'73%',justifyContent:'center',alignItems:'center'}}>
                <FastImage source={warning} style={{height:moderateScale(100),width:moderateScale(100)}}/>
                <Text style={{color:'white',fontSize:moderateScale(22),textAlign:'center',fontWeight:'400',marginTop:moderateScale(20)}}>{`Something went wrong!\nPlease try again later.`}</Text>
            </View>
            }
           
                        
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
