import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
import { StackActions } from '@react-navigation/native'; 
import ServiceUrls from '../network/ServiceUrls';
import StoragePrefs from '../res/StoragePrefs';
import APIHandler from '../network/NetWorkOperations';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class LoginScreen extends React.Component {
  serviceUrls = new ServiceUrls();
  apiHandler = new APIHandler();
  storagePrefs = new StoragePrefs();

  constructor(props) {
    super(props);
    this.textInput = React.createRef(null);
    this.state = {
      email: '',
      emailerr: '',
      password: '',
      passworderr: '',
      hidePassword: true,
      iconName: 'ios-eye-off',
      cont: '',
      show: false,
      isInternet: false,
      back: false,
      isLoading: false,
    };
  }

  onCheckBoxPressed() {
    // this.setState({checkmark:false)});
    this.setState({checkmark: false});
    this.state.checkmarkName !== 'mark-off'
      ? (this.setState({checkmarkName: 'mark-off'}),
        this.setState({checkmark: true}))
      : (this.setState({checkmarkName: 'mark-on'}),
        this.setState({checkmark: false}));
  }
  focusNextField = nextField => {
    nextField.current.focus();
  };
  togglePwdVisibility() {
    this.state.iconName !== 'ios-eye-off'
      ? (this.setState({iconName: 'ios-eye-off'}),
        this.setState({hidePassword: true}))
      : (this.setState({iconName: 'ios-eye'}),
        this.setState({hidePassword: false}));
  }
  sayHello() {
    if (this.state.code === '') {
      console.log('false');
      this.setState({codebelongs: false});
    } else {
      this.setState({codebelongs: true});
    }
  }
  async onSubmit() {
    this.setState({
      isLoading: true,
    });
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const response = await this.apiHandler.requestPost(
      data,
      this.serviceUrls.loginuser,
    );
    if (response.status == 'No network Connected!') {
      this.setState({isLoading: false, isInternet: true});
      alert('No network Connected!');
    } else {
      this.setState({isLoading: false});
      if (response.success === true) {
        const userDetails = {
          token: response.token,
          userId: response.user._id,
          userName: response.user.firstName + ' ' + response.user.lastName,
          userEmail: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          profileImage: response.user.profileImg,
          isProfessional: response.user.isProfessional,
          isAdmin: response.user.isAdmin,
        };
        try {
          await AsyncStorage.removeItem('userDetails');
          await AsyncStorage.removeItem('universityDetails');
          await AsyncStorage.removeItem("signupdetails");
          // alert("Removed");
          const logindetails = await this.storagePrefs.setObjectValue(
            'userDetails',
            userDetails,
          );
          const logg = await this.storagePrefs.setIsLogedIn("YES");

      }
      catch(exception) {
          console.log(exception);
      }
      this.props.navigation.pop();
                this.props.navigation.dispatch(StackActions.replace('BioSuccess'))
        // this.props.navigation.navigate('BioSuccess');
      } else {
        if (response.msg === 'Wrong password') {
          this.setState({passworderr: response.msg});
        } else if (
          response.msg === 'Email not found' ||
          (response.data.message != null &&
            response.data.message != undefined &&
            response.data.message === 'Please enter a valid email')
        ) {
          this.setState({emailerr: 'Email not found'});
        }
      }
    }
  }

  renderLoader() {
    return (
      <Modal transparent={true} visible={this.state.isLoading}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          <View
            style={{
              width: '25%',
              height: '10%',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#58C4C6',
              marginBottom: 10,
              backgroundColor: '#58C4C6',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderLoader()}
        <Image
          source={ImagesWrapper.component}
          style={{width: 220, height: 220}}
        />
        <Text
          style={[
            styles.welcome,
            Platform.OS === 'ios' ? {marginTop: '-40%'} : {marginTop: '-40%'},
          ]}>
          Hello!
        </Text>
        <Text style={styles.create}>
          {' '}
          Let's login to access your UpSquad account{' '}
        </Text>

        <View style={styles.card}>
          {/* <ScrollView > */}

          <FloatingLabelInput
            label="Email ID"
            style={styles.textinput}
            onChangeText={Email => {
              this.setState({email: Email});
              this.setState({emailerr: ''});
            }}
            value={this.state.email}
            returnKeyType={'next'}
            keyboardType={
              Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
            }
            ref={input => {
              this.thirdTextInput = input;
            }}
            onSubmitEditing={() => {
              this.fourTextInput.focus();
            }}
            importantForAutofill="no"
            maxLength={63}
            // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
            blurOnSubmit={false}
          />

          <View style={styles.underline} />
          <Text style={styles.error}>{this.state.emailerr}</Text>

          <FloatingLabelInput
            label="Password"
            style={styles.textinput}
            onChangeText={Password => {
              this.setState({password: Password});
              this.setState({passworderr: ''});
            }}
            value={this.state.password}
            returnKeyType={'done'}
            secureTextEntry={this.state.hidePassword}
            ref={input => {
              this.fourTextInput = input;
            }}
            isPassword
            // onSubmitEditing={() => { this.fiveTextInput.focus(); }}
            maxLength={63}
            customShowPasswordComponent={
              <Image resizeMode="contain" source={ImagesWrapper.eyeoff} />
            }
            customHidePasswordComponent={
              <Image resizeMode="contain" source={ImagesWrapper.eyeopen} />
            }
          />

          {/* Password */}

          <View style={styles.underline} />
          <Text style={styles.error}>{this.state.passworderr}</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Forgot');
            }}>
            <Text style={styles.forgot}>Forgot Password? </Text>
          </TouchableOpacity>
          {/* </ScrollView> */}

          {/* Next Button view */}
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                this.onSubmit();
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#212B68', '#58C4C6']}
                style={[
                  styles.linearGradient,
                  Platform.OS === 'ios' ? {marginTop: '5%'} : {marginTop: '4%'},
                ]}>
                <Text style={styles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.text2}>
              Don't have an account?
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}>
                <Text
                  style={[
                    {
                      color: '#58C4C6',
                      marginBottom: -3,
                      fontFamily: Fonts.mulishRegular,
                      marginLeft: 5,
                    },
                  ]}>
                  Let's create one{' '}
                </Text>
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
    backgroundColor: '#EBF8F8',
    flex: 1,
  },
  welcome: {
    marginTop: '-40%',
    lineHeight: 25.1,
    fontWeight: '600',
    fontSize: 20,
    paddingLeft: 20,
    fontFamily: Fonts.mulishSemiBold,
    color: '#1E1C23',
  },
  create: {
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 15,
    paddingTop: 5,
    color: '#1E1C24',
    fontFamily: Fonts.mulishRegular,
  },
  card: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 50,
    paddingTop:10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowOpacity: 0.05,
  },
  bio: {
    fontSize: 16,
    fontWeight: '400',
    // color:'#959494',
    marginTop: Platform.OS === 'ios' ? '5%' : '13%',
    marginLeft: 25,
    fontFamily: Fonts.mulishRegular,
    color: '#868585',
  },
  biofirst: {
    fontSize: 16,
    fontWeight: '400',
    // color:'#959494',
    marginTop: '5%',
    marginLeft: 25,
    fontFamily: Fonts.mulishRegular,
    color: '#868585',
  },

  textinput: {
    marginTop: 20,
    marginLeft: 25,
    height: Platform.OS === 'ios' ? 30 : 40,
    fontFamily: Fonts.mulishSemiBold,
    fontSize: 16,
    color: '#1E1C24',
  },
  underline: {
    borderBottomColor: '#959494',
    borderBottomWidth: 0.5,
    marginLeft: 23,
    marginTop: Platform.OS === 'ios' ? null : '-3%',
    marginRight: 23,
  },

  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.mulishRegular,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: '600',
    // marginBottom:20
  },
  linearGradient: {
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 25,
    // marginLeft: 42,
    // height: 48,
    // marginRight: 42
    width: '85%',
    // height:'7%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 25,
    marginLeft: 30,
    height: 55,
    marginRight: 30,
    // lineHeight:400
  },
  eyeopen: {
    // marginLeft:245,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // marginTop:5,
    flex: 1,
    marginRight: 24,
  },
  error: {
    color: 'red',
    marginLeft: 25,
    fontFamily: Fonts.mulishRegular,
  },
  text2: {
    fontSize: 14,
    color: '#868585',
    fontFamily: Fonts.mulishRegular,
    marginTop: 5,
    marginBottom: '10%',
  },
  forgot: {
    color: '#58C4C6',
    fontFamily: Fonts.mulishRegular,
    fontSize: 15,
    marginLeft: 25,
    // marginTop:-15
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop : "50%"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: Fonts.mulishRegular,
    color: '#000',
    fontSize: 20,
    marginTop: 10,
  },
});
