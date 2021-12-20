import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image, ScrollView, FlatList,Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import ImagesWrapper from '../res/ImagesWrapper';
import * as Progress from 'react-native-progress';
import Fonts from '../res/Fonts';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';



const BioDataScreen = (props) => {

    const [checkmarkName, setCheckmarkName] = useState('mark-off');
    const [checkmarkName1, setCheckmarkName1] = useState('mark-off1');
    const [write, setWrite] = useState(false);
    const [writeText, setWriteText] = useState('');
    const [writeTop, setWriteTop] = useState('0%');
    const [choose, setChoose] = useState(false);
    const [choosewant, setChooseWant] = useState(false);
    const [addCard, setAddCard] = useState([]);
    const [selectedItems,setSelectedItems]=useState([]);
    const[ selectedBox,setSelectedBox]=useState([]);
    const [choosewantItems,setChooseWantItems]=useState([]);
    const[ choosewantBox,setChooseWantBox]=useState([]);
    const[barwidth,setBarWidth]=useState(150);



const remove = (data) =>{
    if(choosewant === false){
       
        let index = selectedBox.indexOf(data)
    let nextBox = selectedBox
        nextBox.splice(index,1)
        setSelectedBox(nextBox);
        selectedBox.length === 0 ? setBarWidth(200) : barwidth;
         console.log('slect1:',selectedBox)
    }else{
        
        let index = choosewantBox.indexOf(data)
    let nextBox = choosewantBox
        nextBox.splice(index,1)
        setChooseWantBox(nextBox);
        choosewantBox.length === 0 ? setBarWidth(300) : barwidth;
         console.log('choosewantBoxslect1:',choosewantBox)
    }
    choosewantBox.length=== 0 && selectedBox.length ===0 ? setBarWidth(150) : barwidth;
    
}
const  getListViewItem =(data)=>{
    // const filteredItems = this.state.selectedItems.filter(item => item.id == data.id)
    
    if(choosewant === false){
        if(data.item.isSelect === false){
            remove(data);
        }else{
            setBarWidth(250);
            selectedItems.push(data);
                // this.setState({selectedParticipants:this.state.selectedItems})
            setSelectedBox(selectedItems);
        }
        console.log('selectedBox',selectedBox);
    }else{
        if(data.item.isSelect === false){
            remove(data);
        }else{
        setBarWidth(350);
        choosewantItems.push(data);
        setChooseWantBox(choosewantItems);
        }
        console.log('choosewantItems',choosewantBox);
    }
   
    
}


    const onCheckBoxPressed = (item) => {
     
    
   
  
        console.log('item',item,item.item.selectedClass)
        item.item.isSelect = !item.item.isSelect;
        console.log('item1',item.item.isSelect)

        item.item.selectedClass = item.item.isSelect ? 'selected' : 'notselected';
        console.log('selectedclass',item.item.selectedClass)
       let newArr =[...addCard];
       newArr[item.index]={
           text:item.item.text,
           isSelect:item.item.isSelect,
           selectedClass:item.item.selectedClass
       }
       console.log('newArr',newArr[item.index]);
       setAddCard(newArr);
       console.log('setArr',newArr);

       getListViewItem(item);
      
  
    }
    
    
    const add = (text) => {
        console.log('add', text,Math.random().toString());
        setWriteText('')
        // setWrite(false);
        if (text === ''){
            alert('Please enter the text')
        }else{
        setAddCard((prevAddCard) => {
            return [
                { text: text, id: Math.random().toString(),isSelect:false,selectedClass:'notselected' },
                ...prevAddCard
            ]
        })
    }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            
            <TouchableOpacity onPress={() =>props.navigation.navigate('ProfilePic')}>
              
                <Image style={styles.backarrow} source={ImagesWrapper.back}  />
               
            </TouchableOpacity>
            <Text onPress={() =>props.navigation.navigate('ProfilePic')}></Text>
            <Progress.Bar progress={2} width={barwidth} style={styles.bar} color={'#212B68'} />
            <ImageBackground source={ImagesWrapper.manpic}
                style={styles.imgBackground} >

                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.2)', 'rgba(10, 7, 7, 0.3)', 'rgba(0, 0, 0, 1)']}
                    //locations={[0.32,0.68]}
                    style={styles.linearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.65 }} >
                    <ScrollView style={{marginBottom:'5%'}}>
                        <View style={{ justifyContent: 'flex-start', flex: 1 }}>
                       
                            <Text style={[styles.biotext, { marginTop: '20%' }]}>Let's write a short but {"\n"}colorful Bio</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.biotext, { marginTop: '9%', fontSize: 20 }]}>I'm</Text>
                                <Text style={[styles.biotext, { marginTop: '8%', marginLeft: 10, textDecorationLine: 'underline',textDecorationColor: '#F1F1F1',textDecorationStyle: 'solid' }]}>Ben Thompson</Text>
                            </View>
                            {/* <View style={styles.underline} /> */}
                            <TouchableOpacity onPress={() => {
                                setChoose(true);
                            }}>
                                <Text style={[styles.biotext, { marginTop: '3%',fontSize:21 }]}>I'm here to
                                {selectedBox.length >=1 ?
                                 selectedBox.map((item,index)=>{
                                     return(

                                    <Text style={[styles.biotext, styles.choosetext,{color:'#FFFFFF'}]}> {item.item.text}{index<selectedBox.length-1 ? ",":""}</Text>
                                     )
                                 })
                                 :
                                 <Text style={[styles.biotext, styles.choosetext,]}> Choose what{'\n'}your or here for.</Text>
                                }
                                </Text>

                                {/* <View style={[styles.underline, { marginLeft: '36%', width: '30%' }]} />
                                <Text style={[styles.biotext, { marginTop: '2%', marginLeft: 23, color: '#58C4C6', fontSize: 20 }]}> your or here for.</Text>
                                <View style={[styles.underline, { marginLeft: '7%', width: '35%' }]} /> */}
                            </TouchableOpacity>
                           
                            <Text style={[styles.biotext, selectedBox.length >=1 ?{ marginTop: '7%' }:{ marginTop: '4%' }]}>Get in touch with</Text>
                           
                            
                            {/* <View style={{ flexDirection: 'row' }}> */}
                            <TouchableOpacity onPress={()=>{
                                   
                                   setChooseWant(true);
                                   setAddCard('');
                                   setChoose(true);
                                   // setWrite(false);
                               }}>
                                <Text style={[styles.biotext, { marginTop: '1%' }]}>me for
                                {choosewantBox.length >=1 ?
                                choosewantBox.map((item,index)=>{
                                    return(
                                 <Text style={[styles.biotext, styles.choosetext, { marginTop: '2%', marginLeft: 3 ,color:'#FFFFFF'}]}> {item.item.text}{index<choosewantBox.length-1 ? ",":""}</Text>

                                    )
                                })
                                
                                :
                               
                                <Text style={[styles.biotext, styles.choosetext, { marginTop: '4%', marginLeft: 3 }]}> Choose what you want</Text>
                               
                                }
                                </Text>
                                 </TouchableOpacity>
                            {/* </View> */}
                            {/* <View style={[styles.underline, { marginLeft: '27%', width: '52%' }]} /> */}

                            {choose === true ?

                                <ScrollView horizontal={true} style={{marginTop:'20%'}}>

                                           
                                            <View style={[styles.dashedbiocard]}>
                                                    {/* {write === false ?
                                                        <Text style={[styles.biotext, { marginTop: '35%', color: '#58C4C6', fontSize: 16, textAlign: 'center', marginLeft: -5 }]}>Write your{'\n'} Own</Text>
                                                        :
                                                        null
                                                    } */}

                                                    <TextInput
                                                        style={[styles.writeText, { marginTop:5 }]}
                                                        returnKeyType={"done"}
                                                        placeholder="Write your Own"
                                                        placeholderTextColor='#58C4C6'
                                                        onChangeText={(Text) => {
                                                            setWriteText(Text);
                                                            // setWrite(true);
                                                        }}
                                                        enablesReturnKeyAutomatically={true}
                                                        keyboardType='default'
                                                        multiline={true}
                                                        blurOnSubmit={true}
                                                        value={writeText}
                                                        onSubmitEditing={() => add(writeText)}
                                                        onKeyPress={() => {
                                                            console.log('true')
                                                            if (writeText === '') {
                                                                console.log('false')
                                                                setWrite(false);
                                                                // setWriteTop('-42%')
                                                            } else {
                                                                console.log('true1')
                                                                setWrite(true);
                                                                setWriteTop('25%')

                                                            }
                                                        }}
                                                    />
                                                </View>
                                            
                                <View style={{ flexDirection: 'row' }}>
                                    <FlatList
                                        horizontal
                                        data={addCard}
                                        renderItem={item => (
                                                
                                                <View style={styles.biocard}>

                                                    <TouchableOpacity
                                                        onPress={()=>{onCheckBoxPressed(item)}}
                                                    >
                                                        <Image
                                                            resizeMode='contain'
                                                            source={item.item.selectedClass === 'selected' ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                                            style={[item.item.selectedClass === 'selected' ? styles.checkmark : styles.checkbox]}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={[styles.get]}>{item.item.text}</Text>
                                                </View>
                                               
                                          
                                        )}
                                    />
                                </View>

                                        
                                
                                 </ScrollView>
                                // </View>
                                :
                                null
                            }

                          

                            {/* </View> */}
                            <View  style={{ flex: 1, justifyContent: 'flex-end' ,marginBottom:'10%'}}> 
                             {/* choose === false && choosewant === false ? { marginTop: '60%' } : selectedBox.length >=1? { marginTop: '10%'}: { marginTop: '3%'} */}
                            
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('profilesuccess')
                                    // alert('length'+addCard[0].id)
                                }}
                               
                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={barwidth === 350?['#212B68', '#58C4C6']:['#F1F1F1', '#F1F1F1']} style={[styles.linearGradientButton,  choose === false && choosewant === false ? { marginTop: '60%' } : selectedBox.length >=1? { marginTop: '10%'}: { marginTop: '3%'}]}>
                                    <Text style={[styles.buttonText, { color: '#868585', }]}>
                                        Done
                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            
                            </View>
                           
                            
                        </View>
                        </ScrollView>   

                </LinearGradient>
            </ImageBackground>

        </View>
    );

}

const styles = StyleSheet.create({
    linearGradient: {
        width: '100%',
        height: '100%',
        opacity: 1,
        justifyContent: 'center',
       
        // marginTop:-10
        // alignItems: 'center',

    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: "center",
        // marginTop:-10
        // marginBottom:10
    },
    bar: {
        height: 3.5,
        // width:'100%',
        // borderColor:'black',
        borderWidth: 0.1,
        // marginTop: 5,
        backgroundColor: '#F1F1F1'
        //  color:'red',
        // flexGrow: 1

    },
    backarrow: {
        width: 30,
        height: 30,
        marginLeft: 30,
        marginTop: 15
    },
    biotext: {
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 22,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 30,
        marginTop: '24%'

    },
    underline: {
        borderBottomColor: '#F1F1F1',
        borderBottomWidth: 1,
        marginLeft: '18%',
        marginTop: 7,
        marginRight: 23,
        width: '40%'
    },
    chooseboxstyle: {
        marginTop: '25%',
        marginLeft: 23,
    },
    biocard: {
        marginLeft: 2,
        backgroundColor: '#FFFFFF',
        width: 130,
        height: 130,
        // marginTop: '30%',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 23,
        // marginBottom: 0
        // flex:1
    },
    dashedbiocard: {
        marginLeft: 2,
        backgroundColor: 'black',
        width: 130,
        height: 130,
        // marginTop: '10%',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 23,
        marginBottom: 10,
        borderStyle: 'dashed',
        borderColor: '#FFFFFF'
        // flex:1
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // marginBottom:20
    },
    linearGradientButton: {
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        // marginLeft: 42,
        // height: 48,
        // marginRight: 42
        width: '85%',
        // height:'7%',
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
        marginLeft: 30,
        height: 55,
        marginRight: 30,
        // lineHeight:400
    },
    checkbox: {
        marginLeft: 15,
        marginTop: 15,
        width: 20,
        height: 20
    },
    checkmark: {
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: '#58C4C6',
        borderRadius: 10,

    },
    get: {
        color: 'black',
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
        marginTop: 10,
        marginLeft: 25,
        marginRight:5
    },
    writeText: {
        color: '#FFFFFF',
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 15,
        width:100,
        height:125,
        position:'absolute'

    },
    choosetext: {
        marginTop: '3%',
        color: '#58C4C6',
        fontSize: 20,
        textDecorationLine: 'underline',
        textDecorationColor: '#F1F1F1',
        textDecorationStyle: 'solid'
    }
})

export default BioDataScreen;