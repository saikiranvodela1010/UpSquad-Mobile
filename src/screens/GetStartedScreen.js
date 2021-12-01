import React from 'react';
import { StyleSheet, Text, View, Button,ImageBackground,Dimensions,Image,TouchableOpacity,TouchableWithoutFeedback, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


class GetStartedScreen extends React.Component {

  render() {
    return (
      <ScrollView>
      <View style={styles.container} >
           <ImageBackground source={ImagesWrapper.pexels}
                        style = {styles.imgBackground} >
     <LinearGradient
        colors={['rgba(255, 255, 255, 0.63)', 'rgba(255, 255, 255, 1)']} 
        locations={[0.32,0.68]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} >
            
           <View style={{paddingTop:'48%'}}><Image source={ImagesWrapper.blooming} style={{resizeMode:'contain'}}></Image></View>
            <View style={{paddingBottom:'3%',alignItems:'center',justifyContent:'center',paddingTop:'10%'}}>
            <Text style={styles.text}>The network that helps</Text>
            <Text style={styles.text}>you grow</Text>
            </View>
           
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(33, 43, 104, 1)','rgba(88, 196, 198, 1)']} style={[styles.linearGradient1,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'5%'}]}>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('SignUp')
            }}>
                        <Text style={styles.buttontext}>
                            Get Started
                        </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    
                    <View style={{paddingTop:'4%'}}>
                    <Text style={styles.text2}>I already have an account?<Text style={{color:'#58C4C6'}}> Sign in</Text></Text>
                    </View>
      </LinearGradient>
</ImageBackground>
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    imgBackground: {
      flex: 1,
      width:Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      alignItems: "center",
    },
    linearGradient: {
      width: '100%',
      height: '100%',
      opacity: 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    buttontext: {
      color: '#F9F9FB',
      fontSize:18,
      fontFamily:Fonts.mulishRegular,
      textAlign: 'center',
      fontWeight:'600',
      backgroundColor:'transparent'
    },
    text:{
      color:'#1E1C24',
      fontSize:25,
      fontFamily:Fonts.mulishRegular,
      fontWeight:"600"
    },
    text2:{
      fontSize:18,
      color:'#868585',
      fontFamily:Fonts.mulishRegular,

      //marginBottom:20
    },
    linearGradient1:{
        width:'85%',
        height:'7%',
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
        
    }
  });
// ...

export default GetStartedScreen;