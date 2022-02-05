import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import CalendarPicker from './Calendar';
import moment from 'moment';


export default class DateTimeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            on: false,
            isChecked: false,
            selectedDayDate: null,
            data: [
                {
                    id: "1",
                    time: "4:00pm",
                    isSelect: false,
                    selectedClass: 'notselected'
                },
                {
                    id: "2",
                    time: "4:30pm",
                    isSelect: false,
                    selectedClass: 'notselected'
                },
                {
                    id: "3",
                    time: "5:00pm",
                    isSelect: false,
                    selectedClass: 'notselected'
                },
                {
                    id: "4",
                    time: "5:30pm",
                    isSelect: false,
                    selectedClass: 'notselected'
                },
                {
                    id: "5",
                    time: "6:00pm",
                    isSelect: false,
                    selectedClass: 'notselected'
                },
            ]

        }
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) {
        this.setState({
            selectedDayDate: date,
            show: false
        });
        // this.props.navigation.navigate('scheduletimescreen', { scheduleDate: this.state.selectedDayDate })
    }

    render() {
        const { selectedDayDate } = this.state;
        const startDate = selectedDayDate ? selectedDayDate.toString() : '';
        const minDate = new Date();
        const countries = ["Indian Standard Time (IST)", "Central Standard Time (CST)"]

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: "row", margin: 15, }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={styles.backarrow} source={ImagesWrapper.back} />
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}></View>
                <View>
                    <View style={{ marginTop: 20, marginLeft: 25 }}>
                        <Text style={styles.popupLabel}>Select the date(s) you want to assign specific hours</Text>
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
    popupLabel: {
        color: 'rgba(30, 28, 36, 1)',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
        width: '80%'
    },
})