import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, ScrollView, FlatList } from 'react-native';
import Fonts from '../../res/Fonts';
import ImagesWrapper from '../../res/ImagesWrapper';
import * as Progress from 'react-native-progress';
import SwitchToggle from "react-native-switch-toggle";
import CheckBox from 'react-native-check-box';
import LinearGradient from 'react-native-linear-gradient';

export default class EventSquadScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            on: false,
            isChecked: false,
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
            isChecked4: false,
            isChecked5: false,
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('createeventscreen')}>
                        <Image
                            source={ImagesWrapper.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Create event</Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: 'rgba(241, 241, 241, 1)' }}>
                    <Progress.Bar useNativeDriver={false} progress={2} height={3} width={165} color={'rgba(33, 43, 104, 1)'} borderColor={'rgba(33, 43, 104, 1)'} />
                </View>
                <View style={{ marginTop: '8%', marginLeft: 25, flexDirection: 'row' }}>
                    <Text style={styles.heading}>Entire organization:</Text>
                    <View style={{ marginLeft: '47%' }}>
                        <SwitchToggle
                            switchOn={this.state.on}
                            onPress={() => this.setState({ on: !this.state.on })}
                            circleColorOff='#B1AAAA'
                            circleColorOn='rgba(88, 196, 198, 1)'
                            backgroundColorOn='white'
                            backgroundColorOff='white'
                            containerStyle={{

                                width: 40,
                                height: 23,
                                borderRadius: 25,
                                borderWidth: 1.5,
                                borderColor: this.state.on == false ? '#B1AAAA' : 'rgba(88, 196, 198, 1)',
                                padding: 5,
                            }}
                            circleStyle={{
                                width: 13,
                                height: 13,
                                borderRadius: 20,

                            }}
                        />
                    </View>
                </View>
                {this.state.on ? null
                    :
                    <View style={{ marginLeft: 25, marginTop: 20 }}>
                        <Text style={styles.heading}>Select squad(s):</Text>
                        <ScrollView>
                            
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    isChecked={this.state.isChecked}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={styles.checkboxText}>Design Team</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            isChecked1: !this.state.isChecked1
                                        })
                                    }}
                                    isChecked={this.state.isChecked1}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={styles.checkboxText}>ManagementTeam</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            isChecked2: !this.state.isChecked2
                                        })
                                    }}
                                    isChecked={this.state.isChecked2}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={styles.checkboxText}>DiscussionTeam</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            isChecked3: !this.state.isChecked3
                                        })
                                    }}
                                    isChecked={this.state.isChecked3}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={styles.checkboxText}>TechTeam</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            isChecked4: !this.state.isChecked4
                                        })
                                    }}
                                    isChecked={this.state.isChecked4}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={styles.checkboxText}>MarketingTeam</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            isChecked5: !this.state.isChecked5
                                        })
                                    }}
                                    isChecked={this.state.isChecked5}
                                    checkedImage={<Image source={ImagesWrapper.checkedbox} />}
                                    unCheckedImage={<Image source={ImagesWrapper.uncheckedbox} />}
                                />
                                <Text style={styles.checkboxText}>CoordinatorsTeam</Text>
                            </View>

                        </ScrollView>

                    </View>
                }
                {this.state.on || this.state.isChecked == true ?
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: '10%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.onSubmit();
                                this.props.navigation.navigate('eventschedulescreen')
                            }}
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#212B68', '#58C4C6']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                                <Text style={styles.buttonText}>
                                    Next
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: '10%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.onSubmit();
                                // this.props.navigation.navigate('eventschedulescreen')
                            }}
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#F1F1F1','#F1F1F1']} style={[styles.linearGradient, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '4%' }]}>
                                <Text style={[styles.buttonText,{color:'#868585'}]}>
                                    Next
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    header: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 28, 36, 1)',
        marginLeft: 20
    },
    heading: {
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        fontSize: 16,
        color: 'rgba(30, 28, 36, 1)'
    },
    checkboxText: {
        color: 'rgba(134, 133, 133, 1)',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: Fonts.mulishRegular,
        marginLeft: 15
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.mulishRegular,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: '600',
        // marginBottom: 50
    },
    linearGradient: {
        width:'85%',
        borderRadius:30,
        alignItems:"center",
        justifyContent:'center',
        marginLeft: 30,
        height: 55,
        marginRight: 30,
    },
})