import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, TouchableHighlightBase } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

var SampleArray = [];
export default class ChatScreen3 extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            tapText: '',
            test: [],
            value: 0,
            sendButton: false,
            scrollText: false,
        }
    }

    AddItemsToArray = () => {
        console.log("testing")

        var today = new Date(),
            //  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            time = today.getHours() + ':' + today.getMinutes();


        var obj = {
            type: this.state.tapText!= '' ? "tapText" : "msg",
            id: this.state.value + 1,
            timE: time,
            message: this.state.tapText!= '' ? this.state.tapText : this.state.Holder,
        }
        //Adding Items To Array.
        SampleArray.push(obj);
        // Showing the complete Array on Screen Using Alert.
        // Alert.alert(SampleArray.toString());
        console.log("array:", SampleArray)
        this.setState({ test: SampleArray })
        this.setState({ value: this.state.value + 1 })
        console.log("Value: " + (this.state.value + 1))
        // this.state.tapText = ''
        this.state.Holder = ''

    }

    async PdfFile() {
        console.log("Working")
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],

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
        //Opening Document Picker for selection of multiple file
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

            // var files = {
            //     uri: this.state.URI,
            //     type: this.state.Type,
            // }
            // console.log("filedata :", files)
            // FileArray.push( files );
            // console.log("filedata :", files)
            var today = new Date(),
                //  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                time = today.getHours() + ':' + today.getMinutes();


            var obj = {
                // type: this.state.document == false ? "msg" : "doc",
                type: "img",
                name: results[0].name,
                id: SampleArray.length + 1,
                // id : this.state.value + 1,
                uri: this.state.URI,
                timE: time,
                // message:this.state.Holder.toString()
            }

            //Adding Items To Array.
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

    render() {

        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
                <ScrollView >
                <View style={{ flex: 1, backgroundColor: '#EBF8F8',height:'100%' }}>
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
                    
            <View style={{ flex: 6, alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                    {this.state.test.map((item, key) => {
                        if (item.type == "doc") {
                            return (
                                <View style={{ flexDirection: 'column', alignItems: item.id % 2 == 0 ? 'flex-end' : 'flex-start', justifyContent: item.id % 2 == 0 ? 'flex-end' : 'flex-start' }}>

                                    <View style={{ flexDirection: 'row', borderWidth: 1, paddingTop: 10, width: 'auto', height: 50, borderRadius: 10, backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff", borderColor: '#ffffff', fontWeight: 'bold', fontSize: 16, marginLeft: 20, marginTop: 20 }}>
                                        <Image source={ImagesWrapper.sendimage}
                                            style={{ height: 20, width: 20, marginLeft: 10, marginRight: 10 }}
                                        />
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>

                                        <View>
                                            <Text style={{ marginLeft: 80, marginTop: 5 }}>{item.timE.toString()}</Text>
                                        </View>
                                        <View>
                                            <Image source={ImagesWrapper.image}
                                                style={{
                                                    tintColor: '#00bfff',
                                                    marginLeft: 8,
                                                    height: 15,
                                                    width: 20,
                                                    alignItems: 'flex-end'
                                                }}
                                            />
                                        </View>

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
                                        <View>
                                            <Text style={{ fontSize: 18 }}>{item.name}<Text style={{ marginLeft: 20 }}>{item.timE.toString()}</Text></Text>

                                        </View>

                                        <View>
                                            <Image source={ImagesWrapper.sendimage}
                                                style={{
                                                    tintColor: '#00bfff',

                                                    height: 15,
                                                    width: 20,
                                                    paddingTop: 10

                                                }}
                                            />
                                        </View>
                                    </View>

                                    {/* </View> */}
                                </View>

                            )
                        }
                        else if (item.type == "msg") {
                            return (
                                //     <View style={{ 
                                //         // flexDirection: 'row', 
                                //         // alignItems: item.id % 2 == 0 ? 'flex-start' : 'flex-end', 
                                //         // justifyContent: item.id % 2 == 0 ? 'flex-start' : 'flex-end', 
                                //         borderWidth: 1, 
                                //         padding: 5, 
                                //         borderRadius: 10, 
                                //         backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff", 
                                //         borderColor: '#E1EEC7', 
                                //         marginTop: 10, 
                                //         marginLeft: item.id % 2 == 0 ? 120 : 10,
                                //         marginRight: item.id % 2 == 0 ? 10 : 120
                                //         }}
                                //         >

                                //     <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20 }}>{item.message}</Text>

                                // </View>
                                <View style = {{flexDirection: 'row', justifyContent: item.id%2 == 0 ? 'flex-start' : 'flex-end', borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: item.id%2 ==0 ? "#E1EEC7" : "#ffffff", borderColor: '#E1EEC7'}}> 
                        
                          <View style = {{ marginTop: 5, flexDirection: 'row'}}>
                             <Text style = {{padding: 5, marginLeft:10, marginRight: 10}}>{item.message}</Text>
                        </View>
                             
                         </View>
                         
                        
                         
                               
                            )


                        }
                        else if (item.type == "tapText") {
                            return (
                                    <View style={{ 
                                        flexDirection: 'row', 
                                        alignItems: item.id % 2 == 0 ? 'flex-end' : 'flex-start', 
                                        justifyContent: item.id % 2 == 0 ? 'flex-end' : 'flex-start', 
                                        borderWidth: 1, 
                                        padding: 5, 
                                        borderRadius: 10, 
                                        backgroundColor: item.id % 2 == 0 ? "#E1EEC7" : "#ffffff", 
                                        borderColor: '#E1EEC7', 
                                        marginTop: 10, 
                                        marginLeft: item.id % 2 == 0 ? 120 : 10,
                                        marginRight: item.id % 2 == 0 ? 10 : 120
                                        }}
                                        >

                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20 }}>{item.message}</Text>

                                </View>
                               
                            )


                        }


                    }
                   

                    )}
                     </View>


                   

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <View style={{ flexDirection: 'row' }}>
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
                                multiline = {true}
                                value = {this.state.Holder}
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
                                                onPress={() => {
                                                    ImagePicker.openCamera({
                                                        width: 300,
                                                        height: 300,
                                                        cropping: true,
                                                        freeStyleCropEnabled: true,
                                                        // multiple:true
                                                    })
                                                        .then((image) => {
                                                            console.log('images', image);

                                                        })
                                                        .catch((error) => {
                                                            console.log('error', error)
                                                        });

                                                }}
                                            >
                                                <View style={{ flexDirection: 'column' }}>
                                                    <View>
                                                        <Image
                                                            source={ImagesWrapper.camera}

                                                        />
                                                    </View>
                                                    {/* <Text style={[styles.popupText, { marginLeft: 10 }]}>Camera</Text> */}
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.ImageFile()}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <View >
                                                        <Image
                                                            source={ImagesWrapper.gallery}

                                                        />
                                                    </View>
                                                    {/* <Text style={[styles.popupText, { marginLeft: 10 }]}>Gallery</Text> */}
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={styles.popupImage}>
                                                    <Image
                                                       source={ImagesWrapper.audio}

                                                    />
                                                </View>
                                                <Text style={[styles.popupText, { marginLeft: 15 }]}>Audio</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.PdfFile()}>
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
                                source={ImagesWrapper.cameraimage}
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
                        <View style = {{justifyContent: 'center'}}>
                        {this.state.sendButton === true || this.state.Holder != null?
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

                </ScrollView>
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
        marginBottom: 20
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