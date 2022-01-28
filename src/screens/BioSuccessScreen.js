import React from 'react';
import { Image,View,Text,StyleSheet,TouchableOpacity,Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import FeedScreen from '../screens/BottomTabs/FeedScreen';
import PeopleScreen from '../screens/BottomTabs/PeopleScreen';
import StoriesScreen from '../screens/BottomTabs/StoriesScreen';
import MeetingsScreen from '../screens/BottomTabs/MeetingsScreen';
import EventsScreen from '../screens/BottomTabs/EventsScreen';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
import Screen  from './Events/Pre_events/Screen';


const Tab = createBottomTabNavigator();
const AddButton = () => {
  return null
}
class BioSuccessScreen extends React.Component{


  
  constructor(props){
    super(props);
   
    this.state={
       
        back:false
    }
   
}

//  componentDidMount() {
//       // const back = props.route.params.back != null ? props.route.params.back : false;
//       // this.setState({back : back})

//   }
//   componentDidUpdate(){
//     console.log('heloooooooooooooo')
//     const back =  this.props.route.params.back != null && this.props.route.params.back? this.props.route.params.back : false;
    
//     if(back === true){
//       this.props.navigation.openDrawer();
//     }
//   }



    render() {
        return(
            <Tab.Navigator 
            initialRouteName='Feed'
            screenOptions={{
              headerShown: false,
              tabBarStyle: {backgroundColor: 'white',
              height:Platform.OS ==='ios'?80:70,paddingBottom:Platform.OS ==='ios'?30:10,paddingTop:10
            }
            }}
            tabBarOptions={{
              headerShown: false,
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
        {/*Commenting this as not needed for phase 1 release/}
        {/* <Tab.Screen
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
          }} /> */}
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
          component={Screen}
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
export default BioSuccessScreen;