import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList, DeviceEventEmitter,ActivityIndicator } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import Modal from 'react-native-modal';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';
import axios from 'axios'

export default class PlayersScreen extends React.Component {
  serviceUrls = new ServiceUrls();
  apiHandler = new APIHandler();
  storagePrefs = new StoragePrefs();

  constructor() {
    super();
    this.state = {
      //   show: false,
      show1: false,
      isInternet: false,
      userId: '',
      universityId: '',
      // userId:'610aa7c7a26a80717a1eddde',
      // universityId:"5eb955606d1ed60657154888",
      playerData: [],
      playerData1: [],
      userData: [],
      upSquad_id: '5ee072287a57fb54881a81db',
      isLoading: false,
      sortData: '',
      radio1:false,
      radio2:false,
      radio3:false,
      radio4:false,
     
      //sortOrder:"asc"

    }
  }
  async componentDidMount() {

    const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")

    this.setState({ universityId: universityDetsils._id })
    console.log('uniid', this.state.universityId);
    const userDetails = await this.storagePrefs.getObjectValue("userDetails")
    this.setState({ userId: userDetails.userId })
    console.log('id', this.state.userId);

    this.getUserInfo();

    DeviceEventEmitter.addListener("UpdateFeed",this.updatePlayerScreen)
  }

  updatePlayerScreen = async () => {

    const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils");
    const userDetails = await this.storagePrefs.getObjectValue("userDetails")
    this.setState({ universityId: universityDetsils._id, userId: userDetails.userId})
    this.getUserInfo();
  }
  async getUserInfo() {
    this.setState({
      isLoading: true
    })
    //const data = '5e3bfad3cf7d530022e90429'+'/5ed8d9509e623f00221761a1';
    const data = this.state.userId + '/' + this.state.universityId;
    const response = await this.apiHandler.requestGet(data, this.serviceUrls.getuser)
    console.log("User response", response)

    this.setState({ userData: response })
    //console.log('isProfessional',this.state.userData.user.isProfessional)
    if (this.state.universityId != this.state.upSquad_id) {
      this.getSearchUserByOrganization(this.state.userData);
    }
    else {
      this.getSearchUserByOutside(this.state.userData);
    }
  }
  async getSearchUserByOrganization(data) {
    const data1 = {
      'field': "Field",
      'isAdmin': false,
      'isProfessional': false,
      'player': data.user.isProfessional == true ? false : true,
      'universityId': this.state.universityId,
      'userId': this.state.userId,

    }
    const response = await this.apiHandler.requestPost(data1, this.serviceUrls.searchUsersByOrganization)
   // console.log("searchUsersByOrganization", JSON.stringify(response));
    this.setState({
      isLoading: false
    })
    this.setState({ playerData1: response })
    this.getSort();
    //playerData.sort()
    // console.log("playerData", this.state.playerData1);
    //  console.log("sortedArrayData", sortedArrayData);
  }
  async getSearchUserByOutside(data) {
    const data1 = {
      "currentPage": 1,
      "field": "Field",
      "isAdmin": false,
      "isProfessional": false,
      "orgIds": ["5eb955606d1ed6065715487d", "5ed8d9509e623f00221761a1"],
      "pageSize": 100,
      "player": data.user.isProfessional == true ? false : true,
      "userId": this.state.userId,

    }
    const response = await this.apiHandler.requestPost(data1, this.serviceUrls.searchUsersByOutside)
    //console.log("searchUsersByOrganization",JSON.stringify(response));
    this.setState({
      isLoading: false
    })
    this.setState({ playerData1: response.data })
    this.getSort();
    //console.log("playerData", this.state.playerData);
  }

  async updateSortingLastA() {
    this.setState({
      isLoading: true,
      radio2:true,
      radio1:false,
      radio3:false,
      radio4:false
    })
    this.setState({ show1: false })
    const data = {
      "user_id": this.state.userId,
      "sortName": "lastName",
      "sortOrder": "asc"
    }
    // const res = await axios.patch('https://devapi.upsquad.com/users/save_preference', data);
    const response = await this.apiHandler.requestPatch( this.serviceUrls.saveSortPreference,data)

    this.setState({
      isLoading: false
    })
   // this.setState({radio:!radio2})
    //res.data.headers['Content-Type'];
    console.log("lastname-asc")
    this.getSort()
    

  }
  async updateSortingFirstA() {
    this.setState({
      isLoading: true,
      radio1:true,
      radio2:false,
      radio3:false,
      radio4:false
    })
    this.setState({ show1: false })
    const data = {
      "user_id": this.state.userId,
      "sortName": "firstName",
      "sortOrder": "asc"
    }
    const response = await this.apiHandler.requestPatch( this.serviceUrls.saveSortPreference,data)
    this.setState({
      isLoading: false
    })
    //this.setState({radio:!radio1})
    //res.data.headers['Content-Type'];
    //console.log("save sort data", response)
    console.log("firstname-asc")
    this.getSort()

  }
  async updateSortingLastD() {
    this.setState({
      isLoading: true,
      radio4:true,
      radio3:false,
      radio1:false,
      radio2:false
    })
    this.setState({ show1: false })
    const data = {
      "user_id": this.state.userId,
      "sortName": "lastName",
      "sortOrder": "dsc"
    }
    const response = await this.apiHandler.requestPatch( this.serviceUrls.saveSortPreference,data)
    this.setState({
      isLoading: false,
     
    })
   // this.setState({radio:!radio4})
    //res.data.headers['Content-Type'];
   // console.log("save sort data", response)
   console.log("lastname-dsc")
    this.getSort()

  }
  async updateSortingFirstD() {
    this.setState({
      isLoading: true,
      radio3:true,
      radio2:false,
      radio1:false,
      radio4:false
    })
    this.setState({ show1: false })
    const data = {
      "user_id": this.state.userId,
      "sortName": "firstName",
      "sortOrder": "dsc"
    }
    const response = await this.apiHandler.requestPatch( this.serviceUrls.saveSortPreference,data)
    this.setState({
      isLoading: false
    })
    //this.setState({radio:!radio3})
    //res.data.headers['Content-Type'];
    //console.log("save sort data", response)
    console.log("firstname-dsc")
    this.getSort()

  }
  async getSort() {
    this.setState({
      isLoading: true
    })
    const data = this.state.userId
    const response = await this.apiHandler.requestGet(data, this.serviceUrls.getSort)
    console.log("Sort response", response)
    this.setState({
      isLoading: false
    })
    if(response.success === true) {
    this.setState({ sortData: response.data.sortPreference })
    } else{
      this.setState({sortData : response.data})
    }

    if (this.state.sortData.sortOrder == 'asc') {
      if (this.state.sortData.sortName == 'firstName') {

        const sortedArrayData = this.state.playerData1.sort((a, b) => {
          if (a.firstName.toUpperCase() < b.firstName.toUpperCase())
            return -1;
          if (a.firstName.toUpperCase() > b.firstName.toUpperCase())
            return 1;
          return 0;
        });
        this.setState({ playerData: sortedArrayData,radio1:true })

      } else {
        const sortedArrayData = this.state.playerData1.sort((a, b) => {
          if (a.lastName.toUpperCase() < b.lastName.toUpperCase())
            return -1;
          if (a.lastName.toUpperCase() > b.lastName.toUpperCase())
            return 1;
          return 0;
        });
        this.setState({ playerData: sortedArrayData,radio2:true})

      }
    }
    else
    {
      if (this.state.sortData.sortName == 'firstName') {

        const sortedArrayData = this.state.playerData1.sort((a, b) => {
          if (a.firstName.toUpperCase() > b.firstName.toUpperCase())
            return -1;
          if (a.firstName.toUpperCase() < b.firstName.toUpperCase())
            return 1;
          return 0;
        });
        this.setState({ playerData: sortedArrayData,radio3:true })

      } else {
        const sortedArrayData = this.state.playerData1.sort((a, b) => {
          if (a.lastName.toUpperCase() > b.lastName.toUpperCase())
            return -1;
          if (a.lastName.toUpperCase() < b.lastName.toUpperCase())
            return 1;
          return 0;
        });
        this.setState({ playerData: sortedArrayData ,radio4:true})

      }

    }

  }

  renderSeparator = () => {
    return (
      <View style={styles.underline}></View>
    );
  };
  selected(data) {

    this.props.navigation.navigate('playersDetail',
      { id: data })

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
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {this.renderLoader()}

        <TouchableOpacity onPress={() => this.props.navigation.navigate('playerSearch', {
          searchData: this.state.playerData,
          userdata: this.state.userData
        })}>
          <View style={styles.searchBorder}>

            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
              <Image
                source={ImagesWrapper.search}
                style={{ marginTop: 4, marginRight: 5 }}
              />

              <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginLeft: 5, marginTop: 5 }}>Search message</Text>

            </View>

          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginRight: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 14, color: '#1E1C24', fontFamily: Fonts.mulishSemiBold, fontWeight: '600', marginLeft: 25 }}>Sorted by name</Text>
          <TouchableOpacity onPress={() => this.setState({ show1: true })}>
            <Image source={ImagesWrapper.sortedimg} style={{marginLeft:'71%'}} />
          </TouchableOpacity>
        </View>


        <FlatList
          data={this.state.playerData}
          renderItem={({ item }) =>

            // <TouchableOpacity onPress = {() => this.props.navigation.navigate('playersDetail',
            // {id:item._id})}>
            <TouchableOpacity onPress={() => { this.selected(item._id) }}>

              <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 25, }}>
                {item.profileImg == null ?
                  <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }}>
                  </View> : <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.profileImg }}

                  ></Image>}
                {/* <View style={styles.list}>
                                    <Text style={styles.name}>{item.firstName}</Text>
                                </View> */}
                <View style={styles.list}>
                  <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.nameText}>{item.currentJobTitle} at {item.currentCompany}</Text>
                  <View style={{ flexDirection: 'row',width:'75%'}}>
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


        {/* Modals code are here */}

        <Modal
          transparent={true}
          isVisible={this.state.show1}
          onBackdropPress={() => this.setState({ show1: false })}
          style={{
            justifyContent: 'flex-end',
            margin: 0
          }}
          onRequestClose={() => {
            this.setState({ show1: false })
          }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>

            <View style={{
              height: 250, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
            }}>
              <View style={{ marginLeft: 30, marginTop: 30 }}>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.popupText, { color: '#1E1C24', fontSize: 16 }]}>Sort by</Text>
                  <View style={{  }}>
                    <Image
                      source={ImagesWrapper.sortdescending}
                      style={{ marginLeft: '35%' }}
                    />
                  </View>

                </View>
                <TouchableOpacity onPress={() => this.updateSortingFirstA()}>
                  <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <Text style={styles.popupText}>First name - Ascending</Text>
                    <View style={{ }}>
                      {this.state.radio1==false?
                      <Image
                        source={ImagesWrapper.radiogrey}
                        style={{ marginLeft:'35%' }}
                      />: <Image
                      source={ImagesWrapper.radioselected}
                      style={{  marginLeft:'35%' }}
                    />}
                    </View>

                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateSortingLastA()}>
                  <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Text style={styles.popupText}>Last name - Ascending</Text>
                    <View style={{ }}>
                    {this.state.radio2==false?
                      <Image
                        source={ImagesWrapper.radiogrey}
                        style={{ marginLeft:'35%'  }}
                      />: <Image
                      source={ImagesWrapper.radioselected}
                      style={{ marginLeft:'35%'  }}
                    />}
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateSortingFirstD()}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Text style={styles.popupText}>First name - Descending</Text>
                  <View style={{ }}>
                  {this.state.radio3==false?
                      <Image
                        source={ImagesWrapper.radiogrey}
                        style={{  marginLeft:'35%'}}
                      />: <Image
                      source={ImagesWrapper.radioselected}
                      style={{  marginLeft:'35%'}}
                    />}
                  </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateSortingLastD()}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Text style={styles.popupText}>Last name - Descending</Text>
                  <View style={{  }}>
                  {this.state.radio4==false?
                      <Image
                        source={ImagesWrapper.radiogrey}
                        style={{  marginLeft:'35%' }}
                      />: <Image
                      source={ImagesWrapper.radioselected}
                      style={{  marginLeft:'35%' }}
                    />}
                  </View>
                </View>
                </TouchableOpacity>

              </View>

            </View>
          </View>
        </Modal>



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
    // marginLeft: 20,
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
  popupText: {
    color: 'rgba(134, 133, 133, 1)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.mulishRegular,
    width:'73%'
  },
  underline: {
    borderBottomColor: '#959494',
    borderBottomWidth: 0.5,
    marginLeft: 'auto',
    // marginTop:20,
    marginRight: 'auto',
    width: '85%'
  },
  list: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '66%',
    flexDirection: 'column',
  },
  remove: {
    fontSize: 14,
    fontWeight: '600',
    //marginLeft: '8%',
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