import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../styles'
import CallLogoBlack from '../assets/call-icon-black.png'
import CallIcon from '../assets/CallIcon.png'
import IncomingCall from '../assets/incoming-call.png';
import OutgoingCall from '../assets/outgoing-call.png';
import IncomingCallMissed from '../assets/incoming-call-missed.png';
import { moderateScale, verticalScale } from '../styles/mixins'

const CallListItem = ({index,data}) => {
  return (
    <View style={[ {height: moderateScale(56),  marginVertical: verticalScale(10),borderBottomWidth:1,borderColor:'#0f0f0f10',paddingVertical:10,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}]}>
      <View style={[styles.alignViaRow, styles.alignViewCenter, styles.alignItemsCenter]}>
        {/* here an image */}
        <Image
            src={data.imageUri}
            style={styles.callImage}
        />
        {/* this view is for name */}
        <TouchableOpacity style={[styles.alignViewCenter, styles.alignItemsCenter]}>
            {(data.direction === 0 && data.answered === 0) ? (
                <Text style={styles.callNameRed}>{data.name}</Text>):(
                    <Text style={styles.callName}>{data.name}</Text>
                )}
            <View style={[styles.alignViaRow, styles.alignItemsCenter, styles.alignViewCenter]}>
                {/* here an image */}
                {/* <Image 
                    source={CallLogoBlack}
                    style={styles.miniCallIcon}
                /> */}
                {data.direction === 1 ? (
                     <Image 
                     source={OutgoingCall}
                     style={styles.miniCallIcon}
                 />
                ) : (data.answered === 1?
                    <Image 
                    source={IncomingCall}
                    style={styles.miniCallIcon}
                    />
                    : <Image 
                        source={IncomingCallMissed}
                        style={styles.miniCallIcon}
                        />
                    )
                }
                
                {data.answered === 1 ? (
                    <Text style={styles.callDirection}>
                        {data.date}, {data.time}
                    </Text>
                ) : (
                    <Text style={styles.callDirection}>
                        incoming
                    </Text>
                )}
            </View>
        </TouchableOpacity>

      </View>

      <View style={[styles.alignViaRow, styles.alignItemsCenter, styles.alignViewCenter]}>
        {/* date */}
        {/* <Text style={styles.callDate}>
         {data.date}
        </Text> */}
        {/* info button */}
        <TouchableOpacity>
            <Image  
                source={CallIcon}
                style={{height:moderateScale(30),width:moderateScale(30)}}
            />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CallListItem