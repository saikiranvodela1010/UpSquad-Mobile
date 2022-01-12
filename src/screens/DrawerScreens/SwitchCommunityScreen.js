import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,Image, DeviceEventEmitter,SafeAreaView} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import APIHandler from '../../network/NetWorkOperations';
import ServiceUrls from '../../network/ServiceUrls';
import StoragePrefs from '../../res/StoragePrefs';

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
            checked:0,
            back:true,
            email : '',
            userId: '',
           
        }
    }

    async componentDidMount() {
      const userDetails = await this.storagePrefs.getObjectValue("userDetails")
      this.setState({
        userId : userDetails.userId,
        email : userDetails.userEmail
      })
      await this.getCommunityDetails();

  }

  async getCommunityDetails() {

    const communityData={
      "email": this.state.email,
      "userID": this.state.userId
    }
    // const communityData={
    //   "email": "rajkumar@thinkebiz.net",
    //   "userID": "5ee21f3f5583d00022351037"
    // }
    const response = await this.apiHandler.requestPost(communityData,this.serviceUrls.getCommunities);
    // const radio= response.data;
    console.log('communitydata=====',response.data)
    if(response.data!=null && response.data.length>0){
      this.setState({radio:response.data})
    } else{
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
  console.log('communitydata',this.state.radio_props)
    if(this.state.checked === 0){
      this.checked(this.state.radio_props[0]);
    }
  }

  async checked(item){
    console.log('item',item);
     const universityDetsils =  {
      "_id":item._id,
      "universityName":item.universityName,
     }
     const data = await this.storagePrefs.setObjectValue("universityDetsils",universityDetsils);

  }


    render(){
       const{radio}=this.state
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
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
              <Image source={{uri:item.universityLogo}}  style={{height:40,width:40,marginLeft:25,marginTop:20}}/>
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
                this.checked(item);
                DeviceEventEmitter.emit("refresh");
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

</View>

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
    });