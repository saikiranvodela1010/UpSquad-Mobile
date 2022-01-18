import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity, Image,TextInput,SafeAreaView,Platform,FlatList, ScrollView, DeviceEventEmitter,Modal,ActivityIndicator} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import moment from 'moment';
import StoragePrefs from '../../res/StoragePrefs';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'native-base';
// // import { Container, Header, Content, Picker, Form } from 'native-base';
// import { Icon, Select ,Container, Header, Content, Picker, Form} from 'native-base';
export default class CreatePostScreen extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            categoryDropDown: ""
        }
    }

    async componentDidMount(){

        console.log("CreatePostScreen");
    }
    onValueChange(value) {
        this.setState({
            categoryDropDown: value,
        });
      }

    renderHeader = ()=> {
        return(
            <SafeAreaView style = {{ flexDirection : 'column'}}>
                <View style={{ flexDirection : 'row',alignContent: 'center',backgroundColor:'#FFFFFF'}}>
                  <TouchableOpacity onPress={()=> this.props.navigation.goBack(null)}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 6,
                            marginLeft: 20,
                            tintColor: '#000000',
                        }}
                    />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: "600" ,color:'#1E1C24',lineHeight:25.1,marginLeft: '5%',marginTop: '1%' }}>New Post</Text>
                    
            </View>
            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
            </SafeAreaView>
        )
    }
    renderLoader(){
        return(
            <Modal transparent={true}
                visible={this.state.isLoading}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10
                }}>
                    <View style={{
                        width: "25%",
                        height: "10%",
                        borderWidth: 1,
                        borderRadius: 5,borderColor: "#58C4C6",marginBottom: 10 ,backgroundColor: '#58C4C6',justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <SafeAreaView style = {{backgroundColor : '#FFFFFF',flex: 1}}>
                {this.renderHeader()}
                {this.renderLoader()}
                <View style = {{margin:24}}>
                    <View ><Text style = {styles.name}>{"Choose a Photo"}</Text></View>
                    <View style = {{flexDirection:'row',marginTop:16,marginLeft: 10}}>
                        <Image source={ImagesWrapper.camera} style = {{size: 59}}></Image>
                        <Image source={ImagesWrapper.gallery} style = {{size: 59,marginLeft: 24}}></Image>
                    </View>
                    <View style = {{marginTop:46}}>
                        <TextInput style={[styles.name,{marginBottom: '1%'}]}
                        
                        returnKeyType={"done"}
                        placeholder="Description"
                        placeholderTextColor='#868585'
                        placeholderStyle={styles.placeholderstyle}></TextInput>
                        <View style={styles.underline}/>
                    </View>
                    <View style = {{marginTop:24}}>
                        <Text style = {styles.name}>{"Category"}</Text>
                    </View>
                    <View>
                        <Picker
                            note
                            mode='dropdown'
                            iosIcon = {
                                <Icon name = "arrow-down"/>
                            }
                            selectedValue={this.state.categoryDropDown}
                            style={{ height: 50, width: 300 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({categoryDropDown: itemValue})}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
                


            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    name: {
        color:'#1E1C24',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'600',
        padding: 2,
        marginLeft:8,
        fontSize:16
        
    },
    placeholderstyle : {
        color:'#868585',
        fontFamily:Fonts.mulishRegular,
        fontWeight:'400',
        marginBottom: 110,
        padding: 2,
        marginLeft:8,
        fontSize:14,
        lineHeight:17.57

    },
    underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'2%',
        marginTop:Platform.OS==='ios' ? '1%':'-3%',
        marginRight:'10%'

    },
})