import { View, Text, ScrollView, Touchable, TouchableOpacity,Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import NewsItem from '../../../components/NewsItem';
import data from '../../../data/dummy'
import styles from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import callHistory from '../../../data/callLog'
import CallListItem from '../../../components/CallListItem'
import { horizontalScale, moderateScale, verticalScale } from '../../../styles/mixins'

const ContactList = () => {
    // const navigation = useNavigation();
 
    const [filter, setFilter] = useState('All')
    const [callData, setCallData] = useState(callHistory)
  
    return (
      <View style={[styles.container,]}>
        <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
            <Image  
              source={require('../../../assets/app-icon.png')}
              style={[styles.logoStyle,{marginTop: verticalScale(30)}]} 
            />
        </View>

        <View style={[styles.alignViewCenter, styles.alignItemsLeft]}>
          <Text style={[styles.textBlack, {fontWeight:'500',fontSize:moderateScale(30)}]}> Recent calls </Text>
        </View>
       
          <ScrollView style={{paddingHorizontal:moderateScale(20)}}>
            {callData.map((data, index)=>(
              <CallListItem key={index} data={data}/>
            ))}
          </ScrollView>
       
        {/* missed call filter logic */}  
      </View>
  )
}

export default ContactList