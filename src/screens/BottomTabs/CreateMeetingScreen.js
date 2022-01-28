import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';
import axios from 'axios';



var radio_props = [
    { label: 'Zoom', value: 0 },
    { label: 'Microsoft Teams', value: 1 }
];
export default class CreateMeetingScreen extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();
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
            value: 0,
            userId: '5e3bfad3cf7d530022e90429',
            universityId: '5ed8d9509e623f00221761a1',
            adminAccess: true,
            isProfessional: true,
            teamData: [],
            isSelect: [],
            

        }
    }
    async componentDidMount() {
        // const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")

        // this.setState({ universityId: universityDetsils._id })
        // console.log('universityid', this.state.universityId)
        // const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        // this.setState({
        //     userId: userDetails.userId,
        //     adminAccess: userDetails.isAdmin,
        //     isProfessional: userDetails.isProfessional
        // })
        this.getTeams()

    }
    async getTeams() {
        this.setState({
            isLoading: true
        })
        // const data = { 
        //     u_id: this.state.universityId,
        //     user_id: this.state.userId,
        //     isProfessional: this.state.isProfessional,
        //     admin_access: this.state.adminAccess
        // }
        const params = {
            u_id: this.state.universityId,
            user_id: this.state.userId,
            isProfessional: this.state.isProfessional,
            admin_access: this.state.adminAccess
        };

        const res = await axios.get(this.serviceUrls.getGroupTeams, { params });
        //const response = await this.apiHandler.requestGet(data ,this.serviceUrls.getGroupTeams)
        // console.log("Teams response", res.data)
        this.setState({ teamData: res.data.data[0].teamData })
        console.log('tttt', this.state.teamData)

    }



    onNext() {
        if (this.state.meetingtitle == '') {
            this.setState({ meetingtitleerr: 'Required' })
        }
        if (this.state.addguest == '') {
            this.setState({ addguesterr: 'Required' })
        }
        let teamcheckedIds = this.state.isSelect;

        const teamsData = this.state.teamData.map((item) => {

            return teamcheckedIds.indexOf(item.team_id) === -1 ? { teamId: item.team_id, "isChecked": false } : { teamId: item.team_id, "isChecked": true }
        })
        //this.setState({teamsData1:teamsData})
        //console.log('selected team data',this.state.teamsData1)
        console.log('meeting type',this.state.value)

        if (this.state.meetingtitle != '' && this.state.addguest != '') {
            this.props.navigation.navigate('meetingschedulescreen',{
                meetingTitle:this.state.meetingtitle,
                guests:this.state.addguest,
                teams:teamsData,
                meetingType:this.state.value
            })
        }
    }

    render() {

        return (


            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

                <View style={{ flexDirection: 'row', marginTop: '5%', marginBottom: 15, marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar3')}>
                        <Image
                            source={ImagesWrapper.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header1}>Create meeting</Text>
                </View>
                {/* <View style={{ borderBottomColor: '#959494', borderBottomWidth: 0.5, width: '100%' }}></View> */}

                <View style={{ borderTopWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}>

                    {this.state.meetingtitle != '' || this.state.addguest != '' ?
                        <ProgressBar useNativeDriver={false} progress={5} height={3} width={150} color={'rgba(33, 43, 104, 1)'} borderColor={'rgba(33, 43, 104, 1)'} />
                        : <ProgressBar useNativeDriver={false} progress={1} height={3} width={22} color={'rgba(33, 43, 104, 1)'} borderColor={'rgba(33, 43, 104, 1)'} />}
                </View>
                <ScrollView>
                    <Text style={styles.title}>Meeting title</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(meetingTitle) => {

                            this.setState({ meetingtitle: meetingTitle });
                            this.setState({ meetingtitleerr: '' });
                            //    /^(?:[A-Za-z ]+|\d+)$/.test(this.state.firstname) ? alert('hiii') : null
                        }}
                        // onSubmitEditing={() => { this.refs['second'].focus() }}
                        // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        // blurOnSubmit={false}
                        value={this.state.meetingtitle}
                        // returnKeyType={"next"}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={63}
                    // multiline={true}

                    />
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.meetingtitleerr}</Text>
                    <Text style={styles.guest}>Add guests</Text>
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
                    <View style={{ marginTop: '5%', marginLeft: 25, flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: '#1E1C24' }}>Entire organization:</Text>
                        <View style={{ marginLeft: '40%' }}>
                            <SwitchToggle
                                switchOn={this.state.on}
                                onPress={() => this.setState({ on: !this.state.on })}
                                circleColorOff='#B1AAAA'
                                circleColorOn='#00D9D5'
                                backgroundColorOn='white'
                                backgroundColorOff='white'
                                containerStyle={{

                                    width: 40,
                                    height: 23,
                                    borderRadius: 25,
                                    borderWidth: 1.5,
                                    borderColor: '#B1AAAA',
                                    padding: 5,
                                }}
                                circleStyle={{
                                    width: 13,
                                    height: 13,
                                    borderRadius: 20,

                                }}
                            />
                        </View>
                    </View>
                    <Text style={{ marginTop: '6%', marginBottom: '3%', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: '#1E1C24', marginLeft: 25 }}>Select squad(s):</Text>
                    <FlatList
                        data={this.state.teamData}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '3%' }}>
                                <CheckBox

                                    onClick={() => {

                                        const index = this.state.isSelect.indexOf(item.team_id);
                                        if (index > -1) {
                                            this.state.isSelect.splice(index, 1)
                                        } else {
                                            this.state.isSelect.push(item.team_id)
                                        }
                                        this.setState({ isSelect: this.state.isSelect })
                                    }}

                                    isChecked={this.state.isSelect.includes(item.team_id)}

                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#868585', fontWeight: '400', fontFamily: Fonts.mulishRegular, fontSize: 14 }}>{item.teamTitle}</Text>

                            </View>
                        }
                        ItemSeparatorComponent={this.renderSeparator}
                        extraData={this.state}
                    />

                    {/* <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '1%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isFundRaising: !this.state.isFundRaising
                                })
                            }}
                            isChecked={this.state.isFundRaising}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#868585', fontWeight: '400', fontFamily: Fonts.mulishRegular, fontSize: 14 }}>Fund raising</Text>

                    </View> */}
                    {/* <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '4%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isMarketing: !this.state.isMarketing
                                })
                            }}
                            isChecked={this.state.isMarketing}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#868585', fontWeight: '400', fontFamily: Fonts.mulishRegular, fontSize: 14 }}>Marketing</Text>

                    </View> */}
                    <Text style={{ marginTop: '6%', marginBottom: '4%', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', fontSize: 16, color: '#1E1C24', marginLeft: 25 }}>Event Meeting Platform </Text>
                    {/* <View style = {{flexDirection: 'row',marginLeft:'6%'}}>
                        <View >
                    
                <Image
                  source={ImagesWrapper.radiobtn}
                  
                />
                </View>
                <Image source={ImagesWrapper.zoom} style={{marginLeft:'3%'}}/>
                <Text style = {styles.popupText}>Zoom</Text>
                

              </View>
              <View style = {{flexDirection: 'row', marginTop: 15,marginLeft:'6%'}}>
              <View style = {{ }}>
                <Image
                  source={ImagesWrapper.radiobtn1}
                  
                />
                </View>
                <Image source={ImagesWrapper.microsoft} style={{marginLeft:'3%'}}/>
                <Text style = {styles.popupText}>Microsoft Teams</Text>
                
              </View> */}
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
                    <View style={{ marginTop: '22%' }}>
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
        marginTop: '3%',
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


