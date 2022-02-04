

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image,Modal,ActivityIndicator } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box'
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';

export default class MessageNotificationScreen extends React.Component {


    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();


    constructor() {
        super();
        this.state = {
            isPushWhenSomeoneSentMsg: false,
            isPushWhenSomeoneMsg2Group: false,
            isEmailWhenSomeoneSentMsg: false,
            isEmailWhenSomeoneMsg2Group: false,
            userId:'',
            isLoading:false,
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
        console.log("messageNotification response",response.data[0].notificationSettings.messageNotification);
       if(response.status === true){
           this.setState({isLoading:false})
            if(response.data[0].notificationSettings.messageNotification.pushNotification[0] === 1 ){
               this.setState({ isPushWhenSomeoneSentMsg:true});
            }
            if(response.data[0].notificationSettings.messageNotification.pushNotification[1] === 2){
                this.setState({ isPushWhenSomeoneMsg2Group:true});
            }
            if(response.data[0].notificationSettings.messageNotification.emailNotification[0] === 1 ){
                this.setState({ isEmailWhenSomeoneSentMsg:true});
             }
             if(response.data[0].notificationSettings.messageNotification.emailNotification[1] === 2){
                 this.setState({ isEmailWhenSomeoneMsg2Group:true});
             }

            }else{
                this.setState({isLoading:false});
            }
    }

    async saveEventData(){
        this.setState({isLoading:true});
        let MsgPushNotifySentMsg = 0;
        let MsgPusgNotifySent2Grp = 0;
        let EmailMsgPushNotifySentMsg  = 0;
        let EmailMsgPusgNotifySent2Grp= 0;
        if(this.state.isPushWhenSomeoneSentMsg === true){
            MsgPushNotifySentMsg = 1
        }
        if(this.state.isPushWhenSomeoneMsg2Group === true){
            MsgPusgNotifySent2Grp = 2
        }
        if(this.state.isEmailWhenSomeoneSentMsg === true){
            EmailMsgPushNotifySentMsg = 1
        }
        if(this.state.isEmailWhenSomeoneMsg2Group === true){
            EmailMsgPusgNotifySent2Grp = 2
        }
        // console.log("EventData",EventPushNotifyCancel,EventPusgNotifyStart,EmailNotifyCancel,EmailNotifyStart)
        const data ={
            "pushNotification": [
                MsgPushNotifySentMsg,
                MsgPusgNotifySent2Grp
            ],
            "emailNotification": [
                EmailMsgPushNotifySentMsg,
                EmailMsgPusgNotifySent2Grp
            ],
            "userId": this.state.userId,
        }
       

        const response = await this.apiHandler.requestPost(data,this.serviceUrls.updateMessageNotificationSettings)
        console.log("respose",response);
        if(response.status === true){
            this.setState({isLoading:false});
            this.props.navigation.navigate('DrawerNotification');
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

    render() {
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                   {this.renderLoader()}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                          this.props.navigation.pop();
                        //</View>  this.props.navigation.navigate('BioSuccess');
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                        // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Message Notifications</Text>


                </View>
                <View style={styles.underline}></View>


                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.who}>Push notification when</Text>

                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isPushWhenSomeoneSentMsg: !this.state.isPushWhenSomeoneSentMsg
                                    })
                                }}
                                isChecked={
                                    this.state.isPushWhenSomeoneSentMsg}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isPushWhenSomeoneSentMsg === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Someone sent a 1:1 message</Text>
                        </View>
                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isPushWhenSomeoneMsg2Group: !this.state.isPushWhenSomeoneMsg2Group
                                    })
                                }}
                                isChecked={
                                    this.state.isPushWhenSomeoneMsg2Group}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isPushWhenSomeoneMsg2Group === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Someone sent a message to the group</Text>
                        </View>


                        {/* <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.posttext}>A meeting is starting in the next 30m </Text>
                        </View> */}
                        <View style={[styles.underline, { width: '85%', marginLeft: 'auto', marginRight: 'auto' }]}></View>

                        <Text style={styles.who}>Email notification when</Text>


                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isEmailWhenSomeoneSentMsg: !this.state.isEmailWhenSomeoneSentMsg
                                    })
                                }}
                                isChecked={
                                    this.state.isEmailWhenSomeoneSentMsg}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isEmailWhenSomeoneSentMsg === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Someone sent a 1:1 message</Text>
                        </View>


                        {/* <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.posttext}>Someone schedules or cancel a meeting </Text>

                        </View> */}

                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isEmailWhenSomeoneMsg2Group: !this.state.isEmailWhenSomeoneMsg2Group
                                    })
                                }}
                                isChecked={
                                    this.state.isEmailWhenSomeoneMsg2Group}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isEmailWhenSomeoneMsg2Group === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Someone sent a message to the group </Text>
                        </View>






                        {/* <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.posttext}>A meeting is starting in next 30m </Text>
                        </View> */}
                    </View>










                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.props.navigation.navigate('Account')
                                this.saveEventData();
                            }}  >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(33, 43, 104, 1)', 'rgba(88, 196, 198, 1)']} style={[styles.linearGradient1, { marginBottom: '6%' }]}>

                                <Text style={styles.nextbtn}>
                                    Save
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
        flexDirection: 'row',
        marginLeft: -10
        // borderBottomWidth:1
    },
    text: {
        flexDirection: 'row',
        marginLeft: '8%',
        marginTop: 20
    }, checkboxtxt1: {
        marginLeft: 12,
        fontSize: 14,
        // color: '#000000',
        // marginTop: 5,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'

    },
    underline: {
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft: 'auto',
        width: '100%',
        marginTop: 15
    },
    memphistalk: {
        fontSize: 20,
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '5%'
    },
    account: {
        fontSize: 14,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '8%',
        marginTop: 30
    },
    posttext: {
        fontSize: 14,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '8%',
        marginTop: 20
    },
    who: {
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '8%',
        marginTop: 30
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
    linearGradient1: {
        width: '85%',
        height: 55,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',




    },
});