import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList,ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


export default class GroupScreen2 extends React.Component {

    render() {
        const { navigation } = this.props;  
        const selectedList = this.props.route.params.participants  
        //console.log(user_name)
        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('groupscreen1')}>
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
                <View style={{flexDirection:'row',alignItems:'center',marginTop:'5%',marginLeft:30}}>
                    <TouchableOpacity
                    // onPress={() => {
                    //     ImagePicker.openCamera({
                    //         width: 300,
                    //         height: 300,
                    //         cropping: true,
                    //         freeStyleCropEnabled: true,
                    //         // multiple:true
                    //     })
                    //         .then((image) => {
                    //             console.log('images', image);

                    //         })
                    //         .catch((error) => {
                    //             console.log('error', error)
                    //         });

                    // }}
                    >
                <ImageBackground source={ImagesWrapper.profileimage} style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
                    <Image source={ImagesWrapper.pcamera}></Image>
                    </ImageBackground>
                    </TouchableOpacity>
                    
                    
                    <View style={styles.underline}>
                    <TextInput
                        style={styles.textinput} />
                   </View>
                   
                    <View style={{marginLeft:25}}>
                    <Image source={ImagesWrapper.smiley} ></Image> 
                    </View>
                </View>
                <View style={{marginLeft:30,paddingTop:'4%',marginBottom:'7%'}}>
                    <Text style={styles.staticText}>Provide a group subject and optional group icon</Text>
                </View>
                <View style={{flexGrow:1,backgroundColor:'#E5E5E5'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('removeuser')}>
                    <View style={{alignItems:'flex-end',right:15}}>

                <Image
        source={ImagesWrapper.tick} 
        style={{
          position: 'absolute',
          top: -25,
        }} 
        />
        </View>
        </TouchableOpacity>
                    <View style={{marginLeft:30,marginTop:'5%'}}>
                 <Text style={styles.participants}>Participants: {selectedList.length}</Text>
                 </View>
                 {selectedList==''?null:
            <View style={{flexDirection:'row',marginLeft:30,marginTop:'4%'}}>
            { selectedList.map((item,index)=>
             {
               return(
              <View style={{}}>
                   <View style={styles.listItem}> 
               </View>
               <Text style={styles.name}>{item.name}</Text>
               </View>
             
             
             
                
               )
             })}
            
             </View>
            }
                 
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
        color:'#1E1C24',
        fontFamily:Fonts.mulishRegular,
        fontSize:12,
        fontWeight:'400',
        paddingTop:4
    },
    
    
    
    textinput:{
        
        marginBottom:-10,
        
        height:40,
        fontFamily: Fonts.mulishRegular,
        fontWeight:'400',
        fontSize:14,
        color:'#1E1C24',
        width:'40%'
    },
    underline:{
        borderBottomColor: '#58C4C6',
        borderBottomWidth: 1,
        width:'65%',
        marginLeft:'5%',
        
    },
    staticText:{
        fontFamily:Fonts.mulishRegular,
        fontSize:12,
        color:'#B1AAAA',
        fontWeight:'400'
    },
    participants:{
        color:'#1E1C24',
        fontSize:16,
        fontWeight:'600',
        fontFamily:Fonts.mulishRegular
    },
    listItem:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        marginLeft:'7%',
        alignItems:'flex-end',
        flexDirection:"row-reverse"
    }
})