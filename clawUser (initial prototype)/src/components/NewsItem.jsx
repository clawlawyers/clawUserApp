import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { useNavigation } from '@react-navigation/native';

const NewsItem = ({news, isOnboarding}) => {
  
  const navigation = useNavigation();
  function NewsRedirect(){
    if(isOnboarding)
      navigation.navigate('NewsScreen')
    if(!isOnboarding){
      navigation.navigate('NewsDetail',{news:news});
    }
  
  }
 return (
    <TouchableOpacity style={isOnboarding? [{width:'100%',marginTop:8}]:[styles.newsContainer,{width:'95%',alignSelf:'center'}]} onPress={NewsRedirect}>
      <Image
        style={{height:138,width:'100%',borderRadius:10}}
        source={{uri: news.imageUrl}}
      />
      <View style={[{width:'100%'}]}>
        <Text style={[styles.font_20, styles.font_bold, styles.textBlack]}>{news.title}</Text>
        <Text style={[styles.font_14, styles.marginB_5, styles.textBlack]}>{news.publishedAt.slice(0, news.publishedAt.indexOf('T'))}, {news.publishedAt.slice(news.publishedAt.indexOf('T')+1, news.publishedAt.indexOf('.'))} hours</Text>
      </View>
    </TouchableOpacity>
 );
};


export default NewsItem;