import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions, TextInput,ActivityIndicator, Platform,ScrollView,FlatList,DeviceEventEmitter } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video, { FilterType } from 'react-native-video';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts'
// import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ServiceUrls from '../network/ServiceUrls';
import APIHandler from '../network/NetWorkOperations';
import moment from 'moment';
import Modal from 'react-native-modal';
import StoragePrefs from '../res/StoragePrefs';




export default class playersDetailScreen extends React.Component {


    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();


    constructor(props) {
        super(props);

        this.state = {
            tapstate: false,
            userData: [],
            isProfessional: '',
            experience: [],
            education: [],
            certifications: [],
            publications: [],
            posts: [],
            request: '',
            friends: '',
            data: '',
            data1: '',
            data2: '',
            data3: '',
            singleData: '',
            data4: [],
            data6: '',
            data5: '',
            seeall: false,
            experienceall: false,
            educationall: false,
            publicationsall: false,
            communityall: false,
            organizationData: [],
            teamData: [],
            isLoading: false,
            selfIntroVideos:[],
            userId:'',
            loginuserId:'',
            url:''

        }

    }
   async componentDidMount() {

        const userid = this.props.route.params.id;
        this.setState({userId:userid});
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        console.log('userDetails',userDetails,this.state.userId);
        this.setState({loginuserId:userDetails.userId});
        this.getUserInfo(userid);
    

    }
   

    async getUserInfo(userid) {
        this.setState({
            isLoading: true
        })
        //console.log('userid', this.state.userid)
        const data = userid;
        //const data = '5e3bfad3cf7d530022e90429'
        const response = await this.apiHandler.requestGet(data, this.serviceUrls.getParticularUser)
        //console.log("User response", response)
       

        this.setState({ userData: response.data })

     
        this.setState({
            bannerImage: response.data.bannerImage.imageUrl,
            experience: response.data.experience,
            education: response.data.education,
            certifications: response.data.certification,
            publications: response.data.publications,
            posts: response.data.posts,
            friends: response.data.friends,
            request: response.data.requests,
            selfIntroVideos:response.data.selfIntroductoryVideos,
          
        })
        // console.log('selfIntroVideos', this.state.selfIntroVideos[0].videoUrl)
        const data1 = this.state.experience[0]
        const data2 = this.state.education[0]
        const data3 = this.state.certifications[0]
        const data4 = this.state.publications[0]
        const data5 = this.state.publications.length >= 1 ? this.state.publications[0].publicationLinks : ''
        // const data6=this.state.selfIntroVideos[0].videoUrl
        const email = this.state.userData.email
        const user_id = this.state.userData._id
        this.setState({
            data: data3,
            data1: data1,
            data2: data2,
            data3: data4,
            data4: data5,
            // url:data6
        })
        // console.log('url', this.state.url)
        console.log('bannerImage', this.state.bannerImage)
        console.log('experience', this.state.experience)
        console.log('education', this.state.education)
        this.getOrganization(email, user_id)
    }

    async getOrganization(email, user_id) {
        const communityData = {
            "email": email,
            "userID": user_id
            // "email": "rajkumar@thinkebiz.net",
            // "userID": "5ee21f3f5583d00022351037"

        }
        const response = await this.apiHandler.requestPost(communityData, this.serviceUrls.getCommunities);
        console.log('communitydata=====', response.data)
        this.setState({
            isLoading: false
        })
        this.setState({
            organizationData: response.data
        })
        const team = this.state.organizationData[0]
        const data = this.state.organizationData.length >= 1 ? this.state.organizationData[0].teamsData : ''
        const data1 = data != '' ? data[0] : ''
       // console.log('teamtile', data1)
      //  console.log('Team data', this.state.organizationData[0])
        this.setState({
            data5: team,
            data6: data1
        })
    }
thumbnail = async (uri) =>{
    try {
        RNThumbnail.get(uri).then((result) => {
           console.log("Thumbnail path: " + result.path); // thumbnail path
           this.setState({ thumbUri: result.path });
        });
    //   }
    } catch (exp) {
      console.log(exp);
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
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                {this.renderLoader()}
                <View style={styles.header}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Image
                            source={ImagesWrapper.back}

                        />
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <View>
                    <Image source={{ uri: this.state.bannerImage }} style={{ width: '100%', height: 250,marginTop:this.state.userId === this.state.loginuserId ? "0%":"0%" }} />
                    {this.state.userId === this.state.loginuserId ?
                    <View style={{marginTop:'-58%',alignItems:'flex-end',marginRight:'8%'}}>
                    <Image source={ImagesWrapper.pencil} />
                    </View>
                    :
                    null
                    }
                    </View>
                    <View style={[styles.card,{ marginTop:this.state.userId===this.state.loginuserId?'45%':'-10%',}]}>
                        <Text style={styles.name}>{this.state.userData.firstName} {this.state.userData.lastName}</Text>
                        <Text style={styles.technologytext}>{this.state.userData.fieldOfstudyOrSpecialty} </Text>
                        <Text style={[styles.technologytext, { color: '#58C4C6' }]}>See more</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={ImagesWrapper.users} />
                            <Text style={[styles.technologytext, { fontSize: 12, marginLeft: 10, marginTop: 5 }]}>Member of  {this.state.userData.currentRole}</Text>
                        </View>
                        {/* <View style={styles.followercrad}>

                            <View style={{ marginLeft: 30 }}>
                                <Text style={[styles.technologytext,]}>Post</Text>
                                <Text style={styles.name}>{this.state.posts.length}</Text>
                            </View>
                            <View style={{ borderWidth: 0.3, borderColor: '#F1F1F1', marginTop: 18, marginBottom: 18 }}></View>
                            <View >
                                <Text style={styles.technologytext}>Followers</Text>
                                <Text style={styles.name}>{this.state.friends.length}</Text>
                            </View>
                            <View style={{ borderWidth: 0.3, borderColor: '#F1F1F1', marginTop: 18, marginBottom: 18 }}></View>
                            <View style={{ marginRight: 30 }}>
                                <Text style={styles.technologytext}>Following</Text>
                                <Text style={styles.name}>{this.state.request.count}</Text>
                            </View>
                        </View> */}
                        {/* <View style={{ flexDirection: 'row', marginTop: 20, marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    // props.navigation.navigate('profilesuccess')
                                    // alert('length'+addCard[0].id)
                                }}

                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradientButton]}>
                                    <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                                        Follow
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ tapstate: true })}>
                                <Image source={ImagesWrapper.tap} style={{ marginLeft: 70, marginTop: 15, }} />
                            </TouchableOpacity>
                        </View> */}
                        {/* <View style={styles.underline}></View> */}
                        {this.state.userId !== this.state.loginuserId ?
                        <View>
                        <Text style={styles.name}>Get in touch</Text>
                        
                        <View style={{ flexDirection: 'row', marginTop: 15, }}>
                            <View>
                                <View style={styles.messagecard}>
                                    <Image source={ImagesWrapper.sendmsg} style={{ marginLeft: 10 }} />
                                    <Text style={[styles.technologytext, { color: '#58C4C6', marginLeft: 10, marginTop: 5, marginRight: 10 }]}>Send message</Text>
                                </View>
                                {/* <Text style={[styles.technologytext, { fontSize: 12, marginLeft: 10, marginTop: 10, marginLeft: 'auto' }]}>Usually replies the next day</Text> */}
                            </View>
                            <View>
                                <View style={[styles.messagecard, { marginLeft: 10 }]}>
                                    <Image source={ImagesWrapper.scalendar} style={{ marginLeft: 10 }} />
                                    <Text style={[styles.technologytext, { color: '#58C4C6', marginLeft: 10, marginTop: 5, marginRight: 10 }]}>Schedule a 1:1</Text>
                                </View>
                                {/* <Text style={[styles.technologytext, { fontSize: 12, marginLeft: 10, marginTop: 10, marginRight: 'auto' }]}>Available 3 times this month </Text> */}
                            </View>
                        </View>
                        
                        </View>
                        :
                        null
                        }
                        <View style={styles.underline}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between' }}>
                        <Text style={styles.name}>Self Introduction</Text>
                        {this.state.userId === this.state.loginuserId?
                        <Image source={ImagesWrapper.pencil} style={{marginTop: 20}}/>
                        :
                        null
                        }
                        </View>
                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} >
                        <View style={{flexDirection:'row'}}>
                            {this.state.selfIntroVideos.length >= 0 ?
                         <FlatList  
                          horizontal
                          data={this.state.selfIntroVideos}
                          renderItem={item => (
                             
                            <View style={{ width: 180, height: 130, borderWidth: 1, borderColor:'#F1F1F1',borderRadius:5, }}>
                            <View style={{ flex: 1 }}>
                           
                                <Video
                                    source={{ uri: item.item.videoUrl }}
                                    style={{ flex: 1 }}
                                    resizeMode='contain'
                                    controls={false}
                                    paused={false}
                                    pictureInPicture={true}
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                >

                                </Video>
                            </View>
                         
                        </View>
                       
                          )}
                        /> 
                        :
                        null
                                }
                        
                        {/* <View style={{ width: 200, height: 110, borderWidth: 1 }}>
                            <View style={{ flex: 1 }}>
                                <Video
                                    source={{ uri: "https://careerquoadmin.s3.amazonaws.com/self_introductory_videos/61f2264664f850104d245445_1643279953762.mp4" }}
                                    style={{ flex: 1 }}
                                    resizeMode='contain'
                                    controls={false}
                                    paused={false}
                                    pictureInPicture={true}
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                >

                                </Video>
                            </View>
                        </View> */}

                        {/* <Image source={ImagesWrapper.addvideo}/> */}
                        {this.state.userId === this.state.loginuserId ?
                        <TouchableOpacity onPress={()=>{
                             this.props.navigation.navigate('SelfIntroduction')
                        }}>
                        <View style={[styles.addvideo,{marginLeft:10}]}>
                            <Image source={ImagesWrapper.addvideoplus}/>
                        </View>
                        </TouchableOpacity>
                        :
                        null
                        }
                        </View>
                        </ScrollView>
                        <View style={[styles.underline, { marginTop: 20 }]}></View>
                        <Text style={[styles.name, { fontSize: 16 }]}>About</Text>
                        <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, marginRight: 'auto' }]}>{this.state.userData.about}</Text>
                        {/* {this.state.experience.length >= 1 ? */}
                            <Text style={[styles.name, { fontSize: 16 }]}>Experience</Text> 
                            {/* : null} */}
                        {this.state.experienceall == false && this.state.experience.length >= 1 ?

                            <View>
                                <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{this.state.data1.role}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{this.state.data1.companyName}</Text>
                                    <View style={{ marginTop: 18, marginLeft: 10, height: 5, width: 5, borderRadius: 10, backgroundColor: '#868585', borderColor: '#868585' }}></View>
                                    <Text style={[styles.technologytext, { fontSize: 14, marginLeft: 10, marginTop: 10, }]}>{this.state.data1.industry}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{moment(this.state.data1.fromDate).format("MMM YYYY")}- {moment(this.state.data1.toDate).format("MMM YYYY")}</Text>
                                    <View style={{ marginTop: 18, marginLeft: 10, height: 5, width: 5, borderRadius: 10, backgroundColor: '#868585', borderColor: '#868585' }}></View>
                                    <Text style={[styles.technologytext, { fontSize: 14, marginLeft: 10, marginTop: 10, }]}>{moment(this.state.data1.toDate).diff(this.state.data1.fromDate, 'months')} Months</Text>
                                </View>
                            </View> : null}

                        {this.state.experienceall == true && this.state.experience.length > 1 ?
                            this.state.experience.map((data, key) => {
                                return (
                                    <View>
                                        <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{data.role}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{data.companyName}</Text>
                                            <View style={{ marginTop: 18, marginLeft: 10, height: 5, width: 5, borderRadius: 10, backgroundColor: '#868585', borderColor: '#868585' }}></View>
                                            <Text style={[styles.technologytext, { fontSize: 14, marginLeft: 10, marginTop: 10, }]}>{data.industry}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{moment(data.fromDate).format("MMM YYYY")}- {moment(data.toDate).format("MMM YYYY")}</Text>
                                            <View style={{ marginTop: 18, marginLeft: 10, height: 5, width: 5, borderRadius: 10, backgroundColor: '#868585', borderColor: '#868585' }}></View>
                                            <Text style={[styles.technologytext, { fontSize: 14, marginLeft: 10, marginTop: 10, }]}>{moment(this.state.data1.toDate).diff(this.state.data1.fromDate, 'months')} Months</Text>
                                        </View>
                                    </View>
                                )
                            }) : null}
                        {this.state.experience.length > 1 && this.state.experienceall == false ?
                            <Text style={[styles.technologytext, { color: '#58C4C6', marginTop: 5, marginRight: 20 }]} onPress={() => this.setState({ experienceall: true })}>See all positions</Text> : null}
                        {this.state.experience.length >= 1 ?
                            <View style={[styles.underline, { marginTop: 10 }]}></View> : null}
                        {this.state.education.length >= 1 ?
                            <Text style={[styles.name, { fontSize: 16 }]}>Education</Text> : null}
                        {this.state.educationall == false && this.state.education.length >= 1 ? <View>
                            <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{this.state.data2.universityName}</Text>
                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{this.state.data2.fieldOfstudyOrSpecialty}</Text>
                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{this.state.data2.yearOfGraduation}</Text>
                        </View> : null
                        }
                        {this.state.educationall == true && this.state.education.length > 1 ?
                            this.state.education.map((data, key) => {
                                return (<View>
                                    <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{data.universityName}</Text>
                                    <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{data.fieldOfstudyOrSpecialty}</Text>
                                    <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{data.yearOfGraduation}</Text>
                                </View>
                                )
                            }) : null}
                        {this.state.education.length > 1 && this.state.educationall == false ?
                            <Text style={[styles.technologytext, { color: '#58C4C6', marginTop: 5, marginRight: 20 }]} onPress={() => this.setState({ educationall: true })}>See all</Text> : null}
                        {this.state.education.length >= 1 ?
                            <View style={[styles.underline, { marginTop: 10 }]}></View> : null}
                        {this.state.certifications.length >= 1 ?
                            <Text style={[styles.name, { fontSize: 16 }]}>Certifications & Licenses</Text> : null}
                        {this.state.seeall == false && this.state.certifications.length >= 1 ?
                            <View>
                                <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{this.state.data.certificationName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{moment(this.state.data.certificationMonth, 'M').format("MMM")} {this.state.data.certificationYear}</Text>
                                    <View style={{ marginTop: 18, marginLeft: 10, height: 5, width: 5, borderRadius: 10, backgroundColor: '#868585', borderColor: '#868585' }}></View>
                                    {this.state.data.isExpirationDate == true ?
                                        <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, marginLeft: 10 }]}>No Expiration date</Text> :
                                        <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, marginLeft: 10 }]}>{moment(this.state.data.certificationExpirationMonth, 'M').format("MMM")} {this.state.data.certificationExpirationYear}</Text>}

                                </View>
                            </View> : null}
                        {this.state.seeall == true && this.state.certifications.length > 1 ?
                            this.state.certifications.map((data, key) => {
                                return (<View>
                                    <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{data.certificationName}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{moment(data.certificationMonth, 'M').format("MMM")} {data.certificationYear}</Text>
                                        <View style={{ marginTop: 18, marginLeft: 10, height: 5, width: 5, borderRadius: 10, backgroundColor: '#868585', borderColor: '#868585' }}></View>
                                        {data.isExpirationDate == true ?
                                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, marginLeft: 10 }]}>No Expiration date</Text> :
                                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, marginLeft: 10 }]}>{moment(data.certificationExpirationMonth, 'M').format("MMM")} {data.certificationExpirationYear}</Text>}

                                    </View>
                                </View>)
                            }) : null}
                        {this.state.certifications.length > 1 && this.state.seeall == false ?
                            <Text style={[styles.technologytext, { color: '#58C4C6', marginTop: 5, marginRight: 20 }]} onPress={() => { this.setState({ seeall: true }) }}>See all</Text> : null}
                        {this.state.certifications.length >= 1 ?
                            <View style={[styles.underline, { marginTop: 10 }]}></View> : null}
                        {this.state.publications.length >= 1 ?
                            <Text style={[styles.name, { fontSize: 16 }]}>Publications</Text> : null}
                        {
                            this.state.publicationsall == false && this.state.publications.length >= 1 ?
                                <View>
                                    <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{this.state.data3.publicationDetails}</Text>
                                    {this.state.data4.map((data, key) => {
                                        return (
                                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{data.link}</Text>)
                                    })}
                                </View> : null

                        }
                        {this.state.publicationsall == true && this.state.publications.length > 1 ?
                            this.state.publications.map((data, key) => {
                                return (<View>
                                    <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{data.publicationDetails}</Text>
                                    {data.publicationLinks.map((data) => {
                                        return (
                                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{data.link}</Text>)
                                    })}
                                </View>)
                            }) : null}
                        {this.state.publications.length > 1 && this.state.publicationsall == false ?
                            <Text style={[styles.technologytext, { color: '#58C4C6', marginTop: 5, marginRight: 20 }]} onPress={() => this.setState({ publicationsall: true })}>See all</Text> : null}
                        {this.state.publications.length >= 1 ?
                            <View style={[styles.underline, { marginTop: 10 }]}></View> : null}

                        <Text style={[styles.name, { fontSize: 16 }]}>Community subscription</Text>

                        {
                            this.state.communityall == false && this.state.organizationData.length >= 1 ?
                                <View>
                                    <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{this.state.data5.universityName}</Text>

                                    <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{this.state.data6.teamTitle}</Text>

                                </View> : null

                        }
                        {this.state.communityall==true && this.state.organizationData.length>=1?
                            this.state.organizationData.map((data, key) => {
                                return (<View>
                                    <Text style={[styles.name, { fontSize: 14, marginTop: 10 }]}>{data.universityName}</Text>
                                    {data.teamsData.map((data, key) => {
                                        return (
                                            <Text style={[styles.technologytext, { fontSize: 14, marginTop: 10, }]}>{data.teamTitle}</Text>)
                                    })}
                                </View>)
                            }) :null}
                        
                        {this.state.organizationData.length >= 1 && this.state.communityall == false ?
                            <Text style={[styles.technologytext, { color: '#58C4C6', marginTop: 5, marginRight: 20 }]} onPress={() => this.setState({ communityall: true })}>See all</Text> : null}
                        {/* Modal code here */}

                        {this.state.tapstate === true ?
                            // <Modal
                            //     transparent={true}
                            //     isVisible={this.state.tapstate}
                            //     onBackdropPress={() => this.setState({tapstate:false})}
                            //     onRequestClose={() => {
                            //         this.setState({tapstate:false})
                            //      }}
                            // >
                            // <View style={styles.modelstyle}>
                            //     <Text>Can you think of someone who has an amazing story that the world needs to hear?
                            //         Tap them and encourage them to tell a story.</Text>
                            // </View>
                            // </Modal>
                            <Modal
                                transparent={true}
                                isVisible={this.state.tapstate}
                                onBackdropPress={() => this.setState({ tapstate: false })}
                                onRequestClose={() => {
                                    this.setState({ tapstate: false })
                                }}
                                style={{
                                    justifyContent: 'flex-end',
                                    margin: 0
                                }}

                            >
                                {/* <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'40%',marginTop:550,width:'110%',marginLeft:-20}}> */}
                                <View style={{
                                    height: '35%', width: '100%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, bottom: 0, position: 'absolute'
                                }}>
                                    <Text style={{ fontSize: 14, marginTop: 30, marginLeft: 28, marginRight: 30, fontFamily: Fonts.mulishBold, color: '#1E1C24' }}> Tap them and encourage them to tell a story.</Text>


                                    <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishSemiBold, fontWeight: '400', marginLeft: 30, marginTop: 15 }}>Your message to them</Text>
                                    <TextInput
                                        style={styles.textinput}
                                        // onChangeText={(Email) => {
                                        //     this.setState({email:Email})
                                        //     this.setState({emailerr:''})
                                        // }}
                                        value={this.state.email}
                                        // returnKeyType={"next"}
                                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                    // ref={(input) => { this.thirdTextInput = input; }}
                                    // onSubmitEditing={() => { this.fourTextInput.focus(); }}
                                    // importantForAutofill="no" 
                                    // maxLength={63}
                                    // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                    // blurOnSubmit={false}
                                    />
                                    <View style={[styles.underline, { width: '85%', marginTop: 0 }]} />
                                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // props.navigation.navigate('profilesuccess')
                                                // alert('length'+addCard[0].id)
                                            }}

                                        >
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradientButton, { width: 350, height: 60 }]}>
                                                <Text style={[styles.buttonText, { color: '#FFFFFF', alignItems: 'center', marginTop: 15 }]}>
                                                    Tap
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            :
                            null
                        }

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {

        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '7%',
        marginTop: 25,
        marginBottom: 25,

    },
    card: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowOpacity: 0.05,
        paddingLeft: '9%',
        paddingRight: '9%',
        marginBottom: 30,
        borderTopRightRadius:20,
        borderTopLeftRadius:20

    },
    name: {
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 20,
        fontWeight: '600',
        color: '#1E1C24',
        marginTop: 20
    },
    technologytext: {

        marginTop: 10,
        color: '#868585',
        fontSize: 14,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        //   textAlign:'center'
    },
    followercrad: {
        height: '6%',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        marginTop: 'auto',
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // alignItems:'center',
        // justifyContent:'center'
        marginBottom: 'auto'
    },
    linearGradientButton: {

        width: 200,
        // height:'7%',
        borderRadius: 30,

        height: 50,

    },
    underline: {
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft: 'auto',
        marginTop: 20,
        marginRight: 'auto',
        width: '100%'
    },
    messagecard: {
        height: 60,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        shadowOpacity: Platform.OS=='ios'?null:0.3,
        flexDirection: 'row',
        alignItems: 'center',
        //  marginLeft:20
    },
    textinput: {
        marginTop: 10,
        marginLeft: 30,
        height: 40,
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 14,
        color: '#1E1C24',
    },
    addvideo:{ 
        width: 180, 
        height: 130,
         borderWidth: 1 ,
         backgroundColor:'#F1F1F1',
         borderColor:'#F1F1F1',
         borderRadius:5,
         alignItems:'center',
         justifyContent:'center'
        }

});