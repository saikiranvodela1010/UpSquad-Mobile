import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedScreen from '../screens/GetStartedScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountScreen from '../screens/AccountScreen';
import TeamScreen from '../screens/TeamScreens';




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
          

       </Stack.Navigator>
       </NavigationContainer>
    );
   
}

export default Navigator;