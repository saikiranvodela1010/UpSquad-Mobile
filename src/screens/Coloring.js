import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, ScrollView, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Asset } from 'expo-asset';
import { color } from "react-native-reanimated";
import Svg, { G, Circle, Defs, ClipPath, Path, Rect, Line } from "react-native-svg";
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const maxPercentage = 100;

const generateCoordinates = percent => {
    const a = (percent * 2 * Math.PI) / maxPercentage;
    const x = Math.cos(a);
    const y = Math.sin(a);
    return [x, y];
};

function degreeToRadian(degree) {
    return degree * (Math.PI / 180);
}
const pie = (radius, value) => {
    const x = radius - Math.cos((2 * Math.PI) / (100 / value)) * radius
    const y = radius + Math.sin((2 * Math.PI) / (100 / value)) * radius
    const long = (value <= 50) ? 0 : 1
    const d = `M${radius},${radius} L${radius},${0}, A${radius},${radius} 0 ${long},1 ${y},${x} Z`

    return d
}


const label1 = ['Trust', 'Joy', 'Disgust', 'Sadness', 'Fear', 'Anger', 'Surprise', 'Anticipation'].reverse();



const label2 = ['Remorse', 'Disapproval', 'Awe', 'Anxiety', 'Submission', 'Love', 'Optimism', 'Aggression', 'Contempt',];




const colorcodesinner = ['#B8DD67', '#5DC27E', '#49CBEE', '#4999E9', '#8F71CD', '#E8706E', '#FD9E59', '#FFE948'];
const restColor = "#F1F1F1";

const windowWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
var size = windowWidth * 0.5;
const radius = size / 2;
const viewBox = `-${radius} -${radius} ${size} ${size}`;
let cumulativePercent = 0;
const initialArr = [];

for (var i = 0; i < 9; i++) {
    initialArr.push(i);
}
const label2Pie = ['Anxiety', 'Submission', 'Love', 'Optimism', 'Aggression', 'Contempt', 'Remorse', 'Disapproval', 'Awe',];
const colorcodes = ['#B8DD67', '#D0E89A', '#FFF085', '#FEBF91', '#F0A09E', '#B4A1DE', '#86BBF1', '#86DDF3', '#93D6A9',];
var width = windowWidth * 0.5;
var height = width / 2;

var center = height / 2;
var xPoint = center + Math.cos(degreeToRadian(40.0 * initialArr.length)) * center;
var yPoint = center + Math.sin(degreeToRadian(40.0 * initialArr.length)) * center;
var borerWidth=1.5;
var data = [
    {
        id: 1,
        percent: 12.5,
        percentScale: 96,
        color: 'red',
    },
    {
        id: 2,
        percent: 12.5,
        percentScale: 96,
        color: 'green',
    },
    {
        id: 3,
        percent: 12.5,
        percentScale: 96,
        color: 'blue',
    },
    {
        id: 4,
        percent: 12.5,
        percentScale: 96,
        color: 'pink',
    },
    {
        id: 5,
        percent: 12.5,
        percentScale: 96,
        color: 'pink',
    },
    {
        id: 6,
        percent: 12.5,
        percentScale: 96,
        color: 'pink',
    },
    {
        id: 7,
        percent: 12.5,
        percentScale: 96,
        color: 'pink',
    },
    {
        id: 8,
        percent: 12.5,
        percentScale: 96,
        color: 'pink',
    },

];


export default class App extends Component {
    state = {
      
        isAnxiety: false,
        isSubmission: false,
        isLove: false,
        isOptimism: false,
        isAggression: false,
        isContempt: false,
        isRemorse: false,
        isDisapproval: false,
        isAwe: false,

        isJoy: false,
        isTrust: false,
        isFear: false,
        isSurprice: false,
        isSadness: false,
        isDisgust: false,
        isAnger: false,
        isAnticipation: false,

    }

    constructor() {
        super();
    
       
      }



 
    updateAnxiety = () => this.setState({ isAnxiety: !this.state.isAnxiety })
    updateSubmission = () => this.setState({ isSubmission: !this.state.isSubmission })
    updateLove = () => this.setState({ isLove: !this.state.isLove })
    updateOptimism = () => this.setState({ isOptimism: !this.state.isOptimism })
    updateAggression = () => this.setState({ isAggression: !this.state.isAggression })
    updateContempt = () => this.setState({ isContempt: !this.state.isContempt })
    updateRemorse = () => this.setState({ isRemorse: !this.state.isRemorse })
    updateDisapproval = () => this.setState({ isDisapproval: !this.state.isDisapproval })
    updateAwe = () => this.setState({ isAwe: !this.state.isAwe })


    updatisJoy = () => this.setState({ isJoy: !this.state.isJoy })
    updatisTrust = () => this.setState({ isTrust: !this.state.isTrust })
    updatisFear = () => this.setState({ isFear: !this.state.isFear })
    updatisSurprice = () => this.setState({ isSurprice: !this.state.isSurprice })

    updatisSadness = () => this.setState({ isSadness: !this.state.isSadness })
    updatisDisgust = () => this.setState({ isDisgust: !this.state.isDisgust })
    updatisAnger = () => this.setState({ isAnger: !this.state.isAnger })
    updatisAnticipation = () => this.setState({ isAnticipation: !this.state.isAnticipation })



    updateOuterCircleColors(prop) {
        if (prop == 0) {
            this.updateAnxiety();
        }
        else if (prop == 1) {
            this.updateSubmission();
        }
        else if (prop == 2) {
            this.updateLove();
        }
        else if (prop == 3) {
            this.updateOptimism();
        }
        else if (prop == 4) {
            this.updateAggression();
        }
        else if (prop == 5) {
            this.updateContempt();
        }
        else if (prop == 6) {
            this.updateRemorse();
        }
        else if (prop == 7) {
            this.updateDisapproval();
        }
        else if (prop == 8) {
            this.updateAwe();
        }

    }

    updateSliceColor(id) {
        if (id == 1) {
            this.updatisJoy();
        }
        else if (id == 2) {
            this.updatisTrust();
        }
        else if (id == 3) {
            this.updatisFear();
        }
        else if (id == 4) {
            this.updatisSurprice();
        }

        else if (id == 5) {
            this.updatisSadness();
        }
        else if (id == 6) {
            this.updatisDisgust();
        }
        else if (id == 7) {
            this.updatisAnger();

        }
        else if (id == 8) {
            this.updatisAnticipation();
        }



    }

    


    render() {
        return (
            <View style={[styles.container,
            ]}
            
            // onPress()
            
            >
         
                <ScrollView style={[styles.container]}>
                   


                    {initialArr.map((prop, key) => {

                      

                        return (

                            <View key={key} style={[{ alignItems: 'center' }, { width: '100%' }, { height: windowWidth }, { backgroundColor: 'brown+' }]}>

                                {initialArr.map((prop, key) => {

                                    console.log(xPoint, yPoint);
                                    if (prop == 8 || prop == 9) {
                                        return (
                                            <Svg key={key} onPress={() => {
                                                // alert(label2Pie[prop - 1] + "patch");

                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => {
                                                        this.updateOuterCircleColors(prop);
                                                        // alert(label2Pie[prop] + " " + prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isAwe ?borerWidth : 0}
                                                    cx="0" cy={height} r={height} fill={this.state.isAwe ? restColor : colorcodes[prop]} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {

                                                        this.updateOuterCircleColors(0);

                                                    }
                                                    }

                                                    style={[
                                                        {
                                                            transform: [{ rotate: prop * +40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                                        },]}

                                                    cx={-yPoint + prop} cy={width * 0.41} r={width / 2}
                                                    stroke={'grey'} strokeWidth={this.state.isAnxiety ? borerWidth : 0}
                                                    fill={this.state.isAnxiety ? restColor : colorcodes[0]} />

                                                <Circle
                                                    onPress={() => {
                                                        this.updateOuterCircleColors(prop);
                                                        // alert(label2Pie[prop] + " " + prop);

                                                    }}
                                                    style={[
                                                        {
                                                            transform: [{ rotate: '-20deg' }, { translateX: -10 }, { translateY: 10 },]
                                                        },]}
                                                    stroke={'grey'} strokeWidth={this.state.isSubmission ? borerWidth : 0}
                                                    fill={this.state.isSubmission ? restColor : colorcodes[1]} //1
                                                    cx={-height*0.26} cy={height / 2 + 15} r={height * 0.31} >
                                                </Circle>
                                            </Svg>

                                        );
                                    }
                                    else if (prop == 0) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(8);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    cx={0} cy={height} stroke={'grey'} strokeWidth={this.state.isAnxiety ? borerWidth:0}
                                                    r={height} fill={this.state.isAnxiety ? restColor : colorcodes[prop]} >

                                                </Circle>



                                            </Svg>
                                        );
                                    }

                                    else if (prop == 1) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isSubmission ? borerWidth:0}
                                                    cx={0} cy={height} r={height} fill={this.state.isSubmission ? restColor : colorcodes[prop]} >

                                                </Circle>


                                            </Svg>
                                        );
                                    }

                                    else if (prop == 2) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>

                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>

                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isLove ? borerWidth:0}
                                                    cx={0} cy={height} r={height} fill={this.state.isLove ? restColor : colorcodes[prop]} >

                                                </Circle>

                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}

                                                    stroke={'grey'} strokeWidth={this.state.isAnxiety ? borerWidth:0}
                                                    cx={100} y={0} x={-width}

                                                    cy={160}
                                                    r={20} fill={this.state.isLove ? restColor : 'red'} >

                                                </Circle>




                                            </Svg>
                                        );
                                    }
                                    else if (prop == 3) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isOptimism ? borerWidth:0}
                                                    cx={0} cy={height} r={height} fill={this.state.isOptimism ? restColor : colorcodes[prop]} >

                                                </Circle>


                                            </Svg>
                                        );
                                    }

                                    else if (prop == 4) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isAggression ? borerWidth:0}
                                                    cx={0} cy={height} r={height} fill={this.state.isAggression ? restColor : colorcodes[prop]} >

                                                </Circle>


                                            </Svg>
                                        );
                                    }

                                    else if (prop == 5) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isContempt ? borerWidth:0}
                                                    cx={0} cy={height} r={height} fill={this.state.isContempt ? restColor : colorcodes[prop]} >

                                                </Circle>


                                            </Svg>
                                        );
                                    }
                                    else if (prop == 6) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isRemorse ? borerWidth:0}
                                                    cx={0} cy={height} r={height} fill={this.state.isRemorse ? restColor : colorcodes[prop]} >

                                                </Circle>


                                            </Svg>
                                        );
                                    }
                                    else if (prop == 7) {
                                        return (
                                            <Svg key={key} onPress={() => {

                                                console.log(label2Pie[prop - 1] + "patch");
                                                this.updateOuterCircleColors(prop - 1);
                                            }} style={[{
                                                transform: [{ rotate: -prop * 40 + 'deg' }, { translateX: xPoint }, { translateY: -yPoint },]
                                            }, { margin: height },
                                            { position: 'absolute' }, { alignItems: 'center' }, { justifyContent: 'center' }]}
                                                height={width} width={height + 2}>
                                                <Circle
                                                    onPress={() => { console.log(label2Pie[prop] + "in up O|" + prop); }}
                                                    cx={height * 0.4} cy={height / 2} r={height - 10} fill={'#00000000'} >
                                                </Circle>
                                                <Circle
                                                    onPress={() => {
                                                        console.log(label2Pie[prop] + " " + prop);
                                                        this.updateOuterCircleColors(prop);

                                                    }}
                                                    stroke={'grey'} strokeWidth={this.state.isDisapproval ? borerWidth:0}
                                                    cx={0} cy={height} r={height} fill={this.state.isDisapproval ? restColor : colorcodes[prop]} >

                                                </Circle>


                                            </Svg>
                                        );
                                    }


                                })}



                                <View style={[{ width: size, height: size, marginTop: (windowWidth / 2) - (size) / 2 }, { backgroundColor: '#00000000' }, { alignItems: 'center' }]}>

                                    <Svg backgroundColor={'red'} color={'red'} alignItems={'center'}
                                        width={size}
                                        height={size}
                                        viewBox={viewBox}
                                        style={{ transform: [{ rotate: '-90deg' }] }}>

                                        <Svg   //2   r1
                                            x="0"
                                            y="0"
                                            width={'50%'}
                                            height={'50%'}
                                            // style={[{rotate:'15deg'},  {translateX:120},{translateY:30},{transform:[{rotate:'15deg'},{scale:2}]}]}

                                            backgroundColor="#00000000"
                                        >
                                            {initialArr.map((prop, key) => {


                                                var radius = 60;
                                                console.log(radius)
                                                var angle = 40 * prop;
                                                var x = radius * Math.sin(Math.PI * 2 * angle / 360) - 5;
                                                var y = radius * Math.cos(Math.PI * 2 * angle / 360) - 5;
                                                var xx = radius * Math.sin(Math.PI * 2 * 0 / 360) - 5;
                                                var yy = radius * Math.cos(Math.PI * 2 * 0 / 360) - 5;
                                                console.log('Points coors are  x=' + Math.round(x * 100) / 100 + ', y=' + Math.round(y * 100) / 100)


                                                if (prop <= 8) {
                                                    return (
                                                        <G key={key}>
                                                            <Circle onPress={(evt) => {


                                                                if (prop == 8) {
                                                                    if (evt.nativeEvent.locationX <= radius) {
                                                                        //bottom
                                                                        this.updateOuterCircleColors(7)
                                                                    }
                                                                    else {
                                                                        //top  North Cam
                                                                        this.updateOuterCircleColors(1)
                                                                    }
                                                                }
                                                                else {
                                                                    this.updateOuterCircleColors(prop - 1)
                                                                }




                                                            }}
                                                                key={key} r={(height)} width={10} height={10} fillOpacity={0} fill={colorcodes[prop - 1]} cx={x} cy={x <= 0 ? y + 2 * prop : y} />



                                                        </G>

                                                    )
                                                }


                                            })}

                                            <Circle cx={-height * 0.25}
                                                onPress={(evt) => {



                                                    console.log(`blue x coord = ${evt.nativeEvent.locationX}`)
                                                    console.log(`blue y coord = ${evt.nativeEvent.locationY}`)
                                                    console.log(`radoius coord = ${radius}`)

                                                    if (evt.nativeEvent.locationX <= radius) {
                                                        //bottom
                                                        this.updateOuterCircleColors(8)
                                                    }
                                                    else {
                                                        //top  North Cam
                                                        this.updateOuterCircleColors(0)
                                                    }

                                                }
                                                }


                                                cy={height * 0.7} r={(size / 2.8)} fill="red" fillOpacity={0} />

                                            <Circle onPress={(evt) => {

                                                this.updateOuterCircleColors(0)
                                                // console.log(`blue x coord = ${evt.nativeEvent.locationX}`)
                                                // console.log(`blue y coord = ${evt.nativeEvent.locationY}`)
                                                // console.log(`radoius coord = ${radius}`)


                                                // if (evt.nativeEvent.locationX <= radius) {
                                                //     //bottom
                                                // }
                                                // else {
                                                //     //top  North Cam
                                                // }




                                            }
                                            }
                                                fillOpacity={0} cx={height * -0.04} cy={height * 0.7} r={(size / 4.5)} fill="blue" />




                                            {/* {data.map(slice => {

                                               var restColor='grey';
                                               var restColor2='white';
                                                if (slice.id == 1) {

                                                    return (


                                                        <G key={slice.id}>
                                                            <Defs>
                                                                <ClipPath id={'clip'}>

                                                                    <Path stroke={this.state.isAnger ? restColor :'white'} strokeWidth={2*borerWidth} d={pie(radius, 99.99999)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle stroke={this.state.isAnger ? restColor :'white'} strokeWidth={2*borerWidth}
                                                                onPress={() => {

                                                                    this.updateSliceColor(7)


                                                                }}

                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isAnger ? restColor2 : colorcodesinner[5]} clipPath={'url(#clip)'} />
                                                        </G>





                                                    );
                                                }

                                                if (slice.id == 2) {

                                                    return (


                                                        <G key={slice.id}>
                                                            <Defs>
                                                                <ClipPath stroke={this.state.isDisgust ? restColor :'white'} strokeWidth={2*borerWidth} id={'clip2'}>
                                                                    <Path stroke={'white'} strokeWidth={borerWidth} d={pie(radius, 7 * 12.4875)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle
                                                                onPress={() => {

                                                                    this.updateSliceColor(6)


                                                                }} stroke={this.state.isDisgust ? restColor :'white'} strokeWidth={2*borerWidth}
                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isDisgust ? restColor2 : colorcodesinner[4]} clipPath={'url(#clip2)'} />
                                                        </G>





                                                    );
                                                }
                                                if (slice.id == 3) {

                                                    return (


                                                        <G key={slice.id}>
                                                            <Defs>
                                                                <ClipPath id={'clip3'}>
                                                                    <Path d={pie(radius, 6 * 12.4875)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle stroke={this.state.isSadness ? restColor :'white'} strokeWidth={2*borerWidth}
                                                                onPress={() => {


                                                                    this.updateSliceColor(5)

                                                                }}
                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isSadness ? restColor2 : '#4999E9'}
                                                                clipPath={'url(#clip3)'} />
                                                        </G>





                                                    );
                                                }

                                                if (slice.id == 4) {

                                                    return (


                                                        <G key={slice.id}>
                                                            <Defs>
                                                                <ClipPath id={'clip4'}>
                                                                    <Path d={pie(radius, 5 * 12.4875)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle stroke={this.state.isSurprice ? restColor :'white'} strokeWidth={2*borerWidth}
                                                                onPress={() => {


                                                                    this.updateSliceColor(4)

                                                                }}
                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isSurprice ? restColor2 : '#49CBEE'} clipPath={'url(#clip4)'} />
                                                        </G>





                                                    );
                                                }

                                                if (slice.id == 5) {

                                                    return (


                                                        <G key={slice.id}>
                                                            <Defs>
                                                                <ClipPath id={'clip5'}>
                                                                    <Path d={pie(radius, 4 * 12.4875)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle stroke={this.state.isFear ? restColor :'white'} strokeWidth={2*borerWidth}
                                                                onPress={() => {


                                                                    this.updateSliceColor(3)

                                                                }}
                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isFear ? restColor2 : '#5DC27E'} clipPath={'url(#clip5)'} />
                                                        </G>





                                                    );
                                                }

                                                if (slice.id == 6) {

                                                    return (


                                                        <G key={slice.id}>
                                                            <Defs>
                                                                <ClipPath id={'clip6'}>
                                                                    <Path d={pie(radius, 3 * 12.4875)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle stroke={this.state.isTrust ? restColor :'white'} strokeWidth={2*borerWidth}
                                                                onPress={() => {


                                                                    this.updateSliceColor(2)

                                                                }}
                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isTrust ? restColor2 : '#B8DD67'} clipPath={'url(#clip6)'} />
                                                        </G>





                                                    );
                                                }

                                                if (slice.id == 7) {

                                                    return (


                                                        <G key={slice.id}>
                                                            <Defs>
                                                                <ClipPath id={'clip7'}>
                                                                    <Path d={pie(radius, 2 * 12.4875)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle stroke={this.state.isJoy ? restColor :'white'} strokeWidth={2*borerWidth}
                                                                onPress={() => {


                                                                    this.updateSliceColor(1)

                                                                }}
                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isJoy ? restColor2 : colorcodesinner[7]} clipPath={'url(#clip7)'} />
                                                        </G>





                                                    );
                                                }

                                                if (slice.id == 8) {

                                                    return (


                                                        <G key={slice.id} onPress={() => {

                                                            alert(slice.id)


                                                        }}   >
                                                            <Defs>
                                                                <ClipPath id={'clip8'}>
                                                                    <Path d={pie(radius, 1 * 12.4875)} />
                                                                </ClipPath>
                                                            </Defs>

                                                            <Circle disabled={false} stroke={this.state.isAnticipation ? restColor :'white'} strokeWidth={2*borerWidth}



                                                                onPress={() => {

                                                                    this.updateSliceColor(8)


                                                                }}
                                                                x={-radius} y={-radius} cx={radius} cy={radius} r={radius} fill={this.state.isAnticipation ? restColor2 : colorcodesinner[6]} clipPath={'url(#clip8)'} />
                                                        </G>





                                                    );
                                                }



                                            })} */}





                                            {/* {data.map(prop => {

                                                var angle = 45 * prop.id;
                                                var xx = radius * Math.sin(Math.PI * 2 * angle / 360);
                                                var yy = radius * Math.cos(Math.PI * 2 * angle / 360);
                                                console.log("xx,yy")
                                                console.log(xx, yy)
                                                var restColor="grey";
                                                if (prop.id == 1) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isTrust||this.state.isFear?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }
                                                else if (prop.id == 2) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isTrust||this.state.isJoy?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }
                                                if (prop.id == 3) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isAnticipation||this.state.isJoy?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }
                                                if (prop.id == 4) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isAnticipation||this.state.isAnger?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }
                                                if (prop.id == 5) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isDisgust||this.state.isAnger?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }
                                                if (prop.id == 6) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isDisgust||this.state.isSadness?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }
                                                if (prop.id == 7) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isSurprice||this.state.isSadness?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }
                                                if (prop.id == 8) {
                                                    return (
                                                        <Line key={prop.id} x1="0" y1="0" x2={xx} y2={yy} stroke={this.state.isSurprice||this.state.isFear?restColor: 'white'} strokeWidth={borerWidth} />
                                                    )
                                                }


                                            })}





                                            <Circle cx="0" cy="0" r={(size * 0.13)} fill="white" />
                                            <Circle cx="0" cy="0" r={(size * 0.12)} fill="#F1F1F1" />



                                            <Text style={[{ alignItems: 'center' }, { color: '#1E1C24' }, { backgroundColor: 'transparent' },
                                            { transform: [{ rotate: '90deg' }, { translateX: height - 12.5 }, { translateY: -height + 25 }] },
                                            { justifyContent: 'center' }, { position: 'absolute' }, { textAlign: 'center' }

                                                ,
                                            { width: 50 }, { height: 20 }, { marginTop: 'auto' }, { marginBottom: 'auto' }, { marginLeft: 'auto' }, { marginRight: 'auto' }, { margin: 'auto' }



                                            ]} > I FEEL</Text> */}




                                        </Svg>
                                    </Svg>
                                </View>



                                {/* inner text start */}


                                {/* {initialArr.map((prop, key) => {


                                    if (prop == 0) {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: -height / 2 - 10 }, { translateY: height - 25 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(8)
                                                }}

                                            > {label1[prop]}
                                            </Text>


                                        );
                                    }
                                    else if (prop == 1) //trust
                                    {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: height / 2 + 10 }, { translateY: height + 10 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(4)
                                                }}

                                            >  {label1[prop]}
                                            </Text>


                                        );
                                    }
                                    else if (prop == 2) {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: -height / 2 - 10 }, { translateY: height + 10 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(7)
                                                }}

                                            >  {label1[prop]}
                                            </Text>


                                        );
                                    }
                                    else if (prop == 3)  //surprise
                                    {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: height / 2 + 10 }, { translateY: height - 25 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(3)
                                                }}

                                            > {label1[prop]}
                                            </Text>


                                        );
                                    }

                                    else if (prop == 4)  //sadness
                                    {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: height / 2 - 20 }, { translateY: 2 * height - 40 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(5)
                                                }}

                                            >  {label1[prop]}
                                            </Text>


                                        );
                                    }
                                    else if (prop == 5)  //surprise
                                    {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: -height / 2 + 15 }, { translateY: 2 * height - 40 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(6)
                                                }}

                                            >  {label1[prop]}
                                            </Text>


                                        );
                                    }

                                    else if (prop == 6)  //surprise
                                    {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: -30 }, { translateY: 25 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(1)
                                                }}

                                            >  {label1[prop]}
                                            </Text>


                                        );
                                    }

                                    else if (prop == 7)  //surprise
                                    {
                                        var i = label1[prop]
                                        console.log(i)
                                        return (
                                            <Text width={height * 0.8} backgroundColor={'red'} key={key} style={[styles.pietextlabel, { margin: height }, { position: 'absolute' }, {
                                                transform: [{ translateX: 30 }, { translateY: 25 }]
                                            }, { alignContent: 'center' }, { justifyContent: 'center' }]}
                                                onPress={() => {

                                                    this.updateSliceColor(2)
                                                }}

                                            >  {label1[prop]}
                                            </Text>


                                        );
                                    }





                                }
                                )} */}

                                {/* inner text end */}


                             

                                {/* Outer Text Start */}


                                {/* {initialArr.map((prop, key) => {

                                    var radius = (width / 1.5);
                                    var angle = 40 * prop;
                                    var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                                    var y = radius * Math.cos(Math.PI * 2 * angle / 360);
                                    console.log(x, y)

                                    if (prop == 0)  //anxiety
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '30deg' }, { translateX: x + 50 }, { translateY: y }, { scale: 1 }]
                                            }]}
                                                onPress={() => {
                                                    console.log('pie', prop)
                                                    this.updateOuterCircleColors(6)

                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }
                                    else if (prop == 1)  //anxiety
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '-15deg' }, { translateX: x - 40 }, { translateY: y + 35 }, { scale: 1 }]
                                            }]}
                                                onPress={() => {
                                                    console.log('pie', prop)
                                                    this.updateOuterCircleColors(7)
                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }


                                    else if (prop == 2)  //anxiety
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '-30deg' }, { translateX: x - 60 }, { translateY: 5 * y }, { scale: 1 }]
                                            }]}
                                                onPress={() => {
                                                    this.updateOuterCircleColors(8)
                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }
                                    else if (prop == 3)  //AWE
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '70deg' }, { translateX: x - 110 }, { translateY: y - 65 }, { scale: 1 }]
                                            }]}
                                                onPress={() => {

                                                    this.updateOuterCircleColors(0)
                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }
                                    else if (prop == 4)  //anxiety
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '50deg' }, { translateX: -x + 10 }, { translateY: y + 5 }, { scale: 1 }]
                                            }]}
                                                onPress={() => {
                                                    console.log('pie', prop)
                                                    this.updateOuterCircleColors(1)
                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }
                                    else if (prop == 5)  //love
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '10deg' }, { translateX: x - 10 }, { translateY: y + 10 }, { scale: 1 }]
                                            }]}
                                                onPress={() => {
                                                    console.log('pie', prop)
                                                    this.updateOuterCircleColors(2)
                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }
                                    else if (prop == 6)  //Optimism
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '-30deg' }, { translateX: x + 50 }, { translateY: y - 45 }, { scale: 1 }]
                                            }]}
                                                onPress={() => {
                                                    console.log('pie', prop)
                                                    this.updateOuterCircleColors(3)
                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }
                                    else if (prop == 7)  //Aggregression
                                    {
                                        return (
                                            <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                                transform: [{ rotate: '-55deg' }, { translateX: x + 40 }, { translateY: -y - 75 }, { scale: 1 }]
                                            }]}
                                                onPress={() => {
                                                    console.log('pie', prop)
                                                    this.updateOuterCircleColors(4)
                                                }}   >
                                                {label2[prop]}
                                            </Text>

                                        );

                                    }

                                    return (

                                        <Text backgroundColor={'red'} key={key} style={[styles.outertextlabel, { marginTop: height + height * 0.8 }, { position: 'absolute' }, {
                                            transform: [{ rotate: '70deg' }, { translateX: x + 140 }, { translateY: y + 20 }, { scale: 1 }]
                                        }]}
                                            onPress={() => {
                                                console.log('pie', prop)
                                                this.updateOuterCircleColors(5)
                                            }}   >
                                            {label2[prop]}
                                        </Text>


                                    );







                                }
                                )} */}

                                {/* Outer text End */}



                            </View>

                        )


                    })}








                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1,
        
    },
    pietextlabel: {
        fontSize: 12,
        backgroundColor: "#00000000",
    },
    outertextlabel: {
        fontSize: 14,
        backgroundColor: "#00000000",
    },
});






