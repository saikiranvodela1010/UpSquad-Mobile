import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
// import * as Progress from 'react-native-progress';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
// import SelectDropdown from 'react-native-select-dropdown'
import { ProgressBar, Colors } from 'react-native-paper';

var radio_props = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 1 }
];
const countries = ["Egypt", "Canada", "Australia", "Ireland"]
export default class CreateEventSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef(null);
        this.state = {
            eventagenda: '',
            eventdescription: '',
            surveylink:'',
            surveylinkerr:'',
            surveydes:'',
            surveydes_err:'',
            category: '',
            value:1
        }
    }

    onNext() {
        if (this.state.meetingtitle == '') {
            this.setState({ meetingtitleerr: 'Required' })
        }
        if (this.state.addguest == '') {
            this.setState({ addguesterr: 'Required' })
        }
        if (this.state.meetingtitle != '' && this.state.addguest != '') {
            //this.props.navigation.navigate('setavailabilityscreen')
        }
    }

    render() {

        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

<View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('eventselectionscreen')}>
                        <Image
                            source={ImagesWrapper.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header1}>Create event</Text>
                </View>
                {/* <View style={{ borderBottomColor: '#959494', borderBottomWidth: 0.5, width: '100%' }}></View> */}
                <View style={{ borderTopWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}>
                    <ProgressBar useNativeDriver={false} progress={6} height={3} width={370} color={'rgba(33, 43, 104, 1)'} borderColor={'rgba(33, 43, 104, 1)'} />
                </View>
                <ScrollView>
                <Text style={styles.title}>Event description</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(eventDesc) => {

                            this.setState({ eventdescription: eventDesc });
                            //this.setState({ meetingtitleerr: '' });
                            //    /^(?:[A-Za-z ]+|\d+)$/.test(this.state.firstname) ? alert('hiii') : null
                        }}
                        // onSubmitEditing={() => { this.refs['second'].focus() }}
                        // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        // blurOnSubmit={false}
                        value={this.state.eventdescription}
                        // returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={63}
                    // multiline={true}

                    />
                    <View style={[styles.underline]} />
                    {/* <Text style={styles.error}>{this.state.meetingtitleerr}</Text> */}
                    <Text style={styles.title}>Event agenda</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(eventAgenda) => {

                            this.setState({ eventagenda: eventAgenda });
                            //this.setState({ meetingtitleerr: '' });
                            //    /^(?:[A-Za-z ]+|\d+)$/.test(this.state.firstname) ? alert('hiii') : null
                        }}
                        // onSubmitEditing={() => { this.refs['second'].focus() }}
                        // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        // blurOnSubmit={false}
                        value={this.state.eventagenda}
                        // returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={63}
                    // multiline={true}

                    />
                    <View style={[styles.underline]} />
                    {/* <Text style={styles.error}>{this.state.meetingtitleerr}</Text> */}



                    <Text style={{ marginTop: '6%', marginBottom: '4%', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: '#000000', marginLeft: 25 }}>
                        Would you like to conduct a survey? </Text>
                    
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
                                        borderWidth={1}
                                        buttonInnerColor={'#58C4C6'}
                                        buttonOuterColor={this.state.value === i ? '#58C4C6' : '#58C4C6'}
                                        buttonSize={15}
                                        buttonOuterSize={25}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginBottom: 12, marginLeft: '6%' }}
                                    />

                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                        labelStyle={{ fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: '#000000' }}
                                        labelWrapStyle={{ marginBottom: 12 }}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                    {this.state.value==0?
                    <View>
                    <Text style={styles.title}>Enter survey link</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(surveyLink) => {

                            this.setState({ surveylink: surveyLink });
                            this.setState({ surveylinkerr: '' });
                            //    /^(?:[A-Za-z ]+|\d+)$/.test(this.state.firstname) ? alert('hiii') : null
                        }}
                        // onSubmitEditing={() => { this.refs['second'].focus() }}
                        // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        // blurOnSubmit={false}
                        value={this.state.surveylink}
                        // returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={63}
                    // multiline={true}

                    />
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.surveylinkerr}</Text>
                    <Text style={styles.survey}>Enter survey description</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(surveyDes) => {

                            this.setState({ surveydes: surveyDes });
                            this.setState({ surveydes_err: '' });
                            //    /^(?:[A-Za-z ]+|\d+)$/.test(this.state.firstname) ? alert('hiii') : null
                        }}
                        // onSubmitEditing={() => { this.refs['second'].focus() }}
                        //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        // blurOnSubmit={false}
                        value={this.state.surveydes}
                        //returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={63}
                    // multiline={true}

                    />
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.surveydes_err}</Text>
                    </View>
   :null }
                    <View style={{ marginTop: this.state.value==0?'20%':'70%' }}>
                        <TouchableOpacity
                            onPress={() => { this.onNext() }}
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                                <Text style={styles.buttonText}>
                                    Create event
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
        marginTop: '7%',
        marginLeft: 25,
        fontFamily: Fonts.mulishRegular,
        color: '#868585'
    },
    survey: {
        fontSize: 14,
        fontWeight: '400',
        // color:'#959494',
        marginTop: '5%',
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


