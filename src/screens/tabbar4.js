import React from 'react';
import { Image,View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import FeedScreen from '../screens/BottomTabs/FeedScreen';
import PeopleScreen from '../screens/BottomTabs/PeopleScreen';
import StoriesScreen from '../screens/BottomTabs/StoriesScreen';
import MeetingsScreen from '../screens/BottomTabs/MeetingsScreen';
import EventsScreen from '../screens/BottomTabs/EventsScreen';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

const Tab = createBottomTabNavigator();
const AddButton = () => {
  return null
}
class tabbar4 extends React.Component{
    render() {
        return(
          
          
            <Tab.Navigator 
            initialRouteName='Events'
            screenOptions={{
              headerShown: false,
              tabBarStyle: {backgroundColor: 'white',
              height:70,paddingBottom:10,paddingTop:10
            }
            }}
            tabBarOptions={{
              activeTintColor: '#58C4C6',
              labelStyle:{fontSize:12,fontFamily:'Mulish-Regular',fontWeight:'400'},
              style: {
                backgroundColor: '#FFFFFF',
                height:65,
                paddingBottom:10
          },
            }}
            
               >
                 
        <Tab.Screen
          name="Feed"
          
          component={FeedScreen} 
          options={{
            tabBarLabel: 'Feed',
            visible:false,
            tabBarIcon: ({focused}) => (
              focused==false?
                <Image
                style={{resizeMode: 'contain'}}
                source={ImagesWrapper.feed}/>:
                <Image
                style={{resizeMode: 'contain'}}
                source={ImagesWrapper.feed1}/>
              ),
          }}  />
        <Tab.Screen
          name="People"
          component={PeopleScreen}
          options={{
            tabBarLabel: 'People',
            tabBarIcon: ({focused}) => (
              focused==false?
                <Image
                style={{
                   
                    resizeMode: 'contain',
                    //tintColor:focused == false? '#757575': '#E32726'
                }}
                source={ImagesWrapper.people}
            />:<Image
            style={{resizeMode: 'contain'}}
            source={ImagesWrapper.people1}/>
              ),
          }} />
        <Tab.Screen
          name="Stories"
          component={StoriesScreen}
          options={{
            tabBarLabel: 'Stories',
            tabBarIcon: ({focused}) => (
              focused==false?
                <Image
                style={{
                   
                    resizeMode: 'contain',
                    //tintColor:focused == false? '#757575': '#E32726'
                }}
                source={ImagesWrapper.stories}
            />:<Image
            style={{resizeMode: 'contain'}}
            source={ImagesWrapper.stories1}/>
              ),
          }} />
          <Tab.Screen
          name="Meetings"
          component={MeetingsScreen}
          options={{
            tabBarLabel: 'Meetings',
            tabBarIcon: ({focused}) => (
              focused==false?
                <Image
                style={{
                   
                    resizeMode: 'contain',
                    //tintColor:focused == false? '#757575': '#E32726'
                }}
                source={ImagesWrapper.meetings}
            />:<Image
            style={{resizeMode: 'contain'}}
            source={ImagesWrapper.meetings1}/>
              ),
          }} />
          <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({focused}) => (
              focused==false?
                <Image
                style={{
                   
                    resizeMode: 'contain',
                    //tintColor:focused == false? '#757575': '#E32726'
                }}
                source={ImagesWrapper.events}
            />:<Image
            style={{resizeMode: 'contain'}}
            source={ImagesWrapper.events1}/>
              ),
          }} />

      </Tab.Navigator>
      
        )
    }
}
const styles = StyleSheet.create({
  header: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: '9%',
    marginTop:20,
    marginBottom:20,
    // borderBottomWidth:1
  },
})

export default tabbar4;