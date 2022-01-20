import React from 'react'
import {  View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    Platform,
    FlatList,
    ScrollView, 
    DeviceEventEmitter,
    Modal,
    ActivityIndicator,
    Switch} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import moment from 'moment';
import StoragePrefs from '../../res/StoragePrefs';
import {Icon} from 'native-base';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
export default class CreatePostScreen extends React.Component {
    serviceUrls = new ServiceUrls();
    apiHandler = new APIHandler();
    storagePrefs = new StoragePrefs();
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            categoryDropDown: "",
            isEnabled: false
        }
    }

    async componentDidMount(){

        console.log("CreatePostScreen");
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
        const placeholder = {
            label: 'Select category',
            value: null,
            color: '#9EA0A4',
            
          };
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
                        <Text style = {[styles.name,{fontSize: 20,lineHeight:20.08}]}>{"Category"}</Text>
                    </View>
                    <View style = {{marginLeft: 10,borderWidth: 1,borderColor:"#B1AAAA",borderRadius: 5,height: 38,marginTop: 16}}>
                        <RNPickerSelect
                            placeholder={placeholder}
                            items={[ { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },]}
                            onValueChange={value => {
                            this.setState({
                                categoryDropDown: value,
                            });
                            }}
                            style={pickerSelectStyles}
            
                        />
                    </View>
                    <View style = {{marginTop: 48,marginLeft: 10}}>
                        <TextInput style={[styles.name,{marginBottom: '1%'}]}
                        returnKeyType={"done"}
                        placeholder="Tag people"
                        placeholderTextColor='#868585'
                        placeholderStyle={styles.placeholderstyle}></TextInput>
                        <View style={styles.underline}/>
                    </View>
                    <View style = {{marginTop: 48,marginLeft: 10}}>
                        <TextInput style={[styles.name,{marginBottom: '1%'}]}
                        returnKeyType={"done"}
                        placeholder="Add Tags"
                        placeholderTextColor='#868585'
                        placeholderStyle={styles.placeholderstyle}></TextInput>
                        <View style={styles.underline}/>
                    </View>
                    <View style = {{ marginTop: 32,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                        <Text style = {[styles.name,{fontSize: 20,lineHeight:20.08}]}>{"Publish post as anonymous"}</Text>
                        <Switch
                            trackColor={{ false: "#B1AAAA", true: "#81b0ff" }}
                            thumbColor={this.state.isEnabled ? "#f5dd4b" : "#B1AAAA"}
                            //ios_backgroundColor="#B1AAAA"
                            //onValueChange={toggleSwitch}
                            value={this.state.isEnabled}
                        />
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#B1AAAA',
      borderRadius: 4,
      color: '#9F9F9F',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#B1AAAA',
      borderRadius: 8,
      color: '#9F9F9F',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  