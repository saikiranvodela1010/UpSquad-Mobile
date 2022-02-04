import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,Modal,
  ScrollView,Linking,Share,ActivityIndicator
} from 'react-native';
import eventsHandler from '../NetworkUtils/ApiHandler';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/Fontisto';
import IconAnt from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


import FbGrid from "react-native-fb-image-grid";

import IconMesage from 'react-native-vector-icons/MaterialCommunityIcons';
import ICONMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import {Type, plainToClass, Expose} from 'class-transformer';
import Fonts from '../../../res/Fonts';
import ImagesWrapper from '../../../res/ImagesWrapper';
import FileViewer from "react-native-file-viewer";
import {  getLoginDetails,
  getLoginDetails_update,
  getProfileImage,
  getTocken,
  getUserId,
  getUserName,
  getUserEmail,
} from '../../../res/GetUserInfo';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import {
  Data,
  EventLocation,
  MicrosoftTeamDetails,
  MobileNumber,
  Participant,
  RegisterInvite,
  SelectedTeamsId,
  SignupInvitee,
  UserRegisterEvent,
  ZoomDetails,
  ZoomReports,
} from './Model/EventDetailsModel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {PermissionsAndroid} from 'react-native';
 
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFileShareIntent from 'react-native-file-share-intent';

let data; //Data
let eventLocation;
let microsoftTeamDetails;
let mobileNumbers;
let participant;
let registerInvites;
let selectedTeamsId;
let signupInvitees;
let userRegisterEvent;
let zoomDetails;
let zoomReports;
let   onLayoutValue = 0;
 let onScrollVallue=0;
 
const iconcolor = '#868585';
const textColor = '#58C4C6';
let participantLength=0;
var bh; //new Date(root.getEventStartDate());
var bh1;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let arrayinit=[];

let arrayinitParticipent=[];



class EventDetails extends Component {
  constructor(props) {
    super(props);
    
    data = plainToClass(Data, this.props.route.params.eventData.data);
    console.log(data.getZoomDetails(), ' BHNAUPRo');
    zoomDetails=plainToClass(ZoomDetails ,data.getZoomDetails());
    console.log(data.getImageUrls(), 'O^O');
    bh1 = new Date(data.getEventStartDate());
    bh = new Date(data.getEventEndDate());
    console.log(bh, bh1, ' VV ', data.getVideoType());
    this.state = {
      showMore: false,
      numLines:undefined,
      textShown:false,
      showPB:false,
      modalMarginTop: 0,
      formatSelect:false,
    };
    for(let i=0;i<data. getUserRegisterEvent().length;i++)
    {
      userRegisterEvent=plainToClass(UserRegisterEvent ,data.getUserRegisterEvent()[i]);
      arrayinit.push(userRegisterEvent);
      console.log(arrayinit[i],"ARRAT OUUUU");
    }

    


  }


  //this.setState({ visible: true });

  handleScroll(event) {
    console.log(event.nativeEvent.contentOffset.y);
    this.onScrollVallue = event.nativeEvent.contentOffset.y;
  }


  componentDidMount() {
    // console.log(this.props.route.params.eventData," BHNAUPRo");
    //alert(getUserId());
  }

  render() {
    return (
      <ScrollView   onScroll={(event) => {
        this.handleScroll(event);
      }} >
        <View style={{height: 35, width: '100%', marginVertical: 10}}>
          <IconAnt
            style={{position: 'absolute', top: 55 / 2 - 25 / 2 - 10, left: 10}}
            onPress={() => {
              // onRequired();
              this.props.navigation.pop();
            }}
            name="arrowleft"
            size={25}
            color={'black'}
          />

          <IconFeather
            style={{position: 'absolute', top: 55 / 2 - 25 / 2 - 10, right: 10}}
            onPress={() => {
              // onRequired();
            }}
            name="more-vertical"
            size={25}
            color={'black'}
          />
        </View>
       
        {data.getImageUrls().length > 0 ? (
          <Image
            source={{uri: data.getImageUrls()[0]}}
            style={{width: '100%', height: 200, marginHorizontal: 0}}
          />
        ) : (
          <ICONMaterialIcons style={{alignSelf:'center'}} name="insert-photo" size={50} color={iconcolor} />
        )}
        <View
          style={{
            marginHorizontal: 0,
            marginVertical: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: 'white',
            marginTop:data.getImageUrls().length > 0 ?-15:0,
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              marginHorizontal: 20,
              marginVertical: 2,
            }}>
          


            <View
              style={{
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}>
                <Text
                 numberOfLines={2}
              style={{
                fontSize: 22,
                marginRight:20,
                flex:1,
                fontFamily: Fonts.mulishSemiBold,
                color: 'black',
              }}>
              {data.getEventTitle()}
            </Text>




    
   <IconAnt style={{marginHorizontal:5}} name="sharealt" size={23} color={iconcolor}
   
   onPress={() => {
    this.shareEventLinks(eventsHandler.shareEventbaseUrl+data.getUniversityId()+"/"+data.getId());
   }}
   />

            </View>

            <View
              style={{
                height: 60,
                marginRight: 'auto',
                backgroundColor: '#F1F1F1',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 20, marginLeft: 10}}>By</Text>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 60,
                  marginHorizontal: 4,
                }}
                source={{
                  uri: data.getProfileImage()==null||data.getProfileImage()==undefined||data.getProfileImage()==""? eventsHandler.dummyProfilepic:data.getProfileImage(),
                }}></Image>

              <Text
              numberOfLines={1}
                style={{
                  fontSize: 20,
                  marginLeft:2 ,
                  marginRight:10,
                  fontFamily: Fonts.mulishRegular,
                  fontWeight: '400',
                  color: 'black',
                }}>
                {data.getHostName()}
              </Text>
            </View>
            <FbGrid images = {data.getImageUrls()}
                                    style = {{height : 300,width:'100%'}}
                                    onPress ={(url, index, event)=> {

this.props.navigation.navigate('ImageViewer',{ data:{
      "imagesurls":data.getImageUrls(),
      "index":index

    }});


                                    }}/>
            <View
              style={{
                height: 50,
                marginRight: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <IconFeather name="calendar" size={23} color={iconcolor} />

              <Text
                numberOfLines={1}
                style={{
                  color: iconcolor,
                  marginHorizontal: 5,
                  fontFamily: Fonts.mulishRegular,
                }}>
                {bh.getDate() +
                  ' ' +
                  monthNames[bh.getMonth()] +
                  ' ' +
                  bh.getFullYear()}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  color: iconcolor,

                  fontFamily: Fonts.mulishRegular,
                  textAlign: 'center',
                }}>
                {bh.getHours() >= 12
                  ? 24 - bh.getHours() + 'pm'
                  : bh.getHours() + 'am'}{' '}
                -
                {bh1.getHours() >= 12
                  ? 24 - bh1.getHours() + 'pm'
                  : bh1.getHours() + 'am'}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  color: iconcolor,
                  marginHorizontal: 5,
                  fontFamily: Fonts.mulishRegular,
                  textAlign: 'center',
                }}>
                {data.getVideoType() == 0 ? 'Zoom' : 'Microsoft teams'}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                height: 2,
                color: '#F1F1F1',
                opacity: 0.1,
                marginVertical: 5,
                borderBottomWidth: 2,
              }}>

              </View>
            <Text
              style={{
              
                marginVertical: 5,
                fontSize: 18,
                color: 'black',
                fontWeight: '600',
                fontFamily: Fonts.mulishSemiBold,
              }}>
              Event Description
            </Text>

            <Text
onTextLayout={(e) => {
  if (e.nativeEvent.lines.length > 3 && !this.state.textShown) {
    this.setState( {showMore:true});
    this.setState( {numLines:3});
  }
}
}
ellipsizeMode="tail"
            numberOfLines={this.state.numLines}
              style={{
                marginTop: 5,
                fontSize: 15,
                color: {iconcolor},
                fontFamily: Fonts.mulishRegular,
              }}>
              {data.getEventDescription()}
              
            </Text>

           

            {this.state.showMore ? (
        <Text onPress={() => {
          
         this.toggleTextShown();


        }}  style={{
          marginTop: 5,
          fontSize: 15,
          color: "#58C4C6",
          fontFamily: Fonts.mulishRegular,
        }}>
          {this.state.textShown ? 'Show less' : 'Show More'}
        </Text>
      ) :    null}


            <View
              style={{
                width: '100%',
                height: 2,
                color: '#F1F1F1',
                opacity: 0.1,
                marginVertical: 5,
                borderBottomWidth: 2,
              }}></View>

            <Text
              style={{
                flex: 1,
                fontWeight: '600',
                marginTop: 5,
                fontSize: 18,
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,
              }}>
              Event Agenda
            </Text>
            <Text
              style={{
                flex: 1,
                fontWeight: '600',
                marginTop: 5,
                fontSize: 15,
                color:{iconcolor},
                fontFamily: Fonts.mulishSemiBold,
              }}>
              {data.getEventAgenda()}
            </Text>

            <View
              style={{
                width: '100%',
                height: 2,
                color: '#F1F1F1',
                opacity: 0.1,
                borderBottomWidth: 2,
              }}></View>

<View style={{flexDirection:'column'}} >


<View style={{flexDirection:'row',flex:1,marginTop:10}} >


<Text style={{flex: 1,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,width:'50%',}}>Participants</Text>

                    <Text style={{flex: 1,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 16,
                marginLeft: 2,
                color: {iconcolor},
                fontFamily: Fonts.mulishSemiBold,width:'50%',}}>
                  {data.getRegisterInvites().length+
                  data.getSignupInvitees().length+
                  data.getUserRegisterEvent().length-1} </Text> 
                


        </View>       
        <View style={{flexDirection:'row',flex:1,marginTop:10}} >
<Text style={{flex: 1,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                width:'50%',
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,}}>Length</Text>




                <Text style={{flex: 1,
                fontWeight: '600',
                marginVertical: 5,
                width:'50%',
                fontSize: 16,
                marginLeft: 2,
                color: {iconcolor},
                fontFamily: Fonts.mulishSemiBold,}}>{(bh.getHours()-bh1.getHours())*60} mins
                </Text>

</View>
        <View style={{flexDirection:'row',flex:1,marginTop:10}} >
                <Text style={{flex: 1,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                width:'50%',
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,}}>Video platform</Text>


                <Text style={{flex: 1,
                fontWeight: '600',
                marginVertical: 5,
                width:'50%',
                marginLeft: 2,
                fontSize: 16,
                color: {iconcolor},
                fontFamily: Fonts.mulishSemiBold,}}>{data.getVideoType()==0?"Zoom":"Microsoft teams"} </Text>
</View>



<View style={{flexDirection:'row',flex:1,marginTop:10}} >


           <Text style={{
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                width:'50%',
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,}}>Join video event</Text>

<TouchableOpacity

 onPress={() => {

if(zoomDetails.getHostUrl()!=null&&zoomDetails.getHostUrl()!="")

  {

    if(getUserId()==data.getHostId())
    {
      Linking.openURL(zoomDetails.getHostUrl());
    }
    else{
      Linking.openURL(zoomDetails.getJoinUrl());
    }
  }
  else{
    alert("Link not provided");
    Clipboard.setString('Link not provided');



  }

 }}
>
  <Text style={{
    width:windowWidth/2-10,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 16,
                marginLeft: 2,
               color: "#58C4C6",
                fontFamily: Fonts.mulishSemiBold,flexWrap:'wrap'}}>{getUserId()==data.getHostId()?"Click here to join as host":"Click here to join"}</Text>
</TouchableOpacity>

</View>

{getUserId()==data.getHostId()?
<View style={{flexDirection:'row',flex:1,marginTop:10}} >


           <Text style={{
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                width:'50%',
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,}}>Share event video link</Text>


<TouchableOpacity  onPress={() => {
                   
                   if(zoomDetails.getJoinUrl()!=null&&zoomDetails.getJoinUrl()!="")
                   {
                     this.shareEventLinks(zoomDetails.getJoinUrl());
                     
                   }
                   else{
                 alert("Link not provided");
                   }
                  }}>
                <View style={{flexDirection:'row',alignItems:'center',marginHorizontal: 2,flex:1}}>
                 
                <Image
                  source={ImagesWrapper.folder}
                  style={{width: 30, height: 30, }}
                />

                <Text 
                numberOfLines={20}
                style={{
                  width:windowWidth/2-30-10,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 16,
                
                marginLeft:2,
                color: "#58C4C6",
                fontFamily: Fonts.mulishSemiBold}}>copy & share link with participants</Text>
                  </View>
</TouchableOpacity>


</View>:null}
{getUserId()==data.getHostId()?
<View style={{flexDirection:'row',flex:1,marginTop:10}} >


           <Text style={{
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                color: 'black',
                width:'50%',
                fontFamily: Fonts.mulishSemiBold,}}>Share sign up & event register link</Text>

<TouchableOpacity  onPress={() => {

  if(zoomDetails.getRegistrationUrl()!=null&&zoomDetails.getRegistrationUrl()!="")
  {
    this.shareEventLinks(zoomDetails.getRegistrationUrl());
    
  }
  else{
alert("Link not provided");
  }
                   
                  }}>
                <View style={{flexDirection:'row',alignItems:'center',marginHorizontal: 2}}>
                 
                <Image
                  source={ImagesWrapper.folder}
                  style={{width: 30, height: 30, }}
                />

                <Text 
                numberOfLines={20}
                style={{
                  width:windowWidth/2-30-10,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 16,
                marginLeft:2,
                color: "#58C4C6",
                fontFamily: Fonts.mulishSemiBold,}}>copy & share link with participants</Text>
                  </View>
</TouchableOpacity>

</View>:null}

                
<View style={{flexDirection:'row',flex:1,marginTop:10,alignItems:'center'}} >


           <Text style={{
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                color: 'black',
                width:'50%',
                fontFamily: Fonts.mulishSemiBold,}}>Download event participant list</Text>

                <TouchableOpacity
                
                onLayout={(event) => {
                  var { x, y, width, height } = event.nativeEvent.layout;
                  console.log(x, y, width, height);
                  this.onLayoutValue = y;
                }}

                onPress={() => {

               if(data.getZoomReports().length==0)
               {
                 alert("Event report is empty");
                 return;
               }
               
               
               this.setState({ formatSelect: true });


                          
                  }}>
                <Image
                  source={ImagesWrapper.clouddownloadImage}
                  style={{width: 30, height: 30,marginLeft:2 }}
                
                />
                  </TouchableOpacity>
                 


</View>

</View>


<View
              style={{
                width: '100%',
                height: 2,
                color: '#F1F1F1',
                opacity: 0.1,
                marginVertical: 5,
                borderBottomWidth: 2,
              }}></View>

<Text
              style={{
                flex: 1,
                fontWeight: '600',
                marginVertical: 5,
                fontSize: 18,
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,
              }}>
              Participants attending
            </Text>

            {arrayinit.map((prop, key) => {

              console.log(prop,"propppp");
            userRegisterEvent=plainToClass(UserRegisterEvent,prop);
             return(
            <View key={key} style={{height:100,width:windowWidth-50,margin:3,borderRadius:5,flexDirection:'column'}}>
             
              <Text style={{
                flex: 1,
                fontWeight: '600',
                marginVertical: 2,
                fontSize: 18,
                color: 'black',
                fontFamily: Fonts.mulishSemiBold,
              }} > {userRegisterEvent.getFirstName() +" "+userRegisterEvent.getLastName()} </Text>

<Text style={{
                flex: 1,
                fontWeight: '400',
                marginVertical: 2,
                fontSize: 16,
             
                color: '#B1AAAA',
                fontFamily: Fonts.mulishRegular,
              }} > {userRegisterEvent.getCompanyOrOrganization()} </Text>

<Text style={{
                flex: 1,
                fontWeight: '400',
                marginVertical: 2,
                fontSize: 16,
                color: '#B1AAAA',
                fontFamily: Fonts.mulishRegular,
              }} > {userRegisterEvent.getEmail()} </Text>



<View
              style={{
                width: '100%',
                height: 2,
                color: '#F1F1F1',
                opacity: 0.1,
                marginTop: 12,
                borderBottomWidth: 2,
              }}></View>


             </View>
             );



          })}

          { arrayinit.length==0?
<Text
              style={{
                flex: 1,
                fontWeight: '400',
                marginVertical: 15,
                fontSize: 16,
                color: iconcolor,
                fontFamily: Fonts.mulishSemiBold,
              }}>
              Empty participants.
            </Text>:null}




          </View>
        </View>

        <Modal transparent={true} visible={this.state.showPB}
        
        
        
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <View
              style={{
                width: '25%',
                height: '10%',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#58C4C6',
                marginBottom: 10,
                backgroundColor: '#58C4C6',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </View>
        </Modal>



        <Modal  visible={this.state.formatSelect}
        
        transparent
        onRequestClose={() => {
          this.setState({ formatSelect: false });
        }}
        >

<View style={{flex:1,backgroundColor:'transparent'}}

onPress={() => {
  alert("clicked");
  this.setState({ formatSelect: false });



}}
>
<View style={{flex:1}}
onPress={() => {
  alert("clicked");
  this.setState({ formatSelect: false });

}}
>

</View>
<View style={{width:'100%',height:100,alignItems:'center',paddingHorizontal:50,
alignContent:'center',justifyContent:'space-evenly',backgroundColor:'#F1f1F1',
borderTopLeftRadius:20,borderTopRightRadius:20,flexDirection:'row',}}>

<IconAnt  style={{marginHorizontal:20}}
                onPress={() => {

                  this.setState({ showPB: true });
               this.requestRunTimePermission();   

               this.setState({formatSelect:false});
                }}
                name="pdffile1"
                size={30}
                color={'black'}
              />

<IconMesage  style={{marginHorizontal:20}}
                onPress={() => {
                  this.setState({ showPB: true });
                  this.exportDataToExcel();
                  this.setState({formatSelect:false});
                }}
                name="microsoft-excel"
                size={30}
                color={'black'}
              />
              <ICONMaterialIcons  style={{marginHorizontal:20}}
                onPress={() => {

                  this.setState({formatSelect:false});

                }}
                name="cancel"
                size={30}
                color={'black'}
              />
              

</View>


</View>

         
        </Modal>


      </ScrollView>
    );
  }


  requestRunTimePermission=()=> {
        this.createPDF_File();
  }


  async createPDF_File() {

    let htmlString='<h1 style="text-align: center;font-weight:500;text-decoration:underline;margin-bottom:15px">Event Participants</h1>'+
    "<br></br>"
    ;

    


    participantLength=0;

    arrayinitParticipent=[];

    for(let i=0;i<data.getZoomReports().length;i++)
    {
      zoomReports=plainToClass(ZoomReports ,data.getZoomReports()[i]);

  
         for(let j=0;j<zoomReports.getParticipants().length;j++)
         {
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"); 
          console.log(zoomReports.getParticipants()[j],i);
    
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        
          arrayinitParticipent.push(zoomReports.getParticipants()[j]);
           
         }     
         
         
    }

   if(arrayinitParticipent.length==0)
   {
     alert("Event report is empty");
     return;
   }

    console.log(arrayinitParticipent.length," ARRAY INIT");
    console.log(data.getEventDescription(),"WWWWWWWWWWWWWWW");
    let appendString=
    '<h3 style="text-align: left;font-weight:500;";>Event Title: '+'<span style="text-align: left;font-weight:400;">'+data.getEventTitle()+'</span>'+'</h3>'+
    '<h3 style="text-align: left;font-weight:500;";>Event Desc: '+'<span style="text-align: left;font-weight:400;">'+data.getEventDescription()+'</span>'+'</h3>'+
    '<h3 style="text-align: left;font-weight:500;">Event Date: '+'<span style="text-align: left;font-weight:400;">'+(bh.getDate()<10?"0":"")+bh.getDate() +' ' +monthNames[bh.getMonth()] +' ' +bh.getFullYear()+'</span>'+ '</h3>'+
   '<table style="table-layout: fixed;">'+
   '<tr>'+
     '<th style="width:30%;text-align: left;">Name</th>'+
     '<th style="width:30%;text-align: left;">Email</th>'+
    ' <th style="width:10%;text-align: left;">Duration</th>'+
    '<th style="width:15%;text-align: left;">Join time</th>'+
    ' <th style="width:15%;text-align: left;">Left time</th>'+
   '</tr> <tr></tr> <tr></tr> ';
    for(let i=0;i<arrayinitParticipent.length;i++)
    {
      console.log(arrayinitParticipent[i]);
     let participant=new plainToClass(Participant,arrayinitParticipent[i]);
     let jt = new Date(participant.getJoinTime());
     let  lt = new Date(participant.getLeaveTime());

     appendString=appendString+'<tr>'+'<td>'+participant.getName() +'</td>'+'<td>'+participant.getUserEmail()+'</td>'+'<td style="text-align:left">'+(Math.ceil(participant.getDuration()/60))+"m"+'</td>';
     appendString=appendString+'<td style="text-align:left">';
     
      if(jt.getHours()>=12)
      {
         appendString=appendString+(24-jt.getHours()<10?"0":"")+(24-jt.getHours())+":"+(jt.getMinutes()<10?"0":"")+jt.getMinutes()+' pm'+"</td>";
      }
      else{
        appendString=appendString+(12-jt.getHours()<10?"0":"")+(12-jt.getHours())+":"+(jt.getMinutes()<10?"0":"") +jt.getMinutes() +' am'+"</td>";
      }

      appendString=appendString+'<td style="text-align:left">';
      if(lt.getHours()>=12)
      {
         appendString=appendString+(24-lt.getHours()<10?"0":"")+(24-lt.getHours())+":"+(lt.getMinutes()<10?"0":"")+ lt.getMinutes()+' pm'+"</td>";
      }
      else{
        appendString=appendString+(12-lt.getHours()<10?"0":"")+(12-lt.getHours())+":"+(lt.getMinutes()<10?"0":"") +lt.getMinutes()+' am'+"</td>";
      }

console.log(appendString)  
; 
appendString=appendString+"</tr> <tr></tr> ";


    }

    let userIdANDtime=data.getId()+(new Date().getMinutes())+(new Date().getMilliseconds());
   let appendString3='</table>';
    let options = {
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      html:htmlString+appendString+appendString3
         ,  //"bahnu"
      // Setting UP File Name for PDF File.
      fileName: userIdANDtime,
    
      //File directory in which the PDF File Will Store.
      directory: 'docs',
    };
 
     let file = await RNHTMLtoPDF.convert(options).then(response => {
      this.setState({ showPB: false });
const path = FileViewer.open("file:///storage/emulated/0/Android/data/com.upsquard/files/docs/"+userIdANDtime+".pdf") // absolute-path-to-my-local-file.
  .then(() => {
    // success
  })
  .catch((error) => {
    // error
    
  });


});
     //console.log(file.filePath);
 
 // alert(file.filePath);
 
  //his.setState({filePath:file.filePath});
  }

  async  exportDataToExcel () {

    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "App Permission",
            message:
              "Your app needs permission.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
      
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               // Created Sample data
               let userIdANDtime=data.getId();



               
    let sample_data_to_export = [];

    arrayinitParticipent=[];

    for(let i=0;i<data.getZoomReports().length;i++)
    {
      zoomReports=plainToClass(ZoomReports ,data.getZoomReports()[i]);

  
         for(let j=0;j<zoomReports.getParticipants().length;j++)
         {
          console.log(zoomReports.getParticipants()[j],i);
          arrayinitParticipent.push(zoomReports.getParticipants()[j]);
           
         }     
         
         
    }

   if(arrayinitParticipent.length==0)
   {
     alert("Event report is empty");
     return;
   }



   for(let i=0;i<arrayinitParticipent.length;i++)
   {
     console.log(arrayinitParticipent[i]);
    let participant=new plainToClass(Participant,arrayinitParticipent[i]);
    let jt = new Date(participant.getJoinTime());
    let  lt = new Date(participant.getLeaveTime());
let joinT="";
let leftT="";
    
if(jt.getHours()>=12)
{
 joinT=(24-jt.getHours()<10?"0":"")+(24-jt.getHours())+":"+(jt.getMinutes()<10?"0":"")+jt.getMinutes()+'pm';
}
else{
  joinT=(12-jt.getHours()<10?"0":"")+(12-jt.getHours())+":"+(jt.getMinutes()<10?"0":"") +jt.getMinutes() +' am';
}

if(lt.getHours()>=12)
{
   leftT=(24-lt.getHours()<10?"0":"")+(24-lt.getHours())+":"+(lt.getMinutes()<10?"0":"")+ lt.getMinutes()+' pm';
}
else{
  leftT=(12-lt.getHours()<10?"0":"")+(12-lt.getHours())+":"+(lt.getMinutes()<10?"0":"") +lt.getMinutes()+' am';
}

   let obj= {
     
   Name: participant.getName(),
   Email:participant.getUserEmail(),
   Duration:((Math.ceil(participant.getDuration()/60))<10?("0"+(Math.ceil(participant.getDuration()/60))):(Math.ceil(participant.getDuration()/60)))+"min",
   JoinTime:joinT,
   LeftTime:leftT
  };
    
 sample_data_to_export.push(obj);


   }


    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
    XLSX.utils.book_append_sheet(wb,ws,"Users")
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath + '/'+userIdANDtime+'.xlsx', wbout, 'ascii').then((r)=>{
     
     this.setState({ showPB: false });

     const path = FileViewer.open(RNFS.DownloadDirectoryPath + '/'+userIdANDtime+'.xlsx') // absolute-path-to-my-local-file.
     .then(() => {
       // success
     })
     .catch((error) => {
       // error
       
     });

    }).catch((e)=>{
      console.log('Error', e);
      this.setState({ showPB: false });
      alert(e);
    });
          return true;
        } else {
          console.log("Storage permission denied");
          this.setState({ showPB: false });
          return false;

        }
      } catch (err) {
        alert(error);
        this.setState({ showPB: false });
        return false;
      }
 

  }


   toggleTextShown ()
    {
      this.setState({textShown:!this.state.textShown});
      this.setState({numLines:!this.state.textShown ? undefined : 3}); 
    
  };
   shareEventLinks(link)
  { 
    try {
      const result =  Share.share({
        message:link,
      }); 
    } catch (error) {
      alert(error.message);
    }
  }


}
export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
