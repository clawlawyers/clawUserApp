import { View, Text , TouchableOpacity, Image,TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import BackIcon from '../../../assets/back-button.png'
import styles from '../../../styles'
import { moderateScale } from '../../../styles/mixins'
import Search from '../../../assets/search-icon.png'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'

const SearchResultScreen = (props) => {

    const {searchString} = props.route.params;
    console.log('searchString : ',searchString)
    const [_searchString, _setSearchString] = useState('');
    const [_ResultList, _setResultList] = useState([]);
    const navigation = useNavigation();

    const getSearchResults =  async(searchString) => {

        const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      // "search_line": "i got allergy from a product which was labeled safe"
      "search_line": searchString
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
  try
  {  
    const res = await fetch("https://gpt.clawlaw.in/api/v1/search", requestOptions)
    const responseJson = await res.json();
    console.log(' response fetchedddd',responseJson);

    let responseList = []
    responseJson.map((item) => {

      responseList.push(item);

    })

    _setResultList(responseList);
   }catch(err){

    console.log('error ouccured during fetching results',err)
   }
    
    }

    useEffect(()=>{

       const subscriber = getSearchResults(searchString);

       return subscriber;;
    },[])

    console.log('result lists : ',typeof _ResultList)
  return (
    <View style={{paddingHorizontal:moderateScale(20),paddingTop:moderateScale(20)}}>
      <View style={{flexDirection:'row',}}>
        <TouchableOpacity 
          style={[styles.alignItemsLeft, styles.alignViewCenter,]}
          onPress={() => navigation.navigate('OnboardingSnippet')}
        >
          <Image 
            source={BackIcon}
            style={{height:moderateScale(50),width:moderateScale(50)}}
          />
        </TouchableOpacity>
        {/* <View style={[localStyles.searchBar,{flexDirection:'row'}]}>
          <TouchableOpacity >
            <Image 
              source={Search}
              style={styles.searchIcon}
            />
            </TouchableOpacity>
              <TextInput
                placeholder='Search'
                placeholderTextColor='#999999'
                style={[ styles.font_19, styles.textBlack, {marginLeft:4,marginBottom:moderateScale(-2),width:'80%'}]}
                value={_searchString}
                onChangeText={(search) => _setSearchString(search)}
                onEndEditing={(_searchString) => getSearchResults(_searchString)}
              />
                  
        </View> */}
      </View>
      
      <ScrollView style={{marginTop:moderateScale(10)}}>
       {_ResultList.length>0? <View>{_ResultList.map((item) =>{
        return(
          <View style={{borderWidth:1, paddingVertical:moderateScale(10),paddingHorizontal:moderateScale(15),borderRadius:10,marginVertical:moderateScale(8)}}>
          <View><Text style={{color:'black'}}>{item.firstName} {item.lastName}</Text></View>
          <Text style={{color:'grey'}}>{item.state} </Text>
          </View>
        )
       })}</View>: null}
      </ScrollView>
    </View>
  )
}

const localStyles = StyleSheet.create({

  searchBar :{
    paddingHorizontal:moderateScale(5),
    //paddingVertical:moderateScale(5),
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#E4E3E3',
    borderRadius: moderateScale(10),
    height: moderateScale(45),
    marginBottom: moderateScale(10),
    marginLeft:moderateScale(20)
  }
})
export default connect(null,{
  
})(SearchResultScreen)