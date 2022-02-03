import React, { Component } from "react";

import Svg, { G, Circle, Defs, ClipPath, Path } from "react-native-svg";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
var windowheight = 
  Dimensions.get("window").height;

var windowWidth =   Dimensions.get("window").width;
var duratioN = 200;
var scaleValue = 40;
var svgvalue = windowWidth*0.22;
var raddi = svgvalue /4 ;
var colorOrange="#F58220";
var colorLightBlue="#287CC0";
var bhanuu = null;
var logedin=null;


  const value =  AsyncStorage.getItem("logedin").then((value)=>{
    //  alert(value);  
    logedin=value;     

    if(value=="YES")
    {



    }




  });

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {

      circleRadius9: new Animated.Value(0), //cx 4
      circleRadius0: new Animated.Value(0), //cy 4


      circleRadius1: new Animated.Value(0),
      circleRadius2: new Animated.Value(-raddi),

      circleRadius3: new Animated.Value(0), // cx 2
      circleRadius4: new Animated.Value(0), //cy 2

      circleRadius5: new Animated.Value(0), // cx 3
      circleRadius6: new Animated.Value(-raddi), //cy 3

      circleRadius7: new Animated.Value(0), //cx 4
      circleRadius8: new Animated.Value(0), //cy 4

      showReactOptions: false,
      maxmizeRadius: 0,
    };

    this.state.circleRadius0.addListener((circleRadius0) => {
      this._myCircle2.setNativeProps({ opacity: circleRadius0.value.opacity });
    });


    this.state.circleRadius9.addListener((circleRadius9) => {
      this._myCircle3.setNativeProps({ opacity: circleRadius9.value.opacity });
    });


    // this.state.circleRadius1= new Animated.Value(50) ;
    this.state.circleRadius1.addListener((circleRadius1) => {
      this._myCircle1.setNativeProps({ cx: circleRadius1.value.toString() });
    });

    this.state.circleRadius2.addListener((circleRadius2) => {
      this._myCircle2.setNativeProps({ cx: circleRadius2.value.toString() });
    });
    this.state.circleRadius3.addListener((circleRadius3) => {
      this._myCircle2.setNativeProps({ cy: circleRadius3.value.toString() });
    });

    this.state.circleRadius4.addListener((circleRadius4) => {
      this._myCircle4.setNativeProps({ cx: circleRadius4.value.toString() });
    });
    this.state.circleRadius5.addListener((circleRadius5) => {
      this._myCircle4.setNativeProps({ cy: circleRadius5.value.toString() });
    });

    this.state.circleRadius6.addListener((circleRadius6) => {
      this._myCircle3.setNativeProps({ cx: circleRadius6.value.toString() });
    });
    this.state.circleRadius7.addListener((circleRadius7) => {
      this._myCircle3.setNativeProps({ cy: circleRadius7.value.toString() });
    });
  }

  componentDidMount() {


    this.bhanu();
  }


  bhanu() {
    bhanuu =
    
   

    Animated.sequence([
  


      Animated.timing(this.state.circleRadius2, {
        toValue: -raddi,
        duration: duratioN,
        useNativeDriver: false,
      }),

      Animated.parallel([


        Animated.sequence([

          Animated.parallel([
            Animated.timing(this.state.circleRadius2, {
              toValue: 0,
              duration: duratioN/3,
              useNativeDriver: false,
            }),
         
            Animated.timing(this.state.circleRadius3, {
              toValue: -raddi,
              duration: duratioN/3,
              useNativeDriver: false,
            }),

          ]),
          
         

          Animated.parallel([
            Animated.timing(this.state.circleRadius2, {
              toValue: raddi,
              duration: duratioN,
              useNativeDriver: false,
            }),
            Animated.timing(this.state.circleRadius3, {
              toValue: 0,
              duration: duratioN,
              useNativeDriver: false,
            }),
          ]),
          
    

          Animated.parallel([
            Animated.timing(this.state.circleRadius2, {
              toValue: 0,
              duration: duratioN/2,
              useNativeDriver: false,
            }),
            Animated.timing(this.state.circleRadius3, {
              toValue: raddi,
              duration: duratioN/2,
              useNativeDriver: false,
            }),
          ]),

        ]),

        //Circle 3
        
        Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.circleRadius4, {
                toValue: 0,
                duration: duratioN,
                useNativeDriver: false,
              }),
              Animated.timing(this.state.circleRadius5, {
                toValue: -raddi,
                duration: duratioN,
                useNativeDriver: false,
              }),
            ]),
            
            Animated.parallel([
                Animated.timing(this.state.circleRadius4, {
                  toValue: raddi,
                  duration: duratioN,
                  useNativeDriver: false,
                }),
                Animated.timing(this.state.circleRadius5, {
                  toValue: 0,
                  duration: duratioN,
                  useNativeDriver: false,
                }),
              ]),
  
          ]),


          //circle 4


          Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.circleRadius6, {
                toValue: 0,
                duration: duratioN,
                useNativeDriver: false,
              }),
              Animated.timing(this.state.circleRadius7, {
                toValue: -raddi,
                duration: duratioN,
                useNativeDriver: false,
              }),
            ]),
            
        
  
          ]),


      ]),

    ]);
 
    bhanuu.start(() => {
      console.log("Animation DONE");
    
      if(logedin=="YES")
      {
          this.props.navigation.replace("BioSuccess");
      }
      else{
        this.props.navigation.replace("GetStarted");
      }


  });
  }

  flowerWings(width) {
    const initialArr = [];
    for (var i = 0; i < 4; i++) {
      initialArr.push(i);
    }

    return (
      <Svg
        style={[
          { alignItems: "center" },
          { width: width },
          { height: width },
          //  {backgroundColor:'pink'},
         
          { alignSelf: "center" },
        ]}
      >
        {initialArr.map((prop, key) => {
          var radius = width/2+(width/2)/2;
          var angle = 90 * prop;
          var x = radius * Math.sin((Math.PI * 2 * angle) / 360);
          var y = radius * Math.cos((Math.PI * 2 * angle) / 360);

          if (prop == 0) {
            return (
              <G key={key}>
                <Circle
                  ref={(ref) => (this._myCircle3 = ref)}
                  x={width/2}
                  y={width / 2}
                  r={width/4 }
                  
                  fill={colorOrange}
                  cx={-raddi}
                  cy={0}
                />
              </G>
            );
          } 
          
          else if (prop == 1) {
            return (
              <G key={key}>
                <Circle
                  ref={(ref) => (this._myCircle2 = ref)}
                  x={width/2}
                  y={width / 2}
                  r={width/4 }
                 
                  fill={colorOrange}
                  cx={-raddi}
                  cy={0}
                />
              </G>
            );
          }
        else  if (prop == 2) {
            return (
              <G key={key}>
                <Circle
                  ref={(ref) => (this._myCircle1 = ref)}
                  x={width/2}
                  y={width / 2}
                  r={width/4 }
                  fillOpacity={0.8}
                  fill={colorLightBlue}
                  cx={-raddi}
                  cy={0}
                />
              </G>
            );
          } 
          else if (prop == 3) {
            return (
              <G key={key}>
                <Circle
                  ref={(ref) => (this._myCircle4 = ref)}
                  x={width/2}
                  y={width / 2}
                  r={width/4 }
                  fillOpacity={0.8}
                  fill={colorLightBlue}
                  cx={raddi}
                  cy={0}
                />
              </G>
            );
          }

        
        })}
      </Svg>
    );
  }

  render() {
    return <View style={styles.container}>
    
    {this.flowerWings(svgvalue)}

    </View>;
  }
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginRight:0,
    alignItems: "center",
    
   
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
