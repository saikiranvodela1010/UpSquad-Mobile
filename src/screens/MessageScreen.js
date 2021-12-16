import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, TouchableHighlightBase, FlatList, SafeAreaView, KeyboardAvoidingView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


// var SampleArray = [{type: "msg", timE: "time", message: "hai"}];
var SampleArray = [];
export default class MessageScreen extends React.Component {
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
        }
    }



    AddItemsToArray = () => {
        console.log("testing")
        if (SampleArray.length === 0) {
            var newobj = {
                type: "today",
            }
            SampleArray.push(newobj);
        }
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
        console.log("1")
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],

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
                type: "img",
                name: results[0].name,
                id: SampleArray.length + 1,
                uri: this.state.URI,
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
                this.setState({ cameraImage: image })
            })
            .catch((error) => {
                console.log('error', error)
            });

        var obj = {
            id: SampleArray.length + 1,
            type: "cameraimg",
            uri: this.state.cameraImage?.path,

        }

        SampleArray.push(obj);
        console.log("array:", SampleArray)
        this.setState({ test: SampleArray })
        this.setState({ value: this.state.value + 1 })
        console.log("Value: " + (this.state.value + 1))

    }



    render() {


        // const DATA = [
        //     {
        //       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        //       title: 'First Item',
        //     },
        //     {
        //       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        //       title: 'Second Item',
        //     },
        //     {
        //       id: '58694a0f-3da1-471f-bd96-145571e29d72',
        //       title: 'Third Item',
        //     },
        //   ];

        const renderItem = ({ item }) => {
            if (item.type == "doc") {
                return (
                    <View style={{ flexDirection: 'column', alignItems: item.id % 2 == 0 ? 'flex-end' : 'flex-start', justifyContent: item.id % 2 == 0 ? 'flex-end' : 'flex-start' }}>

                        <View style={{ flexDirection: 'row', borderWidth: 1, paddingTop: 10, width: 'auto', height: 50, borderRadius: 10, backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff", borderColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff", fontWeight: 'bold', fontSize: 16, marginLeft: 20, marginTop: 20 }}>

                            <Text style={{ color: '#1E1C24', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>{item.name}</Text>

                            {/* <View>
                                <Text style={{ marginLeft: 80, marginTop: 5 }}>{item.timE.toString()}</Text>
                            </View> */}


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
                            {/* <View>
                                <Text style={{ fontSize: 18 }}>{item.name}<Text style={{ marginLeft: 20 }}>{item.timE.toString()}</Text></Text>

                            </View>

                            <View>
                                <Image source={require('./images/sendimage.png')}
                                    style={{
                                        tintColor: '#00bfff',

                                        height: 15,
                                        width: 20,
                                        paddingTop: 10

                                    }}
                                />
                            </View> */}
                        </View>


                    </View>

                )
            }
            else if (item.type == "msg") {
                return (

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: item.id % 2 != 0 ? 'flex-start' : 'flex-end',
                            borderWidth: 1,
                            padding: 5,
                            // borderRadius: 10, 
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff",
                            borderColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff",
                            marginLeft: item.id % 2 != 0 ? 120 : 10,
                            marginRight: item.id % 2 != 0 ? 10 : 120,
                            marginTop: 10
                        }}
                    >

                        <View style={{ marginTop: 5, flexDirection: 'row' }}>
                            {/* <Text  style={{color: '#1E1C24', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular}}>{getNumberOfLines(item.message, 14, 1.2, Dimensions.get('window').width-120)}</Text> */}
                            <Text style={{ color: '#1E1C24', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>{item.message}</Text>
                        </View>

                    </View>




                )


            }
            else if (item.type == "holderText") {
                return (

                    <View style={{
                        flexDirection: 'row',
                        alignItems: item.id % 2 != 0 ? 'flex-end' : 'flex-start',
                        justifyContent: item.id % 2 == 0 ? 'flex-end' : 'flex-start',
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff",
                        borderColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff",
                        marginTop: 10,
                        marginLeft: item.id % 2 != 0 ? 120 : 10,
                        marginRight: item.id % 2 != 0 ? 10 : 120
                    }}

                    >

                        <Text style={{ color: '#1E1C24', fontSize: 14, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>{item.message}</Text>

                    </View>

                )


            }
            else if (item.type == "today") {
                return (
                    <View style={{ borderWidth: 1, height: 30, width: '20%', alignItems: 'center', marginRight: 'auto', marginLeft: 'auto', marginTop: 10, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', borderRadius: 12, justifyContent: 'center' }}>
                        <Text style={{ color: '#868585', fontSize: 12, fontWeight: '400', fontFamily: Fonts.mulishRegular }}>TODAY</Text>
                    </View>
                )
            }
            else if (item.type == "cameraimg") {
                return (

                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: item.id % 2 == 0 ? 'flex-end' : 'flex-start',
                        justifyContent: item.id % 2 == 0 ? 'flex-end' : 'flex-start',
                        
                        borderRadius: 10,
                        
                        marginTop: 10,
                        marginLeft: item.id % 2 != 0 ? 120 : 10,
                        marginRight: item.id % 2 != 0 ? 10 : 120
                    }}
>

                        <Image source={{ uri: item.uri }}
                            style={{
                                width: '60%',
                                height: 120,
                                marginTop: 20,
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

        // onLayout = e => {
        //     const { height } = e.nativeEvent.layout;
        //     this.count = Math.floor(height / styles.text.lineHeight)
        // }

        return (

            <SafeAreaView >
                <View style={{ width: '100%', height: '8%', backgroundColor: '#FFFFFF' }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, height: 70, width: '100%', alignItems: 'center', borderColor: '#F1F1F1' }}>
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
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.text}>John Croft</Text>
                            <Text style={{ fontFamily: Fonts.mulishRegular, fontSize: 12, fontWeight: '400', marginLeft: 10, color: '#868585' }}>last seen 1 hour ago</Text>
                        </View>
                        <Image
                            source={ImagesWrapper.contactimage}
                            style={{
                                marginLeft: '25%'
                            }}
                        />
                        <Image
                            source={ImagesWrapper.menuimage}
                            style={{
                                marginLeft: 20
                            }}
                        />

                    </View>
                </View>

                <View style={{ height: '92%', backgroundColor: '#EBF8F8' }}>
                    {/* <Text>hai</Text> */}
                    {/* <View style={{ height: '10%' }}>
                        <Text>hai</Text>
                    </View> */}
                    {this.state.scrollText === false ?
                        <View>
                            <Text style={[styles.text, { marginTop: 20, marginLeft: 20 }]}>Ice-breakers to start a conversation</Text>

                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            // onScroll={Animated.event([], {listener: (event) => {
                            //     console.log('scroll',event.nativeEvent.contentOffset.x);
                            // }})}

                            // scrollEventThrottle={16} 
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={styles.border}>
                                            <Text style={styles.borderText}>Hello, Kannie Sils. So, what brings you to this app?</Text>
                                        </View>
                                        <TouchableOpacity

                                            onPress={() => {
                                                this.setState({ scrollText: true }),
                                                    this.setState({ sendButton: true }),
                                                    this.setState({ Holder: 'Hello, Kannie Sils. So, what brings you to this app?' })
                                            }
                                            }
                                        >

                                            <Text style={styles.tapText}>Tap & write</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={styles.border}>
                                            <Text style={styles.borderText}>Hey! John Croft. It seems we have similar interests. Want to meet up?</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            // this.setState({tapText: ''})
                                            this.setState({ scrollText: true }),
                                                this.setState({ sendButton: true }),
                                                this.setState({ Holder: 'Hey! John Croft. It seems we have similar interests. Want to meet up?' })
                                        }
                                        }>
                                            <Text style={styles.tapText}>Tap & write</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={[styles.border, { marginRight: 20 }]}>
                                            <Text style={styles.borderText}>Hey! Kannie Sils. It seems we have similar interests. Want to meet up?</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            // this.setState({tapText: ''})
                                            this.setState({ scrollText: true }),
                                                this.setState({ sendButton: true }),
                                                this.setState({ Holder: 'Hey! Kannie Sils. It seems we have similar interests. Want to meet up?' })
                                        }
                                        }>
                                            <Text style={styles.tapText}>Tap & write</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        null
                    }
                    {/* <FlatList
                        style={{ height: '80%' }}
                    /> */}
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
                    <View style={{ height: '10%' }}>
                        <View style={{ flexDirection: 'row', minHeight: 50 }}>
                            <View style={styles.chatText}>
                                <Image
                                   source={ImagesWrapper.emoji}
                                    style={{
                                        marginRight: 15
                                    }}
                                />

                                <TextInput

                                    placeholder="Type a message"
                                    onChangeText={TextInputValue => this.setState({ Holder: TextInputValue })}
                                    multiline={true}
                                    // value={this.state.ScrollView === true ? this.state.Holder : this.state.tapText}
                                    value={this.state.Holder}
                                    style={{
                                        fontFamily: Fonts.mulishRegular,
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#868585',
                                        width: '40%',

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
                                                    // onPress={() => this.cameraOnpress()}
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
                                                // onPress={() => this.ImageFile()}
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
                                    <TouchableOpacity onPress={this.AddItemsToArray}>
                                        <Image
                                            source={ImagesWrapper.sendimage}
                                            style={{
                                                marginRight: 20,
                                                marginTop: 5
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



            </SafeAreaView>
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
        borderRadius: 10,
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
        marginBottom: 20,
        // minHeight: 50,
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
    }
})
