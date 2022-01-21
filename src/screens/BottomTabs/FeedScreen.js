import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity, Image,TextInput,SafeAreaView,Platform,FlatList, DeviceEventEmitter,ActivityIndicator,} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { G, Circle } from "react-native-svg";
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import moment from 'moment';
import StoragePrefs from '../../res/StoragePrefs';
import Share from 'react-native-share';


 class MeetingsScreen extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();
    
    constructor(props){
        super(props);
       
        this.state={
            leadercolor:'green',
            tapstate:false,
            email:'',
            message:'',
            dotsmemu:false,
            playerCreatePost: false,
            coachCreatePost : false,
            isProfessional: false,
            postData: [],
            dateTime : "",
            communityName:'',
            universityId: '',
            isLoading: false,
            email : '',
            userId: '',
            universityName: '',
            likeColor: false,
            share: false,
            likedPosts: [],
            communityLogo : ""
            
        }
       
    }

    async componentDidMount(){
        this.setState({isLoading: true})
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        this.setState({      
            userId : userDetails.userId,
            email : userDetails.userEmail
        })
        DeviceEventEmitter.addListener("refresh",this.getPosts);
        DeviceEventEmitter.addListener("UpdateFeed",this.updateFeed);
        return new Promise((resolve, reject) => {
            this.getCommunityDetails()
            .then(()=>  {return this.getPosts();})
            .then(()=>  {return this.getUniversityImages();})
            .then(() => {return this.getUserProfile();})
            .then(() => {return  this.setState({isLoading: false})})
            .then(()=>  { resolve('done')})
            .catch((error)=> {this.setState({isLoading: false});
                                 reject(error)})
        })
        
    }
    async componentDidUpdate(){
        const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
        this.setState({communityName:universityDetsils.universityName});
    }

  

    // customShare = async () =>  {
    //     const shareOptions  =  {
    //         message:"This is a test message"
    //     }
    //         Share.open(shareOptions)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             err && console.log(err);
    //         });
    //     }

        updateFeed = async () => {
            const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
            const userDetails = await this.storagePrefs.getObjectValue("userDetails")
            this.setState({
                universityName:universityDetsils.universityName,
                universityId: universityDetsils._id,
                communityName: universityDetsils.universityName,
                communityLogo: universityDetsils.universityLogo,
                userId : userDetails.userId,
                email : userDetails.userEmail
            })
            return new Promise((resolve, reject) => {
            this.getPosts()
            .then(() =>  {return this.getUniversityImages();})
            .then(() => {return this.getUserProfile();})
            .then(() => {return  this.setState({isLoading: false})})
            .then(() =>  { resolve('done')})
            .catch((error)=> {this.setState({isLoading: false});
                                 reject(error)})
        })
        }

    async postLike(postID, userID){
        const data = {
            "postId" : postID,
            "userId" : userID
        }
        const response = await this.apiHandler.requestPost(data,this.serviceUrls.postLike);
        console.log("response for post",response);
        if(response.message == "You have liked this post"){
            this.setState({likedPosts: [...this.state.likedPosts, post.id]})
        }
    }

    async getCommunityDetails() {
        const communityData={
          "email": this.state.email,
          "userID": this.state.userId
        }
        const response = await this.apiHandler.requestPost(communityData,this.serviceUrls.getCommunities);
        if(response.data!=null && response.data.length>0){
            this.setState({
              universityName:response.data[0].universityName,
              universityId: response.data[0]._id,
              communityName: response.data[0].universityName,
              communityLogo : response.data[0].universityLogo
            });
          } else{
            this.setState({
              universityName:"",
              universityId: "",
              communityName: ""
            });
          }
          const universityDetsils =  {
            "_id":this.state.universityId,
            "universityName":this.state.universityName,
           }
           const data = await this.storagePrefs.setObjectValue("universityDetsils",universityDetsils);
    }

    getPosts = async () => {
        //const data = '5ed8d9509e623f00221761a1/All/true/5f5892a1b205b1387d5cafb/All'
        const data = this.state.universityId+'/All/'+this.state.isProfessional+"/"+this.state.userId+'/All'
        console.log("Posts Params",data)
        console.log("Post is getting called")
        const response = await this.apiHandler.requestGet(data,this.serviceUrls.getPosts);
        if(response.posts != null && response.posts.length != 0 ){
            this.setState({postData: response.posts});
        } else {
            this.setState({postData:[]})
        }
    }

    getUniversityImages = async () =>  {
        console.log("University Images is getting called")
        //const data =  '5ed8d9509e623f00221761a1';
        const data = this.state.userId;
        const response = await this.apiHandler.requestGet(data,this.serviceUrls.getUniversityImages);
        if(response.status == "No network Connected!"){
            this.setState({isInternet: true})
            alert('No network Connected!')
        } else{
            if(response.succsess  === true && response.data.length!=0) {
                this.setState({
                    playerCreatePost: response.data[0].playerCrtPost,
                    coachCreatePost: response.data[0].coachCrtPost
                })
            }

        }
        console.log("ravi200",this.state.playerCreatePost, this.state.coachCreatePost,response.data[0].playerCrtPost,response.data[0].coachCrtPost,response.succsess)
    }

    getUserProfile = async () => {
        console.log("userProfile is getting called");
        //const data = '5ee21f3f5583d00022351037';
        const data = this.state.userId;
        const response = await this.apiHandler.requestGet(data,this.serviceUrls.getUserProfile);
        if(response.status == "No network Connected!"){
            this.setState({isInternet: true})
            alert('No network Connected!')
        } else{
            
            if(response.message == 'User succesfully fetched') {
                this.setState({isProfessional: response.user.isProfessional})
            }
        }
    }
    flowerWings=(width)=>{
        const initialArr = [];
        for (var i = 0; i < 9; i++) {
            initialArr.push(i);
        }

        return (  
        <Svg 
            style={[
                // { alignItems: "center" },
                { width: width },
                { height: width },
           
              
                // {alignSelf:'center'}
            ]}
        >

            {initialArr.map((prop, key) => {
                var radius = width/4;
                var angle = 40 * prop;
                var x = radius * Math.sin(Math.PI * 2 * angle / 360);
                var y = radius * Math.cos(Math.PI * 2 * angle / 360);

                return (
                    <G key={key} >
                        <Circle  x={width/2}
                            y={width/2} r={radius} fillOpacity={0.15}
                            fill={'rgba(88, 196, 198, 1)'} cx={x} cy={y} />

                    </G>
                );
            })
            }
        </Svg>
        )
    }

    changetextColor=()=>{
        this.state.leadercolor !== 'green'
            ?(this.setState({leadercolor:'green'})):(this.setState({leadercolor:'black'}))
    }

    renderShareModal() {
        return(
            <Modal
                transparent={true}
                isVisible={this.state.share}
                onBackdropPress={() => this.setState({share:false})}
                onRequestClose={() => {
                    this.setState({share:false})
                }}  
            >
                    <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'50%',marginTop:660,width:'110%',marginLeft:-18}}>
                        
                    </View>
                    </Modal>
        )
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
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
                {this.renderLoader()}
                    <View style={[styles.header]}>
                    <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                    <Image source= {{uri : this.state.communityLogo!=null && this.state.communityLogo!="" ? this.state.communityLogo: 'https://www.careerquo.com/assets/images/18.png' }}
                            style={{marginLeft:25,height: 30,width: 30, borderRadius: 25}}
                    ></Image>
                    </TouchableOpacity>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600',color:'#1E1C24', marginLeft: '5%',width:170}}>{this.state.communityName}</Text>
                    <View style={{justifyContent:'flex-end',flexDirection:'row',flex:1}}>
                    <TouchableOpacity   
                    style = {{marginRight:'8%'}}
                    onPress={() => this.props.navigation.navigate('notificationscreen')}>
                    <Image source={ImagesWrapper.notificationNo}></Image>
                    </TouchableOpacity>
                
                    <TouchableOpacity 
                    style={{marginRight:'10%'}}
                    onPress={() => this.props.navigation.navigate('chatscreen')}
                    >
                    <Image source={ImagesWrapper.chatNo}
                    ></Image>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
                    <FlatList
                    data = {this.state.postData}
                    renderItem={({item})=> (
                        <View style = {{ marginLeft : 25}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,}}>
                            <View style={{flexDirection:'row',marginTop:'2%',}}>
                                <Image source={{uri : item.creator.profileImg !=null && item.creator.profileImg!="" ? item.creator.profileImg : "https://www.careerquo.com/assets/images/18.png"}}
                                    style = {{height: 30,width: 30, borderRadius: 25}}/> 
                                <Text style={[styles.post,{padding:-8,marginLeft:8,fontSize:16}]}>{item.creator.firstName} {item.creator.lastName}</Text>
                                <Text style={[styles.post,{padding:5,marginLeft:5,fontSize:12,color:'#868585',marginTop:-2}]}>
                                    {moment(item.createdAt).fromNow()}
                                </Text>
                            </View>
                            {item.creator._id == this.state.userId ?<TouchableOpacity onPress={()=> this.setState({dotsmemu:true})}>
                                    <Image source={ImagesWrapper.dotsmenu}
                                        style={{marginTop:13,marginRight:18}}
                                    />
                                </TouchableOpacity> : null }
                            
                            </View>
                            <Text style={{fontSize:14,fontWeight:'400',fontFamily:Fonts.mulishSemiBold,color:'#868585',marginRight:22,marginTop:12}}>
                                {item.content}
                            </Text>
                            {item.postImage !=null && item.postImage.length >0 ? 
                                <Image source = { {uri : item.postImage[0]} } 
                                style={{marginTop:15,width:'95%', borderRadius:5,height: 192,}}/> 
                                : null 
                            }
                            <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row'}}>
                                
                                    {item.likes.length > 3 || item.likes.length == 3 ? 
                                        <>
                                        <Image
                                            source={  item.likes[0] !=null && item.likes[0] != {}  && Object.keys(item.likes[0]).length != 0 ? 
                                            item.likes[0].profileImage.imageUrl !=null && item.likes[0].profileImage.imageUrl !=''? 
                                                {uri :item.likes[0].profileImage.imageUrl} : {uri : 'https://www.careerquo.com/assets/images/18.png'}
                                        : {uri : 'https://www.careerquo.com/assets/images/18.png'}}
                                                style={{ width: 16, height: 16 }} />
                                        <Image
                                        source={  item.likes[1] !=null && item.likes[1] != {}  && Object.keys(item.likes[1]).length != 0 ? 
                                        item.likes[1].profileImage.imageUrl !=null && item.likes[1].profileImage.imageUrl !=''? 
                                            {uri :item.likes[1].profileImage.imageUrl} : {uri : 'https://www.careerquo.com/assets/images/18.png'}
                                    : {uri : 'https://www.careerquo.com/assets/images/18.png'}}
                                            style={{ width: 16, height: 16, marginLeft: -4 }} />
                                        <Image
                                            source={  item.likes[2] !=null && item.likes[2] != {}  && Object.keys(item.likes[2]).length != 0 ? 
                                            item.likes[2].profileImage.imageUrl !=null && item.likes[2].profileImage.imageUrl !=''? 
                                                {uri :item.likes[2].profileImage.imageUrl} : {uri : 'https://www.careerquo.com/assets/images/18.png'}
                                        : {uri : 'https://www.careerquo.com/assets/images/18.png'}}
                                            style={{ width: 16, height: 16, marginLeft: -4 }} />
                                        </> 
                                    : item.likes.length  == 2 ? 
                                        <>
                                    <Image
                                        source={  item.likes[0] !=null && item.likes[0] != {}  && Object.keys(item.likes[0]).length != 0 ? 
                                            item.likes[0].profileImage.imageUrl !=null && item.likes[0].profileImage.imageUrl !=''? 
                                                {uri :item.likes[0].profileImage.imageUrl} : {uri : 'https://www.careerquo.com/assets/images/18.png'}
                                        : {uri : 'https://www.careerquo.com/assets/images/18.png'}}
                                            style={{ width: 16, height: 16 }} />
                                            <Image
                                        source={  item.likes[1] !=null && item.likes[1] != {}  && Object.keys(item.likes[1]).length != 0 ? 
                                            item.likes[1].profileImage.imageUrl !=null && item.likes[1].profileImage.imageUrl !=''? 
                                                {uri :item.likes[1].profileImage.imageUrl} : {uri : 'https://www.careerquo.com/assets/images/18.png'}
                                        : {uri : 'https://www.careerquo.com/assets/images/18.png'}}
                                                style={{ width: 16, height: 16, marginLeft: -4 }} />
                                        </> 
                                    : item.likes.length == 1 ? 
                                        <Image
                                        source={  item.likes[0] !=null && item.likes[0] != {}  && Object.keys(item.likes[0]).length != 0 ? 
                                            item.likes[0].profileImage.imageUrl !=null && item.likes[0].profileImage.imageUrl !=''? 
                                                {uri :item.likes[0].profileImage.imageUrl} : {uri : 'https://www.careerquo.com/assets/images/18.png'}
                                        : {uri : 'https://www.careerquo.com/assets/images/18.png'}}
                                            style = {{width: 16, height: 16,}}
                                        />
                                : null}
                                    <Text style={{fontSize:12,color:'#868585',fontFamily:Fonts.mulishBold,fontWeight:'400',marginLeft:5,marginTop:2}}>Like by</Text>
                                    <Text style={{fontSize:12,color:'#1E1C24',fontFamily:Fonts.mulishBold,fontWeight:'400',marginLeft:5,marginTop:2}}>
                                        {item.likes[0].firstName} {item.likes[0].lastName} {item.likes.length >1 ? "and": null } {item.likes.length >1 ? item.likes.length-1 : null } {item.likes.length >1 ? "others" : null}
                                    </Text>
                                </View>
                                <Text style={{fontSize:12,color:'#868585',fontFamily:Fonts.mulishBold,fontWeight:'400',marginLeft:5,marginTop:2,marginRight:22}}>{item.comments.length } {item.comments.length > 1 ? "comments" : "comment"}</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
                            <View style={{flexDirection:'row',marginTop:20}}>
                                <TouchableOpacity
                                onPress ={()=> {
                                this.postLike(item._id,this.state.userId)
                                }}>
                                    <View style = {{flexDirection:'row'}}>
                                        <Image
                                            source={ImagesWrapper.likeimg}
                                        />
                                        <Text style={{color:this.state.likedPosts.indexOf(item.id) > -1 ?  '#58C4C6' :'#868585' ,fontSize:14,marginTop:3,fontFamily:Fonts.mulishRegular,fontWeight:'600'}}>Like</Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                onPress={() => {
                                    this.props.navigation.navigate('CommentScreen',{
                                        content:item.content,
                                        postID: item._id,
                                        creatorImg : "https://www.careerquo.com/assets/images/18.png",
                                        firstName : item.creator.firstName,
                                        lastName: item.creator.lastName,
                                        postCreatedAt: item.createdAt,
                                        comments: item.comments
                                    })

                                }}>
                                <View style={{marginLeft:75,marginRight:75,flexDirection:'row'}}>
                                    <Image
                                        source={ImagesWrapper.commentimg}
                                    />
                                    <Text style={{color:'#868585',fontSize:14,marginTop:3,fontFamily:Fonts.mulishRegular,fontWeight:'600'}}>Comment</Text> 
                                </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress = {() => {
                                    // this.customShare()
                                }} >
                                <View style={{flexDirection:'row'}}>
                                <Image
                                    source={ImagesWrapper.shareimg}
                                />
                                <Text style={{color:'#868585',fontSize:14,marginTop:3,fontFamily:Fonts.mulishRegular,fontWeight:'600'}}>Share</Text>
                                </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
                        </View>
                    )}/>
                    {(this.state.isProfessional == true && this.state.coachCreatePost == true) || 
                    (this.state.isProfessional ==  false && this.state.playerCreatePost == true) ? 
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                
                    <TouchableOpacity activeOpacity={0.5} style={styles.toucahbleOpacity}

                    onPress={() => this.props.navigation.navigate('CreatePostScreen')}
                    >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                        source={ImagesWrapper.plus}
                            style={{ height: 60,
                                width: 60,}}
                        />
                    </View>
                    </TouchableOpacity>
                    </View> : 
                    null}
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
                    onBackdropPress={() => this.setState({tapstate:false})}
                        onRequestClose={() => {
                            this.setState({tapstate:false})
                        }}
                    
                >
                    <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'60%',marginTop:550,width:'110%',marginLeft:-20}}>
                        <Text style={{fontSize:14,marginTop:30,marginLeft:30,marginRight:30,fontFamily:Fonts.mulishSemiBold,color:'#1E1C24'}}>Can you think of someone who has an amazing story that the world needs to hear?
                            Tap them and encourage them to tell a story.</Text>
                        <Text style={{color:'#868585',fontSize:16,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',marginLeft:30,marginTop:15}}>Their email address</Text>
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
                                maxLength={63}
                                // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                blurOnSubmit={false}
                            />
                            <View style={styles.underline}/>
                            <Text style={{color:'#868585',fontSize:16,fontFamily:Fonts.mulishSemiBold,fontWeight:'400',marginLeft:30,marginTop:15}}>Your message to them</Text>
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
                            <View style={styles.underline}/>
                            <View style={{marginBottom:20,marginTop:20}}>
                        <TouchableOpacity
                                        onPress={() => {
                                            // props.navigation.navigate('profilesuccess')
                                            // alert('length'+addCard[0].id)
                                        }}
                                    
                                    >
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradientButton]}>
                                            <Text style={[styles.buttonText, { color:'#FFFFFF' }]}>
                                            Tap someone
                                </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                    :
                    null
                    }

                    {this.state.dotsmemu === true ?
                    <Modal
                    transparent={true}
                    isVisible={this.state.dotsmemu}
                    onBackdropPress={() => this.setState({dotsmemu:false})}
                        onRequestClose={() => {
                            this.setState({dotsmemu:false})
                        }}
                    
                >
                    <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'20%',marginTop:660,width:'110%',marginLeft:-18}}>
                        <View style={{margin:25}}>
                            <View style={{flexDirection:'row'}}>
                                <Image
                                    source={ImagesWrapper.pencil}
                                    
                                />
                                <Text style={[styles.post,{padding:0,paddingLeft:10}]}>Edit post</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:20}}>
                                <Image
                                    source={ImagesWrapper.trash}
                                    
                                />
                                <Text style={[styles.post,{padding:0,paddingLeft:10}]}>Delete post</Text>
                            </View>
                        </View>
                    </View>
                    </Modal>
                    :
                    null
            }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft: '9%',
         marginTop: Platform.OS == 'ios'? 0 : 25,
        marginBottom: 25,
        // borderBottomWidth:1
      },
    subheader:{
        flexDirection:'row',
        height:45,
        width:130,
        backgroundColor:'#F1F1F1',
        marginTop:22,
       
        marginLeft:'9%',
        justifyContent:'center',
        borderRadius:3
        // flex:1
    },
    post:{
        fontSize:14,
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding:10,
        // marginLeft:10
    },
    leadership:{
        textAlign:'center',
        width:'auto',
        height:45,
        borderWidth:1.5,
        borderColor:'#F1F1F1',
        borderRadius:20,
        marginTop:22,
        marginLeft:15
        
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // marginBottom:20
    },
    linearGradientButton: {
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        // marginLeft: 42,
        // height: 48,
        // marginRight: 42
        width: '85%',
        // height:'7%',
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        marginLeft: 30,
        height: 50,
        marginRight: 30,
        // lineHeight:400
    },
    toucahbleOpacity: {
        right: 28,
        bottom: 28,
        position: 'absolute',
        // borderWidth: 1,
       
        // borderRadius: 25,
        // backgroundColor: '#58C4C6',
        // borderColor: '#58C4C6'
      },
      modelstyle:{
        width:'110%',
        height:'50%',
        marginLeft:-18,
        backgroundColor:'#FFFFFF',
        justifyContent:'flex-end',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        // marginTop:500
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:30,
        marginTop:Platform.OS==='ios' ? null:'-3%',
        marginRight:23
    },
      
    textinput:{
        // marginTop:-2,
        marginLeft:30,
        height:Platform.OS==='ios' ? 30:30,
        fontFamily:Fonts.mulishSemiBold,
        fontSize:14,
        color:'#1E1C24',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily:Fonts.mulishRegular,
        color:'#000',
        fontSize: 20,
        marginTop: 10
      }    
   
   
   
})



export default MeetingsScreen;


