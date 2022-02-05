

import React from 'react'
import { View, Alert, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Image, FlatList } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';

import ServiceUrls from '../network/ServiceUrls';
import APIHandler from '../network/NetWorkOperations';
import Modal from 'react-native-modal';
import StoragePrefs from '../res/StoragePrefs';

let videos;
export default class SelfIntroVideosListScreen extends React.Component {

    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();

    constructor(props) {
        super(props);
        this.state = {
            selfIntroVideos: this.props.route.params.videosList,
            userId: '',
            isLoading: false,

        }


        console.log("VIDOES_LENGTH_BEFOREADDINGEMPTY", this.state.selfIntroVideos.length)
        this.state.selfIntroVideos.push("");
        console.log("VIDOES_LENGTH_AFTER_ADDINGEMPTY", this.state.selfIntroVideos.length)

        // alert("CONSTRUCTOR CALLED  " + this.state.selfIntroVideos.length);

    }


    async componentDidMount() {

        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        console.log('userDetails', userDetails);
        this.setState({ userId: userDetails.userId });
    }
    // async componentWillUnmount() {
    //     console.log("unmounted")
    //     this.props.route.params.videosList = [];
    //     this.state.selfIntroVideos = []
    // }

    showAlert(videoId, videoUrl) {
        Alert.alert(
            'Are You sure you want to delete this video ?',
            '',
            [
                { text: '', onPress: () => console.log('Ask me later pressed') },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => this.deletingSelectedVideo(videoId, videoUrl) },
            ],
            { cancelable: false }
        )
    }



    async deletingSelectedVideo(videoId, videoUrl) {
        this.setState({ isLoading: true });
        console.log("ID    ", videoId + videoUrl)
        const requestBody = {
            "userId": this.state.userId,
            "videoId": videoId,
            "url": videoUrl,
        }
        const response = await this.apiHandler.requestPut(requestBody, this.serviceUrls.deleteSelfIntroVideo)
        console.log('response', response)

        console.log("BEFORE_DELETNG", this.state.selfIntroVideos.length + "")
        this.setState({ isLoading: false });
        if (response.status == 'No network Connected!') {
            // this.setState({ isLoading: false });
            alert('No network Connected!');

        } else {
            // this.setState({ isLoading: false });
            if (response.success === true) {
                alert(response.msg)
                for (var i = 0; i < this.state.selfIntroVideos.length; i++) {
                    if (this.state.selfIntroVideos[i]._id == videoId) {
                        this.state.selfIntroVideos.splice(i, 1)
                        console.log("deleted")
                        this.setState({ selfIntroVideos: this.state.selfIntroVideos });
                        break;
                    }
                }
                console.log("AFTER_DELETNG", this.state.selfIntroVideos.length)
            } else {
                alert(response.msg)
            }
        }

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



    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                {this.renderLoader()}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.pop();
                    }}>
                        <Image
                            source={ImagesWrapper.back} />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Your Videos</Text>


                </View>
                <View style={styles.underline}></View>


                {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}

                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                    {this.state.selfIntroVideos.length == 0 ? null : <FlatList
                        style={{ marginBottom: 10, marginLeft: 2 }}
                        data={this.state.selfIntroVideos}
                        numColumns={2}

                        renderItem={item => (
                            <View style={{ width: "48%", height: 150, margin: 2, borderRadius: 20 }}>
                                <Image
                                    style={[styles.bottom]}
                                    source={{ uri: item.item.thumbnailUrl != '' ? item.item.thumbnailUrl : '' }}
                                />
                                {item.item != '' ? <TouchableOpacity style={[styles.top]}
                                    onPress={() => {
                                        console.log(item.item.videoTitle)
                                        this.showAlert(item.item._id, item.item.videoUrl)
                                    }}

                                >
                                    <Image source={ImagesWrapper.pencil} />
                                </TouchableOpacity> :
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                          if(item!=''){
                                            this.props.navigation.navigate('SelfIntroduction')
                                            console.log("NAVIGATE")
                                          }
                                         
                                        }}

                                    >
                                        <Image source={ImagesWrapper.addvideoplus} />
                                    </TouchableOpacity>

                                }
                            </View>
                        )}
                    />}
                    {this.state.selfIntroVideos.length == 0 ? <Text style={{ flex: 1 }}>No Videos Found</Text> : null}


                </View>
                {/* </ScrollView> */}


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
        flexDirection: 'row',
        marginLeft: -10
        // borderBottomWidth:1
    },
    memphistalk: {
        fontSize: 20,
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '5%'
    },
    bottom: {
        position: 'relative',
        flex: 1,

        borderRadius: 20
    },
    top: {
        height: 20,
        width: 20,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'orange'
    },
});