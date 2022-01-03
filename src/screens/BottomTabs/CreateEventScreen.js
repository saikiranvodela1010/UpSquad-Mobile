import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, ScrollView, FlatList } from 'react-native';
import Fonts from '../../res/Fonts';
import ImagesWrapper from '../../res/ImagesWrapper';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import CameraRoll from "@react-native-community/cameraroll";
import LinearGradient from 'react-native-linear-gradient'


export default class CreateEventScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            cameraImage: null,
            gallerypopup: false,
            galleryImage: null,
            photosdata: [
                { type: "camera" }
            ],
            eventname: '',
            signupemail: '',
            registeremail: '',
            emailView: false,
            emailData: '',
            emailMarginTop: '',
            imageerr: '',
            registeremailerr: '',
            signupemailerr:''
        }
    }
    cameraOnpress() {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            // cropping: true,
            freeStyleCropEnabled: true,
        })
            .then((image) => {
                this.setState({ cameraImage: image })
                console.log('images', image);
            })
            .catch((error) => {
                console.log('error', error)
            });


    }

    getPhotos = () => {
        console.log('data', this.state.photosdata);
        console.log('photos')

        CameraRoll.getPhotos({
            first: 100000,
            assetType: 'Photos',
        })
            .then((res) => {
                console.log('photos1', res.edges, res.edges.length)
                res.edges.map((number) =>
                    this.state.photosdata.push(number)
                );
                console.log("list", this.state.photosdata.length)

            })
            .catch((error) => {
                console.log(error);
            });
    };

    onSubmit() {
        console.log('name', this.state.firstname, this.state.lastname)
        let err = [];
        let mobileReg = /^\d+$/;
        let mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let nameReg = /^[a-zA-Z ]{2,30}$/;
        if (this.state.eventname === "") {
            this.setState({ eventnameerr: "Please enter event name" });
        }
        if (this.state.cameraImage ===null || this.state.galleryImage ===null) {
            this.setState({ imageerr: "Please select image" });
        }
        if (this.state.emailData === "") {
            this.setState({signupemailerr:"Please enter  email"})

        } 
        // if (!mailReg.test(this.state.emailData)) {
        //     // err['email'] = 'Please enter valid email';
        //     console.log('mail',)
        //     this.setState({signupemailerr:"Please enter valid email"})

        // }
        // if (!mailReg.test(this.state.registeremail)) {
        //     // err['email'] = 'Please enter valid email';
        //     console.log('mail',)
        //     this.setState({registeremailerr:"Please enter valid email"})

        // }
        // if (!mailReg.test(this.state.signupemail)) {
        //     console.log('mail',)
        //     this.setState({signupemailerr:"Please enter valid email"})

        // }
        if (this.state.registeremail === "") {
            this.setState({registeremailerr:"Please enter email"})

        } 
        // if (!mailReg.test(this.state.registeremail)) {
        //     console.log('mail',)
        //     this.setState({registeremailerr:"Please enter valid email"})

        // }
        
        
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        if (this.state.code === regex) {
            alert('Emojis will not allowed')
        }
        if (this.state.eventname !== '' && this.state.cameraImage !== "" || this.state.galleryImage !== ""
            && this.state.emailData !== '' && this.state.registeremail !== ''
            && this.state.checkmarkName !== 'mark-off' &&  signupemailerr !== 'Please enter valid email' && registeremailerr !== 'Please enter valid email'
        ) {
            this.props.navigation.navigate('eventsquadscreen')
        }

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar4')}>
                        <Image
                            source={ImagesWrapper.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Create event</Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}>
                    <Progress.Bar useNativeDriver={false} progress={2} height={3} width={100} color={'rgba(33, 43, 104, 1)'} borderColor={'rgba(33, 43, 104, 1)'} />
                </View>
                {this.state.galleryImage || this.state.cameraImage
                    ?
                    <TouchableOpacity
                        onPress={() => this.setState({ show: true })}
                        style={styles.touchableText}
                    >
                        {this.state.galleryImage
                            ?
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 10,

                                }}
                                source={{ uri: this.state.galleryImage }}
                            />
                            :
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 10,

                                }}
                                source={{ uri: this.state.cameraImage?.path }}
                            />
                        }
                    </TouchableOpacity>
                    :
                    <View style={styles.touchableText}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({imageerr: ''});
                            this.setState({ show: true });
                        }}
                        
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Image

                                source={ImagesWrapper.cameraimage}
                            />
                            <Text style={styles.cameraText}>Add an event photo</Text>

                        </View>
                    </TouchableOpacity>
                    <Text style={styles.error}>{this.state.imageerr}</Text>
                    </View>
                }
                <View>
                    <Text style={styles.label}>Event name</Text>
                    <TextInput
                        style={styles.textinputText}
                        onChangeText={(EventName) => {

                            this.setState({ eventname: EventName });
                            this.setState({ eventnameerr: '' });
                        }}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                        value={this.state.eventname}
                        returnKeyType={"next"}
                        // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        maxLength={127}

                    />
                    <View style={[styles.underline]} />
                    <Text style={styles.error}>{this.state.eventnameerr}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Invitees to sign up for the community and register for the event.</Text>
                    {/* {this.state.emailView === true ? 
                    <View style = {{alignItems: 'flex-start'}}>
                    <View style = {{flexDirection: 'row', borderWidth: 1, padding: 6, backgroundColor: 'rgba(235, 248, 248, 1)', borderColor: 'rgba(235, 248, 248, 1)', borderRadius: 20, width: 'auto', height: 'auto', marginLeft: 25}}>
                    <Text style = {{color: 'rgba(30, 28, 36, 1)', fontSize: 14, fontWeight: '600', fontFamily: Fonts.mulishRegular}}>{this.state.emailData}</Text>
                    <TouchableOpacity onPress={() => this.setState({emailView: false})}>
                    <Image style = {{marginLeft: 5}} source = {ImagesWrapper.close}/>
                    </TouchableOpacity>
                </View>
                </View>
                : null
                    } */}
                     {this.state.emailView === true && this.state.emailData !== ''? 
                    <View style = {{alignItems: 'flex-start'}}>
                    <View style = {{flexDirection: 'row', borderWidth: 1, padding: 6, backgroundColor: 'rgba(235, 248, 248, 1)', borderColor: 'rgba(235, 248, 248, 1)', borderRadius: 20, width: 'auto', height: 'auto', marginLeft: 25}}>
                    <Text style = {{color: 'rgba(30, 28, 36, 1)', fontSize: 14, fontWeight: '600', fontFamily: Fonts.mulishRegular}}>{this.state.emailData}</Text>
                    <TouchableOpacity onPress={() => {
                        this.setState({emailView: false});
                        this.setState({emailData:''})
                    }}>
                    <Image style = {{margin: 5,marginTop:5,width:10,height:10}} source = {ImagesWrapper.close}/>
                    </TouchableOpacity>
                </View>
                </View>
                : null
                    }
                    <TextInput
                        style={styles.textinputText}
                        onChangeText={(SignupEmail) => {
                            this.setState({ signupemail: SignupEmail })
                            this.setState({emailData: SignupEmail})
                            this.setState({ signupemailerr: '' })
                        }}
                        value={this.state.signupemail}
                        returnKeyType={"next"}
                        ref={(input) => { this.secondTextInput = input; }}
                        onSubmitEditing={() => { 
                            this.setState({emailView: true});
                            this.setState({signupemail: ''});
                            this.thirdTextInput.focus(); 
                        }}
                        maxLength={63}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        blurOnSubmit={false}
                    />
                    <View style={styles.underline} />
                    <Text style={styles.error}>{this.state.signupemailerr}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Invitees to register for this event only</Text>
                    <TextInput
                        style={styles.textinputText}
                        onChangeText={(RegisterEmail) => {
                            this.setState({ registeremail: RegisterEmail })
                            this.setState({ registeremailerr: '' })
                        }}
                        value={this.state.registeremail}
                       returnKeyType={"done"}
                        ref={(input) => { this.thirdTextInput = input; }}
                        // onSubmitEditing={() => { this.fourTextInput.focus(); }}
                        importantForAutofill="no"
                        maxLength={63}
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                        blurOnSubmit={false}
                    />
                    <View style={styles.underline} />
                    <Text style={styles.error}>{this.state.registeremailerr}</Text>
                </View>

                {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <TouchableOpacity 
                    onPress={()=>{
                        // this.onSubmit();
                        this.props.navigation.navigate('eventsquadscreen')
                    }}
                    style={{ borderWidth: 1, borderRadius: 30, borderColor: 'rgba(241, 241, 241, 1)', backgroundColor: 'rgba(241, 241, 241, 1)', height: '20%', width: '85%', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginBottom: 30 }}
                    >
                    <View>
                        <Text style={{ color: 'rgba(134, 133, 133, 1)', fontWeight: '600', fontSize: 16, fontFamily: Fonts.mulishRegular }}>Next</Text>
                    </View>
                    </TouchableOpacity>
                </View> */}
                 <View style={{marginBottom:'10%',flex:1,justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.onSubmit();
                         }}
                         
                    >
                       
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={this.state.emailData && this.state.galleryImage || this.state.cameraImage && this.state.eventname && this.state.registeremail?['#212B68', '#58C4C6']:['#F1F1F1','#F1F1F1']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={[styles.buttonText,{color:this.state.emailData && this.state.galleryImage || this.state.cameraImage && this.state.eventname && this.state.registeremail?'#ffffff':'#868585'}]}>
                            Next
                        </Text>
                    </LinearGradient>
                    
                    </TouchableOpacity>
                    
                    
                    {/* </ScrollView> */}
                    </View>
                <Modal
                    transparent={true}
                    isVisible={this.state.show}
                    onBackdropPress={() => this.setState({ show: false })}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                    onRequestClose={() => {
                        this.setState({show: false})
                     }}
                >
                    {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>
                        <View style={{
                            backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 22, height: '20%', marginBottom: -20, width: '110%', marginLeft: -20
                        }}> */}
                    <View style={{
                        height: 160, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginLeft: 20 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ show: false })
                                    this.setState({ gallerypopup: false })
                                    this.cameraOnpress()
                                }
                                }
                            >
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={styles.popupImage}>
                                        <Image
                                            source={ImagesWrapper.cameraimage}

                                        />
                                    </View>
                                    <Text style={[styles.popupText, { marginLeft: 10 }]}>Camera</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={styles.popupImage}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getPhotos();
                                            this.setState({ gallerypopup: true })
                                            this.setState({ show: true })

                                        }
                                        }
                                    >
                                        <Image
                                            source={ImagesWrapper.galleryimage}

                                        />
                                    </TouchableOpacity>
                                    <Modal
                                        transparent={true}
                                        isVisible={this.state.gallerypopup}
                                        // backdropColor='black'
                                        onBackdropPress={() => {
                                            this.setState({ gallerypopup: false })
                                            this.setState({ show: false })
                                        }}
                                    >
                                        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '153%', marginTop: 550, width: '110%', marginLeft: -20 }}>
                                            <Text style={{ fontSize: 18, margin: 30, fontFamily: Fonts.mulishSemiBold, color: '#1E1C24' }}>Gallery</Text>
                                            <View style={styles.underline} />
                                            <View>

                                                <FlatList

                                                    data={this.state.photosdata}
                                                    numColumns={3}

                                                    renderItem={({ item, index }) => (

                                                        <View style={{ marginLeft: '2%' }}>
                                                            {index === 0 ?
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        this.cameraOnpress();

                                                                    }}
                                                                >
                                                                    <View style={{
                                                                        width: Platform.OS === "ios" ? 100 : 100,
                                                                        height: 100,
                                                                        margin: Platform.OS === "ios" ? 5 : 10,
                                                                        borderRadius: 10,
                                                                        backgroundColor: '#FFFFFF',
                                                                        paddingLeft: 20,
                                                                        paddingTop: 5
                                                                    }}>
                                                                        <Image
                                                                            source={ImagesWrapper.camera}

                                                                        />
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :

                                                                <TouchableOpacity onPress={() => {
                                                                    // setFile(item.node.image.uri),
                                                                    //     setGallerypopup(false);
                                                                    // setShow(false);
                                                                    this.setState({ galleryImage: item.node.image.uri })
                                                                    this.setState({ gallerypopup: false })
                                                                    this.setState({ show: false })
                                                                    console.log("galleryImage:", this.state.galleryImage)
                                                                }}>

                                                                    <Image
                                                                        style={{
                                                                            width: Platform.OS === "ios" ? 100 : 100,
                                                                            height: 100,
                                                                            margin: Platform.OS === "ios" ? 5 : 10,
                                                                            borderRadius: 10
                                                                        }}
                                                                        // source={{uri: item.node.image.uri}}
                                                                        source={{ uri: this.state.photosdata[index].node.image.uri }}

                                                                    // source={require('../src/images/img.png')}
                                                                    />
                                                                </TouchableOpacity>



                                                            }

                                                        </View>

                                                    )}
                                                />
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                                <Text style={[styles.popupText, { marginLeft: 10 }]}>Gallery</Text>
                            </View>


                        </View>
                    </View>
                    {/* </View> */}
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    header: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 28, 36, 1)',
        marginLeft: 20
    },
    cameraText: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(134, 133, 133, 1)',
        marginTop: 5,
    },
    touchableText: {
        borderWidth: 1,
        height: '17%',
        width: '86%',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: '#58C4C6',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center'
    },
    popupText: {
        color: 'rgba(134, 133, 133, 1)',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: Fonts.mulishRegular,
        marginTop: 5
    },
    popupImage: {
        borderWidth: 1,
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#EBF8F8',
        backgroundColor: '#EBF8F8',
        marginRight: '5%'
    },
    inputText: {
        marginLeft: '7%',
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(134, 133, 133, 1)',

    },
    inputBorder: {
        borderBottomWidth: 1,
        width: '86%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: 'rgba(241, 241, 241, 1)',


    },
    inputText1: {
        marginLeft: '7%',
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(134, 133, 133, 1)',

    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: '5%',
        marginLeft: 25,
        fontFamily: Fonts.mulishRegular,
        color: 'rgba(134, 133, 133, 1)',
        padding: 5
    },
    textinputText: {
        marginLeft: 25,
        height: Platform.OS === 'ios' ? 30 : 40,
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(30, 28, 36, 1)',
        width: '85%',

    },
    underline: {
        borderBottomColor: 'rgba(241, 241, 241, 1)',
        borderBottomWidth: 1,
        marginLeft: 25,
        marginTop: Platform.OS === 'ios' ? null : '-1%',
        marginRight: 25,
        width: '85%'
    },
    error: {
        color: 'red',
        marginLeft: 25,
    },
    buttonText: {
        fontSize: 16,
        fontFamily:Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight:'600',
        // marginBottom:20
    },
    linearGradient: {
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        // marginLeft: 42,
        // height: 48,
        // marginRight: 42
        width:'85%',
        // height:'7%',
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        marginLeft: 30,
        height: 55,
        marginRight: 30,
        // lineHeight:400
    },
})