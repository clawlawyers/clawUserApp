import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import  ShimmerPlaceHolder  from 'react-native-shimmer-placeholder'
import { moderateScale } from '../../styles/mixins';

const DrawerShimmerUI = () => {
    return (
        <View style={{paddingLeft:moderateScale(22)}}>
            <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={localStyles.shimmerStyle} shimmerStyle={{borderRadius:3}} height={20}
            LinearGradient={LinearGradient}/>
            <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={localStyles.shimmerStyle} shimmerStyle={{borderRadius:3}} height={20}
            LinearGradient={LinearGradient}/>
            <ShimmerPlaceHolder shimmerColors={['#424242', '#ffffff20','#424242']} style={localStyles.shimmerStyle} shimmerStyle={{borderRadius:3}} height={20}
            LinearGradient={LinearGradient}/>
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

export default DrawerShimmerUI;
