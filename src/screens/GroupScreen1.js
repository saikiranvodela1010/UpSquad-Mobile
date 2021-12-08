import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class GroupScreen1 extends React.Component {
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('groupscreen')}>
                        <Image
                            source={ImagesWrapper.back}
                            style={{
                                marginTop: 6,
                                marginLeft: 20,
                                tintColor: '#000000',
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Create group</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
                <View style={styles.searchBorder}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image
                            source={ImagesWrapper.search}
                        />
                        <TextInput
                            placeholder='Search message'
                            style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, marginLeft: 20, marginTop: -10, fontWeight: '400' }}
                        >
                        </TextInput>
                    </View>
                </View>
                <Text style={{ color: '#1E1C24', fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', marginLeft: 30, marginTop: 20, marginBottom: 15 }}>Add participants</Text>
                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.chatimage}
                        />
                        <Text style={styles.name}>Kannie Sils</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.chatimage1}
                        />
                        <Text style={styles.name}>Jay Jay</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.notification}
                        />
                        <Text style={styles.name}>Katy Brown</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.notification1}
                        />
                        <Text style={styles.name}>Thomas White  </Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.chatimage}
                        />
                        <Text style={styles.name}>Kannie Sils</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.chatimage1}
                        />
                        <Text style={styles.name}>Jay Jay</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.notification}
                        />
                        <Text style={styles.name}>Katy Brown</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.notification1}
                        />
                        <Text style={styles.name}>Thomas White</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                        <Image
                            source={ImagesWrapper.chatimage}
                        />
                        <Text style={styles.name}>Kannie Sils</Text>
                    </View>
                    <View style={styles.border}></View>
                </ScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ borderWidth: 1, height: 50, width: '12%', borderRadius: 30, backgroundColor: '#58C4C6', borderColor: '#58C4C6', bottom: 40, right: 30, position: 'absolute' }} 
                    activeOpacity={0.5} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={ImagesWrapper.frontarrow}

                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        fontSize: 20,
        marginLeft: 20
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        color: '#1E1C24',
        fontFamily: Fonts.mulishSemiBold,
        marginTop: 'auto',
        marginBottom: 'auto',
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
})