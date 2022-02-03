

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image,Modal,ActivityIndicator } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'
import LinearGradient from 'react-native-linear-gradient';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';



export default class NotfctnPostComntScreen extends React.Component {

    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();

    constructor() {
        super();
        this.state = {
            isPushOnComments: false,
            isPushOnCommentReplies: false,
            isPushOnLikes: false,
            isEmailOnComments: false,
            isEmailOnCommentReplies: false,
            isEmailOnLikes: false,
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
        console.log("postCommentNotification response",response.data[0].notificationSettings.postCommentNotification);
       if(response.status === true){
           this.setState({isLoading:false})
            if(response.data[0].notificationSettings.postCommentNotification.pushNotification[0] === 1 ){
               this.setState({ isPushOnComments:true});
            }
            if(response.data[0].notificationSettings.postCommentNotification.pushNotification[1] === 2){
                this.setState({ isPushOnCommentReplies:true});
            }
            if(response.data[0].notificationSettings.postCommentNotification.pushNotification[2] === 3){
                this.setState({ isPushOnLikes:true});
            }
            if(response.data[0].notificationSettings.postCommentNotification.emailNotification[0] === 1 ){
                this.setState({ isEmailOnComments:true});
             }
             if(response.data[0].notificationSettings.postCommentNotification.emailNotification[1] === 2){
                 this.setState({ isEmailOnCommentReplies:true});
             }
             if(response.data[0].notificationSettings.postCommentNotification.emailNotification[2] === 3){
                this.setState({ isEmailOnLikes:true});
            }

        }
    }

    async saveEventData(){
        this.setState({isLoading:true});
        let PushOnComments = 0;
        let PushOnCommentReplies = 0;
        let PushOnLikes = 0;
        let EmailOnComments = 0;
        let EmailOnCommentReplies = 0;
        let EmailOnLikes = 0;
        if(this.state.isPushOnComments === true){
            PushOnComments = 1
        }
        if(this.state.isPushOnCommentReplies === true){
            PushOnCommentReplies = 2
        }
        if(this.state.isPushOnLikes === true){
            PushOnLikes = 3
        }
        if(this.state.isEmailOnComments === true){
            EmailOnComments = 1
        }
        if(this.state.isEmailOnCommentReplies === true){
            EmailOnCommentReplies = 2
        }
        if(this.state.isEmailOnLikes === true){
            EmailOnLikes = 3
        }
        // console.log("EventData",EventPushNotifyCancel,EventPusgNotifyStart,EmailNotifyCancel,EmailNotifyStart)
        const data ={
            "pushNotification": [
                PushOnComments,
                PushOnCommentReplies,
                PushOnLikes
            ],
            "emailNotification": [
                EmailOnComments,
                EmailOnCommentReplies,
                EmailOnLikes
            ],
            "userId": this.state.userId,
        }
       

        const response = await this.apiHandler.requestPost(data,this.serviceUrls.updatePostCommentNotificationSettings)
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
                    <Text style={styles.memphistalk}>Post & Comment Notifications</Text>


                </View>

                <View style={styles.underline}></View>


                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.who}>Push notification when</Text>


                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isPushOnComments: !this.state.isPushOnComments
                                    })
                                }}
                                isChecked={
                                    this.state.isPushOnComments}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isPushOnComments === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Comments on your posts</Text>
                        </View>


                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isPushOnCommentReplies: !this.state.isPushOnCommentReplies
                                    })
                                }}
                                isChecked={
                                    this.state.isPushOnCommentReplies}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isPushOnCommentReplies === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Replies to comments</Text>
                        </View>
                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isPushOnLikes: !this.state.isPushOnLikes
                                    })
                                }}
                                isChecked={
                                    this.state.isPushOnLikes}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isPushOnLikes === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Likes your posts</Text>
                        </View>

                        <View style={[styles.underline, { width: '85%', marginLeft: 'auto', marginRight: 'auto' }]} />
                        <Text style={styles.who}>Email notification when</Text>




                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isEmailOnComments: !this.state.isEmailOnComments
                                    })
                                }}
                                isChecked={
                                    this.state.isEmailOnComments}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isEmailOnComments === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Comments on your posts</Text>
                        </View>



                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isEmailOnCommentReplies: !this.state.isEmailOnCommentReplies
                                    })
                                }}
                                isChecked={
                                    this.state.isEmailOnCommentReplies}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isEmailOnCommentReplies === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Replies to comments</Text>
                        </View>








                        <View style={styles.text}>
                            <CheckBox
                                onClick={() => {
                                    this.setState({
                                        isEmailOnLikes: !this.state.isEmailOnLikes
                                    })
                                }}
                                isChecked={
                                    this.state.isEmailOnLikes}
                                checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                            />
                            <Text style={[styles.checkboxtxt1, {
                                color: this.state.isEmailOnLikes === true
                                    ? '#1E1C24' : '#B1AAAA'
                            }]}>Likes your posts</Text>
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