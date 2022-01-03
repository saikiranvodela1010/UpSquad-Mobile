import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const App = () => {
 
    const flowerWings = (width) => {
          
        const initialArr = [];
        for (var i = 0; i < 9; i++) {
            initialArr.push(i);
        }

        return (  <Svg 
            style={[
                { alignItems: "center" },
                { width: width },
                { height: width },
           
              
                {alignSelf:'center'}
            ]}
        >

            {initialArr.map((prop, key) => {
                var radius = width/4;
                var angle = 40 * prop;
                var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                var y = radius * Math.cos(Math.PI * 2 * angle / 360);

                return (
                    <G key={key} >
                        <Circle onPress={() => { alert(label2[prop] + " X") }} x={width/2}
                            y={width/2} r={radius} fillOpacity={0.4}
                            fill={'#58C4C6'} cx={x} cy={y} />

                    </G>
                );
            }
            )
            }







        </Svg>)
    }
    return (
        <View style={styles.container}>


               
            {/* here width=height and radious=width/2 */}


            {flowerWings(300)} 



        </View>
    );
};

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white'
    },
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
});
