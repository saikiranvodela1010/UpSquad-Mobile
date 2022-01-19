import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView ,FlatList, DeviceEventEmitter} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import Modal from 'react-native-modal';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import StoragePrefs from '../../res/StoragePrefs';




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
            // userId:'610aa7c7a26a80717a1eddde',
            // universityId:"5eb955606d1ed60657154888",
            userId:'',
            universityId:'',
            userData:[],
            coachData: [],
            upSquad_id: '5ee072287a57fb54881a81db'
        }
      }

     async componentDidMount(){
        
        const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
        
        this.setState({universityId:universityDetsils._id})
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        this.setState({userId:userDetails.userId})
        this.getUserInfo();
        DeviceEventEmitter.addListener("UpdateFeed",this.updateCoachScreen)
    }

    updateCoachScreen = async() => {
      const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils");
      const userDetails = await this.storagePrefs.getObjectValue("userDetails")
      this.setState({ universityId: universityDetsils._id, userId: userDetails.userId})
      this.getUserInfo();
    }
  async getUserInfo(){
    //const data = '5e3bfad3cf7d530022e90429'+'/5ed8d9509e623f00221761a1';
    const data = this.state.userId+'/'+this.state.universityId;
    const response = await this.apiHandler.requestGet(data,this.serviceUrls.getuser)
    //console.log("User response",response)
   
    this.setState({userData:response})
    //console.log('isProfessional',this.state.userData.user.isProfessional)
    if (this.state.universityId != this.state.upSquad_id) {
      this.getSearchUserByOrganization(this.state.userData);
    }
    else {
      this.getSearchUserByOutside(this.state.userData);
    }
    }
   async getSearchUserByOrganization(data){
    const data1 = {
        'field': "Field",
       'isAdmin': false,
       'isProfessional': true,
       'player': data.user.isProfessional==true?false:true,
       'universityId': this.state.universityId,
       'userId': this.state.userId,
        
    }
    console.log('data1',data1)
    const response = await this.apiHandler.requestPost(data1,this.serviceUrls.searchUsersByOrganization)
    console.log("searchUsersByOrganization",JSON.stringify(response));
    this.setState({coachData: response})
    console.log("CoachData",this.state.coachData);
    }
    async getSearchUserByOutside(data) {
      const data1 = {
        "currentPage": 1,
        "field": "Field",
        "isAdmin": false,
        "isProfessional": true,
        "orgIds": ["5eb955606d1ed6065715487d", "5ed8d9509e623f00221761a1"],
        "pageSize": 100,
        "player": data.user.isProfessional == true ? false : true,
        "userId": this.state.userId,
  
      }
      const response = await this.apiHandler.requestPost(data1, this.serviceUrls.searchUsersByOutside)
      this.setState({ coachData: response.data })
      console.log("coachData", this.state.coachData);
    }
    renderSeparator = () => {
      return (
          <View style={styles.underline}></View>
      );
  };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('coachSearch',{
                searchData: this.state.coachData,
                userdata:this.state.userData
              })}>
                <View style={styles.searchBorder}>
               
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image
                            source={ImagesWrapper.search}
                            style={{ marginTop: 4, marginRight: 5 }}
                        />
                       
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginLeft: 5,marginTop:5}}>Search message</Text>
                        
                    </View>
                    
                </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20,marginTop:20}}>
                    <Text style={{fontSize:14,color:'#1E1C24',fontFamily:Fonts.mulishSemiBold,fontWeight:'600',marginLeft:20}}>Sorted ny name</Text>
                    <TouchableOpacity  onPress={() => this.setState({ show1: true })}>
                    <Image source={ImagesWrapper.sortedimg}/>
                    </TouchableOpacity>
                </View>
                

                <FlatList
                    data={this.state.coachData}
                    renderItem={({ item }) =>
                        <TouchableOpacity  onPress = {() => this.props.navigation.navigate('playersDetail',
                        {id:item._id})}>

                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30, }}>
                              {item.profileImg==null?
                                <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }}>
                                </View>:<Image style={{ width: 50, height: 50, borderRadius: 25}} source={{uri:item.profileImg }}

                                ></Image>}
                                {/* <View style={styles.list}>
                                    <Text style={styles.name}>{item.firstName}</Text>
                                </View> */}
                                 <View style={styles.list}>
                            <Text style={styles.name}>{item.firstName}</Text>
                            <Text style={styles.nameText}>{item.currentJobTitle} at {item.currentCompany}</Text>
                            <View style={{flexDirection:'row'}}>
                            <Image source={ImagesWrapper.people} style={{marginRight:10}}/>
                            <Text style={styles.nameText}>{item.currentRole}</Text>
                        </View>
                        </View>
                                <TouchableOpacity >
                                    <View style={styles.remove}>
                                       <Image source={ImagesWrapper.messageimg}/>
                                     </View>
                                </TouchableOpacity>


                            </View>
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                    extraData={this.state}
                />

                {/* <TouchableOpacity onPress = {() => this.props.navigation.navigate('playersDetail')}>

                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20,marginLeft:20 }}>
                    
                    <View style = {styles.displayimage}></View>
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                    
                        <Text style={styles.name}>Kannie Sils</Text>
                    
                        <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                        <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                    </View>
                    <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={[styles.underline]}></View> */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View> */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View> */}



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
            this.setState({show1:false})
         }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>
                
          <View style={{
                        height: 175, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
            }}>
              <View style = {{marginLeft: 20, marginTop: 30}}>
             
                <View style = {{flexDirection: 'row'}}>
                <Text style = {[styles.popupText,{color:'#1E1C24',fontSize:16}]}>Sort by</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.sortdescending}
                  style = {{marginRight: 30}}
                />
                </View>

              </View>
              <View style = {{flexDirection: 'row',marginTop:10}}>
                <Text style = {styles.popupText}>First name</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn1}
                  style = {{marginRight: 31}}
                />
                </View>

              </View>
              <View style = {{flexDirection: 'row', marginTop: 15}}>
                <Text style = {styles.popupText}>Last name</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
                </View>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 15}}>
                <Text style = {styles.popupText}>Team name</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
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
        fontFamily: Fonts.mulishRegular
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        // marginTop:20,
        marginRight:'auto',
        width:'85%'
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