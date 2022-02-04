

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image ,Modal,ActivityIndicator} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box'
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';



export default class EventNotificationScreen extends React.Component {

    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();


    constructor() {
        super();
        this.state = {
            isPushSomeOneCancelMeeting: false,
            isPushForMeetingStarting: false,
            isEmailForSomeOneCancelMeeting: false,
            isEmailForMeetingStarting: false,
            userId:'',
            isLoading:false,
            // isPush:0
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
        console.log("settings response",response.data[0].notificationSettings.eventNotification);
       if(response.status === true){
           this.setState({isLoading:false})
            if(response.data[0].notificationSettings.eventNotification.pushNotification[0] === 1 ){
               this.setState({ isPushSomeOneCancelMeeting:true});
            }
            if(response.data[0].notificationSettings.eventNotification.pushNotification[1] === 2){
                this.setState({ isPushForMeetingStarting:true});
            }
            if(response.data[0].notificationSettings.eventNotification.emailNotification[0] === 1 ){
                this.setState({ isEmailForSomeOneCancelMeeting:true});
             }
             if(response.data[0].notificationSettings.eventNotification.emailNotification[1] === 2){
                 this.setState({ isEmailForMeetingStarting:true});
             }

        }
    }

    async saveEventData(){
        this.setState({isLoading:true});
        let EventPushNotifyCancel = 0;
        let EventPusgNotifyStart = 0;
        let EmailNotifyCancel = 0;
        let EmailNotifyStart= 0;
        if(this.state.isPushSomeOneCancelMeeting === true){
            EventPushNotifyCancel = 1
        }
        if(this.state.isPushForMeetingStarting === true){
            EventPusgNotifyStart = 2
        }
        if(this.state.isEmailForSomeOneCancelMeeting === true){
            EmailNotifyCancel = 1
        }
        if(this.state.isEmailForMeetingStarting === true){
            EmailNotifyStart = 2
        }
        console.log("EventData",EventPushNotifyCancel,EventPusgNotifyStart,EmailNotifyCancel,EmailNotifyStart)
        const data ={
            "pushNotification": [
                EventPushNotifyCancel,
                EventPusgNotifyStart
            ],
            "emailNotification": [
                EmailNotifyCancel,
                EmailNotifyStart
            ],
            "userId": this.state.userId,
        }
       

        const response = await this.apiHandler.requestPost(data,this.serviceUrls.updateEventNotificationSettings)
        console.log("respose",response);
        if(response.status === true){
            this.setState({isLoading:false});
            this.props.navigation.navigate('DrawerNotification');
        }else{
            this.setState({isLoading:false});
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
                    }}>
                        <Image
                            source={ImagesWrapper.back} />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Event Notifications</Text>


                </View>
                <View style={styles.underline}></View>


                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.who}>Push notification when</Text>

                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isPushSomeOneCancelMeeting: !this.state.isPushSomeOneCancelMeeting
                                    })

                                }}
                                isChecked={this.state.isPushSomeOneCancelMeeting}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isPushSomeOneCancelMeeting === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Someone schedules or cancels a event</Text>
                        </View>
                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isPushForMeetingStarting: !this.state.isPushForMeetingStarting
                                    })
                                }}
                                isChecked={
                                    this.state.isPushForMeetingStarting}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isPushForMeetingStarting === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>A event is starting in the next 30m</Text>
                        </View>

                        <View style={[styles.underline, { width: '85%', marginLeft: 'auto', marginRight: 'auto' }]}></View>

                        <Text style={styles.who}>Email notification when</Text>


                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isEmailForSomeOneCancelMeeting: !this.state.isEmailForSomeOneCancelMeeting
                                    })
                                }}
                                isChecked={
                                    this.state.isEmailForSomeOneCancelMeeting}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isEmailForSomeOneCancelMeeting === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Someone schedules or cancels a event</Text>
                        </View>



                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isEmailForMeetingStarting: !this.state.isEmailForMeetingStarting
                                    })
                                }}
                                isChecked={
                                    this.state.isEmailForMeetingStarting}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isEmailForMeetingStarting === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>A event is starting in the next 30m </Text>
                        </View>
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