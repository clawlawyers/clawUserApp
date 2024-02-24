import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import styles from '../../../styles'
import Background from '../../../assets/background.jpg'
import {launchImageLibrary} from 'react-native-image-picker';
import mime from 'mime';
import UserIcon from '../../../assets/userIcon.png';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../assets/back-button.png'
import {useSelector, connect} from 'react-redux';
import { moderateScale } from '../../../styles/mixins'
import { updateUserProfile } from '../../../actions/userProfile';
const EditProfile = (props) => {
  
  const navigation = useNavigation();
  const jwtToken = useSelector(state => state.variables.jwtToken);
  const [_firstName, _setFirstName] = useState('')
  const [_lastName, _setLastName] = useState('');
  const [_email, _setEmail] = useState('');
  const [_photo, _setPhoto] = useState({});
  const  [_photoPath, _setPhotoPath] = useState('');
  
    handleChoosePhoto = async() =>{
      const options = {
          
          title: 'Select Image',
          type : 'library',
          options: {
            selectionLimit : 1,
            mediaType : 'photo',
            includeBase64 :false
          },
      }

     
      console.log(Platform.OS);
      const res = await launchImageLibrary(options);
      console.log(res);
      const uriParts = res.assets[0].uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const newImageUri = "file:///" + res.assets[0].uri.split("file:/").join("");
    
      _setPhoto({
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
          uri: newImageUri,
      })
      console.log('_photo',_photo);
    
      _setPhotoPath(res.assets[0].uri);
  }

  const submitProfile = () =>{

    const data = {
        firstName: _firstName,
        lastName : _lastName,
        email : _email,
        photo : _photo,
        jwtToken : jwtToken 
    }

    props.updateUserProfile(data,navigation);

  }
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={[styles.container,{backgroundColor: 'white',}]}>
        <ImageBackground 
          source={Background}
          resizeMode='cover'
          style={{justifyContent: 'flex-end', alignItems: 'center', height: 200}}
        >
          <TouchableOpacity 
        style={{alignSelf:'flex-start',top:moderateScale(-80),marginLeft:moderateScale(15)}}
        onPress={() => navigation.navigate('ProfileScreen')}
        >
            <Image 
            source={BackIcon}
            style={{height:moderateScale(50),width:moderateScale(50)}}
            />
        </TouchableOpacity> 

          <View style={{justifyContent: 'center', alignItems: 'center', height: moderateScale(140), width: moderateScale(140), borderRadius:moderateScale(70), backgroundColor: 'white',marginBottom: -50}}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image 
                  source={_photoPath ==''? UserIcon : {uri:_photoPath}}
                  style={{height: moderateScale(130), width: moderateScale(130), borderRadius: 46}}
              />
      
            </TouchableOpacity>
            </View>
        </ImageBackground>
        
        {/* name */}
        <View style={{paddingHorizontal:20,marginTop:10}}>
          <View style={[styles.alignViewCenter, styles.alignItemsCenter, {marginTop: 40, width: '100%', flexDirection:'row'}]}>
            <Text style={{fontSize:13,fontWeight:'500',color:'black'}}>Change Picture</Text>          
          </View>
        </View> 

      </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              First Name
          </Text>
          <TextInput 
            placeholder='Enter first name...' 
            style={styles2.profileTextInput} 
            value={_firstName}
            onChangeText={(fname) => _setFirstName(fname)}
          />

      </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              Last Name
          </Text>
          <TextInput 
            placeholder='Enter last name...' 
            style={styles2.profileTextInput} 
            value={_lastName}
            onChangeText={(lname) => _setLastName(lname)}
          />

      </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              Email ID
          </Text>
          <TextInput 
            placeholder='example@gmail.com' 
            style={styles2.profileTextInput} 
            value={_email}
            onChangeText={(email) => _setEmail(email)}
          />

      </View>
      
      <TouchableOpacity
        style={{
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:moderateScale(12),
            backgroundColor:'#8940FF',
            borderRadius:10,
            width:'75%',
            alignSelf:'center',
            marginTop:moderateScale(80)
        }}

        onPress={submitProfile}
      >
        <Text 
        style={{color:'white',fontSize:moderateScale(21),fontWeight:'bold'}}>
          Update
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles2 = StyleSheet.create({

    profileTextInput :{

        color: 'black',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#0000001A',
        marginTop:5,
        height:moderateScale(55)
    }
})

export default connect(null, {
  updateUserProfile
})(EditProfile);