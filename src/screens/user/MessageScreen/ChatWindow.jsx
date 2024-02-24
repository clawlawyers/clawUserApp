import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image, FlatList, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'

import styles from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../../../assets/leftArrow.png'
import firestore from '@react-native-firebase/firestore';
import GPTSendIcon from '../../../assets/GPTSendIcon.png';
import { moderateScale } from '../../../styles/mixins';
import {useSelector } from 'react-redux';
import userIcon from '../../../assets/userIcon.png'
const ChatWindow = ({route})=> {

    const {firstName,lastName,uid,photo_url} = route.params;
    //console.log(name)
    const navigation = useNavigation();
    const current_uid = useSelector(state => state.variables.uid);

    const [messageList, setMessageList] =useState([]);
    const [messageText, setMessageText] = useState('');
   // console.log(current_uid, uid);

    const sendNewMessage = async() => {
        
        const messageContent = {

        text : messageText,
        sender : current_uid,
        receiver : uid,
        timeStamp: firestore.FieldValue.serverTimestamp(new Date()) 
    }

    console.log(messageContent);
    const res = await firestore().collection('chats').doc(current_uid+uid).collection('messages').add(messageContent);
    //console.log(res);
    await firestore().collection('chats').doc(uid+current_uid).collection('messages').add(messageContent);

    setMessageText('');
    }

    const retreiveMessages = () => {

        const messages = firestore().collection('chats').doc(current_uid+uid).collection('messages').orderBy('timeStamp');
        messages.onSnapshot(querysnapshot => {

            const allmessages = querysnapshot.docs.map(item => {
                return {...item, timeStamp: Date.parse(new Date())}
            })
            setMessageList(allmessages);
            //console.log('messageList',messageList);
        })

    }

    useEffect(() =>{

        const subscriber = retreiveMessages();

        return subscriber;
    },[]);

    return (
        <View style={[styles.alignItemsCenter, styles.alignViewCenter,{backgroundColor:'white',flex:1}]}>
         <View style={[ {width: '100%', flexDirection:'row',backgroundColor:'#F6F6F6',paddingVertical:15},]}>
                <TouchableOpacity 
                  style={[styles.alignItemsLeft, styles.alignViewCenter, {}]}
                  onPress={() => navigation.navigate('MessageScreen')}
                >
                    <Image 
                    source={leftArrow}
                    style={{height:moderateScale(20),width:moderateScale(40),marginRight:moderateScale(10)}}
                    />
                </TouchableOpacity>    
                <Image source={photo_url} style={{height:moderateScale(40),width:moderateScale(40),marginHorizontal:moderateScale(10)}}/>  
                <Text style={{fontWeight:'bold',color:'black',fontSize:15}}>{firstName} {lastName}</Text>      
            </View>
            <FlatList 
                
                style={{paddingHorizontal:20,width:'100%',marginTop:20}}
                data={messageList}
                renderItem={({item}) => (

                    <View style={item._data.sender==current_uid ?
                   [localStyles.messageContainerStyle, {alignSelf:'flex-end',backgroundColor:'#8940FF',}]:
                   [localStyles.messageContainerStyle, {alignSelf:'flex-end',backgroundColor:'black',borderRightWidth:2,borderColor:'black'}]}>

                        <Text style={item._data.sender==current_uid ?
                        {color:'white'}:
                        {color: 'black'}}>
                            {item._data.text}

                        </Text>
                        <Text style={item._data.sender==current_uid ?
                        [localStyles.textTimeStyle,{color:'white',}]:
                        [localStyles.textTimeStyle,{color:'black',}]}>
                       {item._data.timeStamp? (item._data.timeStamp.toDate().getHours()):null}: 
                       {item._data.timeStamp? (item._data.timeStamp.toDate().getMinutes()):(null)}
                        </Text>
                    </View>
                    
                )}
            />
            <View style={{borderWidth:1,borderColor:'#8940FF60',borderRadius:10,flexDirection:'row',height:moderateScale(52),marginHorizontal:moderateScale(10)}}>
              <TextInput placeholder='' style={{width:'83%'}} value={messageText} onChangeText={(message) => setMessageText(message)}/>
              <TouchableOpacity 
                style={{backgroundColor:'#8940FF',width:'10%',justifyContent:'center',alignItems:'center',borderRadius:10,margin:moderateScale(5)}}
                onPress={sendNewMessage}
                >
                <Image source={GPTSendIcon} style={{width:moderateScale(15),height:moderateScale(20)}}/>
              </TouchableOpacity>
            </View>
            
          </View>
      )
}

const localStyles = StyleSheet.create({

    textTimeStyle : {
        fontSize:10,
        alignSelf:'flex-end',
        marginLeft:6
    },
    messageContainerStyle : {
        borderRadius:5,
        paddingVertical:7,
        
        marginVertical:2,
        paddingHorizontal:10,
        flexDirection:'row'
    }
})

export default ChatWindow;