import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class ChatScreen1 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('chatsearch')}>
                <View style={styles.searchBorder}>
               
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image
                            source={ImagesWrapper.search}
                            style={{ marginTop: 4, marginRight: 5 }}
                        />
                       
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: 'Mulish-Regular', fontWeight: '400', marginLeft: 5,marginTop:5}}>Search message</Text>
                        
                    </View>
                    
                </View>
                </TouchableOpacity>
                <ScrollView>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('messagescreen')}>

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
                </TouchableOpacity>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ color: '#212B68', }}>3:00</Text>
                            <View style={[styles.number,{marginLeft:10}]}>
                                <Text style={{ color: '#FFFFFF' }}>1</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>Hey! just wanna share with...</Text>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                </ScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={()=>{
                         this.props.navigation.navigate('Bio');
                     }} style={{ bottom: 40, right: 30, position: 'absolute' }} activeOpacity={0.5}>
                        <Image
                            source={ImagesWrapper.editimage}
                            style={{ height:70,width:70 }}
                        />
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
        fontFamily: Fonts.mulishSemiBold
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
        borderRadius: 25,
        // marginLeft:30
    }
})