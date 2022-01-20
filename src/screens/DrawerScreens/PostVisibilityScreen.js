import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,SafeAreaView,Image,ScrollView} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import SwitchToggle from "react-native-switch-toggle";
import LinearGradient from 'react-native-linear-gradient';

export default class MeetingsScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            allow: false,
            notify:false,
            radiobtn:"off",
            privateradio:'off',
            specificsquads:'off',
            comments:'off',
            everyone:'off',
            onlyme:'off'
        }
    }

    onRadioPressed(){
        // this.setState({ checkmark: false})
       
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
                    <Text style={styles.memphistalk}>Post Visibility</Text>
                   

                </View>
                <View style={styles.underline}></View>
                <ScrollView>
               <Text style={styles.who}>Who can see your post?</Text>
               <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Public</Text>
                <TouchableOpacity onPress={()=>{ this.state.radiobtn !== "off" ? (this.setState({radiobtn:"off"})): (this.setState({radiobtn:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.radiobtn ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Anyone on UpSquad</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Private</Text>
                   <TouchableOpacity onPress={()=>{this.state.privateradio !== "off"? (this.setState({privateradio:"off"})) : (this.setState({privateradio:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.privateradio ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Only with Memphis Talks Community</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Specific squads</Text>
                   <TouchableOpacity onPress={()=>{this.state.specificsquads !== "off" ? (this.setState({specificsquads:"off"})) : (this.setState({specificsquads:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.specificsquads ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Only with squads within Memphis Talks Community</Text>
                <Text style={styles.who}>What type of responses do I want? </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Comments</Text>
                   <TouchableOpacity onPress={()=>{ this.state.comments !== "off"? (this.setState({comments:"off"})): (this.setState({comments:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.comments ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.who}>Who can see responses to my post?  </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Everyone</Text>
                   <TouchableOpacity onPress={()=>{ this.state.everyone !== "off" ? (this.setState({everyone:"off"})) : (this.setState({everyone:"on"})) }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.everyone ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Only me</Text>
                   <TouchableOpacity onPress={()=>{this.state.onlyme !== "off" ? (this.setState({onlyme:"off"})) : (this.setState({onlyme:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.onlyme ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <View style={{ flexDirection:'row',justifyContent:'space-between', marginRight: '8%',marginTop:-5}}>
                <Text style={styles.who}>Allow sharing  </Text>
                    <View style={{marginTop:30}}>
                        <SwitchToggle
                            switchOn={this.state.allow}
                            onPress={() => this.setState({ allow: !this.state.allow })}
                            circleColorOff='#B1AAAA'
                            circleColorOn='rgba(88, 196, 198, 1)'
                            backgroundColorOn='white'
                            backgroundColorOff='white'
                            containerStyle={{

                                width: 40,
                                height: 23,
                                borderRadius: 25,
                                borderWidth: 1.5,
                                borderColor: this.state.allow == false ? '#B1AAAA' : 'rgba(88, 196, 198, 1)',
                                padding: 5,
                            }}
                            circleStyle={{
                                width: 13,
                                height: 13,
                                borderRadius: 20,

                            }}
                        />
                    </View>
                </View>
                <Text style={[styles.captiontext,{width:'80%'}]}>Allow my post to be shared on other social media platforms</Text>
                <View style={{ flexDirection:'row',justifyContent:'space-between', marginRight: '8%',marginTop:-5}}>
                <Text style={styles.who}>Notify users via email   </Text>
                    <View style={{marginTop:30}}>
                        <SwitchToggle
                            switchOn={this.state.notify}
                            onPress={() => this.setState({ notify: !this.state.notify })}
                            circleColorOff='#B1AAAA'
                            circleColorOn='rgba(88, 196, 198, 1)'
                            backgroundColorOn='white'
                            backgroundColorOff='white'
                            containerStyle={{

                                width: 40,
                                height: 23,
                                borderRadius: 25,
                                borderWidth: 1.5,
                                borderColor: this.state.notify == false ? '#B1AAAA' : 'rgba(88, 196, 198, 1)',
                                padding: 5,
                            }}
                            circleStyle={{
                                width: 13,
                                height: 13,
                                borderRadius: 20,

                            }}
                        />
                    </View>
                </View>
                <View style={{justifyContent:'flex-end',flex:1}}>
                        <TouchableOpacity 
                            onPress={()=>{
                                // this.props.navigation.navigate('Account')
                                // this.onSubmit();
                            }}
                            
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(33, 43, 104, 1)', 'rgba(88, 196, 198, 1)']} style={[styles.linearGradient1, Platform.OS === "ios" ? { marginTop: '6%' } : { marginTop: '6%' }]}>

                                <Text style={styles.nextbtn}>
                                Reset to default
                                </Text>

                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
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
    },
    who:{
        fontSize:16,
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        color:'#1E1C24',
        marginLeft: '8%',
        marginTop:30
    },
    posttext:{
        fontSize:14,
        fontFamily:Fonts.mulishRegular,
        fontWeight:'600',
        color:'#1E1C24',
        marginLeft: '8%',
        marginTop:20
    },
    radio:{
        marginRight: '8%',
        marginTop:20,
    },
    captiontext:{
        fontWeight:'400',
        fontFamily:Fonts.mulishRegular,
        fontSize:12,
        color:'#B1AAAA',
        marginLeft: '8%',
        // marginTop:20
    },
    linearGradient1: {
        width: '85%',
        height: 55,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 55
        


    },
    nextbtn: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Mulish',
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
});