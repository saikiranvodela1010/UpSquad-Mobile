import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import ImagesWrapper from '../../res/ImagesWrapper';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../res/Fonts';
import CheckBox from 'react-native-check-box';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';
import axios from 'axios'
import TimePicker from '@react-native-community/datetimepicker';


export default class WeeklyHours extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();
    constructor(props) {
        super(props);
        // this.textInput = React.createRef(null);
        this.state = {
            // isSunday: false,
            // isMonday: false,
            // isTuesday: false,
            // isWednesday: false,
            // isThursday: false,
            // isFriday: false,
            // isSaturday: false,
            isLoading: false,
            defaultAvailability: [],
            userId: '',
            showtime: false,
            displayStartTimer: false,
            displayEndTimer: false,
            startTime: null,
            endTime: null,

        }
    }
    async componentDidMount() {

        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        this.setState({ userId: userDetails.userId })
        console.log('id', this.state.userId);

        this.getUserAvailability();

         DeviceEventEmitter.addListener("UpdateFeed",this.updateWeeklyHourScreen)
    }
    updateWeeklyHourScreen = async () => {

        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        this.setState({ userId: userDetails.userId })
        console.log('id', this.state.userId);

        this.getUserAvailability();
        
      }
    async getUserAvailability() {
        this.setState({
            isLoading: true
        })
        const params = {
            //user_id: '612751ed03f7d0315adf3596',
           user_id: this.state.userId,
        };

        const res = await axios.get(this.serviceUrls.getUserAvailability, { params });
        this.setState({
            isLoading: false
        })
        // console.log('UserAvailability', res.data[0].defaultAvailability)
        if (res.data != '') {
            this.setState({ defaultAvailability: res.data[0].defaultAvailability })
        }
        else {
            this.setState({ defaultAvailability: res.data })

        }

        console.log('UserAvailability', this.state.defaultAvailability)

    }
    sunday() {
        let defaultAvailability = []
        let slots = []
        var obj = {
            "openTime": this.state.startTime.getHours()+ ':' + this.state.startTime.getMinutes(),
            "closeTime": this.state.endTime.getHours()+ ':' + this.state.endTime.getMinutes()
        }
        slots.push(obj)

        var obj1 = {
            "slots": slots,
            "day": "Sunday"
        }
        if (this.state.defaultAvailability.length >= 1) {
            for (var i = 0; i < this.state.defaultAvailability.length; i++) {
                if (this.state.defaultAvailability[i].day == 'Sunday') {
                    this.state.defaultAvailability[i].slots.push(obj)
                    this.setState({ defaultAvailability: this.state.defaultAvailability })

                }

            }
            console.log('Pushged', this.state.defaultAvailability)

        }
        else {
            this.state.defaultAvailability.push(obj1);
            this.setState({ defaultAvailability: this.state.defaultAvailability })
            console.log("sundayobject", this.state.defaultAvailability)
        }

       


    }
    delete(index){
       // alert(index)
            for (var i = 0; i < this.state.defaultAvailability.length; i++) {
                if (this.state.defaultAvailability[i].day == 'Sunday') {
                    for(var j = 0; j < this.state.defaultAvailability[i].slots.length; j++){
                        if(j==index){
                            this.state.defaultAvailability[i].slots.splice(j, 1); 
                            //delete this.state.defaultAvailability[i].slots[j]
                            this.setState({ defaultAvailability: this.state.defaultAvailability })
                            // const filteredItems = this.state.defaultAvailability[i].slots.filter(item =>item[j] != item[index])
                            //console.log('deleted',filteredItems)
                           // this.state.defaultAvailability[i].slots.remove(this.state.defaultAvailability[i].slots[j])
                        }
                    }
                }

            }
            console.log('deleted', this.state.defaultAvailability)

        

    }
  async onNext(){
      const data1={
        "defaultAvailability": this.state.defaultAvailability,
        "user_id":  this.state.userId
    }
        const response = await this.apiHandler.requestPost(data1, this.serviceUrls.addUserAvailabilty)
        console.log('post status',response)
        console.log('useravailabity',this.state.defaultAvailability)

    }
    renderLoader() {
        return (
            <Modal transparent={true}
                visible={this.state.isLoading}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10
                }}>
                    <View style={{
                        width: "25%",
                        height: "10%",
                        borderWidth: 1,
                        borderRadius: 5, borderColor: "#58C4C6", marginBottom: 10, backgroundColor: '#58C4C6', justifyContent: 'center'
                    }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            </Modal>
        )
    }
    render() {
        return (
            <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                {this.renderLoader()}
               
                    {this.state.defaultAvailability.length >= 1 ?
                        this.state.defaultAvailability.map((data, key) => {

                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                        <CheckBox

                                            // onClick={() => {
                                            //     this.setState({
                                            //         isSunday: !this.state.isSunday
                                            //     })
                                            // }}
                                            isChecked={data.day == 'Sunday' && data.slots.length >= 1 ? true : false}
                                            //leftText={"CheckBox"}
                                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                        />
                                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>SUNDAY</Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}
                                            onPress={() => { this.setState({ showtime: true }) }
                                            }>
                                            {data.slots.length >= 1 && data.day == 'Sunday' ?
                                                <Image source={ImagesWrapper.plus1} /> :
                                                <Image source={ImagesWrapper.plus2} />}
                                        </TouchableOpacity>
                                    </View>
                                    {data.slots.length >= 1 && data.day == 'Sunday' ?
                                        data.slots.map((data, key) => {
                                            return (<View>
                                                <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6.5%' }}
                                                    onPress={()=>this.delete(key)}>
                                                        <Image source={ImagesWrapper.trashblack} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            )
                                        }) :

                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                                        </View>
                                    }


                                </View>
                            )
                        }) :
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                <CheckBox

                                    // onClick={() => {
                                    //     this.setState({
                                    //         isSunday: !this.state.isSunday
                                    //     })
                                    // }}
                                    isChecked={false}
                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>SUNDAY</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}
                                    // onPress={()=>this.sunday()
                                    onPress={() => { this.setState({ showtime: true }) }
                                    }  >

                                    <Image source={ImagesWrapper.plus2} />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                            </View>
                        </View>


                    }
                    {this.state.defaultAvailability.length >= 1 ?

                        this.state.defaultAvailability.map((data, key) => {

                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                        <CheckBox

                                            // onClick={() => {
                                            //     this.setState({
                                            //         isChecked: !isChecked
                                            //     })
                                            // }}
                                            isChecked={data.day == 'Monday' && data.slots.length >= 1 ? true : false}
                                            //leftText={"CheckBox"}
                                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                        />
                                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>MONDAY</Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>
                                            {data.slots.length >= 1 && data.day == 'Monday' ?
                                                <Image source={ImagesWrapper.plus1} /> :
                                                <Image source={ImagesWrapper.plus2} />}
                                        </TouchableOpacity>
                                    </View>
                                    {data.slots.length >= 1 && data.day == 'Monday' ?
                                        data.slots.map((data, key) => {
                                            return (<View>
                                                <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6.5%' }}>
                                                    <Image source={ImagesWrapper.trashblack} />
                                                </TouchableOpacity>

                                            </View>
                                            )
                                        }) :
                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                                        </View>
                                    }


                                </View>
                            )
                        }) :
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                <CheckBox

                                    // onClick={() => {
                                    //     this.setState({
                                    //         isSunday: !this.state.isSunday
                                    //     })
                                    // }}
                                    isChecked={false}
                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>MONDAY</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>

                                    <Image source={ImagesWrapper.plus2} />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                            </View>
                        </View>}

                    {this.state.defaultAvailability.length >= 1 ?
                        this.state.defaultAvailability.map((data, key) => {

                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                        <CheckBox

                                            // onClick={() => {
                                            //     this.setState({
                                            //         isChecked: !isChecked
                                            //     })
                                            // }}
                                            isChecked={data.day == 'Tuesday' && data.slots.length >= 1 ? true : false}
                                            //leftText={"CheckBox"}
                                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                        />
                                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>TUESDAY</Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>
                                            {data.slots.length >= 1 && data.day == 'Tuesday' ?
                                                <Image source={ImagesWrapper.plus1} /> :
                                                <Image source={ImagesWrapper.plus2} />}
                                        </TouchableOpacity>
                                    </View>
                                    {data.slots.length >= 1 && data.day == 'Tuesday' ?
                                        data.slots.map((data, key) => {
                                            return (<View>
                                                <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6.5%' }}>
                                                        <Image source={ImagesWrapper.trashblack} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            )
                                        }) :
                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                                        </View>
                                    }


                                </View>
                            )
                        }) :
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                <CheckBox

                                    // onClick={() => {
                                    //     this.setState({
                                    //         isSunday: !this.state.isSunday
                                    //     })
                                    // }}
                                    isChecked={false}
                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>TUESDAY</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>

                                    <Image source={ImagesWrapper.plus2} />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                            </View>
                        </View>}

                    {this.state.defaultAvailability.length >= 1 ?

                        this.state.defaultAvailability.map((data, key) => {

                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                        <CheckBox

                                            // onClick={() => {
                                            //     this.setState({
                                            //         isChecked: !isChecked
                                            //     })
                                            // }}
                                            isChecked={data.day == 'Wednesday' && data.slots.length >= 1 ? true : false}
                                            //leftText={"CheckBox"}
                                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                        />
                                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>WEDNESDAY</Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>
                                            {data.slots.length >= 1 && data.day == 'Wednesday' ?

                                                <Image source={ImagesWrapper.plus1} />
                                                :
                                                <Image source={ImagesWrapper.plus2} style={{}} />}
                                        </TouchableOpacity>
                                    </View>
                                    {data.slots.length >= 1 && data.day == 'Wednesday' ?
                                        data.slots.map((data, key) => {
                                            return (<View>
                                                <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6.5%' }}>
                                                        <Image source={ImagesWrapper.trashblack} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            )
                                        }) :
                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                                        </View>
                                    }


                                </View>
                            )
                        }) :
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                <CheckBox

                                    // onClick={() => {
                                    //     this.setState({
                                    //         isSunday: !this.state.isSunday
                                    //     })
                                    // }}
                                    isChecked={false}
                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>WEDNESDAY</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>

                                    <Image source={ImagesWrapper.plus2} />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                            </View>
                        </View>}
                    {this.state.defaultAvailability.length >= 1 ?
                        this.state.defaultAvailability.map((data, key) => {

                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                        <CheckBox

                                            // onClick={() => {
                                            //     this.setState({
                                            //         isChecked: !isChecked
                                            //     })
                                            // }}
                                            isChecked={data.day == 'Thursday' && data.slots.length >= 1 ? true : false}
                                            //leftText={"CheckBox"}
                                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                        />
                                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>THURSDAY</Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>
                                            {data.slots.length >= 1 && data.day == 'Thursday' ?
                                                <Image source={ImagesWrapper.plus1} /> :
                                                <Image source={ImagesWrapper.plus2} />}
                                        </TouchableOpacity>
                                    </View>
                                    {data.slots.length >= 1 && data.day == 'Thursday' ?
                                        data.slots.map((data, key) => {
                                            return (<View>
                                                <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6.5%' }}>
                                                        <Image source={ImagesWrapper.trashblack} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            )
                                        }) :
                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                                        </View>
                                    }


                                </View>
                            )
                        }) :
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                <CheckBox

                                    // onClick={() => {
                                    //     this.setState({
                                    //         isSunday: !this.state.isSunday
                                    //     })
                                    // }}
                                    isChecked={false}
                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>THURSDAY</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>

                                    <Image source={ImagesWrapper.plus2} />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                            </View>
                        </View>}
                    {this.state.defaultAvailability.length >= 1 ?

                        this.state.defaultAvailability.map((data, key) => {

                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                        <CheckBox

                                            // onClick={() => {
                                            //     this.setState({
                                            //         isChecked: !isChecked
                                            //     })
                                            // }}
                                            isChecked={data.day == 'Friday' && data.slots.length >= 1 ? true : false}
                                            //leftText={"CheckBox"}
                                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                        />
                                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>FRIDAY</Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>
                                            {data.slots.length >= 1 && data.day == 'Friday' ?
                                                <Image source={ImagesWrapper.plus1} /> :
                                                <Image source={ImagesWrapper.plus2} />}
                                        </TouchableOpacity>
                                    </View>
                                    {data.slots.length >= 1 && data.day == 'Friday' ?
                                        data.slots.map((data, key) => {
                                            return (<View>
                                                <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6.5%' }}>
                                                        <Image source={ImagesWrapper.trashblack} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            )
                                        }) :
                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                                        </View>
                                    }


                                </View>
                            )
                        }) :
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                <CheckBox

                                    // onClick={() => {
                                    //     this.setState({
                                    //         isSunday: !this.state.isSunday
                                    //     })
                                    // }}
                                    isChecked={false}
                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>FRIDAY</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>

                                    <Image source={ImagesWrapper.plus2} />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                            </View>
                        </View>}

                    {this.state.defaultAvailability.length >= 1 ?

                        this.state.defaultAvailability.map((data, key) => {

                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                        <CheckBox

                                            // onClick={() => {
                                            //     this.setState({
                                            //         isChecked: !isChecked
                                            //     })
                                            // }}
                                            isChecked={data.day == 'Saturday' && data.slots.length >= 1 ? true : false}
                                            //leftText={"CheckBox"}
                                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                        />
                                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>SATURDAY</Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>
                                            {data.slots.length >= 1 && data.day == 'Saturday' ?
                                                <Image source={ImagesWrapper.plus1} /> :
                                                <Image source={ImagesWrapper.plus2} />}
                                        </TouchableOpacity>
                                    </View>
                                    {data.slots.length >= 1 && data.day == 'Saturday' ?
                                        data.slots.map((data, key) => {
                                            return (<View>
                                                <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                                                    <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6.5%' }}>
                                                        <Image source={ImagesWrapper.trashblack} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            )
                                        }) :

                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                                        </View>
                                    }


                                </View>
                            )
                        }) :
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>

                                <CheckBox

                                    // onClick={() => {
                                    //     this.setState({
                                    //         isSunday: !this.state.isSunday
                                    //     })
                                    // }}
                                    isChecked={false}
                                    //leftText={"CheckBox"}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>SATURDAY</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: '6%' }}>

                                    <Image source={ImagesWrapper.plus2} />

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
                            </View>
                        </View>}





                    {/* <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isSunday: !this.state.isSunday
                                })
                            }}
                            isChecked={this.state.isSunday}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>SUNDAY</Text>

                        <TouchableOpacity>
                            {this.state.isSunday == false ?
                                <Image source={ImagesWrapper.plus2} style={{ marginLeft: '76%' }} /> :
                                <Image source={ImagesWrapper.plus1} style={{ marginLeft: '76%' }} />}
                        </TouchableOpacity>
                    </View>
                    {this.state.defaultAvailability.map((data, key) => {
               return (
                   <View>

               {data.slots.length>= 1 && data.day=='Sunday' ?
           data.slots.map((data, key) => {
               return (<View>
                    <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                   </View>
                   <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                   </View>
                   <Image source={ImagesWrapper.trashblack} style={{ marginLeft: '30%', marginTop: '5%' }} />
               </View>

               </View>
               )
           }) :
           <View>
           <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
       </View>
            }
               
              
               </View>
               )
           })}
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isMonday: !this.state.isMonday
                                })
                            }}
                            isChecked={this.state.isMonday}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>MONDAY</Text>
                        <TouchableOpacity>
                            {this.state.isMonday == false ?
                                <Image source={ImagesWrapper.plus2} style={{ marginLeft: '75.5%' }} /> :
                                <Image source={ImagesWrapper.plus1} style={{ marginLeft: '75.5%' }} />}
                        </TouchableOpacity>
                    </View>
                    {this.state.defaultAvailability.map((data, key) => {
               return (
                   <View>

               {data.slots.length>= 1 && data.day=='Monday' ?
           data.slots.map((data, key) => {
               return (<View>
                    <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                   </View>
                   <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                   </View>
                   <Image source={ImagesWrapper.trashblack} style={{ marginLeft: '30%', marginTop: '5%' }} />
               </View>

               </View>
               )
           }) :
           <View>
           <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
       </View>
            }
               
              
               </View>
               )
           })}
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isTuesday: !this.state.isTuesday
                                })
                            }}
                            isChecked={this.state.isTuesday}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>
                            TUESDAY</Text>
                        <TouchableOpacity>
                            {this.state.isTuesday == false ?
                                <Image source={ImagesWrapper.plus2} style={{ marginLeft: '75%' }} /> :
                                <Image source={ImagesWrapper.plus1} style={{ marginLeft: '75%' }} />}
                        </TouchableOpacity>
                    </View>
                    {this.state.defaultAvailability.map((data, key) => {
               return (
                   <View>

               {data.slots.length>= 1 && data.day=='Tuesday' ?
           data.slots.map((data, key) => {
               return (<View>
                    <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                   </View>
                   <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                   </View>
                   <Image source={ImagesWrapper.trashblack} style={{ marginLeft: '30%', marginTop: '5%' }} />
               </View>

               </View>
               )
           }) :
           <View>
           <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
       </View>
            }
               
              
               </View>
               )
           })}
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isWednesday: !this.state.isWednesday
                                })
                            }}
                            isChecked={this.state.isWednesday}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>
                            WEDNESDAY</Text>
                        <TouchableOpacity>
                            {this.state.isWednesday == false ?
                                <Image source={ImagesWrapper.plus2} style={{ marginLeft: '70%' }} /> :
                                <Image source={ImagesWrapper.plus1} style={{ marginLeft: '70%' }} />}
                        </TouchableOpacity>
                    </View>
                    {this.state.defaultAvailability.map((data, key) => {
               return (
                   <View>

               {data.slots.length>= 1 && data.day=='Wednesday' ?
           data.slots.map((data, key) => {
               return (<View>
                    <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                   </View>
                   <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                   </View>
                   <Image source={ImagesWrapper.trashblack} style={{ marginLeft: '30%', marginTop: '5%' }} />
               </View>

               </View>
               )
           }) :
           <View>
           <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
       </View>
            }
               
              
               </View>
               )
           })}
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isThursday: !this.state.isThursday
                                })
                            }}
                            isChecked={this.state.isThursday}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>
                            THURSDAY</Text>
                        <TouchableOpacity>
                            {this.state.isThursday == false ?
                                <Image source={ImagesWrapper.plus2} style={{ marginLeft: '72%' }} /> :
                                <Image source={ImagesWrapper.plus1} style={{ marginLeft: '72%' }} />}
                        </TouchableOpacity>
                    </View>
                    {this.state.defaultAvailability.map((data, key) => {
               return (
                   <View>

               {data.slots.length>= 1 && data.day=='Thursday' ?
           data.slots.map((data, key) => {
               return (<View>
                    <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                   </View>
                   <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                   </View>
                   <Image source={ImagesWrapper.trashblack} style={{ marginLeft: '30%', marginTop: '5%' }} />
               </View>

               </View>
               )
           }) :
           <View>
           <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
       </View>
            }
               
              
               </View>
               )
           })}
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isFriday: !this.state.isFriday
                                })
                            }}
                            isChecked={this.state.isFriday}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>
                            FRIDAY</Text>
                        <TouchableOpacity>
                            {this.state.isFriday == false ?
                                <Image source={ImagesWrapper.plus2} style={{ marginLeft: '77%' }} /> :
                                <Image source={ImagesWrapper.plus1} style={{ marginLeft: '77%' }} />}
                        </TouchableOpacity>
                    </View>
                    {this.state.defaultAvailability.map((data, key) => {
               return (
                   <View>

               {data.slots.length>= 1 && data.day=='Friday' ?
           data.slots.map((data, key) => {
               return (<View>
                    <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                   </View>
                   <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                   </View>
                   <Image source={ImagesWrapper.trashblack} style={{ marginLeft: '30%', marginTop: '5%' }} />
               </View>

               </View>
               )
           }) :
           <View>
           <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
       </View>
            }
               
              
               </View>
               )
           })}
                    <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '7%' }}>
                        <CheckBox

                            onClick={() => {
                                this.setState({
                                    isSaturday: !this.state.isSaturday
                                })
                            }}
                            isChecked={this.state.isSaturday}
                            //leftText={"CheckBox"}
                            checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                            unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                        />
                        <Text style={{ marginLeft: '4%', color: '#1E1C24', fontWeight: '600', fontFamily: Fonts.mulishSemiBold, fontSize: 14 }}>
                            SATURDAY</Text>
                        <TouchableOpacity>
                            {this.state.isSaturday == false ?
                                <Image source={ImagesWrapper.plus2} style={{ marginLeft: '72%' }} /> :
                                <Image source={ImagesWrapper.plus1} style={{ marginLeft: '72%' }} />}
                        </TouchableOpacity>
                    </View>
                    {this.state.defaultAvailability.map((data, key) => {
               return (
                   <View>

               {data.slots.length>= 1 && data.day=='Saturday' ?
           data.slots.map((data, key) => {
               return (<View>
                    <View style={{ flexDirection: 'row', marginLeft: '14%', marginTop: '3%' }}>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.openTime}</Text>
                   </View>
                   <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: '3%', marginTop: '3%' }}>-</Text>
                   <View style={{ width: '25%', height: 45, borderRadius: 25, borderColor: '#959494', borderWidth: 0.3, marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400' }}>{data.closeTime}</Text>
                   </View>
                   <Image source={ImagesWrapper.trashblack} style={{ marginLeft: '30%', marginTop: '5%' }} />
               </View>

               </View>
               )
           }) :
           <View>
           <Text style={{ fontSize: 14, fontWeight: '400', color: '#999999', marginLeft: '15%', marginTop: '3%' }}>Unavailable</Text>
       </View>
            }
               
              
               </View>
               )
           })} */}
                    <View style={{ marginTop: '13%', marginBottom: 35 }}>
                        <TouchableOpacity
                            onPress={() => { this.onNext() }}
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                                <Text style={styles.buttonText}>
                                    Save
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>

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

                        <View style={{ height: 320, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute' }}>
                            <View style={{ paddingLeft: 20, paddingTop: 30 }}>

                                <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>

                                    <Text style={{ fontFamily: Fonts.mulishSemiBold, fontSize: 18, marginBottom: 15, color: '#1E1C24' }}>Select start time</Text>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ displayStartTimer: true })}

                                    >
                                        <View style={{ borderWidth: 1, borderRadius: 50, height: 50, width: '80%', marginRight: 5, borderColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* <TextInput 
                                    style = {styles.time}
                                    keyboardType='numeric'
                                    onChangeText={(startTime) => {

                                        this.setState({ start_time: startTime });
                                                                            }}
                                    value={this.state.start_time}

                                    ></TextInput> */}

                                            <Text>
                                                {this.state.startTime != null ? this.state.startTime.getHours() + ':' + this.state.startTime.getMinutes() : ''}
                                            </Text>

                                            {this.state.displayStartTimer ?

                                                <TimePicker
                                                    value={this.state.startTime == null ? new Date() : this.state.startTime}
                                                    mode={"time"}
                                                    is24Hour={true}
                                                    display={"default"}
                                                    onChange={(event, date) => {
                                                        this.setState({ startTime: date });
                                                        console.log(this.state.startTime.getHours(), this.state.startTime.getMinutes());
                                                        this.setState({ displayStartTimer: false })
                                                    }}
                                                />
                                                : null}
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={{ fontFamily: Fonts.mulishSemiBold, fontSize: 18, marginBottom: 15, color: '#1E1C24', marginTop: 20 }}>Select end time</Text>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ displayEndTimer: true })}

                                    >
                                        <View style={{ borderWidth: 1, borderRadius: 50, height: 50, width: '80%', marginRight: 5, borderColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>

                                            <Text>
                                                {this.state.endTime != null ? this.state.endTime.getHours() + ':' + this.state.endTime.getMinutes() : ''}
                                            </Text>

                                            {this.state.displayEndTimer ?

                                                <TimePicker
                                                    value={this.state.endTime == null ? new Date() : this.state.endTime}
                                                    mode={"time"}
                                                    is24Hour={false}
                                                    display={"default"}
                                                    onChange={(event, date) => {
                                                        this.setState({ endTime: date });
                                                        // console.log(endTime);
                                                        this.setState({ displayEndTimer: false })
                                                    }}
                                                />
                                                : null}
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 5, height: 30, width: 80, marginRight: 10, marginLeft: 10, borderColor: '#000000', marginTop: 15, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            this.setState({showtime: false}),
                                            this.sunday()
                                        }
                                        }
                                    >
                                        <View>
                                            <Text style = {{fontSize: 15, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', color: '#000000'}}>Done</Text>
                                        </View>
                                    </TouchableOpacity>
                                     
                                </View>

                            </View>
                        </View>
                    </Modal>


              
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    searchBorder: {
        borderWidth: 1.5,
        height: 50,
        width: '85%',
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        borderColor: '#F1F1F1',
        backgroundColor: 'rgba(241, 241, 241, 0.25)'
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        color: '#1E1C24',
        fontFamily: Fonts.mulishSemiBold
    },
    nameText: {
        fontFamily: Fonts.mulishRegular,
        fontSize: 14,
        fontWeight: '400',
        color: '#868585',
        marginLeft: 20,
        marginTop: 5
    },
    time: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column'

    },
    border: {
        borderWidth: 1,
        borderColor: '#F1F1F1',
        width: '87%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    number: {
        borderWidth: 1,
        height: 20,
        width: '70%',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#212B68',
        borderColor: '#212B68',
        marginTop: 5
    },
    displayimage: {
        borderWidth: 1,
        height: 45,
        width: 45,
        borderRadius: 25,
        // marginLeft:30
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
})