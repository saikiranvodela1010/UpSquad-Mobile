import * as React from 'react';
import { View, Text,StatusBar,Image, Tab } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import DrawerContent from './src/res/DrawerContent';
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
import tabbar1 from './src/screens/tabbar1';
import tabbar2 from './src/screens/tabbar2';
import tabbar3 from './src/screens/tabbar3';
import tabbar4 from './src/screens/tabbar4';
import BioSuccessScreen from './src/screens/BioSuccessScreen';
import damn from './src/screens/damn';
import NewStory from './src/screens/NewStoryScreen'

import colour from './src/screens/Coloring'
import PlayersScreen from './src/screens/BottomTabs/PlayersScreen';
import PlayesDetailScreen from './src/screens/PlayersDetailScreen';
import PlayerSearchScreen from './src/screens/BottomTabs/PlayerSearchScreen'
import CreateEventScreen from './src/screens/BottomTabs/CreateEventScreen';
import EventSquadScreen from './src/screens/BottomTabs/EventSquadScreen';
import EventScheduleScreen from './src/screens/BottomTabs/EventScheduleScreen';
import MeetingScheduleScreen from './src/screens/BottomTabs/MeetingScheduleScreen';
import CreateMeetingScreen from './src/screens/BottomTabs/CreateMeetingScreen';
import CreateMeetingSurvey from './src/screens/BottomTabs/CreateMeetingSurvey';
import SetAvailabilityScreen from './src/screens/BottomTabs/SetAvailabilityScreen';
import EventSelectionScreen from './src/screens/BottomTabs/EventSelectionScreen';
import CreateEventSurvey from './src/screens/BottomTabs/CreateEventSurvey';
import SwitchCommunityScreen from './src/screens/DrawerScreens/SwitchCommunityScreen';
import CoachSearchScreen from './src/screens/BottomTabs/CoachSearchScreen'
import CommentScreen from './src/screens/BottomTabs/CommentScreen';
import AddCommunityScreen from './src/screens/DrawerScreens/AddCommunityScreen';
import AddCommunityScreenStep2 from './src/screens/DrawerScreens/AddCommunityScreemStep2'
import SeetingScreen from './src/screens/DrawerScreens/SettingsScreen';
import CreatePostScreen from './src/screens/BottomTabs/CreatePostScreen';
import DefaultVisibilityScreen from './src/screens/DrawerScreens/DefaultVisibilityScreen';
import PostVisibilityScreen from './src/screens/DrawerScreens/PostVisibilityScreen';
import StorySettingsScreen from './src/screens/DrawerScreens/StorySettingsScreen';
import SelfIntroductionVideoScreen from './src/screens/SelfIntroductionVideoScreen';
import DrawerNotificationScreen from './src/screens/DrawerScreens/DrawerNotificationScreen';
import EventNotificationScreen from './src/screens/DrawerScreens/EventNotificationScreen';
import MeetingNotificationScreen from './src/screens/DrawerScreens/MeetingNotificationScreen';
import MessageNotificationScreen from './src/screens/DrawerScreens/MessageNotificationScreen';
import NotfctnPostComntScreen from './src/screens/DrawerScreens/NotfctnPostComntScreen';

import SocketTest from './src/screens/BottomTabs/SocketTest';
import { ImageView } from './src/screens/BottomTabs/ImageView';





const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const MainScreens =()=>{
  return(
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
      initialRouteName='GetStarted'
    >
      
      <Stack.Screen  name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen  name="profilesuccess" component={ProfileSuccess} />       
      <Stack.Screen name="chatscreen"  component={ChatScreen}/>    
      <Stack.Screen  name="chatsearch"  component={ChatSearch} />
      <Stack.Screen name="groupsearch"component={GroupSearch} />
      <Stack.Screen name="createchatscreen" component={CreateChatScreen}/>
      <Stack.Screen name="groupscreen1" component={GroupScreen1}/>
      <Stack.Screen  name="groupscreen2" component={GroupScreen2} />      
      <Stack.Screen name="removeuser" component={RemoveUser}/>
      <Stack.Screen name="notificationscreen"component={NotificationScreen}/> 
      <Stack.Screen  name="messagescreen"component={MessageScreen} />
      <Stack.Screen  name="SignUp"  component={SignUpScreen} />
      <Stack.Screen  name="Account"  component={AccountScreen} />
      <Stack.Screen name="Team"  component={TeamScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen  name="Forgot" component={ForgotPwdScreen} />
      <Stack.Screen name="Otp" component={OTPScreen} />
      <Stack.Screen name="ChangePwd" component={ChangePwdScreen} />
      <Stack.Screen name="ProfilePic" component={ProfilePicScreen} />
      <Stack.Screen name="BioData" component={BioDataScreen} />
      <Stack.Screen name="groupchat" component={GroupChat} />
      <Stack.Screen name="BioSuccess"component={BioSuccessScreen}/>
      <Stack.Screen  name="tabbar1" component={tabbar1}/>
      <Stack.Screen name="tabbar2"component={tabbar2}/>
      <Stack.Screen name="tabbar3"component={tabbar3}/>
      <Stack.Screen name="tabbar4"component={tabbar4}/>
      <Stack.Screen name="damn"component={damn}/>
      <Stack.Screen name="newstory" component={NewStory}/>
      <Stack.Screen  name="color"component={colour} />
      <Stack.Screen name="players" component={PlayersScreen} />
      <Stack.Screen  name="playersDetail"component={PlayesDetailScreen} />
      <Stack.Screen
          name="playerSearch"
          component={PlayerSearchScreen} />

        <Stack.Screen
          name="createeventscreen"
          component={CreateEventScreen} />
        <Stack.Screen
          name="eventsquadscreen"
          component={EventSquadScreen} />
        <Stack.Screen
          name="eventschedulescreen"
          component={EventScheduleScreen} />
        <Stack.Screen
          name="meetingschedulescreen"
          component={MeetingScheduleScreen} />
        <Stack.Screen
          name="createmeetingscreen"
          component={CreateMeetingScreen} />
        <Stack.Screen
          name="createmeetingsurvey"
          component={CreateMeetingSurvey} />
        <Stack.Screen
          name="setavailabilityscreen"
          component={SetAvailabilityScreen} />
        <Stack.Screen
          name="eventselectionscreen"
          component={EventSelectionScreen} />
        <Stack.Screen
          name="createventsurvey"
          component={CreateEventSurvey} />
           <Stack.Screen
          name="switchcommunity"
          component={SwitchCommunityScreen} />
          <Stack.Screen
          name="coachSearch"
          component={CoachSearchScreen} />
          <Stack.Screen
          name = "CommentScreen"
          component = {CommentScreen}/>
          <Stack.Screen
          name = "AddCommunityScren"
          component = {AddCommunityScreen}/>
           <Stack.Screen
          name = "AddCommunityScreenStep2"
          component = {AddCommunityScreenStep2}/>
            <Stack.Screen
          name = "SeetingScreen"
          component = {SeetingScreen}/>
          <Stack.Screen
          name = "CreatePostScreen"
          component = {CreatePostScreen}/>
           <Stack.Screen
          name = "DefaultVisibility"
          component = {DefaultVisibilityScreen}/>
          <Stack.Screen
          name = "PostVisibility"
          component = {PostVisibilityScreen}/>
          <Stack.Screen name="StorySetting" component={StorySettingsScreen}/>
         <Stack.Screen  name="SelfIntroduction"component={SelfIntroductionVideoScreen} />
         <Stack.Screen
        name="DrawerNotification"
        component={DrawerNotificationScreen} />
      <Stack.Screen
        name="EventNotification"
        component={EventNotificationScreen} />

      <Stack.Screen
        name="MeetingNotification"
        component={MeetingNotificationScreen} />


      <Stack.Screen
        name="MessageNotification"
        component={MessageNotificationScreen} />


      <Stack.Screen
        name="NotfctnPostComnt"
        component={NotfctnPostComntScreen} />
          <Stack.Screen 
          name = "SocketTest"
          component = {SocketTest}/>
          <Stack.Screen
          name = "ImageView"
          component = {ImageView}/>
          
    </Stack.Navigator>
  )
}




const App = () => {
 return (
  <NavigationContainer>
     
     <Drawer.Navigator
        drawerContent={props =><DrawerContent { ...props}/>}
        screenOptions={{
            headerShown:false,
         //    gestureEnabled: false,
         //    animationEnabled: false
        }}
        initialRouteName='MainScreens'
    >
      <Drawer.Screen name='MainScreens' component={MainScreens}/>
    
    </Drawer.Navigator>
    
  
  </NavigationContainer>



        
    )
};


    
    
 

export default App;
