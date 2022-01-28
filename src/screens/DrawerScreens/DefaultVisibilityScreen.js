import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,SafeAreaView,Image} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';


export default class MeetingsScreen extends React.Component {



    
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                      // this.props.navigation.openDrawer();
                      this.props.navigation.navigate('SeetingScreen'
                          // back:this.state.back,
                          );
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                            // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Default Visibility</Text>
                   

                </View>
                <View style={styles.underline}></View>
                <View>
                <TouchableOpacity >
                <Text style={styles.account}>Post visibility</Text>
                </TouchableOpacity >
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
                <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('StorySetting')}}>
                <Text style={styles.account}>Story visibility</Text>
                </TouchableOpacity>
               
                <View style={[styles.underline,{width:'85%',marginLeft:'auto',marginRight:'auto'}]}></View>
               
               
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