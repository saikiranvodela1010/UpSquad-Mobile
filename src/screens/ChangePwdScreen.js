import React from 'react';
import { View ,StyleSheet,Text,Image, TouchableOpacity,Platform,ScrollView,Dimensions} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class ChangePwdScreen extends React.Component {

    constructor(props){
        super(props);
        this.textInput = React.createRef(null); 
        this.state={
            password:'',
            passworderr:'',
            hidePassword:true,
           
        }
       
    }
    // componentDidMount() {
    //     this.textInput.current.focusTextInput();  
    // }

    
    togglePwdVisibility ()  {
        this.state.iconName !== "ios-eye-off"
            ? (this.setState({iconName:"ios-eye-off"}), this.setState({hidePassword:true}))
            : (this.setState({iconName:"ios-eye"}),this.setState({hidePassword:false}))
    }
     
    onSubmit(){
        
        if(this.state.password === ''){
            this.setState({passworderr:'Please create a password'})
        }else{
            this.props.navigation.navigate('Login')
        }
       

        
        
    }

    render(){
        return(
           
            <View style={styles.mainContainer}>
                    <Image
                      source={ImagesWrapper.component}
                      style={{width:220,height:220}}
                    />
                    <Text style={[styles.welcome,Platform.OS === "ios" ? {marginTop:'-40%'}:{marginTop:'-40%'}]}>Create new password</Text>
                    <Text style={styles.create}> Your new password must be different form{"\n"} previously used passwords</Text>

                   
                    <View style={styles.card}>
                    {/* <ScrollView > */}
                    
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.biofirst}>Choose a Password</Text>
                    <TouchableOpacity
                         onPress={()=>{
                            this.togglePwdVisibility();
                         }}
                         style={styles.eyeopen}
                    >
                    <View >
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
                        // returnKeyType={"done"}
                        secureTextEntry={this.state.hidePassword}
                        // ref={(input) => { this.fourTextInput = input; }}
                        // onSubmitEditing={() => { this.fiveTextInput.focus(); }}
                        maxLength={63}
                    />
                    <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.passworderr}</Text>



                    {/* Next Button view */}
                        <View  style={{marginBottom:'12%',flex:1,justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.onSubmit();
                         }}
                         
                    >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={this.state.password?['#212B68', '#58C4C6']:['#F1F1F1','#F1F1F1']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={[styles.buttonText,this.state.password ? {color: '#ffffff'}:{color: '#868585',}]}>
                           Create new password
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    </View>
                    
                   
                   {/* </ScrollView> */}
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
        marginTop:'13%',
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