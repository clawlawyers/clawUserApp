import { View, Text, Image, TouchableOpacity, TextInput,KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React,{useEffect, useState} from 'react'
import styles from '../../../styles'
import Robot from '../../../assets/Robot.png';
import NewsItem from '../../../components/NewsItem'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Search from '../../../assets/search-icon.png'
import MenuIcon from '../../../assets/MenuIcon.png'
import MessageIcon from '../../../assets/MessageIcon.png'
import {useSelector, connect} from 'react-redux'
import { BarIndicator } from 'react-native-indicators';
import { moderateScale } from '../../../styles/mixins';
import { getUserProfile } from '../../../actions/userProfile';

const Onboarding = (props) => {

  const state = useSelector(state => state.variables)
//console.log('state variable :',state)
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [_searchString, _setSearchString] = useState('');

  const getNews = async() => {

      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "type": 0
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const res = await fetch("https://claw-backend.onrender.com/api/v1/news", requestOptions);

    const response = await res.json();
    const response2 = response.data;

    let newsData = [];

      response2.map((item) =>{
        newsData.push(item);
      })


      //console.log('News data @@', newsData[0]);
      setNews(newsData[0]);
     // console.log(news);
      setIsLoading(false);
    
  }

  useEffect(() => {

    props.getUserProfile()
    _setSearchString('')
    getNews();
  },[isFocused]);
  
  return (
 
    
      <TouchableWithoutFeedback onPress={e=> Keyboard.dismiss()}>
        <View style={[styles.container, styles.paddingH_20, styles.alignViewCenter, styles.alignItemsCenter,{justifyContent:'flex-start',paddingVertical:5}]}>
          
          {/* connect with bar */}
          <View style={[{marginTop:20,flexDirection:'row',paddingBottom:0,justifyContent:'space-between',width:'100%',marginTop:20}]}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image 
                source={MenuIcon}
                style={{height:moderateScale(38),width:moderateScale(38),marginTop:5}}
                
              />
            </TouchableOpacity>
         
            <Image  
              source={require('../../../assets/app-icon.png')}
              style={[styles.logoStyle,]} 
            />
            <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}
            style={{marginTop:4}}>
              <Image 
                source={MessageIcon}
                style={{height:moderateScale(42),width:moderateScale(42),}}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.alignViaRow, styles.alignItemsCenter, styles.alignViewCenter,styles.searchBar,{width:'100%'}]}>
            <TouchableOpacity >
              <Image 
                  source={Search}
                  style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TextInput
                  placeholder='Search'
                  placeholderTextColor='#999999'
                  style={[ styles.font_20,styles.marginL_10, styles.textBlack, { width: '90%',marginBottom:moderateScale(-2)}]}
                  value={_searchString}
              onChangeText={(search) => _setSearchString(search)}
              onEndEditing={() => navigation.navigate('SearchResultScreen',{ searchString : _searchString})}
            />
                
          </View>


          {/* get advice box */}
          <TouchableOpacity 
            style={[styles.alignViewCenter, styles.alignViewSplit, styles.adviceBox,{backgroundColor:'#8940FF',width:'100%',height:moderateScale(136)}]}
            onPress={()=>navigation.navigate('LawyerListing')}
          >
            <View style={[styles.alignItemsCenter, styles,{flexDirection:'row',justifyContent:'space-between',flex:1,paddingHorizontal:10,}]}>
              <View>
                <Text style={[styles.font_23, styles.font_med,styles.textWhite]}>Connect with a</Text>
                <Text style={[styles.font_23, styles.font_med,styles.textWhite]}>Lawyer</Text>

              </View>
                
            
              <Image 
                source={require('../../../assets/businessMan.png')}
                style={[styles.caOnboardingImage,{height:moderateScale(120),width:moderateScale(120),bottom:moderateScale(-6)}]}
              />
            </View>
          </TouchableOpacity>
                    
          <View style={[styles.alignViewCenter, styles.alignItemsLeft,{justifyContent:'flex-start',alignSelf:'flex-start',width:'100%'}]}>
          <View style={{height:10}}></View>
            <Text style={[styles.textBlack, styles.font_700, styles.font_25,]}> Latest News </Text>
          </View>

       
          {/* News Button */}
          <TouchableOpacity
            onPress={(e)=> navigation.navigate('News')}
            style={[{width:'100%',justifyContent:'center'}]} 
          >
                {isLoading?<View style={{marginTop:moderateScale(80)}}><BarIndicator color='#D9D9D9' size={40}/></View>:<NewsItem news={news} isOnboarding={true} />}
          </TouchableOpacity>

          <TouchableOpacity
                style={{
                    
                    alignItems:'center',
                    justifyContent:'space-between',
                    position:'absolute',             flex:1,
                    flexDirection:'row',      bottom:15,
                    paddingHorizontal:15,
                    paddingVertical:7,
                    right: 18,
                    backgroundColor:'#8940FF',
                    borderRadius:18,
                }}
              
                onPress={() => navigation.navigate('Legal GPT')}

          >
                <Image source={Robot}/><Text style={{color:'white',marginHorizontal:5}}>Ask GPT</Text>
            </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  )
}

export default connect(null,{
  getUserProfile
})(Onboarding)