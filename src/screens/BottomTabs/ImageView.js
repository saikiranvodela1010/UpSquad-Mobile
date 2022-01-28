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
import GallerySwiper from "react-native-gallery-swiper";

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
        var result = imageURI
                .slice(0, -1)
                .map((item) => ({url : item}));
console.log(result);
        this.setState({imageURI: result, viewImage: imageURI[0]})
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
                <GallerySwiper
                images={this.state.imageURI}
                initialNumToRender={4}
                sensitiveScroll={true}
                pageMargin={30}
                resizeMode="contain"
                style= {{flex: 1, backgroundColor: "#FFFFFF"}}/> 
        </SafeAreaView>
        )

    }
}