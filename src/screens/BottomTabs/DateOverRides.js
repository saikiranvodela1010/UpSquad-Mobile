import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';

export default class GroupScreen extends React.Component {
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                
               
               <Text style={{marginTop:'7%',fontSize:14,fontWeight:'400',fontFamily:Fonts.mulishRegular,color:'#868585',marginLeft:'7%',marginRight:'7%'}}>
                   Add dates when your availability changes from your weekly hours</Text>
                   <Text style={{marginTop:'3%',fontSize:14,fontWeight:'600',fontFamily:Fonts.mulishRegular,color:'#58C4C6',marginLeft:'7%',marginRight:'7%'}}>
                   Add a date override </Text>
                   <View style={{marginTop:'62%'}}>
              <TouchableOpacity 
                        
                    >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </LinearGradient>
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
    },
    buttonText: {
        fontSize: 16,
        fontFamily:Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight:'600',
        // marginBottom:20
    },
    linearGradient: {
       
        width:'85%',
       
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
      
        marginLeft: 30,
        height: 55,
        marginRight: 30,
        
    },
})