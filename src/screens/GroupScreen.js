import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import Fonts from '../res/Fonts';
import ImagesWrapper from '../res/ImagesWrapper';


export default class GroupScreen extends React.Component {
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('groupsearch')}>
                <View style={styles.searchBorder}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, alignItems: 'center' }}>
                        <Image
                            source={ImagesWrapper.search}
                            style={{marginTop:4,marginRight:5}}
                        />
                        
                        <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginLeft: 5}}>Search contact</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <ScrollView>
                <TouchableOpacity onPress = {() => {this.props.navigation.navigate('groupchat')}}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                   
                    <View style = {styles.displayimage}></View>
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={styles.name}>Friends</Text>
                        <Text style={styles.nameText}>202-555-0197: Hey! Just wan...</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={{ color: '#212B68', fontFamily: Fonts.mulishRegular }}>19:16</Text>
                        <View style={[styles.number, {marginLeft: 10}]}>
                            <Text style={{ color: '#FFFFFF', fontFamily: Fonts.mulishRegular }}>2</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    
                    <View style = {styles.displayimage}></View>
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={styles.name}>Fund raising strategies</Text>
                        <Text style={styles.nameText}>202-555-0197: May I ask you...</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={{ color: '#212B68', fontFamily: Fonts.mulishRegular }}>18:48</Text>
                        <View style={[styles.number, {marginLeft: 10}]}>
                            <Text style={{ color: '#FFFFFF', fontFamily: Fonts.mulishRegular }}>1</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    {/* <Image
                        source={require('./images/groupimage2.png')}
                    /> */}
                    <View style = {styles.displayimage}></View>
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={styles.name}>Business goals for 2021</Text>
                        <Text style={styles.nameText}>202-555-0197: You were lit!...</Text>
                    </View>
                </View>
                <View style={styles.border}></View>
                </ScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ borderWidth: 1, height: 50, width: '40%', borderRadius: 30, backgroundColor: '#58C4C6', borderColor: '#58C4C6', bottom: 40, right: 30, position: 'absolute'}} activeOpacity = {0.5} onPress={() => this.props.navigation.navigate('groupscreen1')}>
                        <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image
                                    source={ImagesWrapper.plusimage}
                                />
                                <Text style={{ color: '#FFFFFF', fontFamily: Fonts.mulishRegular, fontSize: 14, fontWeight: '600', marginTop: 3, marginLeft: 5 }}>Create group</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    searchBorder: {
        borderWidth: 1.5,
        height: 50,
        width: '85%',
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        borderColor: '#F1F1F1',
        backgroundColor: 'rgba(241, 241, 241, 0.25)'
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
        color: '#868585',
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
        height: 25,
        width: '68%',
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