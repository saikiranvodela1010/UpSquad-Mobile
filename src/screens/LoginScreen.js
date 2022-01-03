import React from 'react';
import { View ,StyleSheet,Text,Image, TouchableOpacity,Platform,ScrollView,Dimensions} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
// import { FloatingLabelInput } from 'react-native-floating-label-input';



export default class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.textInput = React.createRef(null); 
        this.state={
            
            email:'',
            emailerr:'',
            password:'',
            passworderr:'',
            hidePassword:true,
            iconName:'ios-eye-off',
            cont:'',
            show:false,
           
        }
       
    }
   
   
     onCheckBoxPressed ()  {
        // this.setState({checkmark:false)});
        this.setState({ checkmark: false})
        this.state.checkmarkName !== "mark-off"
            ? (this.setState({checkmarkName:"mark-off"}), this.setState({checkmark:true}))
            : (this.setState({checkmarkName:"mark-on"}),this.setState({checkmark:false}))

    }
     focusNextField =(nextField)=> {
        nextField.current.focus();
    }
    togglePwdVisibility ()  {
        this.state.iconName !== "ios-eye-off"
            ? (this.setState({iconName:"ios-eye-off"}), this.setState({hidePassword:true}))
            : (this.setState({iconName:"ios-eye"}),this.setState({hidePassword:false}))
    }
     sayHello (){
        if(this.state.code === ''){
            console.log('false')
            this.setState({codebelongs:false});
        }else{
            this.setState({codebelongs:true});
        }
        
      }
    onSubmit(){
        console.log('name',this.state.firstname,this.state.lastname)
        let err = [];
        // let mobileReg = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
        let mobileReg = /^\d+$/;
        let mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let nameReg = /^[a-zA-Z ]{2,30}$/;
       

        if (this.state.email === "") {
            // err['email'] = 'Please enter your email';
            this.setState({emailerr:"Please enter your email"})

        } 
        else if (!mailReg.test(this.state.email)) {
            // err['email'] = 'Please enter valid email';
            console.log('mail',)
            this.setState({emailerr:"Please enter valid email"})

        }

        

        if (this.state.password === '') {
            // err['pwd'] = "Please enter your password";
            this.setState({passworderr:"Please enter your password"})

        }
        else if(this.state.password !== '12345'){
            this.setState({passworderr:"Password incorrect"})
        }
       

        if (this.state.email !== '' && this.state.password === '12345'&& 
          mailReg.test(this.state.email) 
         && nameReg.test(this.state.firstname)
         )
          {
              this.setState({email:''})
              this.setState({password:''})
            this.props.navigation.navigate('BioSuccess')
        } 
        else{
            this.setState({ passworderr: 'Incorrect password'})
        }
        
    }

    render(){
        return(
           
            <View style={styles.mainContainer}>
                    <Image
                      source={ImagesWrapper.component}
                      style={{width:220,height:220}}
                   
                    />
                    <Text style={[styles.welcome,Platform.OS === "ios" ? {marginTop:'-40%'}:{marginTop:'-40%'}]}>Hello!</Text>
                    <Text style={styles.create}> Let's login to access your UpSquad account </Text>

                   
                    <View style={styles.card}>
                    {/* <ScrollView > */}
                    
                    <Text style={styles.bio}>Email ID</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(Email) => {
                            this.setState({email:Email})
                            this.setState({emailerr:''})
                        }}
                        value={this.state.email}
                        returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onSubmitEditing={() => { this.fourTextInput.focus(); }}
                        importantForAutofill="no" 
                        maxLength={63}
                        // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        blurOnSubmit={false}
                    />
                   
                    <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.emailerr}</Text>

                    {/* Password */}

                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.biofirst}>Password</Text>
                    <TouchableOpacity
                         onPress={()=>{
                            this.togglePwdVisibility();
                         }}
                         style={styles.eyeopen}
                    >
                    <View>
                    <Image
                            resizeMode='contain'
                            source={this.state.iconName === 'ios-eye' ? ImagesWrapper.eyeopen : ImagesWrapper.eyeoff}
                             
                    />
                    </View>
                    </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(Password) => {
                            this.setState({password:Password})
                            this.setState({passworderr:''})
                        }}
                        value={this.state.password}
                        returnKeyType={"done"}
                        secureTextEntry={this.state.hidePassword}
                        ref={(input) => { this.fourTextInput = input; }}
                        // onSubmitEditing={() => { this.fiveTextInput.focus(); }}
                        maxLength={63}
                    />
                    <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.passworderr}</Text>
                    <TouchableOpacity 
                      onPress={()=>{
                        this.props.navigation.navigate('Forgot')
                      }}
                    
                    >
                    <Text style={styles.forgot}>Forgot Password? </Text>
                    </TouchableOpacity>
                {/* </ScrollView> */}

                    {/* Next Button view */}
                   <View style={{flex:1,justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.onSubmit();
                         }}
                         
                    >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={styles.buttonText}>
                            Next
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    </View>
                    
                    <View style={{alignItems:'center'}}>
                    <Text style={styles.text2}>Don't have an account?
                    <TouchableOpacity 
                      onPress={()=>{
                        this.props.navigation.navigate('SignUp')
                      }}
                    
                    >
                    <Text style={[{color:'#58C4C6',marginBottom:-3, fontFamily:Fonts.mulishRegular,marginLeft:5}]}>Let's create one </Text>
                    </TouchableOpacity>
                    </Text>
                    </View>
                   
                   
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
        paddingLeft:15,
        paddingTop:5,
        color:'#1E1C24',
        fontFamily:Fonts.mulishRegular
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
        marginTop:5,
        marginBottom:'10%'
    },
    forgot:{
        color:'#58C4C6',
        fontFamily:Fonts.mulishRegular,
        fontSize:15,
        marginLeft:25,
        // marginTop:-15
    }

})