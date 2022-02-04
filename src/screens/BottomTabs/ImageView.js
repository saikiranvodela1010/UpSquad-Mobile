import React from 'react'
import {  View, Text, StyleSheet, TouchableOpacity, Image,TextInput,SafeAreaView,Platform,FlatList, DeviceEventEmitter,ActivityIndicator,Dimensions} from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';

import FbGrid from "react-native-fb-image-grid";
import GallerySwiper from "react-native-gallery-swiper";
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
        const result=[];
        // var result = imageURI
        //         .slice(0, -1)
        //         .map((item) => ({url : item}));
        for(i=0;i<imageURI.length;i++){
            result.push({url:imageURI[i]})
        }
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
            <>
            
            </>
                
        )
    }
    render(){
        return(
            <SafeAreaView style = {{flex: 1}}>
                <View style={{flexDirection : 'row',alignContent: 'center',backgroundColor:'transperant',alignItems: 'center', justifyContent:  'flex-start',marginTop: '2%'}}>
                  <TouchableOpacity onPress={()=> this.props.navigation.goBack(null)}>
                    <Image
                        source={ImagesWrapper.back}
                        style={{
                            marginTop: 6,
                            marginLeft: 20,
                            tintColor: '#868585',
                        }}
                    />
                    </TouchableOpacity>
                    
            </View>
                <GallerySwiper
                images={this.state.imageURI}
                initialNumToRender={4}
                sensitiveScroll={false}
                resizeMode="cover"
                style= {{backgroundColor: "#000"}}/> 
            
        </SafeAreaView>
        )

    }
}
