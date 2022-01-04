import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity, Image,TextInput,SafeAreaView,Platform} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { G, Circle } from "react-native-svg";
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal';


 class MeetingsScreen extends React.Component {

    constructor(props){
        super(props);
       
        this.state={
            leadercolor:'green',
            tapstate:false,
            email:'',
            message:'',
            dotsmemu:false,
        }
       
    }

    flowerWings=(width)=>{
        const initialArr = [];
        for (var i = 0; i < 9; i++) {
            initialArr.push(i);
        }

        return (  <Svg 
            style={[
                // { alignItems: "center" },
                { width: width },
                { height: width },
           
              
                // {alignSelf:'center'}
            ]}
        >

            {initialArr.map((prop, key) => {
                var radius = width/4;
                var angle = 40 * prop;
                var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                var y = radius * Math.cos(Math.PI * 2 * angle / 360);

                return (
                    <G key={key} >
                        <Circle  x={width/2}
                            y={width/2} r={radius} fillOpacity={0.15}
                            fill={'rgba(88, 196, 198, 1)'} cx={x} cy={y} />

                    </G>
                );
            }
            )
            }







        </Svg>)
    }

    changetextColor=()=>{
        this.state.leadercolor !== 'green'
            ?(this.setState({leadercolor:'green'})):(this.setState({leadercolor:'black'}))
    }

    render(){
        
        return(
     <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
        
            <View style={[styles.header]}>
            <Image source={ImagesWrapper.profile}
            style={{marginLeft:'9%'}}
            ></Image>
            <Text style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600',color:'#1E1C24', marginLeft: '5%' }}>Memphis Talks</Text>
            <View style={{justifyContent:'flex-end',flexDirection:'row',flex:1}}>
            <TouchableOpacity  style={{marginRight:'18%'}} onPress={() => this.props.navigation.navigate('notificationscreen')}>
              <Image source={ImagesWrapper.notificationNo}
              ></Image>
            </TouchableOpacity>
           
            <TouchableOpacity 
              style={{marginRight:'18%'}}
              onPress={() => this.props.navigation.navigate('chatscreen')}
            >
              <Image source={ImagesWrapper.chatNo}
              ></Image>
            </TouchableOpacity>
            </View>
          </View>
          <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
          <ScrollView >
             <View style={{flexDirection:'row',marginRight:15}}>
                <View style={styles.subheader}>
                <Text style={[styles.post,{marginTop:'auto',marginBottom:'auto'}]}>All posts</Text>
                <Image 
                source={ImagesWrapper.downarrow}
                style={{width:'12%',height:'20%',marginTop:'auto',marginBottom:'auto',marginRight:5}}
                />
                </View>
                <View style={{ borderWidth: 1.1, borderColor: '#F1F1F1',marginTop:22,marginLeft:15 }}></View>
                <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                >
                <TouchableOpacity onPress={()=>this.changetextColor()}>
                <View style={styles.leadership}>
                <Text style={[styles.post,this.state.leadercolor==="black"?{color:"rgba(88, 196, 198, 1)"}:{color:'#1E1C24'}]}>Leadership</Text>
                </View>
                </TouchableOpacity>
                <View style={styles.leadership}>
                <Text style={styles.post}>Health</Text>
                </View>
                <View style={styles.leadership}>
                <Text style={styles.post}>TeamWork</Text>
                </View>
                </ScrollView>
            </View>
          <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={[styles.post,{margin:18,fontSize:16}]}>Stories</Text>
                <TouchableOpacity onPress={()=> this.setState({tapstate:true})}>
                <Image 
                source={ImagesWrapper.tap}
                style={{margin:22,marginTop:25,marginRight:30}}
                />
                </TouchableOpacity>
            </View>
            

         <ScrollView
             horizontal={true}
             showsHorizontalScrollIndicator={false}
         >
             <View style={{flexDirection:'row',marginLeft:18,marginRight:18}}>
             <TouchableOpacity>
             <View >
                 <TouchableOpacity onPress={()=> this.props.navigation.navigate('newstory')}>
                 {this.flowerWings(120)}
                 <Image source={ImagesWrapper.vectorplusborder}
                        style={{marginTop:-75,marginBottom:60,marginLeft:45}}
                 />
                 </TouchableOpacity>
                 <Text style={[styles.post,{marginTop:-15,marginLeft:'auto',marginRight:'auto',fontSize:12}]}>Add Story</Text>
             </View>

             </TouchableOpacity>
             <View style={{marginLeft:8}}>
                 {this.flowerWings(120)}
                 <Image source={ImagesWrapper.ellipseimg}
                        style={{width:'80%',height:'56%',marginTop:-106,marginBottom:60,marginLeft:11}}
                 />
                 <Image source={ImagesWrapper.userimg}
                        style={{width:'30%',height:'24%',marginTop:-148,marginBottom:60,marginLeft:40}}
                 />
                 <Text style={[styles.post,{marginTop:8,marginLeft:5,textAlign:'center',fontSize:12}]}>Nartalie</Text>
             </View>
             <View style={{marginLeft:8}}>
                 {this.flowerWings(120)}
                 <Image source={ImagesWrapper.ellipseimg}
                        style={{width:'80%',height:'56%',marginTop:-106,marginBottom:60,marginLeft:11}}
                 />
                 <Image source={ImagesWrapper.userimg}
                        style={{width:'30%',height:'24%',marginTop:-148,marginBottom:60,marginLeft:40}}
                 />
                 <Text style={[styles.post,{marginTop:8,marginLeft:5,textAlign:'center',fontSize:12}]}>Kannie</Text>
             </View >
             <View style={{marginLeft:8}}>
                 {this.flowerWings(120)}
                 <Image source={ImagesWrapper.ellipseimg}
                        style={{width:'80%',height:'56%',marginTop:-106,marginBottom:60,marginLeft:11}}
                 />
                 <Image source={ImagesWrapper.userimg}
                        style={{width:'30%',height:'24%',marginTop:-148,marginBottom:60,marginLeft:40}}
                 />
                 <Text style={[styles.post,{marginTop:8,marginLeft:5,textAlign:'center',fontSize:12}]}>Rohith</Text>
             </View>
             </View>
         </ScrollView>
         <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,marginLeft:18}}>
            <Text style={[styles.post,{fontSize:16,fontFamily:Fonts.mulishBold,fontWeight:'400'}]}>Us immigrants struggle story</Text>
            <TouchableOpacity onPress={()=> this.setState({dotsmemu:true})}>
            <Image source={ImagesWrapper.dotsmenu}
                    style={{marginTop:13,marginRight:18}}
            />
            </TouchableOpacity>
            </View>
            <Text style={{fontSize:14,fontWeight:'400',fontFamily:Fonts.mulishSemiBold,color:'#868585',marginLeft:25,marginRight:22}}>
                Today I met a couple that migrated from Afghanistan to USA 
                and are struggling to raise their kids as they don’t know english.
            </Text>
            <Image
                source={ImagesWrapper.maskgroup}
                style={{marginTop:15,marginLeft:25,width:'87%',borderRadius:5}}
            />
            <View style={{flexDirection:'row',marginTop:10,marginLeft:25}}>
                <Image
                    source={ImagesWrapper.ellipseman}

                />
                <Text style={[styles.post,{padding:-8,marginLeft:8,fontSize:16}]}>John Craft</Text>
                <Text style={[styles.post,{padding:5,marginLeft:5,fontSize:12,color:'#868585',marginTop:-2}]}>10 mins ago</Text>

            </View>
            <View style={{flexDirection:'row',marginTop:10,marginLeft:25,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                <Image
                    source={ImagesWrapper.ellipseman}
                />
                <Image
                    source={ImagesWrapper.ellipseman}
                    style={{marginLeft:-8}}
                />
                <Image
                    source={ImagesWrapper.ellipseman}
                    style={{marginLeft:-8}}

                />
                <Text style={{fontSize:12,color:'#868585',fontFamily:Fonts.mulishBold,fontWeight:'400',marginLeft:5,marginTop:2}}>Like by</Text>
                <Text  style={{fontSize:12,color:'#1E1C24',fontFamily:Fonts.mulishBold,fontWeight:'400',marginLeft:5,marginTop:2}}>you and 50 others</Text>
                </View>
                <Text style={{fontSize:12,color:'#868585',fontFamily:Fonts.mulishBold,fontWeight:'400',marginLeft:5,marginTop:2,marginRight:22}}>6 comments</Text>
            </View>
         <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
         <View style={{flexDirection:'row',marginLeft:'auto',marginRight:'auto',marginTop:20}}>
                     <Image
                        source={ImagesWrapper.likeimg}
                        // style={{marginTop:8}}
                    />
                     <Text style={{color:'#58C4C6',fontSize:14,marginTop:3,marginLeft:5,fontFamily:Fonts.mulishRegular,fontWeight:'600'}}>Like</Text>
                     <View style={{marginLeft:75,marginRight:75,flexDirection:'row'}}>
                     <Image
                        source={ImagesWrapper.commentimg}
                        // style={{marginTop:8}}
                    />
                     <Text style={{color:'#868585',fontSize:14,marginTop:3,marginLeft:5,fontFamily:Fonts.mulishRegular,fontWeight:'600'}}>Comment</Text>
                     </View>
                     <Image
                        source={ImagesWrapper.shareimg}
                        // style={{marginTop:8}}
                    />
                     <Text style={{color:'#868585',fontSize:14,marginTop:3,marginLeft:5,fontFamily:Fonts.mulishRegular,fontWeight:'600'}}>Share</Text>
         </View>
            {/* <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={ImagesWrapper.likeimg}
                        style={{marginTop:8}}
                    />
                    <Text style={[styles.post,{color:'#58C4C6',fontSize:14}]}>Like</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:8}}>
                    <Image
                        source={ImagesWrapper.commentimg}
                        style={{marginTop:8}}

                    />
                    <Text tyle={[styles.post,{color:'#868585',fontSize:14,marginTop:15}]}>Comment</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:8,}}>
                    <Image
                        source={ImagesWrapper.shareimg}
                        style={{marginTop:8}}

                    />
                    <Text tyle={[styles.post,{color:'#868585',fontSize:14,marginTop:8}]}>Share</Text>
                </View>
            </View> */}
            <View style={{marginTop:15,backgroundColor:'#F1F1F1'}}>
                <Text style={{fontSize:20,fontWeight:'600',fontFamily:Fonts.mulishBold,color:'#1E1C24',margin:22}}>Top pediatricians are here to help you</Text>
                <View style={{flexDirection:'row',marginLeft:22,marginRight:22}}>
                    <Image
                        source={ImagesWrapper.ellipsegirl}
                        // style={{width:'30%',height:'25%',marginBottom:10}}
                    />
                     <Image
                        source={ImagesWrapper.ellipsegirl}
                        style={{marginLeft:-25}}
                    />
                     <Image
                        source={ImagesWrapper.ellipsegirl}
                        style={{marginLeft:-25}}
                    />
                     <Image
                        source={ImagesWrapper.ellipsegirl}
                        style={{marginLeft:-25}}
                    />
                     <Image
                        source={ImagesWrapper.ellipsegirl}
                        style={{marginLeft:-25}}
                    />
                     <Image
                        source={ImagesWrapper.ellipsegirl}
                        style={{marginLeft:-25}}
                    />
                     <Image
                        source={ImagesWrapper.ellipsegirl}
                        style={{marginLeft:-25}}
                    />
                    
                </View>
                <Text style={{fontSize:16,fontWeight:'400',fontFamily:Fonts.mulishSemiBold,color:'#868585',margin:22}}>Get answers to any questions you got in your practice</Text>
                <View style={{marginBottom:20}}>
                <TouchableOpacity
                                onPress={() => {
                                    // props.navigation.navigate('profilesuccess')
                                    // alert('length'+addCard[0].id)
                                }}
                               
                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradientButton]}>
                                    <Text style={[styles.buttonText, { color:'#FFFFFF' }]}>
                                     Ask a question
                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,marginLeft:18,marginBottom:10}}>
                    <Text style={[styles.post,{fontSize:16,fontFamily:Fonts.mulishBold,fontWeight:'400'}]}>Us immigrants struggle story</Text>
                    <TouchableOpacity>
                    <Image source={ImagesWrapper.dotsmenu}
                            style={{marginTop:13,marginRight:18}}
                    />
                    </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:14,fontWeight:'400',fontFamily:Fonts.mulishSemiBold,color:'#868585',marginLeft:25,marginRight:22}}>
                        Today I met a couple that migrated from Afghanistan to USA 
                        and are struggling to raise their kids as they don’t know english.
                    </Text>
                    <Image
                        source={ImagesWrapper.maskgroup}
                        style={{marginTop:15,marginLeft:25,width:'87%',borderRadius:5}}
                    />
                    <View style={{flexDirection:'row',marginTop:10,marginLeft:25}}>
                        <Image
                            source={ImagesWrapper.ellipseman}

                        />
                        <Text style={[styles.post,{padding:-8,marginLeft:8}]}>John Craft</Text>
                        <Text style={[styles.post,{padding:5,marginLeft:5,fontSize:12,color:'#868585',marginTop:-2}]}>10 mins ago</Text>

            </View>
            </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
         
            <TouchableOpacity activeOpacity={0.5} style={styles.toucahbleOpacity}

            //   onPress={() => this.props.navigation.navigate('groupscreen2', {
            //     participants: this.state.selectedParticipants,

            //   })}


            >

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={ImagesWrapper.plus}
                    style={{ height: 60,
                        width: 60,}}
                />
              </View>
            </TouchableOpacity>
            </View>
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
            
        >
            <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'60%',marginTop:550,width:'110%',marginLeft:-20}}>
                 <Text style={{fontSize:14,marginTop:30,marginLeft:30,marginRight:30,fontFamily:Fonts.mulishSemiBold,color:'#1E1C24'}}>Can you think of someone who has an amazing story that the world needs to hear?
                    Tap them and encourage them to tell a story.</Text>
                <Text style={{color:'#868585',fontSize:16,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',marginLeft:30,marginTop:15}}>Their email address</Text>
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
                     <Text style={{color:'#868585',fontSize:16,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',marginLeft:30,marginTop:15}}>Your message to them</Text>
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
                    <View style={{marginBottom:20,marginTop:20}}>
                <TouchableOpacity
                                onPress={() => {
                                    // props.navigation.navigate('profilesuccess')
                                    // alert('length'+addCard[0].id)
                                }}
                               
                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradientButton]}>
                                    <Text style={[styles.buttonText, { color:'#FFFFFF' }]}>
                                    Tap someone
                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                </View>
            </View>
        </Modal>
            :
            null
             }

             {this.state.dotsmemu === true ?
               <Modal
            transparent={true}
            isVisible={this.state.dotsmemu}
            onBackdropPress={() => this.setState({dotsmemu:false})}
                onRequestClose={() => {
                    this.setState({dotsmemu:false})
                 }}
            
        >
            <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'20%',marginTop:660,width:'110%',marginLeft:-18}}>
                <View style={{margin:25}}>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            source={ImagesWrapper.pencil}
                            
                        />
                        <Text style={[styles.post,{padding:0,paddingLeft:10}]}>Edit post</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <Image
                            source={ImagesWrapper.trash}
                            
                        />
                        <Text style={[styles.post,{padding:0,paddingLeft:10}]}>Delete post</Text>
                    </View>
                </View>
            </View>
            </Modal>
            :
            null
    }
     </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft: '9%',
         marginTop: Platform.OS == 'ios'? 0 : 25,
        marginBottom: 25,
        // borderBottomWidth:1
      },
    subheader:{
        flexDirection:'row',
        height:45,
        width:130,
        backgroundColor:'#F1F1F1',
        marginTop:22,
       
        marginLeft:'9%',
        justifyContent:'center',
        borderRadius:3
        // flex:1
    },
    post:{
        fontSize:14,
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding:10,
        // marginLeft:10
    },
    leadership:{
        textAlign:'center',
        width:'auto',
        height:45,
        borderWidth:1.5,
        borderColor:'#F1F1F1',
        borderRadius:20,
        marginTop:22,
        marginLeft:15
        
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
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        // marginLeft: 42,
        // height: 48,
        // marginRight: 42
        width: '85%',
        // height:'7%',
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        marginLeft: 30,
        height: 50,
        marginRight: 30,
        // lineHeight:400
    },
    toucahbleOpacity: {
        right: 28,
        bottom: 28,
        position: 'absolute',
        // borderWidth: 1,
       
        // borderRadius: 25,
        // backgroundColor: '#58C4C6',
        // borderColor: '#58C4C6'
      },
      modelstyle:{
        width:'110%',
        height:'50%',
        marginLeft:-18,
        backgroundColor:'#FFFFFF',
        justifyContent:'flex-end',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        // marginTop:500
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:30,
        marginTop:Platform.OS==='ios' ? null:'-3%',
        marginRight:23
    },
      
    textinput:{
        // marginTop:-2,
        marginLeft:30,
        height:Platform.OS==='ios' ? 30:30,
        fontFamily:Fonts.mulishSemiBold,
        fontSize:14,
        color:'#1E1C24',
    },
   
   
})



export default MeetingsScreen;