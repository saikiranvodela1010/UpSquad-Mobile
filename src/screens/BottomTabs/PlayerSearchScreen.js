import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard, FlatList,ActivityIndicator,Modal } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import { TextInput } from 'react-native-gesture-handler';
import StoragePrefs from '../../res/StoragePrefs';

export default class PlayersScreen extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();

    constructor(props) {
        super(props);
        this.state = {
            //   show: false,
            show1: false,
            isInternet: false,
            userId: '',
            universityId: '',
            playerData: [],
            searchText: '',
            userData: [],
            selectedList: this.props.route.params.searchData,
            userdata: this.props.route.params.userdata,
            search: false,
            error:'',
            upSquad_id: '5ee072287a57fb54881a81db',
            outside:'',
            isLoading: false
        }
    }

    async componentDidMount(){

        const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
        
      this.setState({universityId:universityDetsils._id})
      console.log('uniid',this.state.universityId);
      const userDetails = await this.storagePrefs.getObjectValue("userDetails")
      this.setState({userId:userDetails.userId})
    //   console.log('id',this.state.userId);
   
     
      }
     


    async getSearchUserByOrganization() {
        
       
        this.setState({error:''})
        this.setState({ search: true })
        console.log('search', this.state.selectedList)
        console.log('search1', this.state.userdata)
        const data1 = {
            'field': "Field",
            'isAdmin': false,
            'isProfessional': false,
            'player': this.state.userdata.user.isProfessional==true?false:true,
            'searchString': this.state.searchText,
            'universityId': this.state.universityId,
            'userId': this.state.userId,

        }
        console.log(data1)
        const response = await this.apiHandler.requestPost(data1, this.serviceUrls.searchUsersByOrganization)
        console.log("searchUsersByOrganization", response);
        this.setState({
            isLoading: false
        })
        this.setState({ playerData: response })
        if(this.state.playerData==''){
            this.setState({error:"No Players found"})
        }
        // this.setState({searchText:''})
        console.log("playerData", this.state.playerData);

    }
    async getSearchUserByOutside() {
       
        this.setState({error:''})
        this.setState({ search: true })
        const data1 = {
          "currentPage": 1,
          "field": "Field",
          "isAdmin": false,
          "isProfessional": false,
          "orgIds": ["5eb955606d1ed6065715487d", "5ed8d9509e623f00221761a1"],
          "pageSize": 100,
          'player': this.state.userdata.user.isProfessional==true?false:true,
          "searchString": this.state.searchText,
          "userId": this.state.userId,
        }
        console.log(data1)
        const response = await this.apiHandler.requestPost(data1, this.serviceUrls.searchUsersByOutside)
        console.log("searchUsersByOutside",response.data);
        this.setState({
            isLoading: false
        })
        this.setState({ playerData: response.data })
        if(this.state.playerData==''){
            this.setState({error:"No Players found"})
        }
        console.log("playerData", this.state.playerData);
      }


      selectApi(){
        this.setState({
            isLoading: true
        })

        if (this.state.universityId != this.state.upSquad_id) {
           
           this.getSearchUserByOrganization();
          // this.setState({outside:false}) 
          }
          else {
          
            this.getSearchUserByOutside()
           // this.setState({outside:true})
          }

      }
    renderSeparator = () => {
        return (
            <View style={styles.underline}></View>
        );
    };
    renderLoader(){
        return(
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
                        borderRadius: 5,borderColor: "#58C4C6",marginBottom: 10 ,backgroundColor: '#58C4C6',justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            </Modal>
        )
    }


    render() {


        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                {this.renderLoader()}

                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5 }}>
                    <TouchableOpacity onPress={() => 
                        this.props.navigation.goBack(null)}>
                        <Image
                            source={ImagesWrapper.back}
                            style={{
                                marginTop: 6,
                                marginLeft: 20,
                                tintColor: '#000000',
                            }}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Search..."
                        onChangeText={TextInputValue => this.setState({ searchText: TextInputValue })}

                        style={styles.title}
                        //onSubmitEditing={this.getSearchUserByOrganization}
                        onSubmitEditing={() => (this.selectApi())}
                    value={this.state.searchText}
                    // onKeyPress={({ nativeEvent }) => {
                    //     if (nativeEvent.key === 'Backspace') {
                    //        this.setState({search:false})
                    //     } 
                    //   }}

                    >
                    </TextInput>
                </View>
                <View style={[styles.underline]}></View>
                {this.state.error!=''?
                <View style={{
                     alignItems: 'center',
                    justifyContent: 'center',

                }}><Text style={{
                    fontFamily: Fonts.mulishSemiBold,
                    color: '#1E1C24',
                    fontSize: 25
                }}>No players found</Text>
                </View>:null}
                {this.state.search == false ?
                    <FlatList
                        data={this.state.selectedList}
                        renderItem={({ item }) =>

                        <TouchableOpacity  onPress = {() => this.props.navigation.navigate('playersDetail',
                        {id:item._id})}>

                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30, }}>
                                    {item.profileImg == null ?
                                        <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }}>
                                        </View> : <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.profileImg }}

                                        ></Image>}

                                    <View style={styles.list}>
                                        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                                        <Text style={styles.nameText}>{item.currentJobTitle} at {item.currentCompany}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={ImagesWrapper.people} style={{ marginRight: 10 }} />
                                            <Text style={styles.nameText}>{item.currentRole}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity >
                                        <View style={styles.remove}>
                                            <Image source={ImagesWrapper.messageimg} />
                                        </View>
                                    </TouchableOpacity>


                                </View>
                            </TouchableOpacity>
                        }
                        ItemSeparatorComponent={this.renderSeparator}
                        extraData={this.state}
                    /> : <FlatList
                        data={this.state.playerData}

                        renderItem={({ item }) =>

                        <TouchableOpacity  onPress = {() => this.props.navigation.navigate('playersDetail',
                        {id:item._id})}>

                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30, }}>
                                    {item.profileImg == null ?
                                        <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }}>
                                        </View> : <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.profileImg }}

                                        ></Image>}

                                    <View style={styles.list}>
                                        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                                        <Text style={styles.nameText}>{item.currentJobTitle} at {item.currentCompany}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={ImagesWrapper.people} style={{ marginRight: 10 }} />
                                            <Text style={styles.nameText}>{item.currentRole}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity >
                                        <View style={styles.remove}>
                                            <Image source={ImagesWrapper.messageimg} />
                                        </View>
                                    </TouchableOpacity>


                                </View>
                            </TouchableOpacity>
                        }
                        ItemSeparatorComponent={this.renderSeparator}
                        extraData={this.state}
                    />

                }
                
            </View>


        )
    }
}

const styles = StyleSheet.create({
    searchBorder: {
        borderWidth: 1.5,
        height: 50,
        width: '89%',
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
        //marginLeft: 20,
        marginTop: 5
    },
    time: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 20,


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
    title: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        color: '#868585',
        fontSize: 14,
        marginLeft: 20,
        marginTop: -5,
        width: '60%'
    },
    underline: {
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft: 'auto',
        // marginTop:20,
        marginRight: 'auto',
        width: '100%'
    },
    list: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '70%',
        flexDirection: 'column',
    },
    remove: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: '10%',
        color: '#58C4C6',
        fontFamily: Fonts.mulishSemiBold,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E1C24',
        fontFamily: Fonts.mulishSemiBold,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
})