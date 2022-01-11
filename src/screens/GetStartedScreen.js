import React, { Component } from "react";

import Svg, {
  G,
  Circle,
  Defs,
  ClipPath,
  Path,
  LinearGradient,
  Stop,
  Ellipse,
  Text as SvgText,
  Rect,
  TSpan,
} from "react-native-svg";
import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,Animated,
  View,
  Image,Dimensions,

} from "react-native";


import Video from "react-native-video";
import FormulaBased from './FormulaBased'
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



var duratioN = 500;
var scaleValue = 40;
var svgvalue = windowWidth*0.22;
var raddi = svgvalue /4 ;
var colorOrange="#F58220";
var colorLightBlue="#287CC0";
var bhanuu = null;





export default class GetStartedScreen extends Component {



  render() {
    return (
      <View style={styles.container}>
        <Video
        source={ImagesWrapper.upsquadBG}
         
          resizeMode="cover"
          isMuted={true}
          repeat={true}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />

        <Image
        source={ImagesWrapper.transBG}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        {/* <Video source={require('./src/video/logovideo.mp4')}   
         
         isMuted={true }
         resizeMode="contain"   
         repeat={true}   
         style={{ width:'100%', height: windowWidth,position:'absolute',backgroundColor:'#ff000005' ,alignSelf:'flex-end'  }}/> */}

     



         <Image
                 source={ImagesWrapper.bloomingOrangeBlue}
          resizeMode="contain"
          style={{
            width: windowWidth-40,
            height: windowWidth,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",

          }}
        />
         <FormulaBased/>
<View   style={{
            width:'100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: "center",
            position:'absolute'
       
           

          }}>



         
<View style={{paddingBottom:'3%',alignItems:'center',justifyContent:'center',paddingTop:'10%'}}>
            <Text style={styles.text}>The network that helps</Text>
            <Text style={styles.text}>you grow</Text>
            </View>

          <Svg onPress={() => this.props.navigation.navigate('SignUp')}
            height="110"
            width={windowWidth}
            backgroundColor="red"
            fill={"red"}

            style={{
            fontSize:16,
            fontFamily:Fonts.mulishRegular,
            textAlign: 'center',
            fontWeight:'600',
          }}
          >
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#212B68" stopOpacity="1" />
                <Stop offset="1" stopColor="#58C4C6" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect
              y={30}
              x={windowWidth * 0.05}
              width={windowWidth * 0.9}
              height="60"
              rx="35"
              fill="url(#grad)"
            />
            <SvgText
              x={windowWidth / 2}
              y={65}
              //fontSize="20"
              textAnchor="middle"
              
              fill={'#F9F9FB'}
            >
              Get Started
            </SvgText>
          </Svg>

           
           <View style={{alignItems:'center',marginBottom:60, marginTop: -10}}> 
           
           <Text style={styles.text2}>I already have an account?
                    
                    <Text style={[{color:'#58C4C6',marginBottom:-3}]}
                    onPress={()=>this.props.navigation.navigate('Login')}> Sign in</Text>
                   
                    </Text>
           
        </View>

</View>

       


      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerInside: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "column",
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginBottom:30,
    color: "black",
    flexDirection: "row",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  containerGraph: {
    flex: 1,
    justifyContent: "center",
    marginRight:windowWidth/2-svgvalue+1,
    marginTop:windowHeight/2-svgvalue-svgvalue/2,
    alignItems: "center",
    
   
  },
  text2:{
    fontSize:14,
    color:'#868585',
    fontFamily:Fonts.mulishRegular,

    //marginBottom:20
  },
  text:{
    color:'#1E1C24',
    fontSize:20,
    fontFamily:Fonts.mulishRegular,
    fontWeight:"600"
  },
});
