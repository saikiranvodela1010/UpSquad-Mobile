import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class GroupScreen extends React.Component {
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={styles.searchBorder}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image
                            source={ImagesWrapper.search}
                            style={{ marginTop: 4 }}
                        />
                        <TextInput
                            placeholder='Search message'
                            style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, marginLeft: 4, marginBottom: 2, fontWeight: '400' }}
                        >
                        </TextInput>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.groupimage}
                        />
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Friends</Text>
                            <Text style={styles.nameText}>202-555-0197: Hey! Just wan...</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ color: '#212B68', }}>19:16</Text>
                            <View style={styles.number}>
                                <Text style={{ color: '#FFFFFF' }}>2</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.groupimage1}
                        />
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Fund raising strategies</Text>
                            <Text style={styles.nameText}>202-555-0197: May I ask you...</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ color: '#212B68', }}>18:48</Text>
                            <View style={styles.number}>
                                <Text style={{ color: '#FFFFFF' }}>1</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.groupimage2}
                        />
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Business goals for 2021</Text>
                            <Text style={styles.nameText}>202-555-0197: You were lit!...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                </ScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ borderWidth: 1, height: 50, width: '40%', borderRadius: 30, backgroundColor: '#58C4C6', borderColor: '#58C4C6', bottom: 40, right: 30, position: 'absolute' }}
                     activeOpacity={0.5} >
                        <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image
                                    source={ImagesWrapper.plusimage}
                                />
                               
                                <Text style={{ color: '#FFFFFF', fontFamily: Fonts.mulishRegular, fontSize: 14, fontWeight: '600', marginTop: 3, marginLeft: 5 }} >Create group</Text>
                               
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
    }
})