import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import styles from '../../../styles'
import Background from '../../../assets/background.jpg'
import YellowStar from '../../../assets/YellowStar.png';
import PieChart from 'react-native-pie-chart'
// import Back from '../../../assets/back-icon.png'
import UserIcon from '../../../assets/userIcon.png';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../assets/back-button.png'
import { moderateScale } from '../../../styles/mixins'
import {useSelector} from 'react-redux'
const ProfileScreen = () => {

  const navigation = useNavigation();
  const fname = useSelector(state => state.variables.firstName)
  const lname = useSelector(state => state.variables.lastName)
  const photo_url = useSelector(state => state.variables.photo_url)
    posts = [
      {
        title: 'Corporate restructure to protect profit from sale.',
        time : 'Posted 22 hrs ago',
        fees : '30000',
        type : 'Lawyer',
        experience : 'Experienced',
        priceType : 'Fixed price',
        description: 'Description: Protecting profits from business sales, Goal: to safeguard the profits arising from the sales of my digital marketing agen....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

      },{
        title: 'Corporate restructure to protect profit from sale.',
        time : 'Posted 22 hrs ago',
        fees : '30000',
        type : 'Lawyer',
        experience : 'Experienced',
        priceType : 'Fixed price',
        description: 'Description: Protecting profits from business sales, Goal: to safeguard the profits arising from the sales of my digital marketing agen....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

      },
    ]
  

  return (
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={[styles.container,{backgroundColor: 'white',}]}>
      <ImageBackground 
        source={Background}
        resizeMode='cover'
        style={{justifyContent: 'flex-end', alignItems: 'center', height: moderateScale(220)}}
      >
        <TouchableOpacity 
            style={{alignSelf:'flex-start',top:moderateScale(-60),marginLeft:moderateScale(15)}}
            onPress={() => navigation.navigate('LawyerListing')}
            >
                <Image 
                source={BackIcon}
                style={{height:moderateScale(50),width:moderateScale(50)}}
                />
            </TouchableOpacity> 
        <View style={{justifyContent: 'center', alignItems: 'center', height: moderateScale(140), width: moderateScale(140), borderRadius:moderateScale(70), backgroundColor: 'white',marginBottom: -50}}>
          <Image 
              source={UserIcon}
              style={{height: moderateScale(130), width: moderateScale(130), borderRadius: 46}}
          />
        </View>
      </ImageBackground>
      
      {/* name */}
      <View style={{paddingHorizontal:20,marginTop:10}}>
        <View style={[styles.alignViewCenter, styles.alignItemsCenter, {marginTop: 45, width: '100%', flexDirection:'column'}]}>
          <Text style={{fontSize:moderateScale(30),fontWeight:'400',color:'black'}}>{fname == '' ? 'user': `${fname} ${lname}`}</Text>
          <TouchableOpacity
                style={{
                    
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginTop:2,
                    flex:1,   
                    paddingVertical:moderateScale(7),
                    paddingHorizontal:moderateScale(20),
                    backgroundColor:'#8940FF',
                    borderRadius:3,
                    
                    marginHorizontal:moderateScale(20)
                }}
              
                onPress={() => navigation.navigate('EditProfile')}

          >
               <Text style={{color:'white',fontSize:moderateScale(13),fontWeight:'500'
            }}>Edit Profile</Text>
            </TouchableOpacity>
           
        </View>   
        <View style={{borderBottomWidth:1.5,borderColor:'black',paddingVertical:4,marginTop:20}}>
          <Text style={{color:'black',fontWeight:'500'}}>Sign out</Text>
        </View> 

        <View style={{marginTop:moderateScale(25),marginBottom:moderateScale(18)}}>
            <Text style={{fontSize:moderateScale(23),fontWeight:'bold',color:'black'}}>Your posts</Text>
        </View>   

        {posts.map((item) => {
        return(
          
          <View style={{borderWidth:1,borderColor:'#9747FF',marginVertical:moderateScale(5),borderRadius:15,paddingVertical:moderateScale(8),flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',paddingHorizontal:moderateScale(10)}}>
            <Text style={{color:'black',fontSize:moderateScale(24),fontWeight:'500'}}>{item.title}</Text>
            <Text style={{fontSize:moderateScale(15)}}>{item.time}</Text>

            <View style={{flexDirection:'row',width:'100%',marginTop:17,marginBottom:moderateScale(10)}}>
              <View style={{alignItems:'flex-start',marginRight:70}}>
                <Text style={{fontSize:moderateScale(18),color:'black'}}>₹{item.fees}</Text>
                <Text style={{fontSize:moderateScale(15)}}>{item.priceType}</Text>
              </View>

              <View style={{alignItems:'flex-start'}}>
                <Text style={{fontSize:moderateScale(18),color:'black'}}>{item.type}</Text>
                <Text style={{fontSize:moderateScale(15)}}>{item.experience}</Text>
              </View>
            </View>
            
            <Text style={{fontSize:moderateScale(18),color:'black'}} numberOfLines={3}>
              {item.description}
            </Text>
            <TouchableOpacity

                style={{
                    
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginTop:10,
                    flex:1,   
                    paddingVertical:moderateScale(7),
                    paddingHorizontal:moderateScale(20),
                    backgroundColor:'#8940FF',
                    borderRadius:9,
                    width:'90%',
                    alignSelf:'center' 
                }}
              
                onPress={() => navigation.navigate('PostDetail',{post :item})}

          >
               <Text style={{color:'white',fontSize:moderateScale(13),fontWeight:'500'
            }}>See more</Text>
            </TouchableOpacity>
        </View>
        )
      })}   
      </View>

      
      
    </View>
    </ScrollView>
  )
}

export default ProfileScreen