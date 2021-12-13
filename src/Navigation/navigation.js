import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedScreen from '../screens/GetStartedScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountScreen from '../screens/AccountScreen';
import TeamScreen from '../screens/TeamScreens';
import LoginScreen from '../screens/LoginScreen';
import ForgotPwdScreen from '../screens/ForgotPwdScreen';
import OTPScreen from '../screens/OTPScreen';
import ChangePwdScreen from '../screens/ChangePwdScreen';
import ProfilePicScreen from '../screens/ProfilePicScreen';
import BioDataScreen from '../screens/BioDataScreen';
import ProfileSuccess from '../screens/ProfileSuccess';
import NotificationScreen from '../screens/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';
import CreateChatScreen from '../screens/CreateChatScreen';
import GroupScreen1 from '../screens/GroupScreen1'
import ChatScreen2 from "../screens/ChatScreen2";
import Bio from '../screens/Bio'


const Navigator = () =>{
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false
            }}
            initialRouteName='GetStarted'
        >
        <Stack.Screen 
        name="GetStarted" 
        component={GetStartedScreen} />
        <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} />
        <Stack.Screen 
        name="Account" 
        component={AccountScreen} />
        <Stack.Screen 
        name="Team" 
        component={TeamScreen} />
        <Stack.Screen 
        name="Login" 
        component={LoginScreen} />
         <Stack.Screen 
        name="Forgot" 
        component={ForgotPwdScreen} />
        <Stack.Screen 
        name="Otp" 
        component={OTPScreen} />
          <Stack.Screen 
        name="ChangePwd" 
        component={ChangePwdScreen} />
         <Stack.Screen 
        name="ProfilePic" 
        component={ProfilePicScreen} />
         <Stack.Screen 
        name="BioData" 
        component={BioDataScreen} />
         <Stack.Screen 
        name="ProfileSucess" 
        component={ProfileSuccess} />
         <Stack.Screen 
        name="Notification" 
        component={NotificationScreen} />
        <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen} />
     <Stack.Screen 
        name="CreateChat" 
        component={CreateChatScreen} />
    <Stack.Screen 
        name="Group1" 
        component={GroupScreen1} />

    <Stack.Screen 
        name="ChatScreen2" 
        component={ChatScreen2} />
        <Stack.Screen 
        name="Bio" 
        component={Bio} />
       </Stack.Navigator>
       </NavigationContainer>
    );
   
}

export default Navigator;