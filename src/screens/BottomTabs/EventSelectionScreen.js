import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import SwitchToggle from "react-native-switch-toggle";
// import * as Progress from 'react-native-progress';
// import RadioButtonRN from 'radio-buttons-react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box'
import { ProgressBar, Colors } from 'react-native-paper';





var radio_props = [
    { label: 'Zoom', value: 0 },
    { label: 'Microsoft Teams', value: 1 }
];
var radio_props1 = [
    { label: 'Private', value: 0 },
    { label: 'Public', value: 1 }
];
export default class EventSelectionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef(null);
        this.state = {
            meetingtitle: '',
            meetingtitleerr: '',
            addguest: '',
            addguesterr: '',
            on: false,
            isFundRaising: false,
            isMarketing: false,
            isOnline: true,
            isPerson: true,
            value: 1,
            value1: 1

        }
    }

    onNext() {
        
        
            this.props.navigation.navigate('createventsurvey')
        
    }

    render() {

        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('eventschedulescreen')}>
                        <Image
                            source={ImagesWrapper.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header1}>Create event</Text>
                </View>
                {/* <View style={{ borderBottomColor: '#959494', borderBottomWidth: 0.5, width: '100%' }}></View> */}

                <View style={{ borderTopWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}>

                  
                        <ProgressBar useNativeDriver={false} progress={5} height={3} width={350} color={'rgba(33, 43, 104, 1)'} borderColor={'rgba(33, 43, 104, 1)'} />
                       
                </View>
                <ScrollView>
                    <Text style={{ marginTop: '5%', marginBottom: '4%', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: '#1E1C24', marginLeft: 25 }}>
                        Event location</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '1%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isOnline: !this.state.isOnline
                                })
                            }}
                            isChecked={this.state.isOnline}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: 'rgba(30, 28, 36, 1)', fontWeight: '400', fontFamily: Fonts.mulishRegular, fontSize: 14 }}>Online</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '4%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isPerson: !this.state.isPerson
                                })
                            }}
                            isChecked={this.state.isPerson}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: 'rgba(30, 28, 36, 1)', fontWeight: '400', fontFamily: Fonts.mulishRegular, fontSize: 14 }}>In-person</Text>

                    </View>

                    <Text style={styles.guest}>Enter location for in-person meetup</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(addGuest) => {

                            this.setState({ addguest: addGuest });
                            this.setState({ addguesterr: '' });
                            //    /^(?:[A-Za-z ]+|\d+)$/.test(this.state.firstname) ? alert('hiii') : null
                        }}
                        // onSubmitEditing={() => { this.refs['second'].focus() }}
                        // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        // blurOnSubmit={false}
                        value={this.state.addguest}
                        // returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={63}
                    // multiline={true}

                    />
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.addguesterr}</Text>

                    <Text style={{ marginTop: '4%', marginBottom: '4%', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: '#1E1C24', marginLeft: 25 }}>Event meetup platform </Text>

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
                    <Text style={{ marginTop: '3%', marginBottom: '4%', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: '#1E1C24', marginLeft: 25 }}>Event type </Text>

                    <RadioForm
                        formHorizontal={false}
                        animation={true}
                    >
                        {
                            radio_props1.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i}  >

                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={this.state.value1 === i}
                                        onPress={(value) => { this.setState({ value1: value }) }}
                                        borderWidth={2}
                                        buttonInnerColor={'#58C4C6'}
                                        buttonOuterColor={this.state.value1 === i ? '#58C4C6' : '#58C4C6'}
                                        buttonSize={15}
                                        buttonOuterSize={25}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginBottom: 15, marginLeft: '6%' }}
                                    />
                                  
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(value) => { this.setState({ value1: value }) }}
                                        labelStyle={{ fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: '#868585' }}
                                        labelWrapStyle={{ marginBottom: 15 }}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                    <View style={{ marginTop: '25%' }}>
                        <TouchableOpacity
                            onPress={() => { this.onNext() }}
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                                <Text style={styles.buttonText}>
                                    Next
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>



                </ScrollView>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    header1: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 28, 36, 1)',
        marginLeft: 20
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        // color:'#959494',
        marginTop: '8%',
        marginLeft: 25,
        fontFamily: Fonts.mulishRegular,
        color: '#868585'
    },
    guest: {
        fontSize: 14,
        fontWeight: '400',
        // color:'#959494',
        marginTop: '6%',
        marginLeft: 25,
        fontFamily: Fonts.mulishRegular,
        color: '#868585'
    },
    underline: {
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft: 23,

        marginTop: Platform.OS === 'ios' ? null : '-1%',
        // marginTop:'-6%'
        marginRight: 23
    },
    textinput: {
        // marginTop:-2,
        marginLeft: 25,
        // width:'90%',
        //marginRight:25,
        height: Platform.OS === 'ios' ? 30 : 40,
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 16,
        color: '#1E1C24',
    },
    error: {
        color: 'red',
        marginLeft: 25,
    },
    selecteam: {
        fontSize: 16,
        color: '#1E1C24',
        marginLeft: '6%',
        marginTop: 30,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    text: {
        flexDirection: 'row',
        marginBottom: 15
    },
    checkbox: {
        // marginLeft: 10,
        marginTop: 5,
        height: 20,
        width: 20
    },
    checkmark: {
        // marginLeft: 10,
        marginTop: 5,
        backgroundColor: '#58C4C6',
        borderRadius: 2,
        height: 20,
        width: 20

    },
    checkboxtxt: {
        marginLeft: 12,
        fontSize: 14,
        color: '#868585',
        marginTop: 5,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'

    },
    checkboxtxt1: {
        marginLeft: 12,
        fontSize: 14,
        // color: '#000000',
        marginTop: 5,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'

    },
    popupText: {
        color: 'rgba(134, 133, 133, 1)',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: Fonts.mulishRegular,
        marginLeft: '1%'
        // marginTop: 5
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // marginBottom:20
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
});


