import React from 'react';
import { View ,StyleSheet,Text,Image, TouchableOpacity,
    Platform,
    Dimensions,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class OTPScreen extends React.Component {

    constructor(props){
        super(props);
        this.textInput = React.createRef(null); 
        this.state={
           otp:'',
           otp1:'',
           otp2:'',
           otp3:'',
           boxcolor:'',
           otperr:'',
           color1:'#868585',
           color2:'#868585',
           color3:'#868585',
           color4:'#868585',

        }
       
    }
   
     focusNextField =(nextField)=> {
        nextField.current.focus();
    }
    
    onSubmit(){
        console.log('name',this.state.firstname,this.state.lastname)
        let err = [];
        // let mobileReg = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
        let mobileReg = /^\d+$/;
        let mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let nameReg = /^[a-zA-Z ]{2,30}$/;
       

       if(this.state.otp === '' && this.state.otp1==='' && this.state.otp2 ==='' && this.state.otp3 === ''){
           this.setState({otperr:'Please enter OTP'})
       }else{
           this.props.navigation.navigate('ChangePwd')
       }
        
    }

    render(){
        return(
           
            <View style={styles.mainContainer}>
                    <Image
                      source={ImagesWrapper.component}
                      style={{width:220,height:220}}
                    />
                    <Text style={[styles.welcome,Platform.OS === "ios" ? {marginTop:'-40%'}:{marginTop:'-40%'}]}>Verification</Text>
                    <Text style={styles.create}> Please enter verification code we sent to {"\n"} your email address. </Text>

                   
                    <View style={styles.card}>
                   {/* <KeyboardAvoidingView > */}
                    <View style={{flexDirection:'row'}}> 
                    <TextInput
                        style={[styles.textinput,{borderColor:this.state.color1} ]}
                        onChangeText={(Otp) => {
                            this.setState({otp:Otp})
                            this.setState({otperr:''})   
                            this.setState({color:'#58C4C6'})
                        }}
                        maxLength={1}
                        value={this.state.otp}
                        returnKeyType={"next"}
                        keyboardType={'number-pad'}
                        // ref={(input) => { this.thirdTextInput = input; }}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        importantForAutofill="no" 
                        onFocus={()=> this.setState({color1:'#58C4C6'})}
                        onKeyPress={() => {
                            console.log('true')
                            // if (writeText === '') {
                            //     console.log('false')
                            //     setWrite(false);
                            //     // setWriteTop('-42%')
                            // } else {
                            //     console.log('true1')
                            //     setWrite(true);
                            //     setWriteTop('25%')

                            // }
                        }}
                       
                       
                    />
                   <TextInput
                        style={[styles.textinput,{borderColor:this.state.color2} ]}
                        onChangeText={(Otp) => {
                            this.setState({otp1:Otp})
                            this.setState({otperr:''})
                           }}
                        value={this.state.otp1}
                        onFocus={()=> this.setState({color2:'#58C4C6'})}
                        returnKeyType={"next"}
                        keyboardType={'number-pad'}
                        ref={(input) => { this.secondTextInput = input; }}
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        importantForAutofill="no" 
                        maxLength={1}
                       
                    />
                    <TextInput
                        style={[styles.textinput,{borderColor:this.state.color3} ]}
                        onChangeText={(Otp) => {
                            this.setState({otp2:Otp})
                            this.setState({otperr:''})
                           
                        }}
                        onFocus={()=> this.setState({color3:'#58C4C6'})}
                        value={this.state.otp2}
                        returnKeyType={"next"}
                        keyboardType={'number-pad'}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onSubmitEditing={() => { this.fourTextInput.focus(); }}
                        importantForAutofill="no" 
                        maxLength={1}
                       
                    />
                    <TextInput
                        style={[styles.textinput,{borderColor:this.state.color4} ]}
                        onChangeText={(Otp) => {
                            this.setState({otp3:Otp})
                            this.setState({otperr:''})
                           
                        }}
                        onFocus={()=> this.setState({color4:'#58C4C6'})}
                        value={this.state.otp3}
                        returnKeyType={"done"}
                        keyboardType={'number-pad'}
                        ref={(input) => { this.fourTextInput = input; }}
                        // onSubmitEditing={() => { this.fourTextInput.focus(); }}
                        importantForAutofill="no" 
                        maxLength={1}
                       
                    />
                   </View>  
                    {this.state.otperr ? 
                     <Text style={styles.error}>{this.state.otperr}</Text>
                     :
                     null
                    }
                   

                    <View style={{flexDirection:'row'}}>
                    <Text style={[styles.text2,this.state.otperr ? null:{marginTop:25}]}>Didn't get the code?</Text>
                   
                    <Text style={[styles.text2,{color:'#58C4C6',marginBottom:-3, fontFamily:Fonts.mulishRegular,marginLeft:5},this.state.otperr ? null:{marginTop:25}]}>Resend code</Text>
                    
                    
                    </View>
                   
                    {/* Next Button view */}
                    <View  style={{flex:1,justifyContent:'flex-end',marginBottom:'12%'}}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.onSubmit();
                         }}
                        //  style={{flex:1,justifyContent:'flex-end',}}
                    >
                        
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={this.state.otp && this.state.otp1&&this.state.otp2&&this.state.otp3 ?['#212B68', '#58C4C6']:['#F1F1F1','#F1F1F1']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={[styles.buttonText,this.state.otp && this.state.otp1&&this.state.otp2&&this.state.otp3?{color: '#ffffff'}:{color: '#868585',}]}>
                            Verify Code
                        </Text>
                    </LinearGradient>
                    
                    </TouchableOpacity>
                    </View>
                    {/* </KeyboardAvoidingView> */}
                   
                    
                </View>
                
                
            </View>
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
        width:Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginTop:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        shadowOpacity:0.05
    },
   
    textinput:{
        // marginTop:-2,
        marginLeft:25,
        height:Platform.OS==='ios' ? 30:40,
        fontFamily:Fonts.mulishExtraBold,
        fontSize:20,
        height:'72%',
        width:'16%',
        borderWidth:1,
        borderRadius:5,
        // borderColor:'#58C4C6',
        marginTop:'10%',
        marginRight:8,
        textAlign:'center'
        

    },
  
  
    buttonText: {
        fontSize: 18,
        fontFamily:Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        
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
    
    error:{
        color:'red',
        marginLeft:25,
        fontFamily:Fonts.mulishRegular,
        marginTop:20
    },
    text2:{
        fontSize:15,
        color:'#868585',
        fontFamily:Fonts.mulishRegular,
        marginLeft:25
    },
    

})