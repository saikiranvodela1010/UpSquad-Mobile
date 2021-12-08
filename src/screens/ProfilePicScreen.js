import React, { useState,useEffect } from 'react';
import Modal from 'react-native-modal';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    PermissionsAndroid,
    Platform,
    Animated,
    alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import * as Progress from 'react-native-progress';
// import { RNCamera } from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
// import RNFS from 'react-native-fs'
import ImagePickerCropper from 'react-native-image-crop-picker';
import CameraRoll from "@react-native-community/cameraroll";
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';




const ProfilePicScreen = (props) => {
 const [show, setShow] = useState(false);
 const [{cameraRef},{takePicture}] = useCamera(null);
 const[file,setFile]=useState(null);
const[camerfile,setCamerafile] = useState(null);
const [data, setData] = useState('');
const[gallerypopup,setGallerypopup]=useState(false);
const[lastCursor,setLastCursor]=useState(null);
const[height1,setHeight1]=useState(380);
const[height2,setHeight2]=useState(340);
const[height3,setHeight3]=useState(340);
const[height4,setHeight4]=useState(340);
const[height5,setHeight5]=useState(340);
const[top1,setTop1]=useState('3%')
const[top2,setTop2]=useState(50)
const[top3,setTop3]=useState(50)
const[top4,setTop4]=useState(50)
const[top5,setTop5]=useState(50)


const getPhotos = () => {
    console.log('photos')
   
  CameraRoll.getPhotos({
    first: 100000,
    assetType: 'Photos',
  })
    .then((res) => {
        console.log('photos1',res.edges)
      setData(res.edges);
     
    })
    .catch((error) => {
      console.log(error);
    });
};
const askPermission = async () => {
    console.log('permission')
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
        
      );
    
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };
const handleScroll=()=>{
    console.log('hello')
    setHeight1(380);
        setHeight2(330);
    
}
  useEffect(() => {
    askPermission();
    // handleScroll();
  }, []);

  
  return(
      <View style={{backgroundColor:'#FFFFFF'}}>
          
         
        <View style={{flexDirection:"row"}}>
                <Image style={styles.backarrow} source={ImagesWrapper.back} />
                <Text style={styles.skip}>Skip</Text>

        </View>
        <Progress.Bar progress={0.3} width={415} style={styles.bar} color={'#212B68'}/>
        <Text style={styles.text}>Let's start by setting a great</Text>
        <Text style={[styles.text,{marginTop:5}]}> profile pic</Text>
    
        <ScrollView
            horizontal={true}
        //    style={{marginTop:50}}
        onScroll={Animated.event([], {listener: (event) => {
            console.log('scroll',event.nativeEvent.contentOffset.x);
            if(event.nativeEvent.contentOffset.x > 10 || event.nativeEvent.contentOffset.x === 0){
                // console.log('177')
                setHeight1(400);setTop1('3%')
                setHeight2(340);setTop2(50)
                setHeight3(340);setTop3(50)
                setHeight4(340);setTop4(50)
                setHeight5(340);setTop5(50)
                
            }
            if(event.nativeEvent.contentOffset.x > 188){
                // console.log('177')
                setHeight1(340);setTop1(50)
                setHeight2(400);setTop2('3%')
                setHeight3(340);setTop3(50)
                setHeight4(340);setTop4(50)
                setHeight5(340);setTop5(50)

                
            }
            if(event.nativeEvent.contentOffset.x > 475){
                // console.log('177')
                setHeight1(340);setTop1(50)
                setHeight2(340);setTop2(50)
                setHeight3(400);setTop3('3%')
                setHeight4(340);setTop4(50)
                setHeight5(340);setTop5(50)

                
            }
            if(event.nativeEvent.contentOffset.x > 735){
                // console.log('177')
                setHeight1(340);setTop1(50)
                setHeight2(340);setTop2(50)
                setHeight3(340);setTop3(50)
                setHeight4(400);setTop4('3%')
                setHeight5(340);setTop5(50)

                
            }
            if(event.nativeEvent.contentOffset.x === 938){
                // console.log('177')
                setHeight1(340);setTop1(50)
                setHeight2(340);setTop2(50)
                setHeight3(340);setTop3(50)
                setHeight4(340);setTop4(50)
                setHeight5(400);setTop5('3%')

                
            }
        }})}
            scrollEventThrottle={16}
        //    style={{marginBottom:20}}
        >
        {file || camerfile?
            <LinearGradient colors={['#ECF8F8','white']} style={[styles.card,{height:height1,marginTop:top1}]} >
            <TouchableOpacity onPress={()=>setShow(true)}> 
            <Image style={styles.uripath} source={{uri:file || camerfile?.path}} />
            </TouchableOpacity>
            {/* <Text style={styles.choose}>Choose from Gallery</Text> */}
            </LinearGradient>
            :
            <LinearGradient colors={['#ECF8F8','white']} style={[styles.card,{height:height1,marginTop:top1}]} >
            <TouchableOpacity onPress={()=>setShow(true)}> 
            <Image style={styles.plus} source={ImagesWrapper.vectorplus} />
            </TouchableOpacity>
            <Text style={styles.choose}>Choose from Gallery</Text>
            </LinearGradient>
            }
        
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height2,marginTop:top2}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'100%',alignItems:'center',marginTop:10}}/>

            </LinearGradient> 
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height3,marginTop:top3}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'100%',marginTop:10}}/>

            </LinearGradient>
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height4,marginTop:top4}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'100%',marginTop:10}}/>

            </LinearGradient> 
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height5,marginTop:top5}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'100%',marginTop:10}}/>

            </LinearGradient>


        </ScrollView>

        <TouchableOpacity 
                        onPress={()=>{
                            props.navigation.navigate('BioData')
                         }}
                         style={{marginTop:'5%'}}
                    >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'4%'}]}>
                        <Text style={styles.buttonText}>
                            Next
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>    
    <Modal
         transparent={true}
         isVisible={show}
         onBackdropPress={() => setShow(false)}
    >
        <View style={{flex:1,justifyContent:'flex-end',width:'110%',marginLeft:-18}}>
          
            <View style={[styles.model1,{flexDirection:'row'}]}>
                <View>
                    <TouchableOpacity 
                    onPress={()=>{
                        ImagePickerCropper.openCamera({
                            width:300,
                            height:300,
                            cropping:true,
                            freeStyleCropEnabled:true,
                            // multiple:true
                        })
                        .then((image)=>{
                            console.log('images',image);
                          setCamerafile(image);
                          setShow(false)
                        })
                        .catch((error)=>{
                            console.log('error',error)
                            
                        });
                        
                    }}
                    >
                <Image style={styles.popupimg} source={ImagesWrapper.camera} />
                </TouchableOpacity>
                {/* <Text style={{color:'#B2B2B2',marginLeft:30}}>Camera</Text> */}
                </View>
                <View>
                    <TouchableOpacity
                        //  onPress={()=>{
                        //      ImagePickerCropper.openPicker({
                        //          width:300,
                        //          height:300,
                        //          cropping:true,
                        //          freeStyleCropEnabled:true,
                        //      })
                        //      .then((images)=>{
                        //          console.log('images',images.path);
                        //            setFile(images)
                        //            setShow(false)
                        //      })
                        //      .catch((error)=>{
                        //          console.log('error',error)
                        //      })
                             
                        //  }}
                        onPress={()=>{
                            // setShow(false);
                            setGallerypopup(true);
                            setShow(true);
                           
                           console.log('gallery')
                        }}
                    >
                <Image style={styles.popupimg} source={ImagesWrapper.gallery} />
                           
                </TouchableOpacity>

                <Modal
                                transparent={true}
                                isVisible={gallerypopup}
                                backdropColor='balck'
                                onBackdropPress={() => {
                                    setGallerypopup(false),
                                    setShow(false)
                                }}
                            >
                                <View style={{backgroundColor:'white',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'153%',marginTop:550,width:'110%',marginLeft:-20}}>
                                     <Text style={{fontSize:18,margin:30}}>Gallery</Text>
                                     <View style={styles.underline}/>
                                     <View>
                                        <FlatList
                                            data={data}
                                            numColumns={3}

                                            renderItem={({item}) => (
                                            <TouchableOpacity onPress={()=>{
                                                setFile(item.node.image.uri),
                                                setGallerypopup(false);
                                                setShow(false);
                                               
                                            }}>
                                            <Image
                                                style={{
                                                width: Platform.OS === "ios" ? 127:100,
                                                height: 150,
                                                margin:Platform.OS === "ios" ? 5:10,
                                                borderRadius:10
                                                }}
                                                source={{uri: item.node.image.uri}}
                                                
                                                // source={require('../src/images/img.png')}
                                            />
                                            </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </View>
                            </Modal>
                {/* <Text style={{color:'#B2B2B2',marginLeft:30}}>Gallery</Text> */}
                </View>
                </View>

        </View>
    </Modal>
                           
                           
   
   </View>
  );

}
const styles = StyleSheet.create({
    backarrow: {
        width: 30,
        height: 30,
        marginLeft: 30,
        marginTop: 30
    },
    skip: {
        marginLeft: '70%',
        marginTop: 40,
        fontSize: 18,
        color: '#58C4C6',
        fontWeight: '700',
        fontFamily:Fonts.mulishRegular
    },
    bar: {
        height: 5,
        // width:'100%',
        // borderColor:'black',
        borderWidth: 0.2,
        marginTop: 15,
        backgroundColor:'#F1F1F1'
        //  color:'red',
        // flexGrow: 1

    },
    text: {
        fontSize: 22,
        color: '#212B68',
        marginTop: 20,
        marginLeft: 28,
        fontFamily:Fonts.mulishSemiBold,
    },
    card: {
        // height: 330,
        width: 250,
        borderColor: '#F0F3F2',
        borderWidth: 5,
        borderRadius: 15,
        marginTop: '3%',
        shadowOpacity: 3,
        marginLeft: 20,
        opacity: 1,
        // borderColor:'#1E1C24'

    },
    buttonText: {
        fontSize: 18,
        fontFamily:Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight:'600',
        // marginBottom:20
    },
    linearGradient: {
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        // marginLeft: 42,
        // height: 48,
        // marginRight: 42
        width:'85%',
        // height:'7%',
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        marginLeft: 30,
        height: 55,
        marginRight: 30,
        // lineHeight:400
    },
    choose: {
        // marginTop: 20,
        // marginLeft: 55,
        color:'#1E1C24',
        fontFamily:Fonts.mulishSemiBold,
        fontWeight:'600',
        fontSize:16,
        textAlign:'center'
    },
    plus: {
        width: '30%',
        height: '28%',
        marginLeft: 80,
        marginTop: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '85%',
        height: '85%',
        marginLeft: 15,
        marginTop: 10
    },
    popupimg: {
        // width: 50,
        // height: 50,
        marginLeft: 30,
        marginTop: 20
    },
    cross: {
        width: 25,
        height: 25,
        marginLeft: '90%',
        borderRadius: 5,
        marginTop: 5
    },
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
      uripath: {
        width: '100%',
        height: '100%',
        // marginLeft: 80,
        // marginTop: 120,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:23,
        marginTop:Platform.OS==='ios' ? null:'-3%',
        marginRight:23
    },
    model1:{
        backgroundColor:'white',
        // flex:1,
        // justifyContent:'flex-end',
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
        height:'20%',
        marginBottom:-20
        // marginTop:10,
        // width:'111%',
        // marginLeft:-20
    }
})
export default ProfilePicScreen;
