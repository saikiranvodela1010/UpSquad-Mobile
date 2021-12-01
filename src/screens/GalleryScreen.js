import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import CheckBox from 'react-native-check-box';
// import { Checkbox } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


class TeamScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            checkmark: false,
            checkmark0: false,
            checkmark1: false,
            checkmark2: false,
            status: true,
            viewall: true,
            rectbox: true,
            checkmarkName:'mark-off',

        }
    }

    // onCheckBoxPressed() {
    //     console.log("click")
    //     this.setState({ checkmark: false })

    // }
    onCheckBoxPressed ()  {
        this.setState({ checkmark: false})
        this.state.checkmarkName !== "mark-off"
            ? (this.setState({checkmarkName:"mark-off"}), this.setState({checkmark:true}))
            : (this.setState({checkmarkName:"mark-on"}),this.setState({checkmark:false}))

    }
    ShowHideTextComponentView = () => {
        
        if (this.state.status == true && this.state.viewall == true) {
            this.setState({ status: false })
            this.setState({viewall: false})
        }
        else {
            this.setState({ status: true })
            this.setState({viewall: true})
        }
    }
    PlayerRole = () => {
        if(this.state.rectbox == true){
            this.setState({rectbox: false})
        }
        else{
            this.setState({rectbox: true})
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.title}>What's your role?</Text>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    {this.state.rectbox ? 
                    <View style ={{flexDirection: 'row'}}>
                        <View style={styles.recBox1}>

                        <Image
                            source={ImagesWrapper.image}
                            style={{
                                width: '95%',
                                marginBottom: 25
                            }}

                        />
                        <Text style={styles.playertext}>Get inspired by{"\n"}others and{"\n"}learn more.</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                            <Text style={{ borderWidth: 3, width: '12%', height: 20, borderColor: '#ffffff', borderRadius: 20, marginRight: 10, marginLeft: 10 }}></Text>
                            <Text style={styles.player}>Player</Text>
                        </View>
                        </View>
                        <View style={[styles.recBox2,Platform.OS === "ios" ? {marginLeft:20}:{marginLeft:25}]}>
                        <Text style={styles.coachtext}>Share your{"\n"}knowledge and{"\n"}help others to{"\n"}grow.</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                            <TouchableOpacity onPress={() => this.PlayerRole()}>
                                <Text style={{ borderWidth: 1, width: '90%', height: 20, backgroundColor: '#F1F1F1', borderRadius: 20, marginRight: 10, marginLeft: 10, borderColor: '#B1AAAA' }}></Text>
                            </TouchableOpacity>
                            <Text style={styles.coach}>Coach</Text>

                        </View>

                        </View>
                       </View> 
                        
                        :
                        <View style ={{flexDirection: 'row'}}>
                            <View style={[styles.recBox2,Platform.OS === "ios" ? {marginLeft:20}:{marginLeft:25}]}>
                        <Text style={styles.playertext1}>Get inspired by{"\n"}others and{"\n"}learn more.</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                            <TouchableOpacity onPress={() => this.PlayerRole()}>
                                <Text style={{ borderWidth: 1, width: '90%', height: 20, backgroundColor: '#F1F1F1', borderRadius: 20, marginRight: 10, marginLeft: 10, borderColor: '#B1AAAA' }}></Text>
                            </TouchableOpacity>
                            <Text style={styles.player1}>Player</Text>

                        </View>

                        </View>
                        <View style={styles.recBox1}>

                        <Image
                              source={ImagesWrapper.image}
                            style={{
                                width: '95%',
                                marginBottom: 5
                            }}

                        />
                        <Text style={styles.coachtext1}>Share your{"\n"}knowledge and{"\n"}help others to{"\n"}grow.</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                            <Text style={{ borderWidth: 3, width: '12%', height: 20, borderColor: '#ffffff', borderRadius: 20, marginRight: 10, marginLeft: 10 }}></Text>
                            <Text style={styles.coach1}>Coach</Text>
                        </View>
                        </View>
                        
                       </View>

                    }
                    

                   

                </View>
                 {/* <ScrollView>            */}
                
                    <Text style={styles.selecteam}>Select your team(s)</Text>
                    <ScrollView style = {{marginTop: 20}}>            
                    <View style={{ marginLeft: 30 }}>
                        <View style={styles.text}>
                            <TouchableOpacity onPress={() => this.onCheckBoxPressed()}>
                                <Image
                                 source={ this.state.checkmarkName ==='mark-on'? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                 style={[this.state.checkmarkName  ==='mark-on'? styles.checkmark : styles.checkbox]}
                                 />
                                {/* <Image
                                    source={this.state.checkmark ? require('./images/Checkbox.png') : require('./images/checkmark.png')}
                                    style={[this.state.checkmark ? styles.checkbox : styles.checkmark]}
                                /> */}
                            </TouchableOpacity>
                            {/* <TouchableOpacity  onPress={()=>this.onCheckBoxPressed()}> */}
                            <Text style={[styles.checkboxtxt1, this.state.checkmarkName  ==='mark-on' ? {color: '#000000'} : {color: '#868585'}]}>DesignTeam</Text>
                            {/* </TouchableOpacity> */}
                            {/* <TouchableOpacity
                        onPress={() => {
                              this.setState(!this.state.checked);
                            
                            }}
                        >
                        <CheckBox
                        status={this.state.checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState(!this.state.checked);
                        
                        }}
                        /> 
                        </TouchableOpacity> */}


                        </View>
                        <View style={styles.text}>
                            <Image
                                source={this.state.checkmark0 ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                style={[this.state.checkmark0 ? styles.checkmark : styles.checkbox]}
                            />
                            <Text style={styles.checkboxtxt}>ManagementTeam</Text>
                        </View>

                        <View style={styles.text}>
                            <Image
                                source={this.state.checkmark1 ?ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                style={[this.state.checkmark1 ? styles.checkmark : styles.checkbox]}
                            />
                            <Text style={styles.checkboxtxt}>DiscussionTeam</Text>
                        </View>

                        <View style={styles.text}>
                            <Image
                                source={this.state.checkmark2 ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                style={[this.state.checkmark2 ? styles.checkmark : styles.checkbox]}
                            />

                            <Text style={styles.checkboxtxt}>TechTeam</Text>
                        </View>

                        {this.state.status ?
                            null :

                            <View>
                                <View style={styles.text}>
                                    <Image
                                        source={this.state.checkmark0 ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                        style={[this.state.checkmark0 ? styles.checkmark : styles.checkbox]}
                                    />
                                    <Text style={styles.checkboxtxt}>MarketingTeam</Text>
                                </View>
                                <View style={styles.text}>
                                    <Image
                                        source={this.state.checkmark1 ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                        style={[this.state.checkmark1 ? styles.checkmark : styles.checkbox]}
                                    />
                                    <Text style={styles.checkboxtxt}>CoordinatorsTeam</Text>
                                </View>
                                <View style={styles.text}>
                                    <Image
                                        source={this.state.checkmark2 ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                        style={[this.state.checkmark2 ? styles.checkmark : styles.checkbox]}
                                    />
                                    <Text style={styles.checkboxtxt}>SocialTeam</Text>
                                </View>
                                <View style={styles.text}>
                                    <Image
                                        source={this.state.checkmark0 ? ImagesWrapper.checkmark : ImagesWrapper.checkbox}
                                        style={[this.state.checkmark0 ? styles.checkmark : styles.checkbox]}
                                    />
                                    <Text style={styles.checkboxtxt}>DiscussionTeam</Text>
                                </View>
                            </View>

                        }



                    </View>
                    </ScrollView>
                    
                    <TouchableOpacity onPress={this.ShowHideTextComponentView}>
                        {this.state.viewall ? 
                            <Text style={styles.viewlink}>View all</Text>
                            : null
                        }
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity 
                            onPress={()=>{
                                this.props.navigation.navigate('Account')
                            }}
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(33, 43, 104, 1)', 'rgba(88, 196, 198, 1)']} style={[styles.linearGradient1, Platform.OS === "ios" ? { marginTop: '5%' } : { marginTop: '5%' }]}>

                                <Text style={styles.nextbtn}>
                                    Next
                                </Text>

                            </LinearGradient>
                        </TouchableOpacity>

                    </View>


              
                {/* </ScrollView> */}


            </SafeAreaView>
        )
    }

}


const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600',
        color: '#1E1C24',
        fontSize: 19,
        marginLeft: 30,
        marginTop: 50,
    },
    recBox1: {
        borderWidth: 1,
        height: 250,
        width: '42%',
        borderRadius: 5,
        backgroundColor: '#58C4C6',
        borderColor: '#58C4C6',
        marginLeft: 30,
        justifyContent: 'flex-end',

    },
    recBox2: {
        borderWidth: 1,
        height: 250,
        width: '42%',
        borderRadius: 5,
        borderStyle: 'dashed',
        justifyContent: 'flex-end',


    },
    checkbox: {
        marginLeft: 10,
        marginTop: 5,
        height: 25,
        width: 25
    },
    checkmark: {
        marginLeft: 10,
        marginTop: 5,
        backgroundColor: '#58C4C6',
        borderRadius: 2,
        height: 25,
        width: 25

    },
    checkboxtxt: {
        marginLeft: 25,
        fontSize: 18,
        color: '#868585',
        marginTop: 5,
        fontFamily: Fonts.mulishRegular, 
        fontWeight: '600'

    },
    checkboxtxt1: {
        marginLeft: 25,
        fontSize: 18,
        // color: '#000000',
        marginTop: 5,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'

    },
    text: {
        flexDirection: 'row',
        marginBottom: 15
    },
    linearGradient1: {
        width: '85%',
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20


    },
    nextbtn: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Mulish',
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    borderimage: {
        width: '85%',
        height: '39%',
        borderRadius: 30,
        marginTop: 50

    },
    playertext:{
        fontSize: 17, 
        color: '#EBEBEB', 
        marginLeft: 15,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    player: {
        fontSize: 18, 
        color: '#EBEBEB', 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    coachtext: {
        fontSize: 17, 
        color: '#868585', 
        marginLeft: 15, 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' 
    },
    coach: {
        fontSize: 18, 
        color: '#868585', 
        marginLeft: 20,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' 
    },
    playertext1: {
        fontSize: 17, 
        color: '#868585', 
        marginLeft: 15,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' 
    },
    player1: {
        fontSize: 18, 
        color: '#868585', 
        marginLeft: 20, 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    coachtext1: {
        fontSize: 17, 
        color: '#EBEBEB', 
        marginLeft: 15, 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    coach1: {
        fontSize: 18, 
        color: '#EBEBEB', 
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'
    },
    selecteam: {
        fontSize: 19, 
        color: '#1E1C24', 
        marginLeft: 30, 
        marginTop: 30,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600' 
    },
    viewlink: {
        marginLeft: 40, 
        // marginTop: 10, 
        fontSize: 16, 
        color: '#58C4C6',
        marginBottom: 25,
        fontFamily: Fonts.mulishRegular,
        fontWeight: '600'

    }
});

export default TeamScreen;