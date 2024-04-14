import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import  ShimmerPlaceHolder  from 'react-native-shimmer-placeholder'
import { moderateScale } from '../styles/mixins';

const ProfileShimmerUI = () => {
    return (
        <View style={{paddingHorizontal:moderateScale(20), alignItems:'center'}}>

            <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={localStyles.shimmerStyle} shimmerStyle={{borderRadius:50}} height={100} width={100}
            LinearGradient={LinearGradient}/>

            <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={localStyles.shimmerStyle} shimmerStyle={{borderRadius:3}} height={23} width={170}
            LinearGradient={LinearGradient}/>

            <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={localStyles.shimmerStyle} shimmerStyle={{borderRadius:3}} height={18} width={170}
            LinearGradient={LinearGradient}/>
            
            <View style={{marginTop:18}}>
                <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={[localStyles.shimmerStyle,{marginTop:10}]} shimmerStyle={{borderRadius:3}} height={45} width={moderateScale(340)}
                LinearGradient={LinearGradient}/>

                <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={[localStyles.shimmerStyle,{marginTop:20}]} shimmerStyle={{borderRadius:3}} height={45} width={moderateScale(340)}
                 LinearGradient={LinearGradient}/>

                <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={[localStyles.shimmerStyle,{marginTop:20}]} shimmerStyle={{borderRadius:3}} height={45} width={moderateScale(340)}
                LinearGradient={LinearGradient}/>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({

    shimmerStyle : {
        backgroundColor: '#3F3F3F',
        overflow: 'hidden',
        marginVertical:moderateScale(10)
    },

})

export default ProfileShimmerUI;
