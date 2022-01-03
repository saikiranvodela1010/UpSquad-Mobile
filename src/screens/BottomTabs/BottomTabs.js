import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, ListView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen1 from '../../screens/ChatScreen1';
import GroupScreen from '../../screens/GroupScreen';
import PlayersScreen from '../BottomTabs/PlayersScreen';
import Fonts from '../../res/Fonts';

const Tab = createMaterialTopTabNavigator();

export default class ChatScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                
                <View style={[styles.header]}>
                <Image source={ImagesWrapper.profile}
                style={{marginLeft:'9%'}}
                ></Image>
                <Text style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600',color:'#1E1C24', marginLeft: '5%' }}>Memphis Talks</Text>
                <View style={{justifyContent:'flex-end',flexDirection:'row',flex:1}}>
                <TouchableOpacity  style={{marginRight:'18%'}} onPress={() => this.props.navigation.navigate('notificationscreen')}>
                <Image source={ImagesWrapper.notificationNo}
                ></Image>
                </TouchableOpacity>
            
                <TouchableOpacity 
                style={{marginRight:'18%'}}
                onPress={() => this.props.navigation.navigate('chatscreen')}
                >
                <Image source={ImagesWrapper.chatNo}
                ></Image>
                </TouchableOpacity>
                </View>
                </View>
            
                <View style={styles.underline}/>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

<View style={{ flexDirection: 'row', marginLeft:30, marginBottom: 30 }}>
    <View style={{ width: 190, height: 280, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 2, marginTop: 20 }}>
        <ImageBackground
        source={ImagesWrapper.manpic1}
        style={{ width: '100%', height: 140, borderTopLeftRadius: 5, borderTopRightRadius: 5, overflow: 'hidden' }}  >
        </ImageBackground>
        <Text style={{ paddingLeft: '10%', paddingTop: '9%', color: '#1E1C24', fontSize: 14, fontFamily: Fonts.mulishSemiBold, fontWeight: '600' }}>John Doe</Text>
        <Text style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Member of Memphis Talks  </Text>
            <View style={{paddingTop: '7%', flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>
            <TouchableOpacity>
                <Image
                source={ImagesWrapper.userplus}>

                </Image>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ marginLeft: '6%', marginTop: 1, color: '#58C4C6', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Follow</Text>
            </TouchableOpacity>
            </View>
    </View>
</View>
<View style={{ flexDirection: 'row', marginLeft:30, marginBottom: 30 }}>
    <View style={{ width: 190, height: 280, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 2, marginTop: 20 }}>
        <ImageBackground
        source={ImagesWrapper.manpic2}
        style={{ width: '100%', height: 140, borderTopLeftRadius: 5, borderTopRightRadius: 5, overflow: 'hidden' }}  >
        </ImageBackground>
        <Text style={{ paddingLeft: '10%', paddingTop: '9%', color: '#1E1C24', fontSize: 14, fontFamily: Fonts.mulishSemiBold, fontWeight: '600' }}>John Doe</Text>
        <Text style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Member of Memphis Talks  </Text>
            <View style={{ paddingTop: '7%', flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>
            <TouchableOpacity>
                <Image
                source={ImagesWrapper.userplus}>

                </Image>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ marginLeft: '6%', marginTop: 1, color: '#58C4C6', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Follow</Text>
            </TouchableOpacity>
            </View>
    </View>
</View>
</ScrollView>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: "600", textTransform: 'capitalize', },
                        tabBarItemStyle: { width: 100 },

                        tabBarActiveTintColor: '#1E1C24',
                        

                    }}
                    tabBarOptions={{
                        indicatorStyle: {backgroundColor: '#58C4C6', width: '30%', marginLeft: 20, height: 4}
                    }}

                >
                      <Tab.Screen
                    name="players"
                    component={PlayersScreen}
                    options={{
                        tabBarLabel: 'Players',
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

            
        )
    }
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
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft: '9%',
        marginTop:20,
        marginBottom:20,
    }
})

