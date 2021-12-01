import React from 'react';
import { View ,StyleSheet,Text,Image, TouchableOpacity,Platform,ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class PastIllnessScreen extends React.Component {

    constructor(props){
        super(props);
        this.state={
            firstname:'',
            firstnameerr:'',
            lastname:'',
            lastnameerr:'',
            email:'',
            emailerr:'',
            password:'',
            passworderr:'',
            code:'',
            checkmark:true,
            checkmarkName:'mark-off',
            hidePassword:true,
            iconName:'ios-eye-off',

        }
    }


     onCheckBoxPressed ()  {
        // this.setState({checkmark:false)});
        this.setState({ checkmark: false})
        this.state.checkmarkName !== "mark-off"
            ? (this.setState({checkmarkName:"mark-off"}), this.setState({checkmark:true}))
            : (this.setState({checkmarkName:"mark-on"}),this.setState({checkmark:false}))

    }
    togglePwdVisibility ()  {
        this.state.iconName !== "ios-eye-off"
            ? (this.setState({iconName:"ios-eye-off"}), this.setState({hidePassword:true}))
            : (this.setState({iconName:"ios-eye"}),this.setState({hidePassword:false}))
    }
    onFocus(){
        console.log('focus')
    }
    onSubmit(){
        console.log('name',this.state.firstname,this.state.lastname)
        let err = [];
        // let mobileReg = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
        let mobileReg = /^\d+$/;
        let mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let nameReg = /^[a-zA-Z ]{2,30}$/;
        if (this.state.firstname === "") {
            // err['firstName'] = "Please enter your first name";
            this.setState({firstnameerr:  "Please enter your first name"});
            // this.setState({errors.firstname:"Please enter your first name"})
           
        }
        else if (!nameReg.test(this.state.firstname)) {
            // err['firstName'] = "Please enter valid first name";
            // this.setState({errors:"Please enter your first name"})
            this.setState({firstnameerr:  "Please enter valid first name"    });

        }

        if (this.state.lastname === "") {
            // err['lastName'] = "Please enter your last name";
            // this.setState({errors:"Please enter your last name"})
            this.setState({lastnameerr: "Please enter your last name"});

        }
        else if (!nameReg.test(this.state.lastname)) {
            // err['lastName'] = "Please enter valid last name";
            this.setState({lastnameerr:"Please enter valid last name"})

        }

        if (this.state.email === "") {
            // err['email'] = 'Please enter your email';
            this.setState({emailerr:"Please enter your email"})

        } else if (!mailReg.test(this.state.email)) {
            // err['email'] = 'Please enter valid email';
            this.setState({emailerr:"Please enter valid email"})

        }

        

        if (this.state.password === '') {
            // err['pwd'] = "Please enter your password";
            this.setState({passworderr:"Please enter your password"})

        }

        if (Object.keys(err).length > 0) {
            // console.log('Error Length>0', err);
            this.setState({errors:err})
            // console.log('errors',errors[])
        } 
        else {
            this.props.navigation.navigate('Team');
        }
    }

    render(){
        return(
            // <SafeAreaView style={{backgroundColor:' #EBF8F8'}}>
            //     <View style={styles.mainContainer}>
            //        
                   
            //     </View>
            // </SafeAreaView>
            <View style={styles.mainContainer}>
                    <Image
                      source={ImagesWrapper.component}
                      style={styles.componentimg}
                    />
                    <Text style={[styles.welcome,Platform.OS === "ios" ? {marginTop:'-40%'}:{marginTop:'-30%'}]}>Welcome!</Text>
                    <Text style={styles.create}> Create an account to continue</Text>

                   
                    <View style={styles.card}>
                    <ScrollView>
                    <Text style={styles.bio}>First name</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(firstName) => {
                            this.setState({firstname:firstName})
                            this.setState({firstnameerr:''})
                        }}
                        value={this.state.firstname}
                        returnKeyType={"next"}
                        // style={[StylesWrapper.input, {
                        //     borderColor: errors ?
                        //         errors.firstName ? 'red' :
                        //             Colors.loginInputBorder :
                        //         Colors.loginInputBorder
                        // }]}
                    />
                   <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.firstnameerr}</Text>
                   
                    {/* <Text style={{color:'red'}}>{this.state.errors.firstname}</Text> */}
                    
                    <Text style={styles.bio}>Last name</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(lastName) => {
                            this.setState({lastname:lastName})
                            this.setState({lastnameerr:''})
                        }}
                        value={this.state.lastname}
                        returnKeyType={"next"}

                        
                    />
                     <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.lastnameerr}</Text>
                    <Text style={styles.bio}>Email ID</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(Email) => {
                            this.setState({email:Email})
                            this.setState({emailerr:''})
                        }}
                        value={this.state.email}
                        returnKeyType={"next"}
                       
                          
                    />
                   
                    <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.emailerr}</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.bio}>Password</Text>
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
                        returnKeyType={"next"}
                        secureTextEntry={this.state.hidePassword}
                        
                    />
                    <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.passworderr}</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.bio}>Community subscription code</Text>
                    <View style={styles.optional}>
                    <Text style={{ color:'#868585'}}>optional</Text>
                    </View>
                    

                    </View>
                    
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(Code) => {
                            this.setState({code:Code})
                            this.setState({passworderr:''})
                        }}
                        value={this.state.code}
                        returnKeyType={"next"}
                        
                    />
                    <View
                        style={styles.underline}
                    />
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                             onPress={()=>{
                                this.onCheckBoxPressed();
                             }}
                        >
                            <Image
                                 source={ this.state.checkmarkName ==='mark-on'? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                 style={[this.state.checkmarkName  ==='mark-on'? styles.checkmark : styles.checkbox]}
                                 />
                           
                       
                        </TouchableOpacity>
                        <Text style={[styles.agree,{paddingLeft:15,color:'#B1AAAA',fontSize:12,fontWeight:'400',}]}>I agree with all</Text>
                        <Text style={[styles.agree,{paddingLeft:3}]}>Terms of Use & Privacy Policy</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.onSubmit();
                         }}
                    >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#304C78', '#356B88', '#80C6C5']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'10%'}]}>
                        <Text style={styles.buttonText}>
                            Next
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    </ScrollView>
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
        paddingLeft:25,
        fontFamily:Fonts.mulishRegular,
        color:'#1E1C24',

    },
    create:{
        fontSize:13,
        fontWeight:'400',
        paddingLeft:25,
        paddingTop:5,
        color:'#1E1C24',
        fontFamily:Fonts.mulishRegular
    },
    card:{
        backgroundColor:'#FFFFFF',
        flex:1,
        width:'100%',
        height:'100%',
        marginTop:30,
        borderRadius:30,
        shadowOpacity:0.05
    },
    bio:{
        fontSize:15,
        fontWeight:'400',
        // color:'#959494',
        marginTop:20,
        marginLeft:25,
        fontFamily:Fonts.mulishRegular,
        color:'#868585'
    },
    optional:{
        // fontSize:15,
        fontWeight:'400',
       marginRight:15,
        marginTop:20,
        marginLeft:25,
        fontSize:12,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        flex:1,
        fontFamily:Fonts.mulishRegular,

        // textAlign:'row-reverse'
    },
    
    textinput:{
        // marginTop:2,
        marginLeft:25,
        height:40,
    },
    underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:23,
        marginTop:-10
    },
    checkbox:{
        marginLeft:25,
        marginTop:30,
    },
    checkmark:{
        marginLeft:25,
        marginTop:30,
        backgroundColor:'#58C4C6',
        borderRadius:2,
        
    },
    agree:{
       marginTop:30 ,
       fontFamily:Fonts.mulishRegular,

       
    //    paddingLeft:5
    },
    buttonText: {
        fontSize: 18,
        fontFamily:Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight:'600'
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        marginLeft: 42,
        height: 48,
        marginRight: 42
    },
    eyeopen:{
        // marginLeft:245,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginTop:20,
        flex:1,
        marginRight:15
    },
    error:{
        color:'red',
        marginLeft:25,
    }

})