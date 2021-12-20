import 'react-native-gesture-handler';
import React from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import Bio from '../screens/Bio';
import ChatSearch from '../screens/ChatSearch';
import GroupSearch from '../screens/GroupSearch';
import MessageScreen from '../screens/MessageScreen';
import RemoveUser from '../screens/RemoveUser';
import GroupScreen1 from '../screens/GroupScreen1';
import GroupScreen2 from '../screens/GroupScreen2';
import Fonts from '../res/Fonts';
import ImagesWrapper from '../res/ImagesWrapper';
import ChatScreen1 from '../screens/ChatScreen1';
import GroupScreen from '../screens/GroupScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const  TabStack=()=> {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ProfileSucess')}>
        <Image
            source={ImagesWrapper.back}
            style={{
                marginTop: 6,
                marginLeft: 20,
                tintColor: '#000000',
            }}
        />
        </TouchableOpacity>
        <Text style={styles.title}>Memphis Talks</Text>
    </View>
    <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 16, fontFamily: Fonts.mulishSemiBold, 
        fontWeight: "600", textTransform: 'capitalize', },
      tabBarItemStyle: { width: 100 },

      tabBarActiveTintColor: '#1E1C24',
      

  }}
  tabBarOptions={{
      indicatorStyle: {backgroundColor: '#58C4C6', width: '30%', marginLeft: 20, height: 4}
  }}>

                        <Tab.Screen
                        name="chatscreen1"
                        component={ChatScreen1}
                        options={{
                            tabBarLabel: 'Chats',
                            //tabBarOptions:{upperCaseLabel:'false'}

                        }} />
                     <Tab.Screen
                        name="groupscreen"
                        component={GroupScreen}
                        options={{
                            tabBarLabel: 'Groups',
                            //tabBarOptions:{upperCaseLabel:'false'}

                        }} />
                   
    </Tab.Navigator>
    </View>
  );
}

const Navigator = () =>{
    
    return(
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animationEnabled: false
            }}
            initialRouteName='ProfileSucess'
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
        name="Bio" 
        component={Bio} />
     <Stack.Screen
        name="chatsearch"
        component={ChatSearch}

      />

      <Stack.Screen
        name="groupsearch"
        component={GroupSearch}

      />
 <Stack.Screen
        name="groupscreen1"
        component={GroupScreen1}

      />

      <Stack.Screen
        name="groupscreen2"
        component={GroupScreen2}

      />

      <Stack.Screen
        name="removeuser"
        component={RemoveUser}

      />
 <Stack.Screen
        name="messagescreen"
        component={MessageScreen}

      />

<Stack.Screen name="TabStack" component={TabStack} />



       </Stack.Navigator>
       </NavigationContainer>
    );
   
}
const styles = StyleSheet.create({
  title: {
      fontFamily: Fonts.mulishSemiBold,
      fontWeight: '600',
      color: '#1E1C24',
      fontSize: 20,
      marginLeft: 20,
      marginTop:5
  },
})

export default Navigator;