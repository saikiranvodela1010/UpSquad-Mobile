import React from 'react'
import {  View, Text,Image,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import Svg, { G, Circle } from "react-native-svg";
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


export default class MeetingsScreen extends React.Component {


    constructor(props){
        super(props);
       
        this.state={
           
            email:'',
            message:'',
           
        }
       
    }

    flowerWings = (width) => {
          
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
                            y={width/2} r={radius} fillOpacity={0.15}
                            fill={'#58C4C6'} cx={x} cy={y} />

                    </G>
                );
            }
            )
            }







        </Svg>)
    }


    render(){
        return(
            <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
                <View style={{marginTop:25,flexDirection:'row',marginLeft:25}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('BioSuccess')}>
                <Image source={ImagesWrapper.back}/>
                </TouchableOpacity>
                <Text style={styles.story}>New Story</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#F1F1F1' ,marginTop:15}}></View>
                <TouchableOpacity>
                <View style={{marginTop:20,marginLeft:50}}>
                {/* {this.flowerWings(300)}  */}
                <Image source={ImagesWrapper.bigvectorplus}/>
                </View>
                </TouchableOpacity>
                <Text style={{color:'#868585',fontSize:14,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',marginLeft:30,marginTop:20}}>Story title</Text>
                <TextInput
                        style={styles.textinput}
                        // onChangeText={(Email) => {
                        //     this.setState({email:Email})
                        //     this.setState({emailerr:''})
                        // }}
                        value={this.state.email}
                        // returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        // ref={(input) => { this.thirdTextInput = input; }}
                        // onSubmitEditing={() => { this.fourTextInput.focus(); }}
                        // importantForAutofill="no" 
                        maxLength={63}
                        // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        blurOnSubmit={false}
                    />
                    <View style={styles.underline}/>
                     <Text style={{color:'#868585',fontSize:14,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',marginLeft:30,marginTop:15}}>Discription</Text>
                 <TextInput
                        style={styles.textinput}
                        // onChangeText={(Email) => {
                        //     this.setState({email:Email})
                        //     this.setState({emailerr:''})
                        // }}
                        value={this.state.email}
                        // returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        // ref={(input) => { this.thirdTextInput = input; }}
                        // onSubmitEditing={() => { this.fourTextInput.focus(); }}
                        // importantForAutofill="no" 
                        // maxLength={63}
                        // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        // blurOnSubmit={false}
                    />
                    <View style={styles.underline}/>
                 <Text style={[styles.post,{fontSize:16,fontFamily:Fonts.mulishBold,fontWeight:'400',marginTop:15,marginLeft:30,marginRight:30}]}>What are your feelings about this story?</Text>
                <View style={{marginLeft:30,marginRight:30}}>
                 <Text style={[styles.post,{fontSize:12,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',color:"#868585"}]}>Select your emotion based on 
                 <Text style={[styles.post,{padding:0,fontSize:12,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',
                 textDecorationLine: 'underline',textDecorationColor: '#58C4C6',
                 textDecorationStyle: 'solid',color:'#58C4C6'}]}> Plutchik's Wheel of Emotions</Text>
                </Text>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    story:{
        fontSize:20,
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        marginLeft:20
        // padding:8,
    },
    underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.3,
        marginLeft:30,
        marginTop:Platform.OS==='ios' ? null:'-3%',
        marginRight:23
    },
    post:{
        fontSize:18,
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding:8,
        // marginLeft:10
    },
})