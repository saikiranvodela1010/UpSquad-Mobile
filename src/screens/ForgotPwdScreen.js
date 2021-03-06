import React from 'react';
import { View ,StyleSheet,Text,Image, TouchableOpacity,Platform,ScrollView,Dimensions,KeyboardAvoidingView,Modal,ActivityIndicator,SafeAreaView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
import ServiceUrls from '../network/ServiceUrls';
import StoragePrefs from '../res/StoragePrefs';
import APIHandler from '../network/NetWorkOperations';
import {FloatingLabelInput} from 'react-native-floating-label-input';


export default class ForgotPwdScreen extends React.Component {


    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();

    constructor(props){
        super(props);
        this.textInput = React.createRef(null); 
        this.state={
            email:'',
            emailerr:'',
            isLoading: false
           
        }
       
    }
   
   async onSubmit(){
        this.setState({
            isLoading: true
        })
        const data = {
            "apiUrl": "https://dev.upsquad.com",
            'email': this.state.email,
            // 'password' : this.state.password
        }
        const response = await this.apiHandler.requestPost(data,this.serviceUrls.fogotPassword)
        if(response.status == "No network Connected!"){
            this.setState({isLoading: false, isInternet: true})
            alert('No network Connected!')
        } else{
           
            if(response.status  === "success") {
                this.setState({isLoading: false})
                this.props.navigation.navigate('Otp',{
                    email:this.state.email
                });
            } else {
                this.setState({isLoading: false})
                alert(response.msg);
               
            }            
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
           
            <SafeAreaView style={styles.mainContainer}>
                 {this.renderLoader()}
                    <Image
                      source={ImagesWrapper.component}
                      style={{width:220,height:220}}
                    />
                    <Text style={[styles.welcome,Platform.OS === "ios" ? {marginTop:'-40%'}:{marginTop:'-40%'}]}>Forgot your Password?</Text>
                    <Text style={styles.create}> Please enter the e-mail address you used when {"\n"} creating your account,
                    we'll send you {"\n"} instructions to reset your password. </Text>

                    
                    <View style={styles.card}>
                   
                    {/* <ScrollView> */}
                    <FloatingLabelInput
          label='Email ID'
            style={styles.textinput}
            onChangeText={Email => {
              this.setState({email: Email});
              this.setState({emailerr: ''});
            }}
            value={this.state.email}
            returnKeyType={'done'}
            keyboardType={
              Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
            }
            // ref={(input) => { this.thirdTextInput = input; }}
            // onSubmitEditing={() => { this.fourTextInput.focus(); }}
            // importantForAutofill="no"
            maxLength={63}

            // blurOnSubmit={false}
          />
                   
                    <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.emailerr}</Text>



                    {/* Next Button view */}
                   <View style={{marginBottom:'10%',flex:1,justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.onSubmit();
                         }}
                         
                    >
                       
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={styles.buttonText}>
                            Send
                        </Text>
                    </LinearGradient>
                    
                    </TouchableOpacity>
                    
                    
                    {/* </ScrollView> */}
                    </View>
                </View>
                
            </SafeAreaView>
           
        );
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:'#EBF8F8',
        flex:1

    },
    welcome:{
        marginTop:'-40%',
        lineHeight:25.1,
        fontWeight:'600',
        fontSize:20,
        paddingLeft:20,
        fontFamily:Fonts.mulishSemiBold,
        color:'#1E1C23',

    },
    create:{
        fontSize:15,
        fontWeight:'400',
        paddingLeft:20,
        paddingTop:5,
        color:'#60666B',
        fontFamily:Fonts.mulishRegular,
        paddingLeft:15
        // marginRight:50

    },
    card:{
        backgroundColor:'#FFFFFF',
        flex:1,
        // width:Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        marginTop:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        shadowOpacity:0.05,
        // justifyContent:'flex-end'
    },
    bio:{
        fontSize:16,
        fontWeight:'400',
        // color:'#959494',
        marginTop:Platform.OS==='ios' ? '5%':'13%',
        marginLeft:25,
        fontFamily:Fonts.mulishRegular,
        color:'#868585'
    },
    biofirst:{
        fontSize:16,
        fontWeight:'400',
        // color:'#959494',
        marginTop:'5%',
        marginLeft:25,
        fontFamily:Fonts.mulishRegular,
        color:'#868585'
    },
   
    
    textinput:{
        // marginTop:-2,
        marginLeft:25,
        height:Platform.OS==='ios' ? 30:40,
        fontFamily:Fonts.mulishSemiBold,
        fontSize:16,
        color:'#1E1C24',
    },
    underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:23,
        marginTop:Platform.OS==='ios' ? null:'-3%',
        marginRight:23
    },
  
    buttonText: {
        fontSize: 18,
        fontFamily:Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight:'600',
        // marginBottom:20
    },
    linearGradient: {
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        // marginLeft: 42,
        // height: 48,
        // marginRight: 42
        width:'85%',
        // height:'7%',
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        marginLeft: 30,
        height: 55,
        marginRight: 30,
        // lineHeight:400
    },
    eyeopen:{
        // marginLeft:245,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        // marginTop:5,
        flex:1,
        marginRight:24
    },
    error:{
        color:'red',
        marginLeft:25,
        fontFamily:Fonts.mulishRegular
    },
    text2:{
        fontSize:14,
        color:'#868585',
        fontFamily:Fonts.mulishRegular,
        marginTop:5
        //marginBottom:20
    },
    forgot:{
        color:'#58C4C6',
        fontFamily:Fonts.mulishRegular,
        fontSize:15,
        marginLeft:25,
        // marginTop:-15
    }

})