import React from 'react'
// import { View ,StyleSheet,Text,Image, TouchableOpacity,Platform,ScrollView,Dimensions,} from 'react-native';
import {  View, Text, StyleSheet, TouchableOpacity,Image, DeviceEventEmitter,SafeAreaView,Modal,ActivityIndicator,ScrollView} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import APIHandler from '../../network/NetWorkOperations';
import ServiceUrls from '../../network/ServiceUrls';
import StoragePrefs from '../../res/StoragePrefs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// var radio_props = [
//     {label: 'Memphis Talks', value: 0 },
//     {label: 'Mindspace', value: 1 }
//   ];

export default class SwitchCommunityScreen extends React.Component {

  serviceUrls = new ServiceUrls();
  apiHandler = new APIHandler();
  storagePrefs = new StoragePrefs();

    constructor(props) {
        super(props);
       
        this.state = {
            
            value:0,
            radio: [],
            radio_props:[],
            checked:'',
            back:true,
            email : '',
            userId: '',
            isLoading: false,
            key:0,
        }
    }

    async componentDidMount() {
      
      await this.getCommunityDetails();
      this.subscription = DeviceEventEmitter.addListener("codeAddedSuccessfully",this.updateCommunityScreen)
     
    }
    async componentDidUpdate(){
      const getuniversityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
      if(this.state.checked !== 0){
     this.setState({checked:getuniversityDetsils.key})
      }
    }

    componentWillUnmount(){
      if(this.subscription){
        this.subscription.remove()
      }
    }

  updateCommunityScreen = () => {
    this.getCommunityDetails()
  }

  async getCommunityDetails() {
    this.setState({
      isLoading: true
  })
    const userDetails = await this.storagePrefs.getObjectValue("userDetails")
    const communityData={
      "email": userDetails.userEmail,
      "userID": userDetails.userId,
    }
    const response = await this.apiHandler.requestPost(communityData,this.serviceUrls.getCommunities);
    // const radio= response.data;

    
    if(response.data!=null && response.data.length>0){
      this.setState({isLoading: false, isInternet: true})
      this.setState({radio:response.data})
      const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
      this.setState({checked:universityDetsils.key,key:universityDetsils.key })
    } else{
      this.setState({isLoading: false})
      this.setState({radio: []})
    }
    
    for (var i = 0; i < this.state.radio.length; i++) {
      this.state. radio_props[i] = {
        "universityName":this.state.radio[i].universityName,
        "universityLogo":this.state.radio[i].universityLogo,
        "_id":this.state.radio[i]._id,
      };
      this.setState({ radio_props: this.state.radio_props });
     
  }
  // console.log('communitydata',this.state.radio_props)
  if(this.state.checked === undefined){
    this.setState({checked: 0,key: 0})
    this.checked(this.state.radio_props[this.state.checked],this.state.key);
  } else{
    this.checked(this.state.radio_props[this.state.checked],this.state.key);
  }
    
  }

  async checked(item,key){
     const universityDetsils =  {
      "_id":item._id,
      "universityName":item.universityName,
      "universityLogo":item.universityLogo,
      "key":key
     }
     try
     {
        await AsyncStorage.removeItem('universityDetsils');
        const data = await this.storagePrefs.setObjectValue("universityDetsils",universityDetsils);
        const getuniversityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
        this.setState({checked:getuniversityDetsils.key, key: getuniversityDetsils.key})
        DeviceEventEmitter.emit("UpdateFeed");
      } catch(exception) {
          console.log(exception);
      }

     
    

  }
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

    render(){
       const{radio}=this.state
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
               {this.renderLoader()}
               <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                      // this.props.navigation.openDrawer();
                      this.props.navigation.navigate('BioSuccess'
                          // back:this.state.back,
                          );
                    }}>
                        <Image
                            source={ImagesWrapper.back}

                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Switch Community</Text>
                   

                </View>
                <View style={styles.underline}></View>
     <ScrollView>
        <View >
          
        <View>
          {
            this.state.radio_props.map((item,key) => {
              return(
                <View>
                    <View style={{flexDirection:'row'}}>
                      {item.universityLogo === ''?
                      <View style = {styles.displayimage}></View>
                    :
                      <Image source={{uri:item.universityLogo}}  style={{height:40,width:40,marginLeft:'9%',marginTop:20}}/>
                }
                      {this.state.checked === key ?
                      <View style={{justifyContent:'space-between',flex:1}}>
                      <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                          <Text style={styles.communitytext}>{item.universityName}</Text>
                        <Image source={ImagesWrapper.radiobtn1} style={styles.radiobtn}/>
                      
                      </TouchableOpacity>
                      
                      </View>
                      :
                      <View style={{justifyContent:'space-between',flex:1}}>
                      <TouchableOpacity onPress={()=>{
                        this.setState({checked:key});
                        this.checked(item,key);
                    }} 
                    style={{flexDirection:'row',justifyContent:'space-between',flex:1}}
                    >
                          <Text style={styles.communitytext}>{item.universityName}</Text>
                        
                        <Image source={ImagesWrapper.radio} style={styles.radiobtn}/>
                        
                      </TouchableOpacity>
                      </View>
                    }
                    </View>
                    <View style={[{borderBottomColor: '#959494',
                borderBottomWidth: 0.5,marginTop:20,width:'85%',marginRight:25,marginLeft:30}]}></View>

               
            </View>
        )


      })
    }

  </View>
  {this.state.isLoading === false ?
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddCommunityScren')}}>
        <View style={styles.linearGradient}>
            <Text style={styles.buttonText}>Add new community</Text>
      </View>
      </TouchableOpacity>
      :
      null
    }

</View>
</ScrollView>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '9%',
        marginTop: 20,
        marginBottom: 20,
        flexDirection:'row'
        // borderBottomWidth:1
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        // marginTop:20,
        // marginRight:'auto',
        width:'100%'
    },
    memphistalk:{ 
        fontSize: 20,
         fontFamily: Fonts.mulishSemiBold,
          fontWeight: '600',
          color:'#1E1C24',
           marginLeft: '5%'
    },
    communitytext:{
      fontFamily:Fonts.mulishRegular,
      fontSize:16,
      fontWeight:"600",
      marginTop:30,
      marginLeft:10
    },
    radiobtn:{
      marginTop:33,
      marginRight:30 
    },
    displayimage: {
      borderWidth: 1,
      height: 40,
      width: 40,
      borderRadius: 25,
      // alignItems:'center'
      // justifyContent:'center'
      marginLeft:25,marginTop:20
  },
  buttonText: {
    fontSize: 16,
    fontFamily:Fonts.mulishRegular,
    textAlign: 'center',
    margin: 10,
    color: '#58C4C6',
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
    borderWidth:1,
   borderColor:'#58C4C6',
   marginTop:30,
   marginBottom:20
},
    });