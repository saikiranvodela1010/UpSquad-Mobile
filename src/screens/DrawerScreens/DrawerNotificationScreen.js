import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';


export default class DrawerNotificationScreen extends React.Component {






    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                         this.props.navigation.pop();
                        //</View>  this.props.navigation.navigate('BioSuccess');
                    }}>
                        <Image
                            source={ImagesWrapper.back}
                        // style={{marginLeft:25}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.memphistalk}>Notifications</Text>


                </View>
                <View style={styles.underline}></View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('EventNotification')
                        }}>
                        <Text style={styles.account}>Event</Text>
                    </TouchableOpacity>
                    <View style={[styles.underline, { width: '85%', marginLeft: 'auto', marginRight: 'auto' }]}></View>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('MeetingNotification')
                    }
                    }>
                        <Text style={styles.account}>Meeting</Text>
                    </TouchableOpacity>

                    <View style={[styles.underline, { width: '85%', marginLeft: 'auto', marginRight: 'auto' }]}></View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('MessageNotification')
                        }}>
                        <Text style={styles.account}>Message</Text>
                    </TouchableOpacity>

                    <View style={[styles.underline, { width: '85%', marginLeft: 'auto', marginRight: 'auto' }]}></View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('NotfctnPostComnt')
                        }}>

                        <Text style={styles.account}>Post & Comment</Text>
                    </TouchableOpacity>


                </View>
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
    underline: {
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft: 'auto',
        width: '100%',
        marginTop: 15
    },
    memphistalk: {
        fontSize: 20,
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '5%'
    },
    account: {
        fontSize: 14,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        color: '#1E1C24',
        marginLeft: '8%',
        marginTop: 30
    }
});