import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,SafeAreaView,Image} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import APIHandler from '../../network/NetWorkOperations';
import ServiceUrls from '../../network/ServiceUrls';
import StoragePrefs from '../../res/StoragePrefs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MeetingsScreen extends React.Component {



    async logout(){
        console.log("logout")
        // let keys = ["universityDetsils"];
        // //    await AsyncStorage.removeItem(); 
        //    await AsyncStorage.multiRemove(keys).then((res) => {
        //     alert("Items removed from storage",res); 
        //         this.props.navigation.navigate('GetStarted')
        //     });
        try {
            await AsyncStorage.removeItem("universityDetsils");
            await AsyncStorage.removeItem("signupdetails");
            await AsyncStorage.removeItem("userDetails");
            this.props.navigation.navigate('GetStarted')
            return true;
        }
        catch(exception) {
            return false;
        }

    }
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                      // this.props.navigation.openDrawer();
                      this.props.navigation.navigate('BioSuccess'
                          // back:this.state.back,
                          );
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                            // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Settings</Text>
                   

                </View>
                <View style={styles.underline}></View>
                <View>
                <TouchableOpacity>
                <Text style={styles.account}>Account preferences</Text>
                </TouchableOpacity>
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
                <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('DefaultVisibility')}}>
                <Text style={styles.account}>Default Visibility</Text>
                </TouchableOpacity>
               
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
                <TouchableOpacity>
                <Text style={styles.account}>Notifications</Text>
                </TouchableOpacity>
                
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
                <TouchableOpacity>
                <Text style={styles.account}>Sign in & security</Text>
                </TouchableOpacity>
               
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
                <TouchableOpacity>
                <Text style={styles.account}>Help center</Text>
                </TouchableOpacity>
                
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
                <TouchableOpacity>
                <Text style={styles.account}>Privacy policy</Text>
                </TouchableOpacity>
                
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
                <TouchableOpacity onPress={()=>{
                    this.logout();
                }}>
                <Text style={styles.account}>Logout</Text>
                </TouchableOpacity>
               
               
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '9%',
        marginTop: 20,
        marginBottom: 10,
        flexDirection:'row',
        marginLeft:-10
        // borderBottomWidth:1
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        width:'100%',
        marginTop:15
    },
    memphistalk:{ 
        fontSize: 20,
         fontFamily: Fonts.mulishSemiBold,
          fontWeight: '600',
          color:'#1E1C24',
           marginLeft: '5%'
    },
    account:{
        fontSize: 14,
        fontFamily: Fonts.mulishRegular,
         fontWeight: '600',
         color:'#1E1C24',
          marginLeft: '8%',
          marginTop:30
    }
});