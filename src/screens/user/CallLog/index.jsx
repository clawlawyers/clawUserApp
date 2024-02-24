import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../../styles/mixins'
import styles from '../../../styles'
import callHistory from '../../../data/callLog'
import CallListItem from '../../../components/CallListItem'

const CallLogScreen = () => {
  const [filter, setFilter] = useState('All')
  const [callData, setCallData] = useState(callHistory)

  return (
    <View style={[styles.container, styles.paddingH_20]}>
      <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
          <Image  
            source={require('../../../assets/app-icon.png')}
            style={[styles.logoStyle,{marginTop: verticalScale(30)}]} 
          />
      </View>

      <View style={[styles.alignViaRow, styles.alignItemsCenter, styles.alignViewCenter, styles.filterToggle, {marginLeft: horizontalScale(105)}]}>
        {/* All selection */}
        <TouchableOpacity 
          style={[styles.allFilterToggle, filter === 'All' ? styles.selectedFilter : styles.unSelectedFilter, styles.alignItemsCenter, styles.alignViewCenter]}
          onPress={e=> setFilter('All')}  
        >
            <Text style={[filter === 'All' ? styles.callFilterSelectedText : styles.callFilterUnSelectedText]}>
              All
            </Text>
        </TouchableOpacity>
        {/* Missed Selection */}
        <TouchableOpacity 
          style={[styles.missedFilterToggle, filter === 'Missed' ? styles.selectedFilter : styles.unSelectedFilter, styles.alignItemsCenter, styles.alignViewCenter]}
          onPress={e=> setFilter('Missed')}  
        >
            <Text style={[filter === 'Missed' ? styles.callFilterSelectedText : styles.callFilterUnSelectedText]}>
              Missed
            </Text>
        </TouchableOpacity>
      </View>

      {filter === 'All' && (
        <ScrollView>
          {callData.map((data, index)=>(
            <CallListItem key={index} data={data}/>
          ))}
        </ScrollView>
      )}

      {/* missed call filter logic */}
      {filter === 'Missed' && (
        <ScrollView>
          {callData.filter(function(callData){
            return callData.direction === 0 && callData.answered === 0
          }).map((data, index)=>(
            <CallListItem key={index} data={data}/>
          ))}
        </ScrollView>
      )} 

    </View>
  )
}

export default CallLogScreen