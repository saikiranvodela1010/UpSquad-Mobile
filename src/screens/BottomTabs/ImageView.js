import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity, Image,TextInput,SafeAreaView,Platform,FlatList, DeviceEventEmitter,ActivityIndicator,Dimensions} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import Svg, { G, Circle } from "react-native-svg";
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal';
import ServiceUrls from '../../network/ServiceUrls';
import APIHandler from '../../network/NetWorkOperations';
import moment from 'moment';
import StoragePrefs from '../../res/StoragePrefs';
import Share from 'react-native-share';
import { forEach } from 'lodash';
import axios from 'axios';
import { SliderBox } from "react-native-image-slider-box";
import FbGrid from "react-native-fb-image-grid";
import { Center } from 'native-base';
import Swiper from 'react-native-swipe-image';

export class ImageView extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            imageURI: [],
            viewImage: ''
        }
    }
    componentDidMount(){
        const imageURI = this.props.route.params.url
        for(i=0;i<imageURI.length;i++){
            
        }
        this.setState({imageURI: imageURI, viewImage: imageURI[0]})
    }

    bottom(e) {
        alert('Swipe Bottom')
      }
     
      top(e) {
        alert('Swipe Top')
      }
    renderHeader = ()=> {
        return(
            <SafeAreaView style = {{ flexDirection : 'column'}}>
                <View style={{ flexDirection : 'row',alignContent: 'center',backgroundColor:'#FFFFFF',alignItems: 'center', justifyContent:  'flex-start',marginTop: '3%'}}>
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
                    
            </View>
            <View style={{ borderWidth: 1, borderColor: '#F1F1F1',marginTop:22}}></View>
            </SafeAreaView>
        )
    }
    render(){
        return(
            <SafeAreaView style = {{backgroundColor : '#FFFFFF',flex: 1}}>
                {this.renderHeader()}
                <Swiper
                images={this.state.imageURI}
                swipeBottom={(e) => this.bottom(e)}
                swipeTop={(e) => this.top(e)}
                imageHeight={'50%'}/>
                {/* <Image source = {{uri: this.state.viewImage}}
                    style = {{width : Dimensions.get('window').width,alignContent: 'center', height: '80%'}}/>
                <View style = {{flexDirection: 'row',alignContent:'space-between',}}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 20,
                            marginLeft:'25%',
                            tintColor: '#000000', 
                        }}
                        onPress={()=>this.onNextPressed()}
                    />
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 20,
                            marginLeft: '35%',
                            tintColor: '#000000',
                            transform: [
                                { scaleX: -1 }
                              ]
                        }}
                    /> */}
                
        </SafeAreaView>
        )

    }
}