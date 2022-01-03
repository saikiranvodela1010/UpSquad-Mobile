import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView,Keyboard } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';

export default class PlayersScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                 <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5 }}>
                    <TouchableOpacity onPress = {() => {
                        Keyboard.dismiss
                        this.props.navigation.navigate('tabbar1')
                        }}>
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
                <View style={[styles.underline]}></View>
                <ScrollView>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('playersDetail')}>

                <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 20,marginLeft:30 }}>
                    
                    <View style = {styles.displayimage}></View>
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                    
                        <Text style={styles.name}>Kannie Sils</Text>
                    
                        <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                        <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                    </View>
                    <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                </ScrollView>
                
            </View>


        )
    }
}

const styles = StyleSheet.create({
    searchBorder: {
        borderWidth: 1.5,
        height: 50,
        width: '89%',
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
        marginRight: 20,
        

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
    },
    title: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '400',
        color: '#868585',
        fontSize: 14,
        marginLeft: 20,
        marginTop: -5,
    },
    underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        // marginTop:20,
        marginRight:'auto',
        width:'100%'
    },
})