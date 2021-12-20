// import React from 'react';
// import Navigation from './src/Navigation/navigation'


// const App = () => {
//   return(
//     <Navigation/>
//   );
 
// }
// export default App;



import * as React from 'react';
import { View, Text,StatusBar,Image, Tab } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from './src/screens/NotificationScreen';
import ChatScreen from './src/screens/ChatScreen';
import ChatSearch from './src/screens/ChatSearch';
import GroupSearch from './src/screens/GroupSearch';
import CreateChatScreen from './src/screens/CreateChatScreen';
import GroupScreen1 from './src/screens/GroupScreen1';
import GroupScreen2 from './src/screens/GroupScreen2';
import RemoveUser from './src/screens/RemoveUser';
import ProfileSuccess from './src/screens/ProfileSuccess';
import MessageScreen from './src/screens/MessageScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AccountScreen from './src/screens/AccountScreen';
import TeamScreen from './src/screens/TeamScreens';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPwdScreen from './src/screens/ForgotPwdScreen';
import OTPScreen from './src/screens/OTPScreen';
import ChangePwdScreen from './src/screens/ChangePwdScreen';
import ProfilePicScreen from './src/screens/ProfilePicScreen';
import BioDataScreen from './src/screens/BioDataScreen';
import GroupChat from './src/screens/GroupChat';




const Stack = createStackNavigator();
const App = () => {

    return (
      <NavigationContainer>
      <StatusBar hidden={true} />
    <Stack.Navigator 
        screenOptions={{
        headerShown: false,
      }}
        initialRouteName='GetStarted'
  >

      <Stack.Screen 
        name="GetStarted" 
        component={GetStartedScreen} />

      <Stack.Screen
        name="profilesuccess"
        component={ProfileSuccess}

      />

     
     <Stack.Screen
        name="chatscreen"
        component={ChatScreen}

      />

      <Stack.Screen
        name="chatsearch"
        component={ChatSearch}

      />

      <Stack.Screen
        name="groupsearch"
        component={GroupSearch}

      />

      <Stack.Screen
        name="createchatscreen"
        component={CreateChatScreen}

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
        name="notificationscreen"
        component={NotificationScreen}

      /> 

      <Stack.Screen
        name="messagescreen"
        component={MessageScreen}

      />
     
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
        name="groupchat" 
        component={GroupChat} />
      


    </Stack.Navigator>
  
  </NavigationContainer>



        
    )
};


    
    
 

export default App;
