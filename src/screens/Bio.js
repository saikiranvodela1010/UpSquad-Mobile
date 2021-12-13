import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image, ScrollView, FlatList, } from 'react-native';
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
    const [writeTop, setWriteTop] = useState('-42%');
    const [choose, setChoose] = useState(false);
    const [addCard, setAddCard] = useState([
        // {text:'bhanu',id:'bhanu'},
    ]);

    const [chooseChange,setChooseChange]=useState(false);
    const[isChecked,setisChecked]=useState(false);

    const onCheckBoxPressed = (id,text) => {
        // console.log('id',id)
        // checkmarkName !== "mark-off" ? setCheckmarkName("mark-off") : setCheckmarkName("mark-on");
        addCard[id]===isChecked ? addCard[id]===setisChecked(true): addCard[id] ===setisChecked(true)
        // addCard[id].isChecked === false ?
        //                         setAddCard((prevAddCard) => {
        //                             return [
        //                                 { text: text, id:id,isChecked:true},
        //                                 ...prevAddCard
        //                             ]
        //                         })
        //                         :
        //                         setAddCard((prevAddCard) => {
        //                             return [
        //                                 { text: text, id:id,isChecked:false},
        //                                 ...prevAddCard
        //                             ]
        //                         })

        // // addCard[id].isChecked === false ? setBioText(false): setBioText(true);

        // console.log('ischecked', addCard[id].isChecked)
    }
    const onCheckBoxPressed1 = () => {
        checkmarkName1 !== "mark-off1" ? setCheckmarkName1("mark-off1") : setCheckmarkName1("mark-on")
    }
    
    const add = (text) => {
        console.log('add', text,Math.random().toString());
        
        setAddCard((prevAddCard) => {
            return [
                { text: text, id: Math.random().toString(),isChecked:false},
                ...prevAddCard
            ]
        })
        setChooseChange(true);
        setWriteText('');
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('ProfilePic')
            }}>
                <Image style={styles.backarrow} source={ImagesWrapper.back} />
            </TouchableOpacity>
            <Progress.Bar progress={2} width={200} style={styles.bar} color={'#212B68'} />
            <ImageBackground source={ImagesWrapper.manpic}
                style={styles.imgBackground} >

                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.2)', 'rgba(10, 7, 7, 0.3)', 'rgba(0, 0, 0, 1)']}
                    //locations={[0.32,0.68]}
                    style={styles.linearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.65 }} >
                    <ScrollView >
                        <View style={{ justifyContent: 'flex-start', flex: 1 }}>
                            <Text style={[styles.biotext, { marginTop: '20%' }]}>Let's write a short but {"\n"}colorful Bio</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.biotext, { marginTop: '8%', fontSize: 20 }]}>I'm</Text>
                                <Text style={[styles.biotext, { marginTop: '8%', marginLeft: 10 }]}>Ben Thompson</Text>
                            </View>
                            <View style={styles.underline} />
                            <TouchableOpacity onPress={() => {
                                setChoose(true);
                            }}>
                                <Text style={[styles.biotext, { marginTop: '3%' }]}>I'm here to
                                {writeText && chooseChange=== true?
                                    <Text style={[styles.biotext, styles.choosetext,{color:'#FFFFFF'}]}> {addCard[0].text}</Text>
                                    :
                                    <Text style={[styles.biotext, styles.choosetext]}> Choose what{'\n'}your or here for.</Text>
                                }
                                 
                                </Text>

                                {/* <View style={[styles.underline, { marginLeft: '36%', width: '30%' }]} />
                                <Text style={[styles.biotext, { marginTop: '2%', marginLeft: 23, color: '#58C4C6', fontSize: 20 }]}> your or here for.</Text>
                                <View style={[styles.underline, { marginLeft: '7%', width: '35%' }]} /> */}
                            </TouchableOpacity>
                            <Text style={[styles.biotext, { marginTop: '4%' }]}>Get in touch with</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.biotext, { marginTop: '0%' }]}>me for</Text>
                                <Text style={[styles.biotext, styles.choosetext, { marginTop: 1, marginLeft: 3 }]}> Choose what you want</Text>
                            </View>
                           

                            {choose === true ?

                                <ScrollView 
                                horizontal={true} 
                                style={{marginTop:'20%'}}
                                >

                                           
                                            <View style={[styles.dashedbiocard]}>
                                                    {write === false ?
                                                        <Text style={[styles.biotext, { marginTop: '35%', color: '#58C4C6', fontSize: 16, textAlign: 'center', marginLeft: -5 }]}>Write your{'\n'} Own</Text>
                                                        :
                                                        null
                                                    }

                                                    <TextInput
                                                        style={[styles.writeText, { marginTop: writeTop }]}
                                                        returnKeyType={"done"}

                                                        onChangeText={(Text) => {
                                                            setWriteText(Text);
                                                            // setWrite(true);
                                                        }}
                                                        value={writeText}
                                                        onSubmitEditing={() => add(writeText)}
                                                        onKeyPress={() => {
                                                            console.log('true')
                                                            if (writeText === '') {
                                                                console.log('false')
                                                                setWrite(false);
                                                                setWriteTop('-42%')
                                                            } else {
                                                                console.log('true1')
                                                                setWrite(true);
                                                                setWriteTop('25%')

                                                            }
                                                        }}
                                                    />
                                                </View>
                                            
                               
                                    <FlatList
                                        horizontal
                                        data={addCard}
                                        renderItem={({item,index })=> (
                                               

                                                     <View style={styles.biocard}>

                                                    <TouchableOpacity
                                                        onPress={()=>onCheckBoxPressed(index,item.text)}
                                                    >
                                                        <Image
                                                            resizeMode='contain'
                                                            source={addCard[index] ===isChecked  ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                                            style={[addCard[index]===isChecked ? styles.checkmark : styles.checkbox]}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={[styles.get]}>{item.text}</Text>
                                                    </View>
                                      
                                               
                                               
                                          
                                        )}
                                    />
                             

                                        
                                 {/* <View style={styles.biocard}>
                                    <TouchableOpacity
                                        onPress={
                                            onCheckBoxPressed1}
                                    >
                                        <Image
                                            resizeMode='contain'
                                            source={checkmarkName1 === 'mark-on' ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                            style={[checkmarkName1 === 'mark-on' ? styles.checkmark : styles.checkbox]}
                                        />


                                    </TouchableOpacity>
                                    <Text style={styles.get}>Get to know new people</Text>
                                </View>
                                <View style={styles.biocard}>
                                    <TouchableOpacity
                                        onPress={
                                            onCheckBoxPressed1}
                                    >
                                        <Image
                                            resizeMode='contain'
                                            source={checkmarkName1 === 'mark-on' ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                            style={[checkmarkName1 === 'mark-on' ? styles.checkmark : styles.checkbox]}
                                        />


                                    </TouchableOpacity>
                                    <Text style={styles.get}>Get to know new people</Text>
                                </View>  */}
                                 </ScrollView>
                                // </View>
                                :
                                null
                            }




                           
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('ProfileSucess')
                                    // alert('length'+addCard[0].id)
                                }}
                                style={{ flex: 1, justifyContent: 'flex-end' }, choose === false ? { marginTop: '55%' } : { marginTop: '3%' }}
                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#F1F1F1', '#F1F1F1']} style={[styles.linearGradientButton, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                                    <Text style={[styles.buttonText, { color: '#868585', }]}>
                                        Done
                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
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
    },
    bar: {
        height: 3.5,
        // width:'100%',
        // borderColor:'black',
        borderWidth: 0.2,
        marginTop: 20,
        backgroundColor: '#F1F1F1'
        //  color:'red',
        // flexGrow: 1

    },
    backarrow: {
        width: 30,
        height: 30,
        marginLeft: 30,
        marginTop: 20
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
        borderRadius: 5,

    },
    get: {
        color: 'black',
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
        marginTop: 10,
        marginLeft: 25
    },
    writeText: {
        color: '#FFFFFF',
        fontFamily: Fonts.mulishSemiBold,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 15,

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