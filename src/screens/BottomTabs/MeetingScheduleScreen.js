import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, ScrollView, FlatList } from 'react-native';
import Fonts from '../../res/Fonts';
import ImagesWrapper from '../../res/ImagesWrapper';
// import * as Progress from 'react-native-progress';
import SwitchToggle from "react-native-switch-toggle";
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import CalendarPicker from './Calendar';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';



export default class MeetingScheduleScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            on: false,

            selectedStartDate: null,
            selectedEndDate: null,
            showend: false,
            showtime: false,
            meetingTitle: '',
            meetingType: '',
            guests: '',
            teams: []
        }
        this.onDateChange = this.onDateChange.bind(this);
        this.onDate1Change = this.onDate1Change.bind(this);
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
        const meetingTitle = this.props.route.params.meetingTitle;
        const guests = this.props.route.params.guests;
        const teams = this.props.route.params.teams;
        console.log("teams data:::", teams);
        const meetingType = this.props.route.params.meetingType;
        this.setState({
            meetingTitle: meetingTitle,
            guests: guests,
            teams: teams,
            meetingType: meetingType
        })


    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
            show: false

        });
    }
    onDate1Change(date) {
        this.setState({
            //selectedStartDate: date,
            selectedEndDate: date,
            showend: false
        });
    }
    onNext() {
        console.log('title', this.state.meetingTitle);
        console.log('guests', this.state.guests);
        console.log('teams', this.state.teams);
        console.log('platform', this.state.meetingType);
        console.log('start date', this.state.selectedStartDate);
        console.log('end date', this.state.selectedEndDate);

        // if (this.state.meetingtitle != '' && this.state.addguest != '') {
        //     this.props.navigation.navigate('createmeetingsurvey',{
        //         meetingTitle:this.state.meetingtitle,
        //         guests:this.state.addguest,
        //         teams:this.state.teamsData,
        //         meetingType:this.state.value
        //     })
        // }
    }

    render() {
        const { selectedStartDate } = this.state;
        const { selectedEndDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        const minDate = new Date();
        //const countries = ["12:00", "12:00", "12:00", "12:00"]
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('createmeetingscreen')}>
                        <Image
                            source={ImagesWrapper.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Create meeting</Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}>
                    <ProgressBar useNativeDriver={false} progress={2} height={3} width={245} color={'rgba(33, 43, 104, 1)'} borderColor={'rgba(33, 43, 104, 1)'} />
                </View>
                <View style={{ marginTop: 30 }}>
                    <View>
                        <Text style={styles.heading}>When does the meeting commence?</Text>
                    </View>
                    <Text style={styles.label}>Select start date</Text>
                    <TouchableOpacity
                        onPress={() => { this.setState({ show: true }) }}
                    >
                        <View style={{ flexDirection: 'row' }}>

                            {startDate != '' ?
                                <Text style={styles.textinputText}>{moment(startDate).format('dddd')}, {moment(startDate).format('MMMM')} {(moment(startDate).format('DD'))} {moment(startDate).format('YYYY')} </Text>
                                :
                                <Text style={styles.textinputText}></Text>
                            }
                            <Image
                                source={ImagesWrapper.datecalendar}
                                style={{ marginTop: -13 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.eventnameerr}</Text>
                    <Text style={styles.label}>Select start time</Text>
                    <TouchableOpacity
                        onPress={() => { this.setState({ showtime: true }) }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textinputText}></Text>
                            <Image
                                source={ImagesWrapper.timer}
                                style={{ marginTop: -13 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.eventnameerr}</Text>
                    <Text style={styles.label}>Select end date</Text>
                    <TouchableOpacity
                        onPress={() => { this.setState({ showend: true }) }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            {/* <Text style={styles.textinputText}></Text> */}
                            {endDate != '' ?
                                <Text style={styles.textinputText}>{moment(endDate).format('dddd')}, {moment(endDate).format('MMMM')} {(moment(endDate).format('DD'))} {moment(endDate).format('YYYY')}</Text>
                                :
                                <Text style={styles.textinputText}></Text>
                            }
                            <Image
                                source={ImagesWrapper.datecalendar}
                                style={{ marginTop: -13 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.eventnameerr}</Text>
                    <Text style={styles.label}>Select end time</Text>
                    <TouchableOpacity
                        onPress={() => { this.setState({ showtime: true }) }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textinputText}></Text>
                            <Image
                                source={ImagesWrapper.timer}
                                style={{ marginTop: -13 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.eventnameerr}</Text>
                </View>
                <View style={{ marginTop: '8%', marginLeft: 25, flexDirection: 'row' }}>
                    <Text style={styles.text}>Is this a recurring meeting?</Text>
                    <View style={{ marginLeft: '26%' }}>
                        <SwitchToggle
                            switchOn={this.state.on}
                            onPress={() => this.setState({ on: !this.state.on })}
                            circleColorOff='#B1AAAA'
                            circleColorOn='rgba(88, 196, 198, 1)'
                            backgroundColorOn='white'
                            backgroundColorOff='white'
                            containerStyle={{

                                width: 30,
                                height: 18,
                                borderRadius: 25,
                                borderWidth: 1.5,
                                borderColor: this.state.on == false ? '#B1AAAA' : 'rgba(88, 196, 198, 1)',
                                padding: 5,
                            }}
                            circleStyle={{
                                width: 11,
                                height: 11,
                                borderRadius: 20,

                            }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: '10%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.onNext()

                        }}
                    >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                            <Text style={styles.buttonText}>
                                Next
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Modal
                    testID={'modal'}
                    isVisible={this.state.show}

                    onBackdropPress={() => this.setState({ show: false })}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ show: false })
                    }}
                >

                    <View style={{ height: 470, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute' }}>
                        <View style={{ paddingLeft: 20, paddingTop: 30 }}>
                            <Text style={styles.popupLabel}>Select start date</Text>
                            <View style={{ paddingTop: 22 }}>
                                <View style={{ width: '95%', height: 340, borderWidth: 0.5, borderRadius: 10, paddingTop: 10, borderColor: '#DCDCDC' }}>
                                    {/* <CalendarPicker/> */}
                                    <CalendarPicker
                                        onDateChange={this.onDateChange}
                                        previousComponent={<View style={{ marginLeft: 170 }}><Image
                                            source={ImagesWrapper.prev}

                                        />
                                        </View>
                                        }
                                        nextComponent={<Image
                                            source={ImagesWrapper.next}

                                        />}
                                        dayLabelsWrapper={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                                        headerWrapperStyle={{ borderBottomWidth: 0.5, borderBottomColor: "#DCDCDC", width: '100%', paddingBottom: 15 }}
                                        weekdays={['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']}
                                        months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']}
                                        textStyle={{
                                            fontSize: 14,
                                            fontFamily: Fonts.mulishRegular,
                                            color: 'rgba(134, 133, 133, 1)'
                                        }}
                                        monthTitleStyle={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            fontFamily: Fonts.mulishRegular,
                                            marginLeft: 5
                                        }}
                                        yearTitleStyle={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            fontFamily: Fonts.mulishRegular,
                                        }}
                                        width={370}
                                        minDate={minDate}
                                        restrictMonthNavigation={true}
                                    />

                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    testID={'modal'}
                    isVisible={this.state.showend}

                    onBackdropPress={() => this.setState({ showend: false })}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ showend: false })
                    }}
                >

                    <View style={{ height: 470, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute' }}>
                        <View style={{ paddingLeft: 20, paddingTop: 30 }}>
                            <Text style={styles.popupLabel}>Select end date</Text>
                            <View style={{ paddingTop: 22 }}>
                                <View style={{ width: '95%', height: 340, borderWidth: 0.5, borderRadius: 10, paddingTop: 10, borderColor: '#DCDCDC' }}>
                                    {/* <CalendarPicker/> */}
                                    <CalendarPicker
                                        onDateChange={this.onDate1Change}
                                        previousComponent={<View style={{ marginLeft: 170 }}><Image
                                            source={ImagesWrapper.prev}

                                        />
                                        </View>
                                        }
                                        nextComponent={<Image
                                            source={ImagesWrapper.next}

                                        />}
                                        dayLabelsWrapper={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                                        headerWrapperStyle={{ borderBottomWidth: 0.5, borderBottomColor: "#DCDCDC", width: '100%', paddingBottom: 15 }}
                                        weekdays={['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']}
                                        months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']}
                                        textStyle={{
                                            fontSize: 14,
                                            fontFamily: Fonts.mulishRegular,
                                            color: 'rgba(134, 133, 133, 1)'
                                        }}
                                        monthTitleStyle={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            fontFamily: Fonts.mulishRegular,
                                            marginLeft: 5
                                        }}
                                        yearTitleStyle={{
                                            fontSize: 16,
                                            fontWeight: '600',
                                            fontFamily: Fonts.mulishRegular,

                                        }}
                                        width={370}
                                        minDate={minDate}
                                        restrictMonthNavigation={true}
                                    />

                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    testID={'modal'}
                    isVisible={this.state.showtime}
                    onBackdropPress={() => this.setState({ showtime: false })}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ showtime: false })
                    }}
                >

                    <View style={{ height: 280, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute' }}>
                        <View style={{ paddingLeft: 20, paddingTop: 30 }}>
                            <Text style={styles.popupLabel}>Select start time</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ marginTop: 10 }}>
                                    <Image
                                        source={ImagesWrapper.globe}

                                    />
                                </View>
                                <View>
                                    {/* <SelectDropdown
                                        data={countries}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}

                                        buttonStyle={{ backgroundColor: '#FFFFFF', width: '58%', height: 40 }}

                                        renderDropdownIcon={() => {

                                            return (
                                                <Image
                                                    source={ImagesWrapper.chevron}
                                                />

                                            );
                                        }}
                                        dropdownIconPosition={"right"}
                                        buttonTextStyle={{ color: "rgba(88, 196, 198, 1)", textAlign: "left", fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}
                                        defaultButtonText={"Central Standard Time (CST)"}
                                    /> */}
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
                                <View style={{ borderWidth: 1, borderRadius: 5, height: 85, width: '17%', marginRight: 5, backgroundColor: 'rgba(235, 248, 248, 1)', borderColor: 'rgba(241, 241, 241, 1)', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={styles.time}
                                        keyboardType='numeric'
                                    >
                                    </TextInput>
                                </View>
                                <Image
                                    source={ImagesWrapper.separator}
                                    style={{ marginTop: 35 }}
                                />
                                <View style={{ borderWidth: 1, borderRadius: 5, height: 85, width: '17%', marginLeft: 5, borderColor: 'rgba(241, 241, 241, 1)', backgroundColor: 'rgba(241, 241, 241, 1)', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput
                                        style={styles.time1}
                                        keyboardType='numeric'
                                    >
                                    </TextInput>
                                </View>
                                <View style={{ borderWidth: 1, borderRadius: 5, height: 85, width: '10%', marginRight: 10, marginLeft: 10, borderColor: 'rgba(241, 241, 241, 1)' }}>
                                    <Text style={styles.timeText}>AM</Text>
                                    <View style={{ borderWidth: 1, borderRadius: 5, height: 45, width: '100%', marginRight: 10, borderColor: 'rgba(241, 241, 241, 1)', marginTop: 23 }}>
                                        <Text style={styles.timeText1}>PM</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    header: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 28, 36, 1)',
        marginLeft: 20
    },
    heading: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        fontSize: 16,
        color: 'rgba(30, 28, 36, 1)',
        marginLeft: 25,
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: '5%',
        marginLeft: 25,
        fontFamily: Fonts.mulishRegular,
        color: 'rgba(134, 133, 133, 1)',
        padding: 5
    },
    textinputText: {
        marginLeft: 25,
        height: Platform.OS === 'ios' ? 30 : 40,
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(30, 28, 36, 1)',
        width: '80%',

    },
    underline: {
        borderBottomColor: 'rgba(241, 241, 241, 1)',
        borderBottomWidth: 1,
        marginLeft: 'auto',
        marginTop: Platform.OS === 'ios' ? null : '-2%',
        marginRight: 'auto',
        width: '85%'
    },
    error: {
        color: 'red',
        marginLeft: 25,
    },
    text: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        fontSize: 16,
        color: 'rgba(30, 28, 36, 1)',
        marginLeft: 10
    },
    popupLabel: {
        color: 'rgba(30, 28, 36, 1)',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
    },
    time: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(88, 196, 198, 1)',
    },
    time1: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        fontSize: 20,
        color: 'rgba(134, 133, 133, 1)',
    },
    timeText: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        fontSize: 12,
        color: 'rgba(177, 170, 170, 1)',
    },
    timeText1: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        fontSize: 12,
        color: 'rgba(88, 196, 198, 1)',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // marginBottom: 50
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