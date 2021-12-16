import React from 'react';
import { View ,StyleSheet,Text,Image, TouchableOpacity,Platform,ScrollView,Dimensions} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class SignUpScreen extends React.Component {

    constructor(props){
        super(props);
        this.textInput = React.createRef(null); 
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
            underline:'-10%',
            codebelongs:false,
           
        }
       
    }
    // componentDidMount() {
    //     this.textInput.current.focusTextInput();  
    // }

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
      removeEmojis=(string)=>{
          const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g

        return string.replace(regex, '')
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
         if (!nameReg.test(this.state.firstname)) {
            // err['firstName'] = "Please enter valid first name";
            // this.setState({errors:"Please enter your first name"})
            this.setState({firstnameerr:  "Please enter valid first name"    });

        }

        if (this.state.lastname === "") {
            // err['lastName'] = "Please enter your last name";
            // this.setState({errors:"Please enter your last name"})
            this.setState({lastnameerr: "Please enter your last name"});

        }
        if (!nameReg.test(this.state.lastname)) {
            // err['lastName'] = "Please enter valid last name";
            this.setState({lastnameerr:"Please enter valid last name"})

        }

        if (this.state.email === "") {
            // err['email'] = 'Please enter your email';
            this.setState({emailerr:"Please enter your email"})

        } 
        if (!mailReg.test(this.state.email)) {
            // err['email'] = 'Please enter valid email';
            console.log('mail',)
            this.setState({emailerr:"Please enter valid email"})

        }

        

        if (this.state.password === '') {
            // err['pwd'] = "Please enter your password";
            this.setState({passworderr:"Please enter your password"})

        }
        if(this.state.checkmarkName === 'mark-off'){
            alert('Please check the box')
        }
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        if(this.state.code === regex){
            alert('Emojis will not allowed')
        }
        // else {
        //     this.props.navigation.navigate('Team')
        // }

        if (this.state.firstname !== '' && this.state.lastname !== "" 
        && this.state.email !== '' && this.state.password !== ''
         && this.state.checkmarkName !== 'mark-off'&&
          mailReg.test(this.state.email) 
         && nameReg.test(this.state.firstname)
         )
          {
            this.props.navigation.navigate('Team')
        } 
        
    }

    render(){
        return(
           
            <View style={styles.mainContainer}>
                    <Image
                      source={ImagesWrapper.component}
                      style={{width:220,height:220}}
                    />
                    <Text style={[styles.welcome,Platform.OS === "ios" ? {marginTop:'-40%'}:{marginTop:'-40%'}]}>Welcome!</Text>
                    <Text style={styles.create}> Create an account to continue</Text>

                   
                    <View style={styles.card}>
                    <ScrollView style={{marginBottom:20}}>
                    <Text style={styles.biofirst}>First name</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(firstName) => {
                            
                            this.setState({firstname:firstName});
                            this.setState({firstnameerr:''});
                        //    /^(?:[A-Za-z ]+|\d+)$/.test(this.state.firstname) ? alert('hiii') : null
                        }}
                        // onSubmitEditing={() => { this.refs['second'].focus() }}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                        value={this.state.firstname}
                        returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={63}
                        
                    />
                   <View style={[styles.underline]}/>
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
                        ref={(input) => { this.secondTextInput = input; }}
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        maxLength={63}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        blurOnSubmit={false}
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
                        // keyboardType={'email-address'}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onSubmitEditing={() => { this.fourTextInput.focus(); }}
                        importantForAutofill="no" 
                        maxLength={63}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        blurOnSubmit={false}
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
                        // value={this.state.password}
                      value={this.removeEmojis(this.state.password)}

                        returnKeyType={"next"}
                        secureTextEntry={this.state.hidePassword}
                        ref={(input) => { this.fourTextInput = input; }}
                        onSubmitEditing={() => { this.fiveTextInput.focus(); }}
                        maxLength={63}
                        // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        blurOnSubmit={false}
                    />
                    <View style={styles.underline}/>
                    <Text style={styles.error}>{this.state.passworderr}</Text>

                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.bio}>Community subscription code</Text>
                    
                    {this.state.codebelongs === false?
                        <View style={styles.optional}>
                        <Text style={{ color:'#868585'}}>optional</Text>
                        </View>
                        :
                        null
                    }

                    </View>
                    
                    <TextInput
                      style={styles.textinput}
                      autoCapitalize='characters'
                      onChangeText={(Code) => {
                        this.setState({code:Code})
                        this.setState({passworderr:''})
                      }}
                      value={this.removeEmojis(this.state.code)}
                      returnKeyType={"done"}
                      ref={(input) => { this.fiveTextInput = input; }}
                    
                      maxLength={63}
                      keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                      blurOnSubmit={false}
                     
                      onKeyPress={() => {
                       
                        if(this.state.code === ''){
                            console.log('false')
                            this.setState({codebelongs:false});
                        }else{
                            this.setState({codebelongs:true});
                        }
                      }}
                        
                         
                       
                    />
                    <View
                        style={styles.underline}
                    />
                    {this.state.codebelongs === true ? 
                    <View style={{flexDirection:'row'}}>
                    <Text style={[styles.agree,{paddingLeft:22,color:'#B1AAAA',fontSize:12,fontWeight:'400',marginTop:5}]}>This code belongs to</Text>
                    <Text style={[{paddingLeft:3,marginTop:3,fontFamily:Fonts.mulishExtraBold}]}>Pencil community</Text>
                    </View>
                    :
                    null
                    }
                    
                    
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                             onPress={()=>{
                                this.onCheckBoxPressed();
                             }}
                        >
                            <Image
                                resizeMode='contain'
                                 source={ this.state.checkmarkName ==='mark-on'? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                 style={[this.state.checkmarkName  ==='mark-on'? styles.checkmark : styles.checkbox]}
                                 />
                           
                       
                        </TouchableOpacity>
                        <Text style={[styles.agree,{paddingLeft:15,color:'#B1AAAA',fontSize:13,fontWeight:'400',}]}>I agree with all</Text>
                        <Text style={[styles.agree,{paddingLeft:3,fontFamily:Fonts.mulishSemiBold,color:'#1E1C23',fontSize:14}]}>Terms of Use & Privacy Policy</Text>
                    </View>
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
        paddingLeft:20,
        fontFamily:Fonts.mulishSemiBold,
        color:'#1E1C23',

    },
    create:{
        fontSize:14,
        fontWeight:'400',
        paddingLeft:18,
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
        marginTop:Platform.OS==='ios' ? '5%':'4%',
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
    optional:{
        // fontSize:15,
        fontWeight:'400',
       marginRight:20,
        // marginTop:5,
        // marginLeft:25,
        fontSize:12,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        flex:1,
        fontFamily:Fonts.mulishRegular,

        // textAlign:'row-reverse'
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
        // marginTop:'-6%'
        marginRight:23
    },
    checkbox:{
        marginLeft:25,
        marginTop:Platform.OS==='ios' ? 30:60,
        width:20,
        height:20
    },
    checkmark:{
        marginLeft:25,
        marginTop:Platform.OS==='ios' ? 30:60,
        backgroundColor:'#58C4C6',
        borderRadius:5,
        
    },
    agree:{
       marginTop:Platform.OS==='ios' ? 30:60 ,
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
        marginRight:20
    },
    error:{
        color:'red',
        marginLeft:25,
    }

})