import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity, Image,TextInput,SafeAreaView,Platform,FlatList, ScrollView, DeviceEventEmitter,Modal,ActivityIndicator} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import moment from 'moment';
import StoragePrefs from '../../res/StoragePrefs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            CommentsContent: "",
            isLoading: false,
            isCommentLoading: false,
        }
       
    }

    async componentDidMount() {
        this.setState({isLoading: true})
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        const content = this.props.route.params.content;
        const postID = this.props.route.params.postID;
        const creatorImg = this.props.route.params.creatorImg
        const firstName = this.props.route.params.firstName;
        const lastName = this.props.route.params.lastName;
        const postCreatedAt = this.props.route.params.postCreatedAt;
        const data = postID
        const response = await this.apiHandler.requestGet(data,this.serviceUrls.getPost);
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
        this.setState({isLoading: false})
        this.subscription = DeviceEventEmitter.addListener("UpdateComments",this.updateComments)
        
    }

    componentWillUnmount(){
        if(this.subscription){
            this.subscription.remove()
        }
        
    }

    

     sendComment = async ()=>{
        this.setState({isCommentLoading: true})
        if(this.state.CommentsContent!=""){
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
        } else{
            this.setState({isCommentLoading: false})
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
            isLoading: false,
            isCommentLoading: false
        })
    }

    renderHeader = ()=> {
        return(
            <SafeAreaView style = {{ flexDirection : 'column'}}>
                <View style={{ flexDirection : 'row',alignContent: 'center',backgroundColor:'#FFFFFF',alignItems: 'center', justifyContent:  'flex-start',marginTop: '3%'}}>
                  <TouchableOpacity onPress={()=> this.props.navigation.pop()}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 6,
                            marginLeft: 20,
                            tintColor: '#000000',
                        }}
                    />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: "600" ,color:'#1E1C24',lineHeight:25.1,marginLeft: '5%',marginTop: '1%' }}>Post Comments</Text>
                    
            </View>
            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
            </SafeAreaView>
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

    renderCommentLoader(){
        return(
            <Modal transparent={true}
                visible={this.state.isCommentLoading}>
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
            
        <SafeAreaView style = {{backgroundColor : '#FFFFFF',flex: 1}}>
            <ScrollView>
            {this.renderHeader()}
            {this.renderLoader()}
            {this.renderCommentLoader()}
            {this.state.isLoading==false ? 
            <View style={{flexDirection:'row',marginTop:30,marginLeft:24,}}>
                <Image source={{uri : this.state.creatorImg}}
                style = {{height: 30,width: 30, borderRadius: 25}}/> 
                <Text style = {styles.name}>{this.state.firstName} {this.state.lastName}</Text>
                <Text style  = {styles.createdAT}>{moment(this.state.postCreatedAt).fromNow() == 'Invalid date' ? null  : moment(this.state.postCreatedAt).fromNow()}</Text>
            </View> : null }
            {this.state.isLoading==false ? 
            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}/> : null}
            {this.state.isLoading==false  ? 
            <View style = {{flexDirection:'row',alignContent: 'center'}}>
                    <View style = {{borderRadius: 20,borderWidth : 3,width :'70%' ,height : 50,borderColor: "#F1F1F1",marginTop:27,marginLeft:24,justifyContent: 'center',color:'#F1F1F1'}}>
                        <TextInput style = {{marginLeft: 10}}
                            placeholder="Add Comment"
                            placeholderTextColor= '#868585'
                            placeholderStyle= {{fontFamily: Fonts.mulishRegular,fontWeight:400,fontSize:14}}
                            value={this.state.CommentsContent}
                            onChangeText = {text => this.setState({CommentsContent:text })}
                            //multiline = {true}
                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                            returnKeyType='done'
                        />
                    </View>
                    
                        <Icon name="send-circle" size={60} color="#58C4C6" backgroundColor= "#fff" style = {{marginTop: 20}}
                        onPress={()=>
                        this.sendComment()}/>
                    
                </View>:null}
                
                {this.state.isLoading==false  ? <Text style={styles.comment}>{this.state.comments.length > 1 || this.state.comments.length == 0 ? this.state.comments.length + " comments" : this.state.comments.length + " comment"}</Text>:null}
                <View style = {{ marginLeft: 24}}>
                    {this.state.comments.length != 0 ? 
                        <FlatList
                            data = {this.state.comments}
                            inverted={true}
                                renderItem={({item})=> (
                                    <View>
                                    <View style = {{marginTop:16, marginLeft :10, flexDirection: 'row'}}>
                                        <Image source={{uri : "https://www.careerquo.com/assets/images/18.png"}}
                                        style = {{width: 24, height: 24,borderRadius:10}}
                                        />
                                        {item.user!=null && item.user!={}?  <Text style = {styles.commenterName}>{item.user.firstName} {item.user.lastName}</Text>: null}
                                        <Text style  = {styles.commentCreatedAT}>{moment(item.createdAt).fromNow()}</Text>
                                    </View>
                                    <Text style = {styles.commentContent}>{item.content}</Text>
                                    </View>
                                )}
                        />:null}
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
        // paddingLeft: '9%',
        marginTop: Platform.OS == 'ios'? 0 : 25,
        marginBottom: 25,
        fontFamily: Fonts.mulishRegular,
        // borderBottomWidth:1
      },
      writeText: {
        fontFamily: Fonts.mulishRegular,
        fontSize: 14,
        fontWeight: '600',
        marginStart: 24

    },
    post:{
        fontSize:14,
        color:'#1E1C24',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'600',
        padding:10,
        // marginLeft:10
    },
    comment:{
        fontSize:14,
        color:'#1E1C24',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'600',
        padding:10,
        marginTop: 30,
        marginLeft: 24,
    },
    name: {
        color:'#1E1C24',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'600',
        padding: 2,
        marginLeft:8,
        fontSize:16
        
    },
    createdAT: {
        color:'#B1AAAA',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'600',
        padding:15,
        marginLeft:5,
        fontSize:12,
        marginTop : -10

    },
    content : {
        fontSize:14,
        fontWeight:'400',
        fontFamily:Fonts.mulishRegular,
        color:'#868585',
        marginLeft:24,
        marginRight:22, 
        marginTop: 20
    },
    commenterName: {
        color:'#000000',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'600',
        padding: 2,
        marginLeft:8,
        fontSize:14,
        lineHeight: 17.57
    },
    commentCreatedAT: {
        color:'#B1AAAA',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'400',
        padding:15,
        marginLeft:5,
        fontSize:12,
        marginTop : -10,
        lineHeight:15.06
    },
    commentContent : {
        fontFamily:Fonts.mulishRegular,
        fontWeight:'400',
        fontSize:14,
        lineHeight:17.57,
        color:'#868585',
        marginTop:5,
        marginLeft :10
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

