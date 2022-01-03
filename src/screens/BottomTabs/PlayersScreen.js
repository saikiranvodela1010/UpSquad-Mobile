import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import Modal from 'react-native-modal';





export default class PlayersScreen extends React.Component {

    constructor() {
        super();
        this.state = {
        //   show: false,
          show1: false,
        }
      }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('playerSearch')}>
                <View style={styles.searchBorder}>
               
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image
                            source={ImagesWrapper.search}
                            style={{ marginTop: 4, marginRight: 5 }}
                        />
                       
                       <Text style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginLeft: 5,marginTop:5}}>Search message</Text>
                        
                    </View>
                    
                </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20,marginTop:20}}>
                    <Text style={{fontSize:14,color:'#1E1C24',fontFamily:Fonts.mulishSemiBold,fontWeight:'600',marginLeft:20}}>Sorted ny name</Text>
                    <TouchableOpacity  onPress={() => this.setState({ show1: true })}>
                    <Image source={ImagesWrapper.sortedimg}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('playersDetail')}>

                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20,marginLeft:20 }}>
                    
                    <View style = {styles.displayimage}></View>
                    <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                    
                        <Text style={styles.name}>Kannie Sils</Text>
                    
                        <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                        <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                    </View>
                    <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
                    <View style={styles.displayimage}></View>
                        <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Text style={styles.name}>Jay Jay</Text>
                            <Text style={styles.nameText}>UI/UX Designer at Mediyum Studio</Text>
                            <View style={{flexDirection:'row',marginLeft:20}}>
                            <Image source={ImagesWrapper.people}/>
                            <Text style={[styles.nameText,{marginLeft:10}]}> DesignTeam</Text>
                        </View>
                        </View>
                        <View style={styles.time}>
                        <Image source={ImagesWrapper.messageimg}/>
                            
                        </View>
                    </View>
                    <View style={[styles.underline]}></View>



                    {/* Modals code are here */}

                    <Modal
          transparent={true}
          isVisible={this.state.show1}
          onBackdropPress={() => this.setState({ show1: false })}
          style={{
            justifyContent: 'flex-end',
            margin: 0
          }}
          onRequestClose={() => {
            this.setState({show1:false})
         }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>
                
          <View style={{
                        height: 175, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
            }}>
              <View style = {{marginLeft: 20, marginTop: 30}}>
             
                <View style = {{flexDirection: 'row'}}>
                <Text style = {[styles.popupText,{color:'#1E1C24',fontSize:16}]}>Sort by</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.sortdescending}
                  style = {{marginRight: 30}}
                />
                </View>

              </View>
              <View style = {{flexDirection: 'row',marginTop:10}}>
                <Text style = {styles.popupText}>First name</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn1}
                  style = {{marginRight: 31}}
                />
                </View>

              </View>
              <View style = {{flexDirection: 'row', marginTop: 15}}>
                <Text style = {styles.popupText}>Last name</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
                </View>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 15}}>
                <Text style = {styles.popupText}>Team name</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
              </View>
              </View>
              </View>

            </View>
          </View>
        </Modal>

                </ScrollView>
                
            </View>


        )
    }
}

const styles = StyleSheet.create({
    searchBorder: {
        borderWidth: 1.5,
        height: 50,
        width: '89%',
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        borderColor: '#F1F1F1',
        backgroundColor: 'rgba(241, 241, 241, 0.25)'
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        color: '#1E1C24',
        fontFamily: Fonts.mulishSemiBold
    },
    nameText: {
        fontFamily: Fonts.mulishRegular,
        fontSize: 14,
        fontWeight: '400',
        color: '#868585',
        marginLeft: 20,
        marginTop: 5
    },
    time: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 20,
        

    },
    border: {
        borderWidth: 1,
        borderColor: '#F1F1F1',
        width: '87%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    number: {
        borderWidth: 1,
        height: 20,
        width: '70%',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#212B68',
        borderColor: '#212B68',
        marginTop: 5
    },
    displayimage: {
        borderWidth: 1,
        height: 45,
        width: 45,
        borderRadius: 25,
        // marginLeft:30
    },
    popupText: {
        color: 'rgba(134, 133, 133, 1)',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Fonts.mulishRegular
      },
      underline:{
        borderBottomColor: '#959494',
        borderBottomWidth: 0.5,
        marginLeft:'auto',
        // marginTop:20,
        marginRight:'auto',
        width:'85%'
    },
})