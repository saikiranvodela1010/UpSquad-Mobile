import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import SelectDropdown from 'react-native-select-dropdown';
import CalendarPicker from './Calendar';
import moment from 'moment';


export default class ScheduleTimeScreen extends React.Component {
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
        this.props.navigation.navigate('tabbar3')
    }

    componentDidMount(){
        const schedule = this.props.route.params.scheduleDate;
        this.setState({dayDate: schedule});
        console.log("date:", schedule)
    }

    render() {
        const { selectedDayDate } = this.state;
        const startDate = selectedDayDate ? selectedDayDate.toString() : '';
        const minDate = new Date();
        const countries = ["Indian Standard Time (IST)", "Central Standard Time (CST)"]

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{margin: 15}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('schedulescreen')}>
                        <Image style={styles.backarrow} source={ImagesWrapper.back} />
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}></View>
                
                {/* <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 25, marginBottom: 20 }}>
                    <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 16, fontWeight: '600', fontFamily: Fonts.mulishRegular }}>{this.state.dayDate} </Text>
                </View> */}
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 25 }}>
                    <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>Friday</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, marginLeft: 25 }}>
                    <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 16, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>July 31, 2021 </Text>
                </View>
                <View style={{ marginTop: -5, marginLeft: 5 }}>
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
                <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 25 }}>
                    <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 16, fontWeight: '600', fontFamily: Fonts.mulishSemiBold }}>What time would you prefer?</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 25, marginBottom: 20 }}>
                    <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 16, fontWeight: '600', fontFamily: Fonts.mulishRegular }}>Duration: 30 min </Text>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <TouchableOpacity >
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
                                <View style = {{borderWidth:1, height: 60, width: '90%', borderRadius: 10, marginLeft: 'auto', marginRight: 'auto', borderColor: 'rgba(241, 241, 241, 1)', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{ color: 'rgba(177, 170, 170, 1)', fontSize: 16, fontWeight: '600', fontFamily: Fonts.mulishRegular }}>{item.time}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                    extraData={this.state}
                />
                <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 50, marginBottom: 25 }}>
                    <TouchableOpacity 
                    onPress={()=>{
                        // this.onSubmit();
                        this.props.navigation.navigate('scheduledetailscreen')
                    }}
                    
                    >
                    <View style={{ borderWidth: 1, borderRadius: 30, borderColor: 'rgba(134, 133, 133, 1)', backgroundColor: 'rgba(134, 133, 133, 1)', height: '80%', width: '90%', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginBottom: 30 }}>
                        <Text style={{ color: 'rgba(255, 255, 255, 1)', fontWeight: '600', fontSize: 16, fontFamily: Fonts.mulishRegular }}>Next</Text>
                    </View>
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
    popupLabel: {
        color: 'rgba(30, 28, 36, 1)',
        fontWeight: '600',
        fontSize: 14,
        fontFamily: Fonts.mulishSemiBold,
    },
})