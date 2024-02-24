 import 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../user/Onboarding';
import NewsScreen from '../user/NewsScreen';
// import LegalGPTScreen from '../user/LegalGPTScreen';
import LegalGPTScreen from '../user/LegalGPTScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeSelected from '../../assets/tab-home-selected.png'
import HomeUnSelected from '../../assets/tab-home-unselected.png'
import NewsUnSelected from '../../assets/news-icon-unselected.png'
import NewsSelected from '../../assets/news-icon-selected.png'
import CallUnselected from '../../assets/CallUnselected.png'
import CallSelected from '../../assets/CallSelected.png'
import ProfileUnSelected from '../../assets/profile-icon-unselected.png'
import ProfileSelected from '../../assets/profile-icon-selected.png'
import SignupUser from '../AuthFlow/SignupUser';
import UserOnboarding from '../user/Onboarding';
import AuthFlow from '../AuthFlow/AuthFlow';
import styles from '../../styles';
import MessageScreen from '../user/MessageScreen';
import ChatWindow from '../user/MessageScreen/ChatWindow';
import ProfileScreen from '../user/ProfileScreen';
import NewsDetail from '../user/NewsScreen/NewsDetail';
import CallLogScreen from '../user/CallLog';
import ContactList from '../user/Onboarding/ContactList';
import InitialLandingScreen from './InitialLandingScreen';
import AddGigsScreen from '../user/AddGigsScreen';
import ExpandedNewsScreen from '../ExpandedNewsScreen';
import EditProfile from '../user/ProfileScreen/EditProfile';
import CustomDrawer from '../../components/CustonDrawer';
import LawerListing from '../user/LawyerListingScreen';
import LawyerProfile from '../user/LawyerListingScreen/LawyerProfile';
import PostDetail from '../user/ProfileScreen/PostDetail';
const UserCall = createNativeStackNavigator();
const Root = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Tab2 = createBottomTabNavigator();
const News = createNativeStackNavigator();
const UserNews = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function USerCallLog(){
  return(
    <UserCall.Navigator initialRouteName='UserOnboarding' screenOptions={{headerShown: false}}>
      <UserCall.Screen
        component={UserOnboarding} name="UserOnboarding" 
      />
      <UserCall.Screen
        component={CallLogScreen} name="UserCallLogScreen" 
      />
    </UserCall.Navigator>
  )
}

function UserNewsFlow(){
  return(
    <UserNews.Navigator screenOptions={{headerShown: false}}>
        <UserNews.Screen component={UserOnboarding} name="UserOnboarding"/>
        <UserNews.Screen component={NewsScreen} name="NewsScreen" />
    </UserNews.Navigator>
  )
}

// Client App flow

function ClientTabNavigator  () {

  return(
    <Tab.Navigator 
      initialRouteName='NewsFlow'
      screenOptions={
        {
          headerShown: false,
          tabBarLabel: "",
          tabBarHideOnKeyboard: true,
          tabBarStyle:{
            backgroundColor: '#8940FF',
            borderTopWidth: 0,
          },
          
          tabBarIcon: ({focused}) =>{
            return(
              focused ? (<Image 
                source={HomeSelected} 
                style={[styles.iconFocus,{marginTop: 10}]}
                />) : (
                <Image 
                  source={HomeUnSelected} 
                  style={styles.iconUnFocus} 
                />)
              
            )
          }
        }
      }
    >
      <Tab.Screen
        component={NewsFlow} 
        name="News"
        options={
          {
            headerShown: false,
            tabBarLabel: "",
            tabBarStyle:{
              backgroundColor: '#8940FF',
              borderTopWidth: 0,
            },
            tabBarIcon: ({focused}) =>{
              return(
                focused ? (<Image 
                  source={HomeSelected} 
                  style={[styles.iconFocus,{marginTop: 10}]}
                  />) : (
                  <Image 
                    source={HomeUnSelected} 
                    style={styles.iconUnFocus} 
                  />)
                
              )
            }
          }
        }
        
      />
      <Tab.Screen 
        component={NewsScreen} 
        name="NewsScreen" 
        options={
          {
            headerShown: false,
            tabBarLabel: "",
            tabBarStyle:{
              backgroundColor: '#8940FF',
              borderTopWidth: 0,
            },
            tabBarIcon: ({focused}) =>{
              return(
                focused ? (<Image 
                  source={NewsSelected} 
                  style={[styles.iconFocus,{marginTop: 10}]}
                  />) : (
                  <Image 
                    source={NewsUnSelected} 
                    style={styles.iconUnFocus} 
                  />)
                
              )
            }
          }
        }
      />
      <Tab.Screen 
        component={ContactList} 
        name="ContactList" 
        options={
          {
            headerShown: false,
            tabBarLabel: "",
            tabBarStyle:{
              backgroundColor: '#8940FF',
              borderTopWidth: 0,
            },
            tabBarIcon: ({focused}) =>{
              return(
                focused ? (<Image 
                  source={CallSelected} 
                  style={[styles.iconFocus,{marginTop: 10,}]}
                  />) : (
                  <Image 
                    source={CallUnselected} 
                    style={[styles.iconUnFocus,]} 
                  />)
                
              )
            }
          }
        }
      />
      <Tab.Screen 
        component={ProfileScreen} 
        name="ProfileScreen" 
        options={
          {
            headerShown: false,
            tabBarLabel: "",
            tabBarStyle:{
              backgroundColor: '#8940FF',
              borderTopWidth: 0,
            },
            tabBarIcon: ({focused}) =>{
              return(
                focused ? (<Image 
                  source={ProfileSelected} 
                  style={[styles.iconFocus,{marginTop: 10}]}
                  />) : (
                  <Image 
                    source={ProfileUnSelected} 
                    style={styles.iconUnFocus} 
                  />)
                
              )
            }
          }
        }
      />
    </Tab.Navigator>
  )

}

function UserFlow(){
  
  return(
    <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={(props) => <CustomDrawer {...props}/>}>
     <Drawer.Screen 
        component={ClientTabNavigator} name="Home" options={{headerShown:false}}/>
        <Drawer.Screen component={LegalGPTScreen} name='Legal GPT' options={{headerShown:false}}/>
        <Drawer.Screen component={NewsScreen} name="News" options={{headerShown:false}}/>
        <Drawer.Screen component={EditProfile} name='EditProfile' />
        <Drawer.Screen component={AddGigsScreen} name='AddGigsScreen' />
        <Drawer.Screen component={PostDetail} name='PostDetail' />
        <Drawer.Screen component={ChatWindow} name='ChatWindow' options={{headerShown:false}}/>
    </Drawer.Navigator>
    
  )
}



function NewsFlow(){
  return(
    <News.Navigator initialRouteName='OnboardingSnippet' screenOptions={{headerShown: false}}>
      <News.Screen component={Onboarding} name="OnboardingSnippet" />
      <News.Screen component={NewsScreen} name="NewsScreen" />
      <News.Screen component={LawerListing} name="LawyerListing" />
      <News.Screen component={LawyerProfile} name='LawyerProfile' />
      <News.Screen component={MessageScreen}
      name='MessageScreen' />
      <News.Screen component={NewsDetail} name='NewsDetail' />
    </News.Navigator>
)}

function SignupFlow  ()  {

  return(

    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen component={AuthFlow} name="Auth" />   
      <Stack.Screen component={SignupUser} name="SignupUser"/>
      <AppStack.Screen component={UserFlow} name= "UserFlow" />
      
    </Stack.Navigator>
  )

 
}

function AppFlow () {

  return (
    <AppStack.Navigator screenOptions={{headerShown:false}}>
      <AppStack.Screen  component={InitialLandingScreen} name='InitialLandingScreen'/>
      <AppStack.Screen component={SignupFlow} name='SignupFlow' />
      <AppStack.Screen component={UserFlow} name='UserFlow' />

    </AppStack.Navigator>
  )
}
function Base() {
    return (
       <NavigationContainer>
         <Root.Navigator screenOptions={{ headerShown: false }}>
          <Root.Screen component={AppFlow} name="AppFlow" />
         {/* <Root.Screen component={ExpandedNewsScreen} name="ExpandedNewsScreen" /> */}
         </Root.Navigator>
       </NavigationContainer>
    );
   }

export default Base