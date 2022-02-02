import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList, TouchableHighlightBase } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


var radio_props = [
    { label: 'Zoom', value: 0 },
    { label: 'Microsoft Teams', value: 1 }
];

export default class ScheduleDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            value: 1,


        }
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ margin: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('scheduletimescreen')}>
                        <Image style={styles.backarrow} source={ImagesWrapper.back} />
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}></View>
                <View style={{ marginTop: 25, marginLeft: 25 }}>
                    <View>
                        <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>1:1 with John Croft </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Image source={ImagesWrapper.calendar} />
                        <Text style={{ marginLeft: 15, color: 'rgba(30, 28, 36, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishSemiBold }}>4:30pm - 5:00pm, Friday, July 31, 2021 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Image source={ImagesWrapper.globe} />
                        <Text style={{ marginLeft: 15, color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>Central Standard Time (CST)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Image source={ImagesWrapper.notification3} />
                        <Text style={{ marginLeft: 15, color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>30 mins before </Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)', width: '87%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}></View>
                <View style={{ marginTop: 20, marginLeft: 25 }}>
                    <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 16, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>Enter meeting goals</Text>
                    <Text style={{ marginTop: 15, color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishSemiBold, width: '80%' }}>Please share anything that will help prepare for our meeting.</Text>
                    <Text style={{ marginTop: 15, color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishSemiBold }}>Share the meeting goals</Text>
                    <View style={{ marginTop: 3, borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)', width: '93%' }}></View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ marginTop: '4%', marginBottom: '4%', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: 'rgba(30, 28, 36, 1)', marginLeft: 25, width: '70%' }}>What’s your choice of video chat platform? </Text>

                    <RadioForm
                        formHorizontal={false}
                        animation={true}
                    >
                        {
                            radio_props.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} initial={i} >

                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={this.state.value === i}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                        borderWidth={2}
                                        buttonInnerColor={'#58C4C6'}
                                        buttonOuterColor={this.state.value === i ? '#58C4C6' : '#58C4C6'}
                                        buttonSize={15}
                                        buttonOuterSize={25}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginBottom: 15, marginLeft: '6%' }}
                                    />
                                    {obj.value == 0 ?
                                        <Image source={ImagesWrapper.zoom} style={{ marginTop: 3, marginLeft: '2%' }} /> :
                                        <Image source={ImagesWrapper.microsoft} style={{ marginTop: 3, marginLeft: '2%' }} />}
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                        labelStyle={{ fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: '#868585', marginLeft: -5 }}
                                        labelWrapStyle={{ marginBottom: 15 }}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>


                </View>
                <View style={{ marginTop: '6%' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('viewschedulescreen')}
                    >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                            <Text style={styles.buttonText}>
                                Schedule 1:1
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