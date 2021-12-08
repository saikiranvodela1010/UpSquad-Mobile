import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, ListView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotificationScreen from './NotificationScreen';
// import TeamScreen from './TeamScreen';
import ChatScreen1 from './ChatScreen1';
import GroupScreen from './GroupScreen';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

const Tab = createMaterialTopTabNavigator();

export default class ChatScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 6,
                            marginLeft: 20,
                            tintColor: '#000000',
                        }}
                    />
                    <Text style={styles.title}>Memphis Talks</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>

                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: "600", textTransform: 'capitalize', },
                        tabBarItemStyle: { width: 100, },

                        tabBarActiveTintColor: '#1E1C24',


                    }}

                >
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

                        }} />
                </Tab.Navigator>
            </View>

            // <View style = {{flex: 1, backgroundColor: '#FFFFFF'}}>
            //      <View style = {{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
            //     <Image
            //         source={require('./images/backarrow.png')}
            //         style ={{
            //             marginTop: 6,
            //             marginLeft: 20,
            //             tintColor: '#000000',
            //         }}
            //     />
            //     <Text style = {styles.title}>Memphis Talks</Text>
            //     </View>
            //     <View style = {{borderWidth: 1, borderColor: '#F1F1F1'}}></View> 

            // </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        fontSize: 20,
        marginLeft: 20
    },
})