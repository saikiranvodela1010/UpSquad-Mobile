import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView,Modal,ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';
import axios from 'axios'
import moment from 'moment';

export default class GroupScreen extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();
    constructor(props) {
        super(props);
        this.state = {
           
            isLoading: false,
            availability: [],
            userId: '',
           
           

        }
    }
    async componentDidMount() {

        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        this.setState({ userId: userDetails.userId })
        console.log('id', this.state.userId);

        this.getUserAvailability();

        // DeviceEventEmitter.addListener("UpdateFeed",this.updatePlayerScreen)
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
         console.log('UserAvailability', res.data)
        if (res.data != '') {
            // for(var i=0; i < res.data[0].availability.length; i++){
            //     if(res.data[0].availability[i].slots.length==0){

            //     }
            // }
            this.setState({ availability: res.data[0].availability })
        }
        else {
            this.setState({ availability: res.data })

        }

        console.log('Availability', this.state.availability)

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
    delete(index){
      //  alert(index)
            for (var i = 0; i < this.state.availability.length; i++) {
                if (i == index) {
                   
                            this.state.availability.splice(i, 1); 
                            //delete this.state.defaultAvailability[i].slots[j]
                            this.setState({ availability: this.state.availability })
                            // const filteredItems = this.state.defaultAvailability[i].slots.filter(item =>item[j] != item[index])
                            //console.log('deleted',filteredItems)
                           // this.state.defaultAvailability[i].slots.remove(this.state.defaultAvailability[i].slots[j])
                   
                }

            }
            console.log('deleted', this.state.availability)

    }
    render() {
        return (
            <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                 {this.renderLoader()}
               
            
                   
                   { this.state.availability.length >= 1 ?
                            this.state.availability.map((data, key) => {
                                return ( <View style={{ marginTop: 20 }}>
                                    <View style={{ borderWidth: 1, borderColor: 'rgba(241, 241, 241, 1)', borderRadius: 10, backgroundColor: 'rgba(241, 241, 241, 1)', height: 'auto', padding: 10, width: '83%', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style = {{marginLeft: 10}}>
                                                <Text style = {{color: 'rgba(30, 28, 36, 1)', fontSize: 14, fontWeight: '600', fontFamily: Fonts.mulishSemiBold}}> {moment(data.date).format('DD')} {(moment(data.date).format('MMM'))} {moment(data.date).format('YYYY')}</Text>
                                            </View>
                                            <View style = {{marginLeft: 10}}>
                                                <Image source={ImagesWrapper.timer} />
                                            </View>
                                            {data.slots.map((data, key) => {
                                        return (
                                            <View style = {{marginLeft: 10, width: '45%'}}>
                                            <Text style = {{color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular, marginBottom: 5}}>{data.openTime} - {data.closeTime} </Text>
                                            <Text style = {{color: 'rgba(134, 133, 133, 1)', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular}}>{data.openTime} - {data.closeTime} </Text>

                                        </View>)
                                    })}
                                            <TouchableOpacity onPress={()=>this.delete(key)}>
                                            <View>
                                                <Image source={ImagesWrapper.delete} />
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>)
                            }) : 
                            <Text style={{marginTop:'7%',fontSize:14,fontWeight:'400',fontFamily:Fonts.mulishRegular,color:'#868585',marginLeft:'7%',marginRight:'7%'}}>
                   Add dates when your availability changes from your weekly hours</Text>
                   
               }
               <TouchableOpacity onPress={() => this.props.navigation.navigate('datetimescreen')}>
                <Text style={{marginTop:'3%',fontSize:14,fontWeight:'600',fontFamily:Fonts.mulishRegular,color:'#58C4C6',marginLeft:'7%',marginRight:'7%'}}>
                   Add a date override </Text>
                   </TouchableOpacity>
                   <View style={{marginTop:'62%'}}>
              <TouchableOpacity 
                        
                    >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                        
                    </View>
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
        fontFamily: Fonts.mulishRegular
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
        height: 25,
        width: '68%',
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
        borderRadius: 25
    },
    buttonText: {
        fontSize: 16,
        fontFamily:Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight:'600',
        // marginBottom:20
    },
    linearGradient: {
       
        width:'85%',
       
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
      
        marginLeft: 30,
        height: 55,
        marginRight: 30,
        
    },
})