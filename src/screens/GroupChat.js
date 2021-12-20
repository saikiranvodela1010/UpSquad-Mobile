import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, TouchableHighlightBase, FlatList, SafeAreaView, KeyboardAvoidingView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


var SampleArray = [];
export default class GroupChat extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            tapText: '',
            test: [],
            value: 0,
            sendButton: false,
            scrollText: false,
            today: false,
            cameraImage: '',
            show1: false
        }
    }



    AddItemsToArray = () => {
        console.log("testing")
       
        var today = new Date(),
            time = today.getHours() + ':' + today.getMinutes();


        var obj = {
            type: this.state.tapText != '' ? "holderText" : "msg",
            id: this.state.value + 1,
            timE: time,
            message: this.state.tapText != '' ? this.state.tapText : this.state.Holder,
        }
        SampleArray.push(obj);
        console.log("array:", SampleArray)
        this.setState({ test: SampleArray })
        this.setState({ value: this.state.value + 1 })
        console.log("Value: " + (this.state.value + 1))
        console.log("NewTest:", SampleArray.length)
        this.state.Holder = ''

    }

    async PdfFile() {

        console.log("Working")

        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],

            });

            console.log('res : ' + JSON.stringify(results));
            console.log('URI : ' + results[0].uri);
            console.log('type : ' + results[0].type);
            console.log('name : ' + results[0].name);
            console.log('size : ' + results[0].size);
            this.setState({ URI: results[0].uri })
            console.log("URI: ", this.state.URI)
            this.setState({ Name: results[0].name })
            console.log("Name:", this.state.Name)
            this.setState({ Type: results[0].type })
            console.log("Type:", this.state.Type)
            this.setState({ Size: results[0].size })
            console.log("Size:", this.state.Size)


            var today = new Date(),
                time = today.getHours() + ':' + today.getMinutes();


            var obj = {
                type: "doc",
                name: results[0].name,
                id: SampleArray.length + 1,
                timE: time,
            }

            SampleArray.push(obj);


            console.log("array:", SampleArray)
            this.setState({ test: SampleArray })
            this.setState({ value: this.state.value + 1 })
            console.log("Value: " + (this.state.value + 1))



        } catch (err) {

            if (DocumentPicker.isCancel(err)) {

                alert('Canceled from multiple doc picker');
            } else {

                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    async ImageFile() {


        ImagePicker.openPicker({
            // multiple: true
            mediaType: "image",
        })
            .then((image) => {
                console.log('images', image);
                //this.setState({ cameraImage: image })
                var obj = {
                    id: SampleArray.length + 1,
                    type: "cameraimg",
                    uri: image?.path,

                }

                SampleArray.push(obj);
                console.log("array:", SampleArray)
                this.setState({ test: SampleArray })
                this.setState({ value: this.state.value + 1 })
                console.log("Value: " + (this.state.value + 1))
            })
            .catch((error) => {
                console.log('error', error)
            });

        // this.captureImage(this.state.cameraImage);
    };


    async cameraOnpress() {



        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            freeStyleCropEnabled: true,
            // multiple:true
        })
            .then((image) => {
                console.log('images', image);
                //this.setState({ cameraImage: image })
                var obj = {
                    id: SampleArray.length + 1,
                    type: "cameraimg",
                    uri: image?.path,

                }

                SampleArray.push(obj);
                console.log("array:", SampleArray)
                this.setState({ test: SampleArray })
                this.setState({ value: this.state.value + 1 })
                console.log("Value: " + (this.state.value + 1))
            })
            .catch((error) => {
                console.log('error', error)
            });

        // this.captureImage(this.state.cameraImage);


    }



    //    if(this.state.cameraImage!=''){



    render() {


       

        const renderItem = ({ item }) => {
            if (item.type == "doc") {
                return (
                    <View style={{ flexDirection: 'column', alignItems: item.id % 2 == 0 ? 'flex-end' : 'flex-start', justifyContent: item.id % 2 == 0 ? 'flex-end' : 'flex-start' }}>

                        <View style={{ flexDirection: 'row', borderWidth: 1, padding: 10, width: 'auto', height: 'auto', borderRadius: 10, backgroundColor: item.id % 2 != 0 ? "#E1EEC7" : "#ffffff", borderColor: item.id % 2 != 0 ? "#E1EEC7" : "#ffffff", fontWeight: 'bold', fontSize: 16, marginLeft: item.id % 2 != 0 ? 10 : 180,marginRight: item.id % 2 != 0 ? 180 : 10, marginTop: 20 }}>

                            <Text style={{ color: '#1E1C24', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>{item.name}</Text>

                            


                        </View>
                    </View>

                )


            }
            else if (item.type == "img") {
                return (
                    <View style={{ flexDirection: 'column', alignItems: item.id % 2 == 0 ? 'flex-end' : 'flex-start', justifyContent: item.id % 2 == 0 ? 'flex-end' : 'flex-start' }}>

                        <Image source={{ uri: item.uri }}
                            style={{
                                width: '60%',
                                height: 120,
                                marginTop: 20,
                            }}
                        />
                        <View style={{ flexDirection: 'row', borderWidth: 1, paddingTop: 10, width: '60%', height: 'auto', borderBottomRadius: 10, backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff", borderColor: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>
                        
                        </View>


                    </View>

                )
            }
            else if (item.type == "msg") {
                return (



                  
                    <View style={{ alignItems: item.id % 2 != 0 ? 'flex-end' : 'flex-start', justifyContent: item.id % 2 != 0 ? 'flex-end' : 'flex-start', }}>

                        <View style={{ borderWidth: 1, padding: 10, width: 'auto', height: 'auto', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: item.id % 2 != 0 ? "#ffffff" : "#E1EEC7", borderColor: item.id % 2 != 0 ? "#ffffff" : "#E1EEC7", fontWeight: 'bold', fontSize: 16, marginLeft: item.id % 2 == 0 ? 10 : 180, marginRight: item.id % 2 == 0 ? 180 : 10, marginTop: 20 }}>

                            <Text style={{ color: '#1E1C24', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>{item.message}</Text>

                           


                        </View>
                    </View>




                )


            }
            else if (item.type == "holderText") {
                return (

                    <View style={{
                        flexDirection: 'row',
                        alignItems: item.id % 2 == 0 ? 'flex-end' : 'flex-start',
                        justifyContent: item.id % 2 != 0 ? 'flex-end' : 'flex-start',
                        borderWidth: 1,
                        padding: 5,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff",
                        borderColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff",
                        marginTop: 10,
                        marginLeft: item.id % 2 == 0 ? 120 : 10,
                        // marginRight: item.id % 2 == 0 ? 10 : 120
                    }}

                    >
                        <Text style={{
                            color: '#1E1C24',
                            fontSize: 14,
                            fontWeight: '400',
                            fontFamily: Fonts.mulishRegular,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'red',
                            textAlign: 'center'
                        }}>
                            {item.message}
                        </Text>

                    </View>

                )


            }
            else if (item.type == "today") {
                return (
                    <View style={{ borderWidth: 1, height: 30, width: '20%', alignItems: 'center', marginRight: 'auto', marginLeft: 'auto', marginTop: 30, marginBottom: 20, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', borderRadius: 12, justifyContent: 'center' }}>
                        <Text style={{ color: '#868585', fontSize: 12, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>TODAY</Text>
                    </View>
                )
            }
            else if (item.type == "cameraimg") {
                return (

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: item.id % 2 != 0 ? 'flex-end' : 'flex-start',
                            justifyContent: item.id % 2 != 0 ? 'flex-end' : 'flex-start',
                            marginTop: 10,
                            marginLeft: item.id % 2 != 0 ? 10 : 10,
                            marginRight: item.id % 2 != 0 ? 10 : 10
                        }}
                    >

                        <Image source={{ uri: item.uri }}
                            style={{
                                width: 190,
                                height: 170,
                                // marginTop: 20,
                                borderRadius: 10
                            }}
                        />
                    </View>




                )


            }
        };

        function getNumberOfLines(text, fontSize, fontConstant, containerWidth) {
            // const windowWidth = Dimensions.get('window').width;
            let cpl = Math.floor(containerWidth / (fontSize / fontConstant));
            const words = text.split(' ');
            const elements = [];
            let line = '';

            while (words.length > 0) {
                if (line.length + words[0].length + 1 <= cpl || line.length === 0 && words[0].length + 1 >= cpl) {
                    let word = words.splice(0, 1);
                    if (line.length === 0) {
                        line = word;
                    } else {
                        line = line + " " + word;
                    }
                    if (words.length === 0) {
                        elements.push(line);
                    }
                }
                else {
                    elements.push(line);
                    line = "";
                }
            }
            return elements.length;
        }

       

        return (
           

            <View style={{flex:1,backgroundColor: '#FFFFFF'}}>
                 {/* <KeyboardAvoidingView > */}
                {/* <View style={{ width: '100%', height: '9%', backgroundColor: '#FFFFFF' }}> */}
                    <View style={{ flexDirection: 'row', borderWidth: 1, height: 73, width: '100%', alignItems: 'center', borderColor: '#F1F1F1' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('chatscreen')}>
                            <Image
                                source={ImagesWrapper.back}
                                style={{
                                    tintColor: '#000000',
                                    marginLeft: 20
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, height: 30, width: 30, borderRadius: 25, marginLeft: 20 }}></View>
                        <View style={{ flexDirection: 'column', marginRight: '35%' }}>
                            <Text style={styles.text}>Friends</Text>
                            <Text style={{ fontFamily: Fonts.mulishRegular, fontSize: 12, fontWeight: '400', marginLeft: 10, color: '#868585' }}>Ann,Thomas,Katy</Text>
                        </View>
                        <TouchableOpacity 
                            onPress = {() => this.setState({show1: true})}
                        >
                        <View style = {{marginLeft: '2%'}}>
                            <Image
                                source={ImagesWrapper.menuimage}
                                style={{
                                    // marginLeft: 30,
                                    // marginTop: 3,
                                    // marginBottom: 2,
                                    marginLeft: '2%'
                                }}
                            />
                        </View>
                        </TouchableOpacity>

                    </View>
                {/* </View> */}

                <View style={{ flex:1, backgroundColor: '#EBF8F8' }}>
                <View style={{marginTop:'8%',alignItems:'center',justifyContent:'center'}}>
                        <View style={styles.dayView}>
                          <Text style={styles.day}>TODAY</Text>
                        </View>
                    </View>
                    <View style={{marginTop:'5%',alignItems:'center',justifyContent:'center'}}>
                        <View style={styles.groupView}>
                          <Text style={styles.groupViewList}>You added Ann, Katy and Thomas </Text>
                        </View>
                    </View>

                    <FlatList
                        //    contentContainerStyle={{ flexDirection: 'column-reverse' }}
                        // initialScrollIndex={SampleArray.length - 1}
                        style={{ height: '80%' }}
                        // data={DATA}
                        data={SampleArray}
                        // renderItem={getListItem}
                        renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    />
                    <View style={{ height: '10%',flex:1,justifyContent:"flex-end"}}>
                        <View style={{ flexDirection: 'row'}}>
                            <View style={[styles.chatText]}>
                                <Image
                                    source={ImagesWrapper.emoji}
                                    style={{
                                        // marginRight: 15
                                    }}
                                />

                                <TextInput

                                    placeholder="Type a message"
                                    onChangeText={TextInputValue => this.setState({ Holder: TextInputValue })}
                                    multiline={true}
                                    // numberOfLines={3}
                                    // value={this.state.ScrollView === true ? this.state.Holder : this.state.tapText}
                                    value={this.state.Holder}
                                    style={{
                                        fontFamily: Fonts.mulishRegular,
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#868585',
                                        width: '40%',
                                        marginRight: 20,
                                        marginLeft: 5,
                                        padding:5,
                                        // height:100
                                        
                                    }}
                                />
                                <TouchableOpacity onPress={() => this.setState({ show: true })}>
                                    <Image
                                        source={ImagesWrapper.attachment}
                                        style={{
                                            marginRight: 10
                                        }}
                                    />
                                </TouchableOpacity>

                                <Modal
                                    transparent={true}
                                    isVisible={this.state.show}
                                    onBackdropPress={() => this.setState({ show: false })}
                                    onRequestClose={() => {
                                        this.setState({ show: false })
                                      }}
                                // backdropColor={'#000000'}
                                // backdropOpacity={0.25}
                                >
                                    <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>
                                        <View style={{
                                            backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 22, height: '20%', marginBottom: -20, width: '110%', marginLeft: -20
                                            // flex: 1, backgroundColor: '#FFFFFF', height: '30%', width: '110%', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center' 
                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ show: false })
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
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // this.setState({ show: false })
                                                        // this.ImageFile()
                                                    }
                                                    }
                                                >
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <View style={styles.popupImage}>
                                                            <Image
                                                                source={ImagesWrapper.galleryimage}

                                                            />
                                                        </View>
                                                        <Text style={[styles.popupText, { marginLeft: 10 }]}>Gallery</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <View style={styles.popupImage}>
                                                            <Image
                                                                source={ImagesWrapper.audio}
                                                            />
                                                        </View>
                                                        <Text style={[styles.popupText, { marginLeft: 15 }]}>Audio</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({ show: false })
                                                    this.PdfFile()
                                                }}>

                                                    <View style={{ flexDirection: 'column' }}>
                                                        <View style={styles.popupImage}>
                                                            <Image
                                                                source={ImagesWrapper.document}

                                                            />
                                                        </View>
                                                        <Text style={styles.popupText}>Document</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                                <Image
                                    source={ImagesWrapper.camerablack}
                                    style={{
                                        marginRight: 10
                                    }}
                                />
                                <Image
                                    source={ImagesWrapper.mic}
                                    style={{
                                        marginRight: 30
                                    }}
                                />
                            </View>
                            <View >
                                {this.state.sendButton === true || this.state.Holder != null ?
                                    <TouchableOpacity 
                                    // onPress={ 
                                        
                                    //     this.AddItemsToArray
                                    // }

                                    onPress={()=>{
                                        console.log(this.state.Holder.length)
                                                 
                                                   if(this.state.Holder.length != 0){
                                                    console.log("insideText")
                                                    this.AddItemsToArray()
                                                  }
                                                }} 
                                   
                                    >
                                        <Image
                                            source={ImagesWrapper.sendimage}
                                            style={{
                                                marginRight: 20,
                                                marginTop: -75
                                            }}
                                        />
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </View>
                        </View>

                    </View>


                </View>

                <Modal
                    //testID={'modal'}
                    isVisible={this.state.show1}
                    onBackdropPress={() => this.setState({ show1: false })}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ show1: false })
                      }}
                >

                    <View style={{
                        height: 225, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
                    }}>

                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginTop: '7%', marginLeft: '7%' }}>
                                <Image source={ImagesWrapper.search1} />
                                <Text style={styles.search}>Search</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('removeuser')}>
                        <View style={styles.modalView}>
                            <Image source={ImagesWrapper.removeuser} />
                            <Text style={styles.removeUser}>Remove Users</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.modalView}>
                                <Image source={ImagesWrapper.delete} />
                                <Text style={styles.delete}>Delete group</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.modalView}>
                                <Image source={ImagesWrapper.chathistory} />
                                <Text style={styles.chatHistory}>Clear chat history</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* </KeyboardAvoidingView> */}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        fontSize: 14,
        marginLeft: 10,
    },
    border: {
        marginTop: 10,
        marginLeft: 20,
        borderWidth: 1,
        height: 68,
        width: 293,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderStyle: 'dashed',
        borderColor: '#58C4C6',
        justifyContent: 'center'
    },
    borderText: {
        fontSize: 14,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        color: '#868585',
        marginLeft: 10,
        marginRight: 10
    },
    tapText: {
        fontFamily: Fonts.mulishRegular,
        fontSize: 12,
        fontWeight: '400',
        marginLeft: 10,
        color: '#B1AAAA',
        marginTop: 10,
        marginLeft: 250
    },
    chatText: {
        borderWidth: 1,
        borderRadius: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#FFFFFF',
        borderColor: '#F1F1F1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: -80,
        // minHeight: 50,
        width: '80%',
        height: 50
    },
    popupText: {
        color: '#868585',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: Fonts.mulishRegular,
        // marginLeft: 10,
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
    search:{
        fontSize:14,
        color:'#1E1C24',
        fontWeight:'600',
        fontFamily:Fonts.mulishRegular,
        marginLeft:'2%',
        marginTop:3
    },
    removeUser:{
        fontSize:14,
        color:'#1E1C24',
        fontWeight:'600',
        fontFamily:Fonts.mulishRegular,
        marginLeft:'2%',
        marginTop:3
    },
    delete:{
        fontSize:14,
        color:'#1E1C24',
        fontWeight:'600',
        fontFamily:Fonts.mulishRegular,
        marginLeft:'3.5%',
        marginTop:1
    },
    chatHistory:{
        fontSize:14,
        color:'#1E1C24',
        fontWeight:'600',
        fontFamily:Fonts.mulishRegular,
        marginLeft:'2%',
        marginTop:2
    },
    modalView:{
        flexDirection:'row',
        marginTop:'5%',
        marginLeft:'7%'
    },
    day:{
        color:'#868585',
        fontSize:12,
        fontFamily:Fonts.mulishRegular,
        fontWeight:'400'
    },
    dayView:{
        width:'25%',
        height:30,
        borderColor:'#F1F1F1',
        borderRadius:25,
        borderWidth:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center'
    },
    groupView:{
        width:'65%',
        height:30,
        borderColor:'#F1F1F1',
        borderRadius:25,
        borderWidth:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center'
    },
    groupViewList:{
        color:'#868585',
        fontSize:12,
        fontFamily:Fonts.mulishRegular,
        fontWeight:'400'
    },
})
