import React, { Component } from "react";

import Svg, { G, Circle, Defs, ClipPath, Path } from "react-native-svg";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,Image,
  Text,ScrollView
} from "react-native";

var windowheight = 
  Dimensions.get("window").height;

var windowWidth =   Dimensions.get("window").width;
 
let imageUrls;
let i=-1;

class ImageViewer extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.route.params.data.imagesurls);

    imageUrls=(this.props.route.params.data.imagesurls);
      

      }

  componentDidMount() {


  }


 

  render() {
    return <View style={styles.container}>
    
    <ScrollView  
    
    horizontal={true}
    pagingEnabled={true}
    
    >

    {imageUrls.map((prop,key) => {


console.log(prop,"prop");
     
            return (
          <View style={{width:windowWidth,height:windowheight,backgroundColor:'black'}} key={prop}>
           <Image 
           resizeMode="contain"
           style={{ flex: 1, height: undefined, width: undefined }}
        
           source={{uri: prop}}
         
            >
        


           </Image>
           </View>

            );
          
        
        })}

    </ScrollView>

    </View>;
  }
}
export default ImageViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
   
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
