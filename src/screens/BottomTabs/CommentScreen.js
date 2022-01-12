import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity, Image,TextInput,SafeAreaView,Platform,FlatList, ScrollView, DeviceEventEmitter} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import moment from 'moment';
import StoragePrefs from '../../res/StoragePrefs';
export default class CommentScreen extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();
    constructor(props){
        super(props);
       
        this.state = {
            content : "",
            creatorImg: "",
            firstName :"",
            lastName:"",
            postCreatedAt: "",
            comments:[],
            postId: "",
            userId : "",
            CommentsContent: ""
        }
       
    }

    async componentDidMount() {
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        const content = this.props.route.params.content;
        const postID = this.props.route.params.postID;
        const data = postID
        const response = await this.apiHandler.requestGet(data,this.serviceUrls.getPost);
        const creatorImg = this.props.route.params.creatorImg
        const firstName = this.props.route.params.firstName;
        const lastName = this.props.route.params.lastName;
        const postCreatedAt = this.props.route.params.postCreatedAt;
        const comment = response.post.comments;
        const postId = response.post._id;
        //const userID = "6138c38d4cfd1f6ccac4af0d"
        const userID = userDetails.userId

        this.setState({
            content : content,
            creatorImg : creatorImg,
            firstName : firstName,
            lastName: lastName,
            postCreatedAt: postCreatedAt,
            comments: comment,
            postId : postId,
            userId : userID
        })
        DeviceEventEmitter.addListener("UpdateComments",this.updateComments)
    }

    componentWillUnmount(){
        DeviceEventEmitter.removeListener("UpdateComments");
    }

    

     sendComment = async ()=>{
        const data = {
            "content": this.state.CommentsContent,
            "userId": this.state.userId,
            "isAuth": true
        }
        const postId = this.state.postId;
        const response = await this.apiHandler.requestPost(data,this.serviceUrls.postComment,postId);
        if(response.message == "Comment successfully added" ){
            this.setState({CommentsContent: ""})
            DeviceEventEmitter.emit("UpdateComments")
        }
    }

    updateComments = async () => {
        const content = this.props.route.params.content;
        const postID = this.props.route.params.postID;
        const data = postID
        const response = await this.apiHandler.requestGet(data,this.serviceUrls.getPost);
        const comment = response.post.comments;
        this.setState({
            comments: comment,
        })
    }

    renderHeader = ()=> {
        return(
            <SafeAreaView style = {{ flexDirection : 'column'}}>
                <View style={{ flexDirection : 'row',alignContent: 'center',backgroundColor:'#FFFFFF'}}>
                  <TouchableOpacity onPress={()=> this.props.navigation.goBack(null)}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 6,
                            marginLeft: 20,
                            tintColor: '#000000',
                        }}
                    />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: "600" ,color:'#1E1C24',lineHeight:25.1,marginLeft: '5%',marginTop: '1%' }}>Post Comments</Text>
                    
            </View>
            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
            </SafeAreaView>
        )
    }
    render(){
        return(
            
        <SafeAreaView style = {{backgroundColor : '#FFFFFF',flex: 1}}>
            {this.renderHeader()}
            <View style={{flexDirection:'row',marginTop:30,marginLeft:24,}}>
                <Image source={{uri : this.state.creatorImg}}
                style = {{width: 24, height: 24}}/> 
                <Text style = {styles.name}>{this.state.firstName} {this.state.lastName}</Text>
                <Text style  = {styles.createdAT}>{moment(this.state.postCreatedAt).fromNow()}</Text>
            </View>
            
            <Text style={styles.content}>{this.state.content}</Text>
            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
            <View style = {{flexDirection: 'column', marginLeft: 24}}>
                <View style = {{flexDirection:'row',alignContent: 'center'}}>
                    <View style = {{borderRadius: 20, borderWidth : 1,width :330 ,height :40,borderColor: "#F1F1F1",marginTop:27,justifyContent: 'center',}}>
                        <TextInput style = {{marginLeft:24,flex :0.65}}
                            placeholder="Add Comment"
                            placeholderTextColor= '#868585'
                            placeholderStyle= {{fontFamily: Fonts.mulishSemiBold,fontWeight:400,fontSize:14,paddingBottom: 100}}
                            multiline = {true}
                            onChangeText={(text) => {this.setState({CommentsContent: text})}}
                            value={this.state.CommentsContent}
                        />
                        
                    </View>
                    <TouchableOpacity 
                    onPress={()=> {this.sendComment()}}>
                    <Image source={ImagesWrapper.sendimage}
                        style = {{marginTop: 27,marginLeft: 8,marginRight:24,width: 39.97, height: 39.97}}
                    />
                    </TouchableOpacity>
                </View>
                <Text style={styles.comment}>{this.state.comments.length > 1 || this.state.comments.length == 0 ? this.state.comments.length + " comments" : this.state.comments.length + " comment"}</Text>
                <View>
                    {this.state.comments.length == 0 ? 
                        <Text style = {{justifyContent: 'center'}}></Text>: 
                        <FlatList
                            data = {this.state.comments}
                            inverted={true}
                                renderItem={({item})=> (
                                    <View>
                                    <View style = {{marginTop:16, marginLeft :10, flexDirection: 'row'}}>
                                        <Image source={{uri : this.state.creatorImg}}
                                               style = {{width: 24, height: 24}}
                                        /> 
                                        <Text style = {styles.commenterName}>{item.user.firstName} {item.user.lastName}</Text>
                                        {/* <Text style  = {styles.commentCreatedAT}>{this.state.postCreatedAt}</Text>  */}
                                        <Text style  = {styles.commentCreatedAT}>{moment(item.createdAt).fromNow()}</Text>
                                    </View>
                                    {/* <Text style = {{marginTop:16, marginLeft :10}} >Hellp</Text> */}
                                    <Text style = {styles.commentContent}>{item.content}</Text>
                                    </View>
                                )}
                        />
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
        // paddingLeft: '9%',
        marginTop: Platform.OS == 'ios'? 0 : 25,
        marginBottom: 25,
        fontFamily: Fonts.mulishSemiBold,
        // borderBottomWidth:1
      },
      writeText: {
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 14,
        fontWeight: '600',
        marginStart: 24

    },
    post:{
        fontSize:14,
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding:10,
        // marginLeft:10
    },
    comment:{
        fontSize:14,
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding:10,
        marginTop: 30
    },
    name: {
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding: 2,
        marginLeft:8,
        fontSize:16
        
    },
    createdAT: {
        color:'#B1AAAA',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding:15,
        marginLeft:5,
        fontSize:12,
        marginTop : -10

    },
    content : {
        fontSize:14,
        fontWeight:'400',
        fontFamily:Fonts.mulishSemiBold,
        color:'#868585',
        marginLeft:24,
        marginRight:22, 
        marginTop: 20
    },
    commenterName: {
        color:'#000000',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        padding: 2,
        marginLeft:8,
        fontSize:14,
        lineHeight: 17.57
    },
    commentCreatedAT: {
        color:'#B1AAAA',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'400',
        padding:15,
        marginLeft:5,
        fontSize:12,
        marginTop : -10,
        lineHeight:15.06
    },
    commentContent : {
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'400',
        fontSize:14,
        lineHeight:17.57,
        color:'#868585',
        marginTop:5,
        marginLeft :10
    }
})

