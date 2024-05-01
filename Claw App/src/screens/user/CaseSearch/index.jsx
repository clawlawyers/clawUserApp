import React, { useState } from 'react';
import {View, StyleSheet,Text, ScrollView, Image, Pressable, TextInput, ImageBackground, ToastAndroid} from 'react-native';
import { moderateScale } from '../../../styles/mixins';
import {Dropdown} from 'react-native-element-dropdown';
import CalendarPicker from "react-native-calendar-picker";
import chevronBlack from '../../../assets/chevronBlack.png';
import tealBackground from '../../../assets/tealBackground.png';
import searchIcon from '../../../assets/searchIcon.png';
import searchIconTeal from '../../../assets/searchIconTeal.png';
import searchIconWhite from '../../../assets/searchIconWhite.png';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch } from 'react-redux';
import { CASE_SEARCH_URL, changeVariable } from '../../../actions';
import {MaterialIndicator} from 'react-native-indicators';
import Ripple from 'react-native-material-ripple'
import UpgradeModal from '../../../components/Modals/UpgradeModal';
import ReferralModal from '../../../components/Modals/ReferralModal';
import { courtData } from '../../../data/CourtList';

const CaseSearchScreen = () => {

    const jwtToken = useSelector( state => state.variables.jwtToken)
    const [isFocusCourt, setIsFocusCourt] = useState();
    const [court, setCourt] = useState();
    const [driveId, setDriveId] = useState();
    const [fromDate, setFromDate] = useState('01/01/1980');
    const [toDate, setToDate] = useState('04/04/2024');
    const [isWaiting, setIsWaiting] = useState(false);
    const [isFromCalenderVisible,setFromCalender] = useState('none');
    const [isToCalenderVisible,setToCalender] = useState('none');
    const [searchString, setSearchString] = useState('');
    const [caseList, setCaseList] = useState([]);
    const dispatch = useDispatch()
    const upgradeModalVisible = useSelector( state => state.variables.upgradeModalVisible);
    const referralModalVisible = useSelector( state => state.variables.referralModalVisible);
    const token_used = useSelector( state => state.variables.gptTokens.token_used);

    const navigation = useNavigation()
    console.log(isWaiting);
    
    
    const onFromDateChange = (date) => {

        date = new Date(date).toISOString();
        newDate = date.split('T'); 
        newDate = newDate[0].split('-');
        formattedDate = `${newDate[2]}/${newDate[1]}/${newDate[0]}`
        setFromDate(formattedDate);
    }

    const onToDateChange = (date) => {

        date = new Date(date).toISOString();
        newDate = date.split('T');
        newDate = newDate[0].split('-');
        formattedDate = `${newDate[2]}/${newDate[1]}/${newDate[0]}`
        setToDate(formattedDate);
    }

    const showFromCalender = () =>{

        if(isFromCalenderVisible=='none'){
            setFromCalender('block');
        }else{
            setFromCalender('none')
        }
    }
    const showToCalender = () =>{

        if(isToCalenderVisible=='none'){
            setToCalender('block');
        }else{
            setToCalender('none')
        }
    }

    const searchCase = () => {
        
        if(token_used==100){

            dispatch(changeVariable('upgradeModalVisible',true));
            return;
          }
        setCaseList([]);
        setIsWaiting(true);
        const data = JSON.stringify({
            query : searchString,
            startDate : fromDate,
            endDate : toDate,
            courtName : court
        });

        console.log(data)
        const myHeaders = new Headers();
        const bearer_token = 'Bearer ' + jwtToken;
        myHeaders.append("Authorization",bearer_token);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: data,
            redirect: "follow"
          };

          fetch(CASE_SEARCH_URL, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data?.result)
                setCaseList(result?.data?.result);
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show('Something went wrong!',ToastAndroid.SHORT);
            });

            setIsWaiting(false);
    }


    return (
        <View style={localStyles.container}>
            {/* <ScrollView> */}
            
                {/* Court */}
                <View style={localStyles.header}>
                
                    <Text style={localStyles.title}>Court</Text>
                

                <Dropdown
                    style={[localStyles.dropdown, isFocusCourt && { borderColor: '#8940ff' }]}
                    placeholderStyle={localStyles.placeholderStyle}
                    selectedTextStyle={localStyles.selectedTextStyle}
                    itemTextStyle={{color:'black'}}
                    data={courtData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={!isFocusCourt ? 'Select court' : '...'}
                    value={courtData}
                    onFocus={() => (true)}
                    onBlur={() => setIsFocusCourt(false)}
                    onChange={item => {
                        // _setStateId(item.stateId);
                        setCourt(item.name);
                        setDriveId(item.driveId);
                        setIsFocusCourt(false);
                    }}
                />

               
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 {/* fromDate */}
                <View>
                    <Text style={localStyles.title}>From</Text>
                    <View style={localStyles.inputContainer}>
                        <View style={localStyles.dateContainer}>
                            <Text style={localStyles.dateText}>{fromDate}</Text>
                            <Image source={chevronBlack} style={{height:moderateScale(5),width:moderateScale(10)}}/>
                        </View>
                    <Pressable style={localStyles.viewCalender} onPress={showFromCalender}>
                    </Pressable>
                    </View>
                
                    <View style={[localStyles.calenderContainer,{display:isFromCalenderVisible,left:moderateScale(-5)}]}>
                        <CalendarPicker 
                            onDateChange={(date) => {
                                onFromDateChange(date),
                                showFromCalender()
                            }} 
                            textStyle={{color:'white'}}
                            todayBackgroundColor='#589C5F'
                            selectedDayColor='#008080'
                        />
                    </View>
                </View>
                {/* toDate */}
                    <View>
                    <Text style={localStyles.title}>To</Text>
                        <View style={localStyles.inputContainer}>
                            <View style={localStyles.dateContainer}>
                                <Text style={localStyles.dateText}>{toDate}</Text>
                                <Image source={chevronBlack} style={{height:moderateScale(5),width:moderateScale(10)}}/>
                            </View>
                        <Pressable style={{backgroundColor:'transparent',width:'100%',height:moderateScale(53),zIndex:2,position:'absolute'}} onPress={showToCalender}>

                        </Pressable>
                        </View>
                        <View style={[localStyles.calenderContainer,{display:isToCalenderVisible,left:moderateScale(-230),}]}>
                        <CalendarPicker 
                            onDateChange={(date) => {
                                onToDateChange(date),
                                showToCalender()
                            }} 
                            textStyle={{color:'white'}}
                            todayBackgroundColor='#589C5F'
                            selectedDayColor='#008080'
                        />
                    </View>
                    </View>
                    
                </View>
               

                
                <View style={[localStyles.inputContainer,{marginTop:moderateScale(15),flexDirection:'row'}]}>
                    <View style={{borderRadius:20,backgroundColor:'#00808099',padding:moderateScale(8),marginLeft:moderateScale(-13)}}>
                        <Image source={searchIconWhite} style={{height:moderateScale(18),width:moderateScale(20)}}/>
                    </View>
                    <TextInput 
                        style={{width:'90%',marginBottom:moderateScale(-3)}} 
                        placeholder='Search your query' 
                        value={searchString} 
                        onChangeText={(string) => setSearchString(string)}
                        onEndEditing={() => {
                            if(searchString.length>0){
                                searchCase()
                            }
                        } }
                    />
                </View>
                </View>
                <UpgradeModal isVisible={upgradeModalVisible} />
                <ReferralModal isVisible={referralModalVisible}/>
                <View>
                { isWaiting ? <View style={{marginTop:moderateScale(20)}}><MaterialIndicator color='grey' size={40}/></View>:null}
                    <ScrollView style={{maxHeight:moderateScale(500),marginTop:moderateScale(15)}}>

                        { isWaiting ? <View style={{marginTop:moderateScale(20)}}><MaterialIndicator color='grey' size={40}/></View> : 
                        caseList.map((item) => {
                            
                            return(
                                <ImageBackground source={tealBackground} key={item.id} resizeMode='cover' style={localStyles.caseContainer}>
                                    <View style={{width:'85%'}}>
                                        <Text style={localStyles.caseTitle}>{item.title}</Text>
                                        <Text style={localStyles.caseDetail}>{item.date}, {item.court}</Text>
                                        <Text style={{color:'#DBD8D8'}}>Number of citations- {item.numCites}</Text>
                                    
                                    </View>
                                    <Ripple 
                                        rippleColor='white' 
                                        style={localStyles.searchIcon} 
                                        onPress = {() => navigation.navigate('CaseDetail',{driveId : driveId,caseId : item.id})}
                                    >
                                        <Image source={searchIconTeal} style={{height:moderateScale(11),width:moderateScale(13)}}/>
                                    </Ripple>
                                </ImageBackground>
                            )
                        }) 
                        }
                    </ScrollView>
                   
                </View>
            
        </View>
    );
}

const localStyles = StyleSheet.create({

    container:{
        backgroundColor:'#1b202c',
        flex:1,
        // paddingHorizontal:moderateScale(15),
        // 
    },
    header:{

       borderBottomLeftRadius:20,
       borderBottomRightRadius:20,
       paddingHorizontal:moderateScale(15),
        // backgroundColor:'#00333390',
        elevation:3,
        paddingBottom:moderateScale(30),
        paddingTop:moderateScale(30)
    },
    calenderContainer:{
        marginVertical:moderateScale(20),
        marginHorizontal:moderateScale(-5),
        backgroundColor:'#1E1F25',
        borderRadius:10,
        position:'absolute',
        top:moderateScale(70),
        
        zIndex:2,
        elevation:8
    },
    viewCalender:{
        backgroundColor:'transparent',
        width:'100%',
        height:moderateScale(53),
        zIndex:2,
        position:'absolute'
    },
    
    dateText:{
        color:'black',
        fontSize:moderateScale(16),
        fontWeight:'500',
        marginRight:moderateScale(10)
    },
    dateContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:moderateScale(8)
    },
    caseContainer:{
        
        marginVertical:moderateScale(5),
        marginHorizontal:moderateScale(10),
        borderRadius:10,
        overflow:'hidden',
        paddingHorizontal:moderateScale(10),
        paddingVertical:moderateScale(15),
        flexDirection:'row',
        alignItems:'center',
        paddingRight:moderateScale(10)
    },
    caseTitle:{

        color:'white',
        fontSize:moderateScale(17),
        fontWeight:'500',
        marginBottom:moderateScale(5)
    },
    caseDetail:{
        color:'#DBD8D8'
    },
    title:{
        color: 'white',
        fontSize:moderateScale(22),
        fontWeight:'500'
    },
    searchIcon:{
        backgroundColor:'white',
        padding:moderateScale(15),
        borderRadius:25,
        borderColor:'#00808080',
        borderWidth:2
    },
    dropdown: {
        height: 40,
        // width:'50%',
        borderColor: '#00808070',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginTop:moderateScale(0),
        marginBottom:moderateScale(15),
        color:'black',
        backgroundColor:'white',
        elevation:4
        // borderBottomRightRadius:10,
        // borderBottomLeftRadius:10
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color:'white'
      },
      placeholderStyle: {
        fontSize: 15,
        color:'grey'
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'black'
      },
      inputContainer:{

        height:moderateScale(45),
        backgroundColor:'white',
        borderRadius:20,
        borderWidth:2,
        borderColor:'#00808070',
        alignItems:'center',
        paddingHorizontal:moderateScale(20),
        justifyContent:'space-between',
        elevation:4
      }
})

export default CaseSearchScreen;
