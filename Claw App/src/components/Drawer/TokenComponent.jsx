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
    const phone_no = useSelector(state => state.variables.phone_no);
    const gptTokens = useSelector(state => state.variables.gptTokens);
    const {plan, token_used} = gptTokens;
    const planCategory = plan.split('_');
    console.log('gptTokens',gptTokens);
    console.log(jwtToken,plan, token_used,phone_no, planCategory);
    
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
                    <View style={localStyles.userIcon}>
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
                        <Text style={{color:'white',fontSize:16}}>+91 {phone_no}</Text>
                        <Text style={{color:'#e5e5e540'}}>Plan - {planCategory[0]}</Text>
                        <View style={{flexDirection:'row',marginTop:moderateScale(9),}}>
                            <Image source={tokenIcon} style={localStyles.tokenIcon}/>
                            <Text style={{color:'white'}}>{token_used}/{planCategory[1]}</Text>
                        </View>
                    </View>
                   }

                </View>
            </View> 
           
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
    },
    userIcon: {
        height:moderateScale(40),
        width:moderateScale(40),
        backgroundColor:'#008080',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    tokenIcon: {
        height:moderateScale(20),
        width:moderateScale(20),
        marginRight:moderateScale(5)
    }

})

export default connect(null,{

    getTokens

})(TokenComponent)
