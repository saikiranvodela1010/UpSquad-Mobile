import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, ListView } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';
import { ScrollView } from 'react-native-gesture-handler';

export default class NotificationScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profilesuccess')}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 6,
                            marginLeft: 20,
                            tintColor: '#000000',
                        }}
                    />
                    </TouchableOpacity>
                    <Text style={styles.title}>Notifications</Text>
                </View>
                <ScrollView>
                <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={styles.text1}>You have an upcoming meeting</Text>
                        <Text style={styles.text1}>with <Text style={styles.text2}>Katy Brown</Text></Text>
                    </View>
                    <Text style={styles.minutes}>22m</Text>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification1}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={[styles.text2, { marginLeft: 20 }]}>Thomas White <Text style={styles.text1}>commented on </Text></Text>
                        <Text style={styles.text1}>your post </Text>
                    </View>
                    <Text style={styles.minutes}>42m</Text>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={styles.text1}>You have an upcoming meeting</Text>
                        <Text style={styles.text1}>with <Text style={styles.text2}>Ann Marie</Text></Text>
                    </View>
                    <Text style={styles.minutes}>51m</Text>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={[styles.text2, { marginLeft: 20 }]}>Annie Marie <Text style={styles.text1}>liked your post</Text></Text>
                    </View>
                    <Text style={styles.minutes}>1h</Text>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={[styles.text2, { marginLeft: 20 }]}>Pooja Rathod <Text style={styles.text1}>commented on </Text></Text>
                        <Text style={styles.text1}>your post </Text>
                    </View>
                    <Text style={styles.minutes}>2h</Text>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={[styles.text2, { marginLeft: 20 }]}>Pooja Rathod <Text style={styles.text1}>liked your post</Text></Text>
                    </View>
                    <Text style={styles.minutes}>1d</Text>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification2}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={styles.text1}>You have an upcoming event</Text>
                    </View>
                    <Text style={styles.minutes}>4d</Text>
                </View>
                <View style={styles.border}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={ImagesWrapper.notification}
                        style={{ marginLeft: 30 }}
                    />
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Text style={styles.text1}>You have an upcoming meeting</Text>
                        <Text style={styles.text1}>with <Text style={styles.text2}>Kesha Rice</Text></Text>
                    </View>
                    <Text style={styles.minutes}>1w</Text>
                </View>
                </ScrollView>
                {/* <View style = {{borderWidth: 1, borderColor: '#F1F1F1', width: 400, marginLeft: 'auto', marginRight: 'auto'}}></View> */}
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
        marginLeft: 20,
        marginTop: 5
    },
    text1: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 20,
        color: '#868585',
        fontFamily: Fonts.mulishRegular
    },
    text2: {
        fontFamily: Fonts.mulishBold,
        fontSize: 14,
        fontWeight: '400',

    },
    minutes: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: Fonts.mulishRegular

    },
    border: {
        borderWidth: 1,
        borderColor: '#F1F1F1',
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})