

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box'
export default class EventNotificationScreen extends React.Component {




    constructor() {
        super();
        this.state = {
            isPushSomeOneCancelMeeting: false,
            isPushForMeetingStarting: false,
            isEmailForSomeOneCancelMeeting: false,
            isEmailForMeetingStarting: false
        }
    }


    render() {
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

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
                                isChecked={
                                    this.state.isPushSomeOneCancelMeeting}
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
                                // this.onSubmit();
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