import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,SafeAreaView,Image,ScrollView,Modal,ActivityIndicator,} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import SwitchToggle from "react-native-switch-toggle";
import LinearGradient from 'react-native-linear-gradient';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';


export default class PostVisibiltyScreen extends React.Component {


    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();

    constructor() {
        super();
        this.state = {
            allow: false,
            notify:false,
            radiobtn:0,
            // publicValue:0,
            privateradio:0,
            specificsquads:0,
            comments:0,
            everyone:0,
            onlyme:0,
            userId:'',
            isLoading: false,
            
        }
    }

    async componentDidMount(){
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        console.log('userDetails',userDetails);
        this.setState({userId:userDetails.userId});
        this.getUserSettings();
      
    }
   async getUserSettings(){
    this.setState({isLoading:true})
    const data = this.state.userId;
    const response = await this.apiHandler.requestGet( data,this.serviceUrls.getUserSettings);
    console.log("settings response",response.data[0].visibilitySettings.social);
   if(response.status === true){
       this.setState({isLoading:false})
    if(response.data[0].visibilitySettings.social.responsesSocial[0] === 1){
        this.setState({comments:1});
    }
    if(response.data[0].visibilitySettings.social.socialPost===1){
    this.setState({privateradio:1});
    }else if(response.data[0].visibilitySettings.social.socialPost === 2){
        this.setState({specificsquads:1});
    }
    
    if(response.data[0].visibilitySettings.social.responsesPost === 1){
        this.setState({everyone:1});
    }else if(response.data[0].visibilitySettings.social.responsesPost === 2){
        this.setState({onlyme:1});
    }
    }
    }

    async resetDefault(){
        this.setState({isLoading:true});
        let socialPost = 0
        let responsesPost = 0
        let responsesSocial = 0
        if(this.state.privateradio === 1){
            socialPost=1
        }else if(this.state.specificsquads === 1){
            socialPost = 2
        }
        if(this.state.everyone === 1){
            responsesPost = 1
        }else if(this.state.onlyme === 1){
            responsesPost = 2
        }
        if(this.state.comments === 1){
            responsesSocial = 1
        }else{
            responsesSocial = 0
        }
        console.log('vivibility',socialPost,responsesPost,responsesSocial);
        const data ={
            "socialPost": socialPost,
            "responsesPost": responsesPost,
            "responsesSocial": [
                responsesSocial
            ],
            "userId": this.state.userId
        }
        const response = await this.apiHandler.requestPost(data,this.serviceUrls.updateVisibilitySocialSettings)
        console.log("respose",response);
        if(response.status === true){
            this.setState({isLoading:false});
            this.props.navigation.navigate('DefaultVisibility');
        }
    }
    renderLoader(){
        return(
            <Modal transparent={true}
                visible={this.state.isLoading}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10
                }}>
                    <View style={{
                        width: "25%",
                        height: "10%",
                        borderWidth: 1,
                        borderRadius: 5,borderColor: "#58C4C6",marginBottom: 10 ,backgroundColor: '#58C4C6',justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            </Modal>
        )
      }
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
            {this.renderLoader()}
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
                <TouchableOpacity onPress={()=>{ 
                        this.setState({radiobtn:1});
                        this.setState({privateradio:0})
                        this.setState({specificsquads:0})
                   
                   
                    console.log("Value",this.state.checkboxValue,this.state.radiobtn);
                    }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.radiobtn ===1? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === 0?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Anyone on UpSquad</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Private</Text>
                   <TouchableOpacity onPress={()=>{
                         this.setState({privateradio:1})
                         this.setState({radiobtn:0});
                         this.setState({specificsquads:0})
                  
                }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.privateradio ===1? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === 0?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Only with Memphis Talks Community</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Specific squads</Text>
                   <TouchableOpacity onPress={()=>{
                          this.setState({specificsquads:1})
                          this.setState({privateradio:0})
                          this.setState({radiobtn:0});
                      
                       }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.specificsquads ===1? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === 0?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.captiontext}>Only with squads within Memphis Talks Community</Text>
                <Text style={styles.who}>What type of responses do I want? </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Comments</Text>
                   <TouchableOpacity onPress={()=>{ 
                       this.state.comments ===1 ? (this.setState({comments:0})): (this.setState({comments:1}))}}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.comments ===1? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === 0?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <Text style={styles.who}>Who can see responses to my post?  </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Everyone</Text>
                   <TouchableOpacity onPress={()=>{ 
                        this.setState({everyone:1})
                        this.setState({onlyme:0})
                    //    this.state.everyone !== "off" ? (this.setState({everyone:"off"})) : (this.setState({everyone:"on"})) 
                       }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.everyone ===1? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === 0?'8%':'9%'}]}/>
                 </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.posttext}>Only me</Text>
                   <TouchableOpacity onPress={()=>{
                       this.setState({onlyme:1});
                       this.setState({everyone:0});
                    //    this.state.onlyme === 1 ? (this.setState({onlyme:0})) : (this.setState({onlyme:1}))
                       }}>
                 <Image 
                 resizeMode='contain'
                 source={ this.state.onlyme ===1? ImagesWrapper.radiobtn1 : ImagesWrapper.radiobtn}
                 style={[styles.radio,{marginRight:this.state.radiobtn === 0?'8%':'9%'}]}/>
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
                                this.resetDefault();
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