import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import SelectDropdown from 'react-native-select-dropdown';
import CalendarPicker from './Calendar';
import moment from 'moment';


export default class ScheduleScreen extends React.Component {
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
        this.props.navigation.navigate('scheduletimescreen', {scheduleDate: this.state.selectedDayDate})
    }

    render() {
        const { selectedDayDate } = this.state;
        const startDate = selectedDayDate ? selectedDayDate.toString() : '';
        const minDate = new Date();
        const countries = ["Indian Standard Time (IST)", "Central Standard Time (CST)"]

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: "row", margin: 15, }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar3')}>
                        <Image style={styles.backarrow} source={ImagesWrapper.back} />
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}></View>
                <View style={{ marginLeft: 25 }}>
                    <View style={{ marginTop: 25 }}>
                        <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>1:1 with John Croft </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View>
                            <Image source={ImagesWrapper.notification3} />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>30 mins</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 25 }}>
                            <Image source={ImagesWrapper.edit} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View>
                            <Image source={ImagesWrapper.video} />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular, width: '80%' }}>Web conferencing details provided upon confirmation</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View>
                            <Image source={ImagesWrapper.globe} />
                        </View>
                        <View style={{ marginTop: -5 }}>
                            <SelectDropdown
                                data={countries}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
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
                                rowTextStyle={{color: "#9F9F9F", textAlign: "left",fontSize:14,fontFamily:Fonts.mulishRegular,fontWeight:'400'}} 
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '600', fontFamily: Fonts.mulishRegular }}>Schedule a 1:1 with John croft he is Available 3 times this month </Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)', marginTop: 25, width: '90%', marginLeft: 'auto', marginRight: 'auto' }}></View>
                <View>
                    <View style={{ marginTop: 20, marginLeft: 25 }}>
                        <Text style={styles.popupLabel}>Select a day</Text>
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
        fontSize: 14,
        fontFamily: Fonts.mulishSemiBold,
    },
})