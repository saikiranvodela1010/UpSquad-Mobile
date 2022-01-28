import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,SafeAreaView,Image,TextInput,DeviceEventEmitter} from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
import ServiceUrls from '../network/ServiceUrls';
import APIHandler from '../network/NetWorkOperations';
import ImagePickerCropper from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import StoragePrefs from '../res/StoragePrefs';
import LinearGradient from 'react-native-linear-gradient'

export default class SelfIntroductionVideoScreen extends React.Component {


    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();


    constructor(props) {
        super(props);
        this.state ={
            caption:'',
            userId:'',
            introductionVideo:[],
        }
    }

    async componentDidMount(){
        // console.log('userDetails----',userDetails);
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        console.log('userDetails',userDetails);
        this.setState({userId:userDetails.userId});
    }
    async componentDidUpdate() {
        // console.log('userDetails----',userDetails);
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        // console.log('userDetails',userDetails);
        this.setState({userId:userDetails.userId});
    }



     selectingVideo(){
        ImagePickerCropper.openPicker({
            mediaType: "video",
          }).then((video) => {
            console.log('video',video);
            RNFS.readFile(video.path, 'base64')
            .then((res) => {
             // console.log('result',res);
             this.galleryVideoApi(res);
             
             // if(response.status == "No network Connected!"){
             //     this.setState({isLoading: false, isInternet: true})
             //     alert('No network Connected!')
             // }
            });
            // this.compressVideo(video);
        //    const result= RNCompress.compressVideo(video.path, "medium")
        //    console.log('result',result);
          });
    }
//    async compressVideo(video){
//         const result = await Video.compress(
//             video.path,
//              {compressionMethod: 'auto',
//              minimumFileSizeForCompress:30,
//              },
//              (progress) => {
//                  console.log('progress',progress);
//                if (backgroundMode) {
//                  console.log('Compression Progress: ', progress);
//                } else {
//                  setCompressingProgress(progress);
//                  console.log(' setCompressingProgress ', progress);

//                }
//              }
//            );
//            console.log('result',result);
//     }

  async  cameraVideo(){
    ImagePickerCropper.openCamera({
        mediaType: 'video',
      }).then(cameraVideo => {
        console.log("cameraVideo",cameraVideo.path);
        RNFS.readFile(cameraVideo.path, 'base64')
            .then(async(res) => {
             console.log('cameraVideo64',res);
             const data = {
                "userId":this.state.userId,
                "fileObj": {
                    "base64Obj":res,
                    "fileType":"video/mp4",
                    "fileName":this.state.caption,
                }
            }
            console.log("cameradata",data);
            // const response = await this.apiHandler.requestPost(data,this.serviceUrls.selfIntroduction)
            // console.log('response',response.data)
            });
      });
    }

   async galleryVideoApi(path){
       console.log('galleryVideoApi')
       const filename = path.split("/");
       console.log('filename',typeof filename)
    const data = {
        "userId":this.state.userId,
        "fileObj": {
            "base64Obj":path,
            "fileType":"video/mp4",
            "fileName":this.state.caption,
        }
    }
    const response = await this.apiHandler.requestPost(data,this.serviceUrls.selfIntroduction)
    console.log('response',response.data)
    this.setState({introductionVideo:response.data});
   }


   async cameraVideoApi(path){
    console.log('cameraVideoApi')
    // const filename = path.split("/");
    // console.log('filename',typeof filename)
 const data = {
     "userId":this.state.userId,
     "fileObj": {
         "base64Obj":path,
         "fileType":"video/mp4",
         "fileName":"camera",
     }
 }
 console.log("cameradata",data);
 const response = await this.apiHandler.requestPost(data,this.serviceUrls.selfIntroduction)
 console.log('response',response.data)

}

    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                      // this.props.navigation.openDrawer();
                      
                      this.props.navigation.navigate('playersDetail'
                          // back:this.state.back,
                          );
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                            // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Self Intrduction</Text>
                   

                </View>
                <View style={styles.underline}></View>
                <Text style={styles.account}>Choose a video</Text>
                <View style={{flexDirection:'row',marginLeft:'8%',marginTop:'5%'}}>
                <TouchableOpacity onPress={()=>{this.cameraVideo()}}>
                <Image source={ImagesWrapper.camera}/>
                </TouchableOpacity>
               <TouchableOpacity onPress={()=>{this.selectingVideo()}}>
                <Image source={ImagesWrapper.gallery} style={{marginLeft:'20%'}}/>
                </TouchableOpacity>
                </View>
                <View style={[styles.underline,{width:'82%',marginLeft:'auto',marginRight:'auto',marginTop:'5%'}]}></View>
                <Text style={styles.biofirst}>Caption</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(Caption) => {
                            
                            this.setState({caption:Caption});
                           
                        }}
                      
                        value={this.state.caption}
                        maxLength={63}
                        
                    />
                    <View style={[styles.underline,{width:'82%',marginLeft:'auto',marginRight:'auto',marginTop:'0%'}]}></View>
                    <View style={{ marginTop: '15%', marginBottom: '10%' ,justifyContent:'flex-end',flex:1}}>
                <TouchableOpacity
                    onPress={() => {
                        DeviceEventEmitter.emit("videoSelected");
                        this.props.navigation.navigate('playersDetail')
                        // onSubmit();
                    }}

                >
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '8%' }]}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
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
        marginBottom: 10,
        flexDirection:'row',
        marginLeft:-10
        // borderBottomWidth:1
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        width:'100%',
        marginTop:15
    },
    memphistalk:{ 
        fontSize: 20,
         fontFamily: Fonts.mulishSemiBold,
          fontWeight: '600',
          color:'#1E1C24',
           marginLeft: '5%'
    },
    account:{
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
         fontWeight: '600',
         color:'#1E1C24',
          marginLeft: '8%',
          marginTop:30
    },
    biofirst:{
        fontSize:16,
        fontWeight:'400',
        // color:'#959494',
        marginTop:'5%',
        marginLeft:'8%',
        fontFamily:Fonts.mulishRegular,
        color:'#868585'
    },
    textinput:{
        marginTop:-2,
        marginLeft:'8%',
        height:Platform.OS==='ios' ? 30:40,
        fontFamily:Fonts.mulishSemiBold,
        fontSize:16,
        color:'#1E1C24',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // marginBottom:20
    },
    linearGradient: {
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
        height: 55,
        marginRight: 30,
        // lineHeight:400
    },
});