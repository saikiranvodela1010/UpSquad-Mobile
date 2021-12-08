import React from 'react';
import { StyleSheet, Text, View, Button,ImageBackground,Dimensions,Image,TouchableOpacity,ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

class AccountScreen extends React.Component {
  render() {
    return (
      
      <View style={styles.container} >
           {/* <ScrollView> */}
     <LinearGradient
        colors={['rgba(235, 248, 248, 1)','rgba(255, 255, 255, 1)']} 
        //locations={[1,1]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
          <View style={{alignItems:'flex-end'}}>
         <Image source={ImagesWrapper.toppng}
                     resizeMode="cover" style={{opacity:Platform.OS === "ios" ?0.1:0.3,}} tintColor="#58C4C6" ></Image>
                     
                     </View>
                        <View style={{alignItems:"center",justifyContent:'center',marginTop:Platform.OS === "ios" ?-40:null}}>
                        <Image source={ImagesWrapper.vector}
                        resizeMode="contain" ></Image>
                        <View style={{alignItems:'center',paddingTop:'10%'}}>
                        <Text style={styles.text}>You’ve got yourself an </Text>
                        <Text style={styles.text}>blooming account</Text>
                        </View>
                        <View style={{alignItems:'center',paddingTop:Platform.OS === "ios" ?'32%':'35%'}}>
                        <Text style={styles.text1}>Let’s start by creating a profile that helps  </Text>
                        <Text style={[styles.text1]}>the right people find you</Text>
                         {/* <Text style={styles.text1}>Let’s start by creating a profile that helps the right people find you</Text> */}
                        </View>
                        </View>
                        <TouchableOpacity>
                        <View style={{alignItems:"center",justifyContent:'center',paddingTop:'2%'}}>

                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(33, 43, 104, 1)','rgba(88, 196, 198, 1)']} style={[styles.linearGradient1,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'5%'}]}>
                        
                        <Text style={styles.buttontext}>
                            Let's do it
                        </Text>
                        
                       </LinearGradient>
                  </View>
                  </TouchableOpacity>
            
      </LinearGradient>
      {/* </ScrollView> */}
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      shadowColor:'rgba(0, 0, 0, 0.25)'
    },
    imgBackground: {
      flex: 1,
      width: "100%",
      alignItems: "center",
    },
    linearGradient: {
      width: '100%',
      height: '100%',
      opacity: 1.0,
      backgroundColor:'#58C4C6'
    },
    buttontext: {
      color: '#F9F9FB',
      fontSize:16,
      fontFamily:Fonts.mulishRegular,
      textAlign: 'center',
      fontWeight:'600',
      backgroundColor:'transparent'
    },
    linearGradient1:{
        width:'85%',
        height:55,
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
        
    },
    text:{
      color:'#1E1C24',
      fontSize:20,
      fontFamily:Fonts.mulishSemiBold,
      fontWeight:'600',
      textAlign:'center',
    },
    text1:{
      color:'#868585',
      fontSize:14,
      fontFamily:Fonts.mulishRegular,
      textAlign:'center',
    }
    
  });
// ...

export default AccountScreen;