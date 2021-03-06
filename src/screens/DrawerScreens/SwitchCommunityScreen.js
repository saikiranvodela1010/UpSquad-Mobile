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
            isProfessional:'',
            visibleToOthers:'',
            teamDetails:[],
            teamDetailsarry:[],
            onPressteamDetails:[],
            onPressteamDetailsarry:[],
            isclicked:false,
        }
    }

    async componentDidMount() {
      
      await this.getCommunityDetails();
      this.subscription = DeviceEventEmitter.addListener("codeAddedSuccessfully",this.updateCommunityScreen)
     
    }
    async componentDidUpdate(){
      const getuniversityDetails = await this.storagePrefs.getObjectValue("universityDetails")
      if(this.state.checked !== 0){
     this.setState({checked:getuniversityDetails.key})
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


 isProfessional(){
  let teamData = this.state.radio[0].teamsData;
  console.log('teamData',teamData);
  let showUpSquad = false;
  // loop1:
   for(var i=0;i<this.state.teamDetailsarry.length;i++){
      
       let teamId = this.state.teamDetailsarry[i];
      //  loop2:
       for(var l=0;l<teamData.length;l++){
         if(teamData[l]._id === teamId){
           let privateCommunities = teamData[l].privateCommunities;
          //  loop3:
           for(var k=0; k<privateCommunities.length;k++){
            if(!privateCommunities[k].value){
              return false;
            }
           }

         }

       }
       showUpSquad=true;
   }
   return showUpSquad
 }
 onPressisProfessional(onPressteamdata){
  console.log('onPressteamdata',onPressteamdata);
  
  let showUpSquad = false;
  // loop1:
   for(var i=0;i<this.state.onPressteamDetailsarry.length;i++){
      
       let teamId = this.state.onPressteamDetailsarry[i];
      //  loop2:
       for(var l=0;l<onPressteamdata.length;l++){
         if(onPressteamdata[l]._id === teamId){
           let privateCommunities = onPressteamdata[l].privateCommunities;
          //  loop3:
           for(var k=0; k<privateCommunities.length;k++){
            if(!privateCommunities[k].value){
              return false;
            }
           }

         }

       }
       showUpSquad=true;
   }
   return showUpSquad
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
    // const response = await this.apiHandler.requestPost(communityData,this.serviceUrls.getCommunities);
    // const radio= response.data;
    console.log('communitydata=====',response.data)
    if(response.data.length === 0){
      const object={
        "universityName":"UpSquad",
        "universityLogo":'',
        "_id":"5ee072287a57fb54881a81db",
      }
      this.state.radio_props.push(object);
      console.log('upsquad',this.state.radio_props,this.state.radio_props.length);
      this.setState({checked:this.state.radio_props.length-1})
      this.setState({key:this.state.radio_props.length-1})
      this.setState({isLoading: false, isInternet: true})
    }else if(response.data!=null && response.data.length>0){
      console.log("length---------------------",response.data.length)
      // // this.state.radio_props.pop();
      // this.setState({checked:0})
      // this.setState({key:0})
      // // this.setState({isLoading: false, isInternet: true})

      this.setState({radio:response.data})
      const universityDetails = await this.storagePrefs.getObjectValue("universityDetails")
      console.log("ravikiran&&&&&&&&*&*&*&*&",universityDetails)
      
      this.setState({checked:universityDetails.key,key:universityDetails.key })
      // for(var i=0;i<this.state.radio.length;i++){
      //   if(this.state.radio[i].subscriptionsData.isAdmin === true){

      //   }
      // }
      if(this.state.checked === undefined){
        this.setState({checked:0,key:0})
      }
      console.log("cheked",this.state.checked);
      if(this.state.radio[this.state.checked].subscriptionsData.isAdmin === true){
        for (var i = 0; i < this.state.radio.length; i++) {
          this.state. radio_props[i] = {
            "universityName":this.state.radio[i].universityName,
            "universityLogo":this.state.radio[i].universityLogo,
            "_id":this.state.radio[i]._id,
            "subscriptionsData":this.state.radio[i].subscriptionsData,
            "teamsData":this.state.radio[i].teamsData,
          };
          this.setState({ radio_props: this.state.radio_props });
        }
        const object={
          "universityName":"UpSquad",
          "UpsquadLogo":'',
          "_id":"5ee072287a57fb54881a81db",
        }
        this.state.radio_props.push(object);
        // console.log('upsquad1-------->',this.state.radio_props,this.state.radio_props.length);
        // this.setState({checked:this.state.radio_props.length-1})
        // this.setState({key:this.state.radio_props.length-1})
  
      }
      else{
      // this.setState({isLoading:true});
      const userDetails = await this.storagePrefs.getObjectValue("userDetails");
      const data = userDetails.userId;
      
      const response = await this.apiHandler.requestGet(data,this.serviceUrls.getParticularUser);
      // console.log("flase response",response.data.isProfessional,response.data.visibleToOthers);
      this.setState({isProfessional:response.data.isProfessional,visibleToOthers:response.data.visibleToOthers})
      // this.setState({isLoading:true});
      if(response.status ==="Success"){
        this.setState({isLoading:false});
        for (var i = 0; i < this.state.radio.length; i++) {
          this.state. radio_props[i] = {
            "universityName":this.state.radio[i].universityName,
            "universityLogo":this.state.radio[i].universityLogo,
            "_id":this.state.radio[i]._id,
            "subscriptionsData":this.state.radio[i].subscriptionsData,
            "teamsData":this.state.radio[i].teamsData,
          };
          this.setState({ radio_props: this.state.radio_props });
        }
      if(response.data.isProfessional === false){
        let j = 0;
        for(var i = 0;i<this.state.radio[this.state.checked].subscriptionsData.teamDetails.length;i++){
          if(this.state.radio[this.state.checked].subscriptionsData.teamDetails[i].isChecked){

            // console.log('teamdetails',this.state.radio[0].subscriptionsData.teamDetails[i].teamId);
            this.state.teamDetails[j++]=this.state.radio[this.state.checked].subscriptionsData.teamDetails[i].teamId;
            
          }
        }
        this.setState({teamDetailsarry:this.state.teamDetails});
       console.log('teamDetailsarry',this.state.teamDetailsarry);
       
      let showUpSquad = this.isProfessional();
        console.log('showUpSquad1',showUpSquad);
        if(showUpSquad === false){
          for (var i = 0; i < this.state.radio.length; i++) {
            this.state. radio_props[i] = {
              "universityName":this.state.radio[i].universityName,
              "universityLogo":this.state.radio[i].universityLogo,
              "_id":this.state.radio[i]._id,
              "isAdmin":this.state.radio[i].subscriptionsData.isAdmin,
              "subscriptionsData":this.state.radio[i].subscriptionsData,
              "teamsData":this.state.radio[i].teamsData,
            };
            this.setState({ radio_props: this.state.radio_props });
            // console.log("radioprops",this.state.radio_props)
            // this.setState({checked:0})
            // this.setState({key:0})
          }
        }else{
          console.log("showtrue--------")
          const object={
            "universityName":"UpSquad",
            "UpsquadLogo":'',
            "_id":"5ee072287a57fb54881a81db",
          }
          // for(i=0;i<this.state.radio_props;i++){
          //   if(this.state.radio_props[i].universityName !== "UpSquad"){
              this.state.radio_props.push(object);
            // }
          // }
          this.setState({ radio_props: this.state.radio_props });

          // console.log('showtrue',this.state.radio_props,this.state.radio_props.length);
        }
     
      }else if(response.data.isProfessional === true  && response.data.visibleToOthers ===true){
        const object={
          "universityName":"UpSquad",
          "UpsquadLogo":'',
          "_id":"5ee072287a57fb54881a81db",
        }
       
        this.state.radio_props.push(object);
        this.setState({ radio_props: this.state.radio_props });
      
        // console.log('upsquadtrue',this.state.radio_props,this.state.radio_props.length);
        // this.setState({checked:this.state.radio_props.length-1})
        // this.setState({key:this.state.radio_props.length-1})
      }
    }
    }
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
    console.log(item,key);
    this.setState({isLoading: false, isInternet: true})
    const universityDetails =  {
     "_id":item._id,
     "universityName":item.universityName,
     "universityLogo":item.universityLogo,
     "key":key
    }
    try
    {
       await AsyncStorage.removeItem('universityDetails');
       const data = await this.storagePrefs.setObjectValue("universityDetails",universityDetails);
       const getuniversityDetails = await this.storagePrefs.getObjectValue("universityDetails")
       this.setState({checked:getuniversityDetails.key, key: getuniversityDetails.key})
      
       if(this.state.isclicked === true){
         this.setState({isclicked :false});
         
        const {navigate} = this.props.navigation;
        setTimeout(() => {
            navigate('BioSuccess'); 
        }, 3000);
       
       }
       DeviceEventEmitter.emit("UpdateFeed");
     } catch(exception) {
         console.log(exception);
     }

    //  this.props.navigation.navigate('BioSuccess');
   

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
                        this.setState({isclicked:true});
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