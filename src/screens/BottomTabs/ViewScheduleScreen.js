import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';

export default class ViewScheduleScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ margin: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('scheduledetailscreen')}>
                        <Image style={styles.backarrow} source={ImagesWrapper.back} />
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}></View>
                <View style={{ borderWidth: 1, height: 100, width: '100%', flexDirection: 'row', borderColor: 'rgba(235, 248, 248, 1)', backgroundColor: 'rgba(235, 248, 248, 1)', alignItems: 'center' }}>
                    <View style={{ marginLeft: 25 }}>
                        <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>Confirmed </Text>
                        <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>You are scheduled with John Croft </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 25 }}>
                        <Image source={ImagesWrapper.checkcircle} />
                    </View>
                </View>
                <View style={{ marginTop: 25, marginLeft: 25 }}>
                    <View>
                        <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>1:1 with John Croft </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Image source={ImagesWrapper.calendar} />
                        <Text style={{ marginLeft: 15, color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishSemiBold }}>4:30pm - 5:00pm, Friday, July 31, 2021 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Image source={ImagesWrapper.globe} />
                        <Text style={{ marginLeft: 15, color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>Central Standard Time (CST)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                        <View>
                            <Image source={ImagesWrapper.users} />
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, color: 'rgba(88, 196, 198, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>johncroft@gmail.com ,</Text>
                            <Text style={{ marginLeft: 15, color: 'rgba(88, 196, 198, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>benthompson@gmail.com</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Image source={ImagesWrapper.video} />
                        <Text style={{ marginLeft: 15, color: 'rgba(88, 196, 198, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>https://us04web.zoom.us/j/75365</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Image source={ImagesWrapper.notification3} />
                        <Text style={{ marginLeft: 15, color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>30 mins before </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 25 }}>
                            <Image source={ImagesWrapper.edit} />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, marginLeft: 25 }}>
                    <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 14, fontWeight: '600', fontFamily: Fonts.mulishSemiBold, width: '80%' }}>A calendar invitation has been sent to your email address </Text>
                </View>
                <View style={{ marginTop: '48%' }}>
                    <TouchableOpacity>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                            <Text style={styles.buttonText}>
                                View your schedule
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    backarrow: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
    },
    linearGradient: {
        width: '85%',
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 30,
        height: 55,
        marginRight: 30,

    },
})