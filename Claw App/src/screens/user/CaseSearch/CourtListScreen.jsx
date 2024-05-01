import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { moderateScale } from "../../../styles/mixins";
import BackIcon from '../../../assets/back-button.png';
import downArrow from '../../../assets/downArrow.png';
import courtList from '../../../data/CourtList'
import { useNavigation } from "@react-navigation/native";
const CourtListScreen = () => {

    const navigation = useNavigation();
    const width = Dimensions.get('screen').width;
    return(
        <View style= {styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Legal GPT')} >
                <Image source={BackIcon} style={styles.backbtn}/>
            </TouchableOpacity>
            <ScrollView style={[styles.courtContainer,{width}]} >
                <ScrollView horizontal={true} style={{width:width-25, }} >

                <View style={{flexDirection:'column'}}>
                    
                    <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'white'}}>
                        < View style={[styles.headingView,{width:moderateScale(249)}]}>
                            <Text style={styles.columnHeadingText}>States</Text>
                            <Image source={downArrow} style={styles.arrow}/>
                        </View>
                        < View style={styles.headingView}>
                            <Text style={styles.columnHeadingText}>Scraped Years/ Available Years</Text>
                            <Image source={downArrow} style={styles.arrow}/>
                        </View>
                    </View>
                        
                        {courtList.map((item) => {

                            return(
                                <View style={{borderBottomWidth:1,borderColor:'white',flexDirection:'row'}}>
                                    <View style={[styles.columnText,{width:moderateScale(249),}]}>                                        
                                        <Text style={{color: 'white',fontSize:moderateScale(12)}}>{item.courtName}</Text>
                                    </View>
                                    <View style={[styles.columnText,{width:moderateScale(325)}]}>
                                        <Text style={{color:'white',fontSize:moderateScale(12)}}>{item.period}</Text>
                                    </View>
                                </View>
                            )
                        })}
                </View>
                
                </ScrollView>
            </ScrollView>

        </View>
    )

}

const styles = StyleSheet.create({

    container:{
        backgroundColor:'#1b202c',
        flex:1,
        paddingHorizontal:moderateScale(30),
        paddingVertical:moderateScale(20)
    },
    courtContainer:{
        backgroundColor:'#008080',
        height:moderateScale(500),
        width:moderateScale(300),
    },
    backbtn:{
        width:moderateScale(40),
        height:moderateScale(30),
        marginBottom:moderateScale(20)
    },
    headingView:{
        flexDirection:'row',
        paddingVertical:moderateScale(12),
        paddingLeft:moderateScale(24), 
        alignItems:'center'
    },
    columnHeadingText:{
        color:'white',
        fontSize:moderateScale(12),
        fontWeight:'500'
    },
    arrow:{
        height:moderateScale(10),
        width:moderateScale(10),
        marginLeft:moderateScale(5)
    },
    columnText:{
        paddingVertical:moderateScale(12),
        paddingLeft:moderateScale(24)
    }
    
    
    
})

export default CourtListScreen;