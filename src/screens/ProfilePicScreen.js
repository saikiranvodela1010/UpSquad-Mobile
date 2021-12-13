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
const [data, setData] = useState([
    {text:'camera'}
]);
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
        // setData({});
        setData(res.edges);
        // photolist.push(null)
        // length.push('hello')
        // length.push('')
        // length.push(res.edges)
        // const photolist =res.edges
        // setData(photolist);

        // setData((prevData)=>{
        //     return [
        //         {text:res.edges.node.image.uri},
        //         ...prevData
        //     ]
        // })
        // setData((prevData)=>{
        //     return [
        //         res.edges,
        //         ...prevData
        //     ]
        // })
        // setData(res.edges);
        // setData([...data,res.edges]);

    // data.push('hii');
    // data.push(res.edges);
    //  console.log("list",res.edges.node)
    //  console.log("list",photolist)

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
      } 
    } else{
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
            <View>
               <TouchableOpacity onPress={()=>props.navigation.navigate('Account')}>
                <Image style={styles.backarrow} source={ImagesWrapper.back} />
                </TouchableOpacity>
                </View>
                <View>
                {/* <TouchableOpacity onPress={()=>props.navigation.navigate('BioData')}> */}
                             
                <Text style={styles.skip} onPress={()=>props.navigation.navigate('BioData')} >Skip</Text>
                
                {/* </TouchableOpacity> */}
                </View>
               

        </View>
        <Progress.Bar useNativeDriver={false} progress={2} width={150} style={styles.bar} color={'#212B68'}/>
        <Text style={styles.text}>Let's start by setting a great</Text>
        <Text style={[styles.text,{marginTop:5}]}> profile pic</Text>
    
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // useNativeDriver= {true}
        onScroll={Animated.event([], { useNativeDriver: true },{listener: (event) => {
            console.log('scroll',event.nativeEvent.contentOffset.x);
            if(event.nativeEvent.contentOffset.x > 10 || event.nativeEvent.contentOffset.x === 0){
                // console.log('177')
                setHeight1(400);setTop1('3%')
                setHeight2(340);setTop2(50)
                setHeight3(340);setTop3(50)
                setHeight4(340);setTop4(50)
                setHeight5(340);setTop5(50)
                
            }
            if(event.nativeEvent.contentOffset.x > 140 || event.nativeEvent.contentOffset.x === 300){
                // console.log('177')
                setHeight1(340);setTop1(50)
                setHeight2(400);setTop2('3%')
                setHeight3(340);setTop3(50)
                setHeight4(340);setTop4(50)
                setHeight5(340);setTop5(50)

                
            }
            if(event.nativeEvent.contentOffset.x > 300 || event.nativeEvent.contentOffset.x === 650){
                // console.log('177')
                setHeight1(340);setTop1(50)
                setHeight2(340);setTop2(50)
                setHeight3(400);setTop3('3%')
                setHeight4(340);setTop4(50)
                setHeight5(340);setTop5(50)

                
            }
            if(event.nativeEvent.contentOffset.x > 650 || event.nativeEvent.contentOffset.x === 850){
                // console.log('177')
                setHeight1(340);setTop1(50)
                setHeight2(340);setTop2(50)
                setHeight3(340);setTop3(50)
                setHeight4(400);setTop4('3%')
                setHeight5(340);setTop5(50)

                
            }
            if(event.nativeEvent.contentOffset.x >850){
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
            <LinearGradient colors={['#ECF8F8','white']} style={[styles.card,{height:height1,marginTop:top1,}]} >
            <TouchableOpacity onPress={()=>setShow(true)}> 
            <Image style={styles.plus} source={ImagesWrapper.vectorplus} />
            </TouchableOpacity>
            <Text style={styles.choose}>Choose from Gallery</Text>
            </LinearGradient>
            }
        
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height2,marginTop:top2,marginLeft:10}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'97%',alignItems:'center',marginTop:30,}}/>

            </LinearGradient> 
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height3,marginTop:top3,marginLeft:10}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'97%',marginTop:30}}/>

            </LinearGradient>
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height4,marginTop:top4,marginLeft:10}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'97%',marginTop:30}}/>

            </LinearGradient> 
            <LinearGradient colors={['white','white']} style={[styles.card,{height:height5,marginTop:top5,marginLeft:10,marginRight:15}]} >
            <Image  source={ImagesWrapper.girlimg} style={{width:'100%',height:'97%',marginTop:30}}/>

            </LinearGradient>


        </ScrollView>

        <TouchableOpacity 
                        onPress={()=>{
                            props.navigation.navigate('BioData')
                         }}
                         style={{marginTop:'7%',marginBottom:'10%'}}
                    >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient,Platform.OS === "ios" ? {marginTop:'5%'}:{marginTop:'8%'}]}>
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
                            getPhotos();
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
                                     <Text style={{fontSize:18,margin:30,fontFamily:Fonts.mulishSemiBold,color:'#1E1C24'}}>Gallery</Text>
                                     <View style={styles.underline}/>
                                     <View>
                                    
                                        <FlatList
                                       
                                            data={data}
                                            numColumns={3}

                                            renderItem={({item,index}) => (
                                               console.log("index",index),
                                                <View>
                                                   {index === 0 ? 
                                                        <View style={{
                                                            width: Platform.OS === "ios" ? 100:100,
                                                            height: 100,
                                                            margin:Platform.OS === "ios" ? 5:10,
                                                            borderRadius:10,
                                                            backgroundColor:'#FFFFFF'
                                                            }}>
                                                                <Image
                                                                source={ImagesWrapper.camera}
                                                                />
                                                            </View>
                                                      : 
                                                    
                                                      <TouchableOpacity onPress={()=>{
                                                        setFile(item.node.image.uri),
                                                        setGallerypopup(false);
                                                        setShow(false);
                                                       
                                                    }}>
                                                        
                                                    <Image
                                                        style={{
                                                        width: Platform.OS === "ios" ? 100:100,
                                                        height: 100,
                                                        margin:Platform.OS === "ios" ? 5:10,
                                                        borderRadius:10
                                                        }}
                                                        // source={{uri: item.node.image.uri}}
                                                        source={{uri:data[index].node.image.uri}}
                                                        
                                                        // source={require('../src/images/img.png')}
                                                    />
                                                    </TouchableOpacity>
                                                       
                                                      
                                                  
                                                        } 
                                           
                                            </View>
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
        marginTop: 20
    },
    skip: {
        marginLeft: '80%',
        marginTop: 30,
        fontSize: 18,
        color: '#58C4C6',
        fontWeight: '700',
        fontFamily:Fonts.mulishRegular,
        // textAlign:'center'
    },
    bar: {
        height: 3.5,
        // width:'100%',
        // borderColor:'black',
        borderWidth: 0.1,
        marginTop: 5,
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
        borderWidth: 0.8,
        borderRadius: 20,
        marginTop: '3%',
        shadowOpacity: 5,
        marginLeft: 20,
        shadowOpacity: 1,
        elevation: 7,
        marginBottom:10
        // shadowColor:'#F0F3F2',
        // shadowOffset:0.2
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
        height: '29%',
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
        borderRadius:20,
        // marginLeft: 80,
        // marginTop:10,
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
