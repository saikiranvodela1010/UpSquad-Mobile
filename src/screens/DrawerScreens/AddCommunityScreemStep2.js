import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, Platform,FlatList, DeviceEventEmitter,Modal,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import CheckBox from 'react-native-check-box';
// import { Checkbox } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import APIHandler from '../../network/NetWorkOperations';
import ServiceUrls from '../../network/ServiceUrls';
import CheckBox from 'react-native-check-box'
import _ from 'lodash'
import StoragePrefs from '../../res/StoragePrefs';


class TeamScreen extends React.Component {

    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();

    constructor(props) {
        super(props);
        this.state = {
            checkmark: false,
            checkmark0: false,
            checkmark1: false,
            checkmark2: false,
            status: true,
            viewall: true,
            rectbox: true,
            teamsview:false,
            teamsData:null,
            isSelect:[],
            selectedClass:'notselected',
            userId:'',
            universityId:'',
            isProfessional:false,
            playerRename:'',
            coachRename:"",
            hideCoachStatus:false,
            hidePlayerStatus:false,
            // userData from signup screen

            subscriptioncode: props.route.params.subscriptioncode,
            email:"",
            isLoading: false
           
        }
    }

    async componentDidMount() {
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        this.setState({
          userId : userDetails.userId,
          email : userDetails.userEmail
        })
      this.getroleDetails();

    }
    // async componentDidUpdate(){
    //  await this.getroleDetails();

    // }
    
    async getroleDetails() {
        this.setState({
            isLoading: true
        })
      console.log('signupdetals',this.state.email)
        const data= {
            "subscriptionCodes": [this.state.subscriptioncode]
        }
        const response = await this.apiHandler.requestPost(data,this.serviceUrls.roleDetails)
     
        if(response.status == "No network Connected!"){
            this.setState({isLoading: false})
            this.setState({isInternet: true})
            alert('No network Connected!')
        } else{
            this.setState({isLoading: false})
            if(response.Status  === 'Success') {
                // this.props.navigation.navigate('BioSuccess');
                this.setState({playerRename:response.data[0].playerRename})
                this.setState({coachRename:response.data[0].coachRename})
                this.setState({hidePlayerStatus:response.data[0].hidePlayerStatus})
                this.setState({hideCoachStatus:response.data[0].hideCoachStatus})
                
               this.setState({teamsData:response.data[0].teamsData})
               this.setState({universityId:response.data[0]._id})
            console.log('coderesponse',this.state.universityId);

            } 
          

        }
    }
   
    async onSubmit(){

       
        let teamcheckedIds = this.state.isSelect;
        
        var teamsData= _.map(this.state.teamsData,(item)=> { 
            
            return teamcheckedIds.indexOf(item._id) === -1 ? {teamId: item._id, "isChecked": false} : {teamId:item._id, "isChecked": true}
        })

          
          
    // Register Api calling
//             console.log('player',this.state.isProfessional)

//         const registerData = {
//             "email": this.state.email,
//             "firstName":this.state.firstName,
//             "isProfessional": this.state.isProfessional,
//             "lastName": this.state.lastName,
//             "password": this.state.password,
//         }
// console.log("registerData",registerData)
//         const response = await this.apiHandler.requestPost(registerData,this.serviceUrls.userRegister);
       

//         if(response.status == "No network Connected!"){
//             this.setState({isInternet: true})
//             alert('No network Connected!')
//         } else{
//             if(response.success === true){
//                 this.setState({userId:response.user._id})
//                     const signupdetails={
//                         "token":response.token,
//                         "email":response.user.email,
//                         "firstName":response.user.firstName,
//                         "lastName":response.user.lastName,

//                     }
//               await this.storagePrefs.setObjectValue("signupdetails",signupdetails);

//             }

//         }
        
//  UpdateTeams api caling
       
            
            const UpdateTeams = {
                "teamData":[
                        {
                            "SubscriptionCode":this.state.subscriptioncode,
                            "universityId":this.state.universityId,
                            "user_email": this.state.email,
                            "user_id": this.state.userId,
                        
                        "teamDetails":teamsData,
                        }
                ]
            }


            const updateTeamsresponse = await this.apiHandler.requestPost(UpdateTeams,this.serviceUrls.updateTeams);
           
           

            if(updateTeamsresponse.status == "No network Connected!"){
                this.setState({isInternet: true})
                alert('No network Connected!')
            } 

            if(updateTeamsresponse.succsess === true){
               
                DeviceEventEmitter.emit("codeAddedSuccessfully");
                this.props.navigation.navigate('switchcommunity');

               

                //this.props.navigation.openDrawer();
            }

       

    }

    ShowHideTextComponentView = () => {
        
        if (this.state.status == true && this.state.viewall == true) {
            this.setState({ status: false })
            this.setState({viewall: false})
        }
        else {
            this.setState({ status: true })
            this.setState({viewall: true})
        }
    }
    PlayerRole = () => {
       

        if(this.state.rectbox == true){
            this.setState({rectbox: false})
            

        }
        else{
            this.setState({rectbox: true})
            

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
    

    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#FFFFFF' }}>
                 {this.renderLoader()}
                  <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                      // this.props.navigation.openDrawer();
                      this.props.navigation.navigate('AddCommunityScren'
                          // back:this.state.back,
                          );
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                            // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Add Community</Text>
                   

                </View>
                <View style={styles.underline}></View>
                <Text style={[styles.memphistalk,{marginTop:20,marginLeft:30}]}>Step 2 of 2</Text>
                <Text style={styles.title}>What's your role?</Text>
                <View style={{ flexDirection: 'row', marginTop: 25, }}>
                    
                    
                    {this.state.rectbox ?
                        <View style={{ flexDirection: 'row',}}>
                            {this.state.hidePlayerStatus === false ?
                            <View style={styles.recBox1}>

                                <Image
                                   source={ImagesWrapper.image}
                                    style={{
                                        width: '95%',
                                        marginBottom: 30
                                    }}

                                />
                                <Text style={styles.playertext}>Get inspired by</Text>
                                <Text style={styles.playertext}>others and</Text>
                                <Text style={styles.playertext}>learn more.</Text>
                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                                <Text style={{ borderWidth: 3, width: '12%', height: 20, borderColor: '#ffffff', borderRadius: 10, marginRight: 10, marginLeft: 10 }}></Text>
                                {this.state.playerRename !== ""?
                                    
                                    <Text style={styles.player}>{this.state.playerRename}</Text>
                                   :
                                   <Text style={styles.player}>Player</Text>
                                } 
                                </View>
                            </View>
                            :
                            null
                            }
                            {this.state.hideCoachStatus === false ?
                            <TouchableOpacity onPress={() => {
                                this.PlayerRole();
                                this.setState({isProfessional:true})
                                }} 
                                style={styles.recBox2}>
                            <View >
                                <Text style={styles.coachtext}>Share your</Text>
                                <Text style={styles.coachtext}>knowledge and</Text>
                                <Text style={styles.coachtext}>help others to</Text>
                                <Text style={styles.coachtext}>grow.</Text>
                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                                 
                                    <Text style={{ borderWidth: 3, width: '12%', height: 20, borderColor: '#F1F1F1', borderRadius: 10, marginRight: 10, marginLeft: 10 }}></Text>
                                  {this.state.coachRename !== '' ?

                                    <Text style={styles.coach}>{this.state.coachRename}</Text>
                                     :
                                     <Text style={styles.coach}>Coach</Text>
                             } 
                                </View>

                            </View>
                            </TouchableOpacity>
                            :
                            null
                             }
                        </View>

                        :
                        
                        <View style={{ flexDirection: 'row',marginLeft:25 }}>
                            {this.state.hidePlayerStatus === false ? 
                            <TouchableOpacity onPress={() => {
                                this.PlayerRole();
                                this.setState({isProfessional:false})
                                }}  style={[styles.recBox2,{marginLeft:5,width:'45%'}]}>
                            <View>
                                <Text style={styles.playertext1}>Get inspired by</Text>
                                <Text style={styles.playertext1}>others and</Text>
                                <Text style={styles.playertext1}>learn more.</Text>
                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                                 
                                    <Text style={{ borderWidth: 3, width: '12%', height: 20, borderColor: '#F1F1F1', borderRadius: 10, marginRight: 10, marginLeft: 10 }}></Text>
                                   
                                    {this.state.playerRename !== ""?
                                    
                                    <Text style={styles.player}>{this.state.playerRename}</Text>
                                   :
                                   <Text style={styles.player}>Player</Text>
                                } 

                                </View>

                            </View>
                            </TouchableOpacity>
                            :
                            null
                        }
                        {this.state.hideCoachStatus === false ?
                            <View style={[styles.recBox1,{width:'44%'}]}>

                                <Image
                                    source={ImagesWrapper.image}
                                    style={{
                                        width: '95%',
                                        marginBottom: 7
                                    }}

                                />
                                <Text style={styles.coachtext1}>Share your</Text>
                                <Text style={styles.coachtext1}>knowledge and</Text>
                                <Text style={styles.coachtext1}>help others to</Text>
                                <Text style={styles.coachtext1}>grow.</Text>

                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                                <Text style={{ borderWidth: 3, width: '12%', height: 20, borderColor: '#ffffff', borderRadius: 10, marginRight: 10, marginLeft: 10 }}></Text>
                                {this.state.coachRename !== '' ?

                                <Text style={styles.coach}>{this.state.coachRename}</Text>
                                :
                                <Text style={styles.coach}>Coach</Text>
                                } 
                                </View>
                            </View>
                            :
                            null
    }
                        </View>
                            

                    }

                   

                </View>
                 {/* <ScrollView>            */}
                {this.state.subscriptioncode !== "" ?
                <View>
                    <Text style={styles.selecteam}>Select your team(s)</Text>
                    <ScrollView style = {{marginTop: 20}}>            
                    <View style={{ marginLeft: 30 }}>
                        
                         <FlatList
                                        // horizontal
                                        data={this.state.teamsData}
                                        renderItem={item => (
                                                
                                                <View style={styles.text}>

                                                     <CheckBox

                                                        onClick={() => {
                                                            
                                                            const index = this.state.isSelect.indexOf(item.item._id);
                                                            if(index > -1){
                                                                this.state.isSelect.splice(index,1)
                                                            }else{
                                                                this.state.isSelect.push(item.item._id)
                                                            }
                                                            this.setState({isSelect:this.state.isSelect})
                                                        }}
                                                        
                                                        isChecked={this.state.isSelect.includes(item.item._id)}
                                                    
                                                        //leftText={"CheckBox"}
                                                        checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                                        unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                                        />
                                                    <Text style={[styles.checkboxtxt1, this.state.selectedClass  ==='mark-on' ? {color: '#000000',fontFamily:Fonts.mulishSemiBold} : {color: '#868585'}]}>{item.item.teamTitle}</Text>
                                                </View>
                                               
                                          
                                        )}
                                    />
                    </View>
                    </ScrollView>
                   

                                                   
                    
                    <TouchableOpacity onPress={this.ShowHideTextComponentView}>
                        {this.state.viewall ? 
                            <Text style={styles.viewlink}>View all</Text>
                            : null
                        }
                    </TouchableOpacity>
                    </View>
                    :
                    null
                     }
                    <View style={{justifyContent:'flex-end',flex:1}}>
                        <TouchableOpacity 
                            onPress={()=>{
                                // this.props.navigation.navigate('Account')
                                this.onSubmit();
                            }}
                            
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(33, 43, 104, 1)', 'rgba(88, 196, 198, 1)']} style={[styles.linearGradient1, Platform.OS === "ios" ? { marginTop: '6%' } : { marginTop: '6%' }]}>

                                <Text style={styles.nextbtn}>
                                    Done
                                </Text>

                            </LinearGradient>
                        </TouchableOpacity>

                    </View>


              
                {/* </ScrollView> */}


            </SafeAreaView>
        )
    }

}


const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        fontSize: 16,
        marginLeft: '6%',
        marginTop: '5%',
    },
    recBox1: {
        borderWidth: 1,
        height: 250,
        width: '42%',
        borderRadius: 5,
        backgroundColor: '#58C4C6',
        borderColor: '#58C4C6',
        marginLeft: 25,
        justifyContent: 'flex-end',

    },
    recBox2: {
        borderWidth: 1,
        height: 250,
        width: '42%',
        borderRadius: 5,
        borderStyle: 'dashed',
        justifyContent: 'flex-end',
        marginLeft: 25,

    },
    checkbox: {
        // marginLeft: 10,
        marginTop: 5,
        height: 20,
        width: 20
    },
    checkmark: {
        // marginLeft: 10,
        marginTop: 5,
        backgroundColor: '#58C4C6',
        borderRadius: 2,
        height: 20,
        width: 20

    },
    checkboxtxt: {
        marginLeft: 12,
        fontSize: 14,
        color: '#868585',
        marginTop: 5,
        fontFamily: Fonts.mulishRegular, 
        fontWeight: '600'

    },
    checkboxtxt1: {
        marginLeft: 12,
        fontSize: 14,
        // color: '#000000',
        // marginTop: 5,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'

    },
    text: {
        flexDirection: 'row',
        marginBottom: 15
    },
    linearGradient1: {
        width: '85%',
        height: 55,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 55
        // width:'85%',
        // height:60,
        // borderRadius:30,
        // alignItems:"center",
        // justifyContent:'center',
        // // paddingLeft: 15,
        // // paddingRight: 15,
        // // borderRadius: 25,
        // marginLeft: 30,
        // // height: 48,
        // marginRight: 30


    },
    nextbtn: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Mulish',
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    borderimage: {
        width: '85%',
        height: '39%',
        borderRadius: 30,
        marginTop: 50

    },
    playertext:{
        fontSize: 14, 
        color: '#EBEBEB', 
        marginLeft: 15,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    player: {
        fontSize: 16, 
        color: '#EBEBEB', 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        marginTop:-2,
    },
    coachtext: {
        fontSize: 14, 
        color: '#868585', 
        marginLeft: 15, 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' 
    },
    coach: {
        fontSize: 16, 
        color: '#868585', 
        // marginLeft: 20,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' ,
        marginTop:-2,
    },
    playertext1: {
        fontSize: 14, 
        color: '#868585', 
        marginLeft: 15,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' 

    },
    player1: {
        fontSize: 16, 
        color: '#868585', 
        // marginLeft: 20, 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        marginTop:-2,
    },
    coachtext1: {
        fontSize: 14, 
        color: '#EBEBEB', 
        marginLeft: 15, 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    coach1: {
        fontSize: 16, 
        color: '#EBEBEB', 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        marginTop:-2,
    },
    selecteam: {
        fontSize: 16, 
        color: '#1E1C24', 
        marginLeft: '6%', 
        marginTop: 30,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' 
    },
    viewlink: {
        marginLeft: '7%', 
        // marginTop: , 
        fontSize: 16, 
        color: '#58C4C6',
        marginBottom: 25,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        marginBottom:'5%'

    },
    memphistalk:{ 
        fontSize: 20,
         fontFamily: Fonts.mulishSemiBold,
          fontWeight: '600',
          color:'#1E1C24',
           marginLeft: '5%'
    },
    header: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '9%',
        marginTop: 20,
        marginBottom: 20,
        flexDirection:'row',
        marginLeft:-10
        // borderBottomWidth:1
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        width:'100%'
    },
});

export default TeamScreen;