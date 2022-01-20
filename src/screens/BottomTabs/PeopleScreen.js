import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,Image,ImageBackground,ScrollView,SafeAreaView} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import BottomTabs from '../../screens/BottomTabs/BottomTabs';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PlayersScreen from '../../screens/BottomTabs/PlayersScreen'
import CoachScreen from '../../screens/BottomTabs/CoachScreen';
import StoragePrefs from '../../res/StoragePrefs';




const Tab = createMaterialTopTabNavigator();

 export default class PeopleScreen extends React.Component {
    storagePrefs = new StoragePrefs();
    constructor(props){
        super(props);
       
        this.state={
            communityName:'',
           
        }
       
    }
    async componentDidMount() {
      
        const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
        // console.log('universityDetsils',universityDetsils);
        this.setState({communityName:universityDetsils.universityName});
       

        }
        async componentDidUpdate(){
            const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
            // console.log('universityDetsils',universityDetsils);
            this.setState({communityName:universityDetsils.universityName});
        }

   
    render(){
        return(
        <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
               <View style={[styles.header]}>
               <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                    <Image source={ImagesWrapper.profile}
                    style={{marginLeft:25}}
                    ></Image>
                    </TouchableOpacity>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600',color:'#1E1C24', marginLeft: '5%' ,width:170}}>{this.state.communityName}</Text>
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




                <Text  style={[styles.recommend,{marginTop:20,marginLeft:25}]}>All members of {this.state.communityName}</Text>

                {/* <View> */}
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: "600", textTransform: 'capitalize', },
                        tabBarItemStyle: { width: 100 },

                        tabBarActiveTintColor: '#1E1C24',
                        

                    }}
                    tabBarOptions={{
                        indicatorStyle: {backgroundColor: '#58C4C6', width: '30%', marginLeft: 30, height: 4}
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
                    name="coach"
                    component={CoachScreen}
                    options={{
                        tabBarLabel: 'Coach',

                    }} />
                        
                </Tab.Navigator>
                {/* </View> */}
         
        {/* <ScrollView contentContainerStyle={{ flex: 1}}>
        
             <View style={{backgroundColor:'#EBF8F8'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:30,marginTop:30,marginRight:30}}>
             <Text style={styles.recommend}>Recommendations for you</Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('playersDetail')}>
             <Image source={ImagesWrapper.close}/>
             </TouchableOpacity>
            </View>
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
          </View>
            <Text  style={[styles.recommend,{marginTop:20,marginLeft:30}]}>All members of Memphis-Talks</Text>
            <View style={{flex:1}}>
           <BottomTabs/>
           
                </View>
               
                    
            </ScrollView> */}
    </SafeAreaView>
        )
    }
   
}

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft: '9%',
        marginTop: 25,
        marginBottom: 25,
        // borderBottomWidth:1
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        // marginLeft:23,
        // marginTop:Platform.OS==='ios' ? null:'-3%',
        // marginRight:23,
        width:'100%'
    },
    recommend:{
        fontFamily:Fonts.mulishSemiBold,
        fontSize:16,
        fontWeight:'600',
        color:'#1E1C24'
    }

    });

// export default PeopleScreen;