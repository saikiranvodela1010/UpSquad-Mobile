import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity,Image, ImageBackground} from 'react-native';
import { DrawerContentScrollView,DrawerItem  } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Drawer} from 'react-native-paper'
import ImagesWrapper from './ImagesWrapper';
import Fonts from './Fonts'
import StoragePrefs from './StoragePrefs';


export default class DrawerContent extends React.Component {

    storagePrefs = new StoragePrefs();

    constructor(props) {
        super(props);

        this.state = {
            userName:''
        }
       
    }
    async componentDidMount(){
        // console.log('userDetails----',userDetails);
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        console.log('userDetails',userDetails);
        this.setState({userName:userDetails.userName});
    }
    async componentDidUpdate() {
        // console.log('userDetails----',userDetails);
        const userDetails = await this.storagePrefs.getObjectValue("userDetails")
        // console.log('userDetails',userDetails);
        this.setState({userName:userDetails.userName});
    }
    render(){
       
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView > 
                    <View style={{flex:1,backgroundColor:'#EBF8F8',marginTop:-3,height:'100%'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                      <View>
                    <View style = {styles.displayimage}></View>
                    <Text style={styles.userName}>{this.state.userName}</Text>
                    </View>
                   
                    <View style={{alignItems:'flex-end'}}>
                    <Image  source={ImagesWrapper.toppngdrawer}  resizeMode="cover" style={{opacity:Platform.OS === "ios" ?0.1:0.4,marginLeft:-100}} tintColor="#58C4C6"/>
                    </View>
                    </View>
                  
                    </View>
                    <Drawer.Section style={{marginTop:15}}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('switchcommunity')}}>
                       <View style={{flexDirection:'row',margin:20,marginLeft:30}} >
                        <Image source={ImagesWrapper.recentactivity}/>
                        <Text style={{fontSize:14,fontWeight:'600',fontFamily:Fonts.mulishRegular,marginLeft:20,textAlign:'center',marginTop:3}}>Recent activity</Text>
                  
                     </View> 
                     </TouchableOpacity>
                    </Drawer.Section> 
                    <Drawer.Section >
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('switchcommunity')}}>
                       <View style={{flexDirection:'row',margin:20,marginLeft:30}} >
                        <Image source={ImagesWrapper.usersthree}/>
                        <Text style={{fontSize:14,fontWeight:'600',fontFamily:Fonts.mulishRegular,marginLeft:20,textAlign:'center',marginTop:3}}>Switch community</Text>
                    
                     </View> 
                     </TouchableOpacity>
                    </Drawer.Section> 
                    <Drawer.Section >
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('SeetingScreen')}}>
                       <View style={{flexDirection:'row',margin:20,marginLeft:30}} >
                        <Image source={ImagesWrapper.settings}/>
                        <Text style={{fontSize:14,fontWeight:'600',fontFamily:Fonts.mulishRegular,marginLeft:20,textAlign:'center',marginTop:3}}>Settings</Text>
                    
                     </View> 
                     </TouchableOpacity>
                    </Drawer.Section> 
                    <Drawer.Section >
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('switchcommunity')}}>
                       <View style={{flexDirection:'row',margin:20,marginLeft:30}} >
                        <Image source={ImagesWrapper.question}/>
                        <Text style={{fontSize:14,fontWeight:'600',fontFamily:Fonts.mulishRegular,marginLeft:20,textAlign:'center',marginTop:3}}>FAQ</Text>
                   
                     </View> 
                     </TouchableOpacity>
                    </Drawer.Section> 
                    {/* <Drawer.Section/> */}
                </DrawerContentScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
displayimage: {
    borderWidth: 1,
    height: 45,
    width: 45,
    borderRadius: 25,
    // alignItems:'center'
    // justifyContent:'center'
    marginTop:50,
    marginRight:-20,
    marginLeft:20
},
userName:{
    fontFamily:Fonts.mulishSemiBold,
    fontSize:16,
    fontWeight:'600',
    marginLeft:20,
    color:'#1E1C24',
    width:150,
    marginTop:5
    // width:'10%',
}
});