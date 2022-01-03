import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,ImageBackground,Image,Dimensions,TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video ,{FilterType} from 'react-native-video';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts'
import { ScrollView } from 'react-native-gesture-handler';

import Modal from 'react-native-modal';




export default class MeetingsScreen extends React.Component {


    constructor(props){
        super(props);
       
        this.state={
            tapstate:false,
        }
       
    }


    render(){
        return(
            <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar1')}>
                        <Image
                            source={ImagesWrapper.back}

                        />
                    </TouchableOpacity>
                </View>
                <ScrollView >
                <Image source={ImagesWrapper.manpic3} style={{width:'100%'}}/>
                <View style={[styles.card]}>
                        <Text style={styles.name}>Ben Thompson</Text>
                        <Text style={styles.technologytext}>Technology management | Business ownership | Business ownership</Text>
                        <Text style={[styles.technologytext,{color:'#58C4C6'}]}>See more</Text>
                        <View style={{flexDirection:'row',marginTop:10}}>
                                <Image source={ImagesWrapper.users}/>
                                <Text style={[styles.technologytext,{fontSize:12,marginLeft:10,marginTop:5}]}>Member of ManagementTeam</Text>
                        </View>
                        <View style={styles.followercrad}>

                                <View style={{marginLeft:30}}>
                                    <Text style={[styles.technologytext,]}>Post</Text>
                                    <Text style={styles.name}>100</Text>
                                </View>
                                <View style={{ borderWidth:0.3, borderColor: '#F1F1F1',marginTop:18,marginBottom:18 }}></View>
                                <View >
                                    <Text style={styles.technologytext}>Followers</Text>
                                    <Text style={styles.name}>120</Text>
                                </View>
                                <View style={{ borderWidth:0.3, borderColor: '#F1F1F1',marginTop:18,marginBottom:18 }}></View>
                                <View style={{marginRight:30}}>
                                    <Text style={styles.technologytext}>Following</Text>
                                    <Text style={styles.name}>100</Text>
                                </View>
                        </View>                           
                        <View style={{flexDirection:'row',marginTop:20,marginRight:10}}>
                                <TouchableOpacity
                                onPress={() => {
                                    // props.navigation.navigate('profilesuccess')
                                    // alert('length'+addCard[0].id)
                                }}
                               
                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradientButton]}>
                                    <Text style={[styles.buttonText, { color:'#FFFFFF' }]}>
                                   Follow
                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.setState({tapstate:true})}>
                            <Image source={ImagesWrapper.tap} style={{marginLeft:70,marginTop:15,}}/>
                            </TouchableOpacity>
                     </View>
                     <View style={styles.underline}></View>
                     <Text style={styles.name}>Get in touch</Text>
                    
                       <View style={{flexDirection:'row',marginTop:20,}}>
                           <View>
                               <View  style={styles.messagecard}>
                                <Image source={ImagesWrapper.sendmsg} style={{marginLeft:10}}/>
                               <Text style={[styles.technologytext,{color:'#58C4C6',marginLeft:10,marginTop:5,marginRight:10}]}>Send message</Text>
                               </View>
                               <Text style={[styles.technologytext,{fontSize:12,marginLeft:10,marginTop:10,marginLeft:'auto'}]}>Usually replies the next day</Text>
                           </View>
                           <View>
                               <View  style={[styles.messagecard,{marginLeft:10}]}>
                               <Image source={ImagesWrapper.scalendar} style={{marginLeft:10}}/>
                               <Text style={[styles.technologytext,{color:'#58C4C6',marginLeft:10,marginTop:5,marginRight:10}]}>Schedule a 1:1</Text>
                               </View>
                               <Text style={[styles.technologytext,{fontSize:12,marginLeft:10,marginTop:10,marginRight:'auto'}]}>Available 3 times this month </Text>
                           </View>
                       </View>
                    <View style={styles.underline}></View>
                         <Text style={styles.name}>Self Introduction</Text>
                         {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                         <View style={{width:200,height:110,borderWidth:1}}>
                             <View style={{flex:1}}>
                                <Video
                                    source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                                    style={{flex:1}}
                                    resizeMode='contain'
                                    controls={false}
                                    paused={false}
                                    pictureInPicture={true}
                                    ref={(ref) => {
                                    this.player = ref
                                    }} 
                                    >
                                
                                </Video>
                                </View>
                        </View>
                         {/* </ScrollView> */}
                        <View style={[styles.underline,{marginTop:20}]}></View>
                        <Text style={[styles.name,{fontSize:16}]}>About</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,marginRight:'auto'}]}>I'm Ben Thompson. I’m here to find career guidance. Get in touch with me for strategies for fund raising. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus arcu a purus porta.</Text>
                        <View style={[styles.underline,{marginTop:20}]}></View>
                        <Text style={[styles.name,{fontSize:16}]}>Experience</Text>
                        <Text style={[styles.name,{fontSize:14,marginTop:10}]}>Project Management Trainee</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>Open Destinations</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginLeft:10,marginTop:10,}]}>Internship</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>Nov 2017 - Jan 2018</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginLeft:10,marginTop:10,}]}>3 Months</Text>
                        </View>
                        <Text style={[styles.technologytext,{color:'#58C4C6',marginTop:5,marginRight:20}]}>See all positions</Text>
                        <View style={[styles.underline,{marginTop:10}]}></View>
                        <Text style={[styles.name,{fontSize:16}]}>Education</Text>
                        <Text style={[styles.name,{fontSize:14,marginTop:10}]}>Stanford University</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>MBA</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>2017-2018</Text>
                        <Text style={[styles.technologytext,{color:'#58C4C6',marginTop:5,marginRight:20}]}>See all</Text>
                        <View style={[styles.underline,{marginTop:10}]}></View>

                        <Text style={[styles.name,{fontSize:16}]}>Certifications & Licenses</Text>
                        <Text style={[styles.name,{fontSize:14,marginTop:10}]}>Google Project Management Certificate</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>Issued June 2016</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>No Expiration date</Text>
                        </View>
                        <Text style={[styles.technologytext,{color:'#58C4C6',marginTop:5,marginRight:20}]}>See all</Text>
                        <View style={[styles.underline,{marginTop:10}]}></View>

                        <Text style={[styles.name,{fontSize:16}]}>Publications</Text>
                        <Text style={[styles.name,{fontSize:14,marginTop:10}]}>Stock Market Analysis: A Review and Taxonomy of Prediction Techniques</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>Research Gate</Text>
                        {/* <Text style={[styles.technologytext,{fontSize:14,marginLeft:10,marginTop:10,}]}>2017-2018</Text> */}
                        <Text style={[styles.technologytext,{color:'#58C4C6',marginTop:5,marginRight:20}]}>See all</Text>
                        <View style={[styles.underline,{marginTop:10}]}></View>

                        <Text style={[styles.name,{fontSize:16}]}>Community subscription</Text>
                        <Text style={[styles.name,{fontSize:14,marginTop:10}]}>Eis Organization</Text>
                        <Text style={[styles.technologytext,{fontSize:14,marginTop:10,}]}>Design Team</Text>
                        {/* <Text style={[styles.technologytext,{fontSize:14,marginLeft:10,marginTop:10,}]}>2017-2018</Text> */}
                        <Text style={[styles.technologytext,{color:'#58C4C6',marginTop:5,marginRight:20}]}>See all</Text>
                        
                        {/* Modal code here */}

                        {this.state.tapstate === true ?
            // <Modal
            //     transparent={true}
            //     isVisible={this.state.tapstate}
            //     onBackdropPress={() => this.setState({tapstate:false})}
            //     onRequestClose={() => {
            //         this.setState({tapstate:false})
            //      }}
            // >
            // <View style={styles.modelstyle}>
            //     <Text>Can you think of someone who has an amazing story that the world needs to hear?
            //         Tap them and encourage them to tell a story.</Text>
            // </View>
            // </Modal>
            <Modal
            transparent={true}
            isVisible={this.state.tapstate}
            onBackdropPress={() => this.setState({tapstate:false})}
                onRequestClose={() => {
                    this.setState({tapstate:false})
                 }}
                 style={{
                    justifyContent: 'flex-end',
                    margin: 0
                }}
            
        >
            {/* <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'40%',marginTop:550,width:'110%',marginLeft:-20}}> */}
            <View style={{
                        height: '35%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, bottom: 0, position: 'absolute'
                    }}>
                 <Text style={{fontSize:14,marginTop:30,marginLeft:28,marginRight:30,fontFamily:Fonts.mulishBold,color:'#1E1C24'}}> Tap them and encourage them to tell a story.</Text>
              
               
                     <Text style={{color:'#868585',fontSize:14,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',marginLeft:30,marginTop:15}}>Your message to them</Text>
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
                    <View style={[styles.underline,{width:'85%'}]}/>
                    <View style={{marginTop:40,alignItems:'center'}}>
                <TouchableOpacity
                                onPress={() => {
                                    // props.navigation.navigate('profilesuccess')
                                    // alert('length'+addCard[0].id)
                                }}
                               
                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradientButton,{  width: 350,height:60}]}>
                                    <Text style={[styles.buttonText, { color:'#FFFFFF',alignItems:'center',marginTop:15 }]}>
                                    Tap 
                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                </View>
            </View>
        </Modal>
            :
            null
             }

                </View>
                </ScrollView>
            </View>
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
        marginBottom: 20,
        // borderBottomWidth:1
      },
      card:{
        backgroundColor:'#FFFFFF',
        flex:1,
        width:'100%',
        // height: 'auto',
        marginTop:-20,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        shadowOpacity:0.05,
        paddingLeft:'9%',
        paddingRight:'9%',
        marginBottom:30

    },
    name:{
        fontFamily:Fonts.mulishSemiBold,
        fontSize:20,
        fontWeight:'600',
        color:'#1E1C24',
        marginTop:20
    },
    technologytext:{
       
        marginTop:10,
         color: '#868585', 
         fontSize: 14, 
         fontFamily: Fonts.mulishRegular,
          fontWeight: '400',
        //   textAlign:'center'
    },
    followercrad:{
        height:'6%',
        width:'100%',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#F1F1F1',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // marginBottom:20
    },
    linearGradientButton: {
       
        width: 200,
        // height:'7%',
        borderRadius: 30,
       
        height: 50,
        
    },
    underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        marginTop:20,
        marginRight:'auto',
        width:'100%'
    },
    messagecard:{
        height:60,
        width:'100%', 
        borderRadius:10,
         borderWidth:1, 
         borderColor:'#F1F1F1',
         shadowOpacity:0.3,
         flexDirection:'row',
         alignItems:'center',
        //  marginLeft:20
    },
    textinput:{
        // marginTop:-2,
        marginLeft:30,
        height:Platform.OS==='ios' ? 30:30,
        fontFamily:Fonts.mulishSemiBold,
        fontSize:14,
        color:'#1E1C24',
    },
   
    });