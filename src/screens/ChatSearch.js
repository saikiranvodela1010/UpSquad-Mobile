import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


export default class ChatSearch extends React.Component {
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('chatscreen1')}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 6,
                            marginLeft: 20,
                            tintColor: '#000000',
                        }}
                    />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Search..."
                        style={styles.title}
                    >
                    </TextInput>
                </View>
                <ScrollView>
                    <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Kannie Sils</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ color: '#212B68', }}>3:00</Text>
                            <View style={[styles.number, {marginLeft: 10}]}>
                                <Text style={{ color: '#FFFFFF' }}>1</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage1.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ color: '#212B68', }}>3:00</Text>
                            <View style={[styles.number, {marginLeft: 10}]}>
                                <Text style={{ color: '#FFFFFF' }}>1</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage1.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Kannie Sils</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage1.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage1.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Kannie Sils</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage1.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        {/* <Image
                            source={require('./images/chatimage1.png')}
                        /> */}
                        <View style = {styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        color: '#868585',
        fontSize: 14,
        marginLeft: 20,
        marginTop: -10
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        color: '#1E1C24',
        fontFamily: Fonts.mulishRegular
    },
    nameText: {
        fontFamily: Fonts.mulishRegular,
        fontSize: 14,
        fontWeight: '400',
        color: '#636363',
        marginLeft: 20,
        marginTop: 5
    },
    time: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column'

    },
    border: {
        borderWidth: 1,
        borderColor: '#F1F1F1',
        width: '87%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    number: {
        borderWidth: 1,
        height: 20,
        width: '70%',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#212B68',
        borderColor: '#212B68',
        marginTop: 5
    },
    displayimage: {
        borderWidth: 1, 
        height: 45, 
        width: 45, 
        borderRadius: 25
    }
})