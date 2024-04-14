import {connect,useSelector} from 'react-redux';
import { getTokens } from '../../actions/legalGPT';
import { useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple'
import { moderateScale } from '../../styles/mixins';
import userStarIcon from '../../assets/userStarIcon.png';
import tokenIcon from '../../assets/poker_chip.png';
import tealBackground from '../../assets/tealBackground.png';
import {useNavigation} from '@react-navigation/native'
const TokenComponent = (props) => {

    const navigation = useNavigation();
    const botLoader = useSelector(state => state.variables.botLoader);
    const jwtToken = useSelector(state => state.variables.jwtToken);
    const gptTokens = useSelector(state => state.variables.gptTokens);
    const {plan, token_used, tokens_withoutAds, tokens_withAds} = gptTokens;
    console.log('gptTokens',gptTokens);
    console.log(jwtToken,plan, token_used, tokens_withoutAds, tokens_withAds);
    
    useEffect(() => {
        props.getTokens()
    },[botLoader])

    const Shimmer = ({height,width}) =>{
        return(
            <ShimmerPlaceHolder 
                shimmerColors={['#424242', '#ffffff20','#424242']} 
                style={localStyles.shimmerStyle} 
                shimmerStyle={{borderRadius:3}} 
                height={height} width={width}
                LinearGradient={LinearGradient}
            />
        )
    }
    
    return(
        <View style={localStyles.container}>
           
            <View>
            
                <View style={{flexDirection:'row'}}>
                    <View style={{height:moderateScale(40),width:moderateScale(40),backgroundColor:'#008080',borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                        <Image source={userStarIcon} style={{width:moderateScale(16),height:moderateScale(16)}}/>
                    </View>
                    {jwtToken == '' ? 
                    <View style={{marginLeft:10}}>
                        <Shimmer width={80} height={13} />
                        <Shimmer width={100} height={13} />
                        <Shimmer width={100} height={13} />                      
                    </View>
                    :
                    <View style={{marginLeft:10}}>
                        <Text style={{color:'white',fontSize:16}}>Guest</Text>
                        <Text style={{color:'#e5e5e540'}}>Free account</Text>
                        <View style={{flexDirection:'row',marginTop:moderateScale(9),}}>
                            <Image source={tokenIcon} style={{height:moderateScale(20),width:moderateScale(20),marginRight:moderateScale(5)}}/>
                            <Text style={{color:'white'}}>{token_used}/100</Text>
                        </View>
                    </View>
                   }

                </View>
            </View> 
            {/* <LinearGradient
                colors={['#008080', '#006666']}
                style={localStyles.newChatbtn}
                
                > */}
                    <ImageBackground source={tealBackground} resizeMode='cover' style={localStyles.newChatbtn}>
                    <Ripple 
                    style={localStyles.newChatRipple}
                    onPress={() => navigation.navigate('WebScreen')} 
                    rippleColor='white'
                    rippleDuration={1000}
                    rippleSize={1000}
                    >
                    <Text style={{color:'white',fontSize:16}}>Watch ad</Text>
                    </Ripple>
                    </ImageBackground>
                {/* </LinearGradient> */}
        </View>

    );
}

const localStyles = StyleSheet.create({
    
    newChatRipple :{
        flex:1,
        flexDirection:'row',
        paddingVertical:moderateScale(12),
        // paddingLeft:moderateScale(12),
        // paddingRight:moderateScale(50),
        justifyContent:'center'
      },
      newChatbtn: {
      
        flexDirection:'row', 
        backgroundColor:'#8940FF60',
        marginHorizontal:moderateScale(0),
        borderRadius:10,
        marginVertical:moderateScale(16),
        overflow:'hidden',
      },
    shimmerStyle : {
        backgroundColor: '#3F3F3F',
        overflow: 'hidden',
        marginBottom:moderateScale(12)
    },
    container : {

        paddingHorizontal:moderateScale(20),
        paddingTop: moderateScale(20),
        backgroundColor: '#ffffff05',
        borderRadius:10,
        margin:moderateScale(16)
    },
    text :{
        color:'grey',
        marginVertical: moderateScale(3),
        fontSize:moderateScale(18)
    }

})

export default connect(null,{

    getTokens

})(TokenComponent)
