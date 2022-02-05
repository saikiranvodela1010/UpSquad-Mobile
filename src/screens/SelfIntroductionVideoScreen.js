import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput, DeviceEventEmitter, ActivityIndicator } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
import ServiceUrls from '../network/ServiceUrls';
import APIHandler from '../network/NetWorkOperations';
import ImagePickerCropper from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import StoragePrefs from '../res/StoragePrefs';
import LinearGradient from 'react-native-linear-gradient';
import RNVideoHelper from 'react-native-video-helper';
import { stat } from 'react-native-fs';
// import Video from "react-native-video";
import Share from 'react-native-share';
import RNThumbnail from 'react-native-thumbnail';
import { Video, getVideoMetaData, getRealPath } from 'react-native-compressor';
import axios from 'axios';
import Modal from 'react-native-modal';
export default class SelfIntroductionVideoScreen extends React.Component {

    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();


    constructor(props) {
        super(props);
        this.state = {
            caption: '',
            userId: '',
            introductionVideo: [],
            compressedVideoPath: '/data/user/0/com.upsquard/cache/e103736c-1b50-4aa3-864a-5def001a5871.mp4',
            compressedTimes: 0,
            selectedVideoPath: '',
            bearerToken: '',
            selectedVideoThumbail: '',
            selectedVideoSizeBeforeCompression: 0,
            isLoading: false,
        }
    }

    async componentDidMount() {
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        console.log('userDetails', userDetails);
        this.setState({ userId: userDetails.userId });
        this.setState({ bearerToken: userDetails.token })


    }

c
    async componentDidUpdate() {
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        this.setState({ userId: userDetails.userId });
    }



    selectingVideo() {
        ImagePickerCropper.openPicker({
            mediaType: "video",
        }).then((video) => {
            console.log('video', video);

            console.log("GALLERY_VideoPath", video.path);
            console.log("GALLERY_VIDEO_DURATION", video.duration);
            console.log("GALLERY_VIDEO_FILE_SIZE_INBYTES", video.size);
            console.log("GALLERY_VIDEO_FILE_SIZE_BEFORECOMPRSSION", video.size / Math.pow(10, 6));



            let galleryVideoSizeBeforeCompression = video.size / Math.pow(10, 6);
            //Checking if our video duration is greaterthan 3 minutes
            if (video.duration > 180000) {
                alert("Please select video of lessthan 3 minutes")
            } else {
                this.state.selectedVideoPath = video.path;
                this.gettingThumbnailForSelectedVideo(video.path);
                this.state.selectedVideoSizeBeforeCompression = galleryVideoSizeBeforeCompression;
                // if (galleryVideoSizeBeforeCompression > 30) {
                //     alert("you have to do compression")
                //     this.state.compressedTimes = 0;
                //     this.compressingWithNewTechnique(video.path)
                //     // this.compressingVideo(video.path, 'high')
                // } else {
                //     ///No need of compression.....
                //     alert("u can directly upload without compression")
                //     this.uploadingVideosToServer(video.path)

                // }

            }








            // RNFS.readFile(video.path, 'base64')
            //     .then((res) => {
            //         // console.log('result',res);
            //         this.galleryVideoApi(res);

            //         // if(response.status == "No network Connected!"){
            //         //     this.setState({isLoading: false, isInternet: true})
            //         //     alert('No network Connected!')
            //         // }
            //     });
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

    async cameraVideo() {
        ImagePickerCropper.openCamera({
            mediaType: 'video'

        }).then(cameraVideo => {
            console.log("cameraVideo", cameraVideo.path);
            console.log("CAMERA_VIDEO_DURATION", cameraVideo.duration);
            console.log("CAMERA_VIDEO_FILE_SIZE_INBYTES", cameraVideo.size);
            console.log("CAMERA_VIDEO_FILE_SIZE_BEFORECOMPRSSION", cameraVideo.size / Math.pow(10, 6));

            let videoSizeBeforeCompression = cameraVideo.size / Math.pow(10, 6);

            //Checking if our video duration is greaterthan 3 minutes
            if (cameraVideo.duration > 180000) {
                alert("Please select video with less than 3 minutes duration")
            } else {
                this.gettingThumbnailForSelectedVideo(cameraVideo.path)
                this.state.selectedVideoPath = cameraVideo.path;



                this.state.selectedVideoSizeBeforeCompression = videoSizeBeforeCompression;
                // if (videoSizeBeforeCompression > 30) {
                //     this.state.compressedTimes = 0;
                //     // this.compressingVideo(cameraVideo.path, 'high')
                //     this.compressingWithNewTechnique(cameraVideo.path)
                // } else {
                //     alert("Your file size is less than 30 mb")
                //     //Directly upload to server without compressing.
                //     this.uploadingVideosToServer(cameraVideo.path)
                // }
            }

        });
    }



    gettingThumbnailForSelectedVideo(videoPath) {
        RNThumbnail.get(videoPath).then(result => {
            console.log("THUMBNAIL_PATH", result.path)
            this.state.selectedVideoThumbail = result.path;
        });
    }



    compressingVideo(videoPath, qualityLevel) {


        console.log("COMPRESSOR_WITH_", qualityLevel);


        RNVideoHelper.compress(videoPath, {
            // startTime: 0, // optional, in seconds, defaults to 0
            // endTime: 180, //  optional, in seconds, defaults to video duration
            quality: qualityLevel, // default low, can be medium or high
            defaultOrientation: 0 // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
        }).progress(value => {
            console.warn('progress', value); // Int with progress value from 0 to 1
        }).then(compressedUri => {
            console.warn('compressedUri', compressedUri); // String with path to temporary compressed video
            // this.setState({ compressedVideoPath: compressedUri })
            ///Getting file size from CompressedUri.............
            stat(compressedUri).then(response => {
                //    console.log('file size: ' + response.size);

                let videoSizeAfterCompression = response.size / Math.pow(10, 6);
                console.log("VIDEO_FILE_SIZE_AFTER_COMPRSSION", videoSizeAfterCompression);

                if (videoSizeAfterCompression > 30) {
                    this.state.compressedTimes++;
                    if (this.state.compressedTimes === 1) {
                        this.compressingVideo(this.state.selectedVideoPath, 'medium')
                    } else if (this.state.compressedTimes === 2) {
                        this.compressingVideo(this.state.selectedVideoPath, 'low')
                    } else {
                        alert("Cant able to upload this video as its size is greater than 30mb")
                    }



                } else {
                    console.log("COMPRESSED_VIDEONAME", response.name)
                    this.setState({ compressedVideoPath: compressedUri })
                    ////uploadNow To server

                    //  this.uploadingVideosToServer(compressedUri);;
                }


            });

        });










        // const result = await Video.compress(
        //     videoPath,
        //     {
        //         compressionMethod: 'auto',
        //     },
        //     (progress) => {
        //         console.log('Compression Progress: ', progress);
        //         //   if (backgroundMode) {
        //         //     console.log('Compression Progress: ', progress);
        //         //   } else {
        //         //     setCompressingProgress(progress);
        //         //   }
        //     }
        // );
    }



    onClickSubmitButton() {


        if (this.state.selectedVideoPath == '') {
            alert("Please take a video to upload")
            return;
        }


        if (this.state.caption == '') {
            alert("Please enter a caption for video")
            return;
        }

        this.setState({
            isLoading: true,
        });
        if (this.state.selectedVideoSizeBeforeCompression > 30) {

            this.compressingWithNewTechnique(this.state.selectedVideoPath)
        } else {
            console.log("DIRECTLY UPLOADING WITHOUT COMPRESSING", this.state.selectedVideoPath)
            this.uploadingVideosToServer(this.state.selectedVideoPath)
        }


    }









    async compressingWithNewTechnique(path) {

        // const metaData = await getVideoMetaData(path);
        console.log("COMPRESSING",)
        await Video.compress(
            path,
            {
                compressionMethod: 'auto',
            },
            (progress) => {
                console.log('Compression Progress: ', progress);
                // if (backgroundMode) {
                //     console.log('Compression Progress: ', progress);
                // } else {
                // setCompressingProgress(progress);
                //   }
            }
        ).then(result => {
            console.log("COMPRESSED_PATH", result)
            // const realPath = await getRealPath(result, 'video');
            // console.log("REAL_PATH", realPath)

            stat(result).then(response => {
                let videoSizeAfterCompression = response.size / Math.pow(10, 6);
                console.log("VIDEO_FILE_SIZE_AFTER_COMPRSSION", videoSizeAfterCompression);
                if (videoSizeAfterCompression < 30) {
                    this.uploadingVideosToServer(result)
                } else {
                    alert("Please select a video having less than 30 mb size")
                    this.setState({
                        isLoading: true,
                    });
                }


            });


            // const metaData = await getVideoMetaData(result);
            // console.log("COMPRESSED_PATH_DETAILS",metaData)

        })
            .catch(e => {
                console.log("EXCEPTION", e)
                this.setState({
                    isLoading: true,
                });
            });


    }




















    async uploadingVideosToServer(finalVideoPath) {
        // RNThumbnail.get(finalVideoPath).then(async (result) => {

        if (finalVideoPath.split(":")[1].startsWith("///")) {
        } else if (finalVideoPath.split(":")[1].startsWith("//")) {
            var firstString = finalVideoPath.split(":")[1];
            console.log("FIRST_STRING", firstString);
            let second = firstString.replace(firstString[0], '').trim()
            console.log("second", second);

            finalVideoPath = finalVideoPath.split(":")[0] + ':' + second;
            console.log("FINAL_ONE", finalVideoPath);
        }

        console.log('CALLING_API');
        console.log('USERID', this.state.userId);




        let formData = new FormData();
        formData.append("userId", this.state.userId);
        formData.append("title", this.state.caption);
        formData.append('thumbnail', {
            uri: this.state.selectedVideoThumbail,
            // uri:'file:/storage/emulated/0/thumb/thumb-4b5614b5-0694-4194-9041-161433964e52.jpeg',
            type: 'image/jpeg',
            name: "image.jpg",
        });
        formData.append('selfIntroVideo', {
            // uri:'file:/data/user/0/com.upsquard/cache/2868aec6-2812-426e-846f-0b0ae6f4e7af.mp4'
            uri: finalVideoPath,
            type: 'video/mp4',
            name: "Upsquad.mp4",
        });
        const response = await this.apiHandler.requestPostMultipartBody(formData, this.serviceUrls.selfIntroduction, this.state.bearerToken);
        console.log('response', response)


        if (response.status == 'No network Connected!') {
            this.setState({ isLoading: false });
            alert('No network Connected!');
        } else {
            this.setState({ isLoading: false });
            if (response.success === true) {
                alert(response.msg)
               this.setState({selectedVideoPath:'',selectedVideoSizeBeforeCompression:0,selectedVideoThumbail:'',
            caption:''
            })
            } else {
                alert(response.msg)
            }
        }




        // let data = { "userId": this.state.userId, "title": "ABC", "thumbnail": "file:///storage/emulated/0/thumb/thumb-42a69f2b-23b2-41d2-a1ac-45fb3ad7a5df.jpeg", };

        // console.log("VIDEOPATH_IN_APICALL", finalVideoPath);
        // console.log("THUMBNAIL_PATH_IN_APICALL", result.path);
        // const formData = new FormData();
        // formData.append('userId', this.state.userId);
        // formData.append('title', "ABC");
        // formData.append('thumbnail', {
        //     uri:'file:/storage/emulated/0/thumb/thumb-dc660e69-9974-41fb-aa32-731776f9ea2b.jpeg',
        //     // uri: result.path,
        //     type: 'image/jpeg',
        //     name: "image.jpg",
        // });
        // formData.append('selfIntroVideo', {
        // uri:'file:/data/user/0/com.upsquard/cache/react-native-image-crop-picker/Snapchat-1458146929.mp4'
        //     // uri: finalVideoPath,
        //    , type: 'video/mp4',
        //     name: "Upsquad.mp4",
        // });
        // fetch(this.serviceUrls.selfIntroduction, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': this.state.bearerToken,
        //          Accept: 'application/json',
        //     },
        //     body: formData
        // })
        //     .then(response => {
        //         console.log("RESPONSE", response)
        //     })
        //     .catch(error => {
        //         console.log("ERROR", error);
        //     });













        // fetch(this.serviceUrls.selfIntroduction, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         Authorization: this.state.bearerToken
        //     },
        //     body: formData
        // }).then(response => {

        //     console.log("RESPONSE", response)


        // }).then(async (res) => {

        //     console.log("ERROR", res)

        // })
        //     .catch(error => {
        //         console.log("ERROR_RESPONSE", error);

        //     });

        //  });

    }






    async galleryVideoApi(path) {
        console.log('galleryVideoApi')
        const filename = path.split("/");
        console.log('filename', typeof filename)
        const data = {
            "userId": this.state.userId,
            "fileObj": {
                "base64Obj": path,
                "fileType": "video/mp4",
                "fileName": this.state.caption,
            }
        }
        const response = await this.apiHandler.requestPost(data, this.serviceUrls.selfIntroduction)
        console.log('response', response.data)
        this.setState({ introductionVideo: response.data });












    }


    async cameraVideoApi(path) {
        console.log('cameraVideoApi')
        // const filename = path.split("/");
        // console.log('filename',typeof filename)
        const data = {
            "userId": this.state.userId,
            "fileObj": {
                "base64Obj": path,
                "fileType": "video/mp4",
                "fileName": "camera",
            }
        }
        console.log("cameradata", data);
        const response = await this.apiHandler.requestPost(data, this.serviceUrls.selfIntroduction)
        console.log('response', response.data)

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                {this.renderLoader()}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        // this.props.navigation.openDrawer();
                        this.props.navigation.pop();
                        // this.props.navigation.navigate('playersDetail'
                        //     // back:this.state.back,
                        // );
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                        // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Self Intrduction</Text>


                </View>
                <View style={styles.underline}></View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        {this.state.selectedVideoThumbail == '' ?
                            <View></View> : <Image style={[{ width: "40%", height: 200, borderRadius: 20, marginLeft: '8%', marginTop: '2%' }]}
                                source={{ uri: this.state.selectedVideoThumbail }}></Image>}


                        <Text style={styles.account}>Choose a video</Text>
                        <View style={{ flexDirection: 'row', marginLeft: '8%', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => { this.cameraVideo() }}>
                                <Image source={ImagesWrapper.camera} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.selectingVideo() }}>
                                <Image source={ImagesWrapper.gallery} style={{ marginLeft: '20%' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.underline, { width: '82%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }]}></View>
                        <Text style={styles.biofirst}>Caption</Text>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={(Caption) => {
                                this.setState({ caption: Caption });
                            }}
                            value={this.state.caption}
                            maxLength={63}

                        />
                        <View style={[styles.underline, { width: '82%', marginLeft: 'auto', marginRight: 'auto', marginTop: '0%' }]}></View>
                        {/* 
                <View style={[{ height: '50%' }, { width: '100%' }]} >
                    <Video
                        style={[{ height:'50%' }, { width: '100%' }]}
                        source={{ uri: this.state.compressedVideoPath }}
                    />
                </View> */}


                        <View style={{ marginTop: '15%', marginBottom: '10%', justifyContent: 'flex-end', flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    DeviceEventEmitter.emit("videoSelected");
                                    this.onClickSubmitButton();
                                    // this.props.navigation.pop();
                                    // this.props.navigation.navigate('playersDetail')
                                    // onSubmit();
                                    // console.log("BUTTON CLICKED")
                                    // Share.open({
                                    //     title: "This is my report ",
                                    //     message: "Message:",
                                    //     // url: "file:/data/user/0/com.upsquard/cache/44a357ad-5774-48b1-8a62-0fa946b75de1.mp4",
                                    //     url: "file:/data/user/0/com.upsquard/cache/b23e7f52-c67b-42d5-b790-1af801531917.mp4",
                                    //     subject: "Report",
                                    // })
                                }}

                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '8%' }]}>
                                    <Text style={styles.buttonText}>
                                        Save
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }



    renderLoader() {
        return (
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
                        borderRadius: 5, borderColor: "#58C4C6", marginBottom: 10, backgroundColor: '#58C4C6', justifyContent: 'center'
                    }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            </Modal>
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
        flexDirection: 'row',
        marginLeft: -10
        // borderBottomWidth:1
    },
    underline: {
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft: 'auto',
        width: '100%',
        marginTop: 15
    },
    memphistalk: {
        fontSize: 20,
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '5%'
    },
    account: {
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '8%',
        marginTop: 30
    },
    biofirst: {
        fontSize: 16,
        fontWeight: '400',
        // color:'#959494',
        marginTop: '5%',
        marginLeft: '8%',
        fontFamily: Fonts.mulishRegular,
        color: '#868585'
    },
    textinput: {
        marginTop: -2,
        marginLeft: '8%',
        height: Platform.OS === 'ios' ? 30 : 40,
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 16,
        color: '#1E1C24',
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