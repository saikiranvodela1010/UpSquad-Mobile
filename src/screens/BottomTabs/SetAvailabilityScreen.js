import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LinearGradient from 'react-native-linear-gradient';
import WeeklyHours from './WeeklyHours';
import DateOverRides from './DateOverRides';
import GroupScreen from '../../screens/GroupScreen';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';

const Tab = createMaterialTopTabNavigator();



class SetAvailabilityScreen extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{flex:1}}>
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

        <View style={[styles.header]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar3')}  style={{ marginLeft: '7%' }}>
          <Image source={ImagesWrapper.back}
           
          ></Image>
          </TouchableOpacity>

        </View>
        <View style={{ borderBottomColor: '#959494', borderBottomWidth: 0.5, width: '100%' }}></View>
       
          <Text style={{ color: '#1E1C24', fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', marginTop: '7%', marginLeft: '7%' }}>
            Set your availability
          </Text>
          <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginTop: '2%', marginLeft: '7%', marginRight: '7%' }}>
            Choose  a schedule below to edit or create a new one that you can apply to your event types
          </Text>
          <Text style={{ color: '#1E1C24', fontSize: 14, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', marginTop: '6%', marginLeft: '7%', marginRight: '7%' }}>
            TIME ZONE
          </Text>
          <View style={{flexDirection:'row', marginLeft: '7%',marginTop: '3%'}}>
          <Text style={{ color: '#58C4C6', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>
            India Standard Time
          </Text>
          <Image source={ImagesWrapper.chevron} style={{marginLeft:'2%', marginTop: 1}}/>
          </View>
          <View style={{marginTop:'6%', borderBottomColor: 'rgba(241, 241, 241, 1)', borderBottomWidth: 1, width: '85%',marginLeft:'7%',marginRight:'7%' , marginBottom: '4%'}}></View>
          <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: "600", textTransform: 'capitalize',marginLeft:15},
                        tabBarItemStyle: { width: 160 },
                        tabBarScrollEnabled: true,
                        tabBarActiveTintColor: '#1E1C24',
                        

                    }}
                    tabBarOptions={{
                        indicatorStyle: {backgroundColor: '#58C4C6', width: '37%', marginLeft: 30, height: 4}
                    }}

                >
                      <Tab.Screen
                    name="WeeklyHours"
                    component={WeeklyHours}
                    options={{
                        tabBarLabel: 'Weekly Hours',
                        //tabBarOptions:{upperCaseLabel:'false'}

                    }} />
                <Tab.Screen
                    name="DateOverRides"
                    component={DateOverRides}
                    options={{
                        tabBarLabel: 'Date overrides',

                    }} />
                        
                </Tab.Navigator>
       

      </View>
      </ScrollView>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

});


export default SetAvailabilityScreen;