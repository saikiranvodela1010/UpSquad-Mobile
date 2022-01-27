import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,SafeAreaView,Image,ScrollView} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import SwitchToggle from "react-native-switch-toggle";
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box'  




export default class StorySettingsScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            allow: false,
            notify:false,
            radiobtn:"off",
            privateradio:'off',
            specificsquads:'off',
            comments:'off',
            emojieveryone:'off',
            emojionlyme:'off',
            commentseveryone:'off',
            commentsonlyme:'off',
            videoseveryone:'off',
            videosonlyme:'off',
            emojis:false,
            checkcomments:false,
            videos:false,
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
                      this.props.navigation.navigate('DefaultVisibility'
                          // back:this.state.back,
                          );
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                            // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Story Settings</Text>
                   

                </View>
                <View style={styles.underline}></View>
                <ScrollView>
               <Text style={styles.who}>Who can see your post?</Text>
               <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Public</Text>
                <TouchableOpacity onPress={()=>{ this.state.radiobtn !== "off" ? (this.setState({radiobtn:"off"})): (this.setState({radiobtn:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.radiobtn ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Anyone on UpSquad</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Private</Text>
                   <TouchableOpacity onPress={()=>{this.state.privateradio !== "off"? (this.setState({privateradio:"off"})) : (this.setState({privateradio:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.privateradio ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Only with Memphis Talks Community</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Specific squads</Text>
                   <TouchableOpacity onPress={()=>{this.state.specificsquads !== "off" ? (this.setState({specificsquads:"off"})) : (this.setState({specificsquads:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.specificsquads ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Only with squads within Memphis Talks Community</Text>
                <Text style={styles.who}>What type of responses do I want? </Text>
                <View>
                <View style={styles.text}>

                <CheckBox

                onClick={() => {
                    this.setState({
                        emojis: !this.state.emojis
                    })
                }}
                
                isChecked={this.state.emojis}

                //leftText={"CheckBox"}
                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                />
                <Text style={[styles.checkboxtxt1,{color:this.state.emojis === true ?'#1E1C24':'#B1AAAA'}]}>Emojis</Text>
                </View>
                <View style={[styles.text,{marginTop:'1%'}]}>

                <CheckBox

                onClick={() => {
                    this.setState({
                        checkcomments: !this.state.checkcomments
                    })
                }}
                
                isChecked={this.state.checkcomments}

                //leftText={"CheckBox"}
                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                />
                <Text style={[styles.checkboxtxt1,{color:this.state.emojis === true ?'#1E1C24':'#B1AAAA'}]}>Comments</Text>
                </View>
                <View style={[styles.text,{marginTop:'1%'}]}>

                <CheckBox

                onClick={() => {
                    this.setState({
                        videos: !this.state.videos
                    })
                }}
                
                isChecked={this.state.videos}

                //leftText={"CheckBox"}
                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                />
                <Text style={[styles.checkboxtxt1,{color:this.state.emojis === true ?'#1E1C24':'#B1AAAA'}]}>Videos</Text>
                </View>
                </View>
                <Text style={styles.who}>Who can see responses to my post?  </Text>
                <View>
                <Text style={styles.posttext}>Emojis</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={[styles.posttext,{color:this.state.emojieveryone === "on" ?'#1E1C24':'#B1AAAA',marginTop:'2%'}]}>Everyone</Text>
                   <TouchableOpacity onPress={()=>{ this.state.emojieveryone !== "off" ? (this.setState({emojieveryone:"off"})) : (this.setState({emojieveryone:"on"})) }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.emojieveryone ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%',marginTop:'2%'}]}/>
                 </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={[styles.posttext,{color:this.state.emojionlyme === "on" ?'#1E1C24':'#B1AAAA',marginTop:'4%'}]}>Only me</Text>
                   <TouchableOpacity onPress={()=>{this.state.emojionlyme !== "off" ? (this.setState({emojionlyme:"off"})) : (this.setState({emojionlyme:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.emojionlyme ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%',marginTop:'10%'}]}/>
                 </TouchableOpacity>
                </View>
                </View>
                <View>
                <Text style={styles.posttext}>Comments</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={[styles.posttext,{color:this.state.commentseveryone === "on" ?'#1E1C24':'#B1AAAA',marginTop:'2%'}]}>Everyone</Text>
                   <TouchableOpacity onPress={()=>{ this.state.commentseveryone !== "off" ? (this.setState({commentseveryone:"off"})) : (this.setState({commentseveryone:"on"})) }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.commentseveryone ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%',marginTop:'2%'}]}/>
                 </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={[styles.posttext,{color:this.state.commentsonlyme === "on" ?'#1E1C24':'#B1AAAA',marginTop:'4%'}]}>Only me</Text>
                   <TouchableOpacity onPress={()=>{this.state.commentsonlyme !== "off" ? (this.setState({commentsonlyme:"off"})) : (this.setState({commentsonlyme:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.commentsonlyme ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%',marginTop:'10%'}]}/>
                 </TouchableOpacity>
                </View>
                </View>
                <View>
                <Text style={styles.posttext}>Videos</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={[styles.posttext,{color:this.state.videoseveryone === "on" ?'#1E1C24':'#B1AAAA',marginTop:'2%'}]}>Everyone</Text>
                   <TouchableOpacity onPress={()=>{ this.state.videoseveryone !== "off" ? (this.setState({videoseveryone:"off"})) : (this.setState({videoseveryone:"on"})) }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.videoseveryone ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%',marginTop:'2%'}]}/>
                 </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={[styles.posttext,{color:this.state.videosonlyme === "on" ?'#1E1C24':'#B1AAAA',marginTop:'4%'}]}>Only me</Text>
                   <TouchableOpacity onPress={()=>{this.state.videosonlyme !== "off" ? (this.setState({videosonlyme:"off"})) : (this.setState({videosonlyme:"on"}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.videosonlyme ==='on'? ImagesWrapper.radiobtn1 : ImagesWrapper.radiogrey}
                 style={[styles.radio,{marginRight:this.state.radiogrey === "off"?'8%':'9%',marginTop:'10%'}]}/>
                 </TouchableOpacity>
                </View>
                </View>
                <View style={{ flexDirection:'row',marginTop:-5,justifyContent:'space-between',marginRight:'8%'}}>
                  
                    <Text style={styles.who}>Allow sharing  </Text>
                  
                    <View style={{marginTop:20}}>
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
               <Text style={[styles.captiontext,{width:'70%'}]}>Allow my post to be shared on other social media platforms</Text>
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
        marginTop:'4%'
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
    text: {
        flexDirection: 'row',
        marginBottom: 15,
        marginLeft: '8%',
        marginTop:20
    },
    checkboxtxt1: {
        marginLeft: 12,
        fontSize: 14,
        // color: '#000000',
        // marginTop: 5,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'

    },
});