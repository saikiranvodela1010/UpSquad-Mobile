import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, ScrollView } from 'react-native';
import Fonts from '../../res/Fonts';
import ImagesWrapper from '../../res/ImagesWrapper';
import Modal from 'react-native-modal';

export default class EventsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      show1: false,
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={[styles.header]}>
          <Image source={ImagesWrapper.profile}
            style={{ marginLeft: '9%' }}
          ></Image>
          <Text style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', color: '#1E1C24', marginLeft: '5%' }}>Memphis Talks</Text>
          <View style={{ justifyContent: 'flex-end', flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity style={{ marginRight: '18%' }} onPress={() => this.props.navigation.navigate('notificationscreen')}>
              <Image source={ImagesWrapper.notificationNo}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginRight: '18%' }}
              onPress={() => this.props.navigation.navigate('chatscreen')}
            >
              <Image source={ImagesWrapper.chatNo}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
          <Text style={styles.eventName}>My registered events</Text>
          <TouchableOpacity
            onPress={() => this.setState({ show: true })}
            style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}
          >
            <View>
              <Image
                source={ImagesWrapper.menu}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBorder}>
          <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
            <Image
              source={ImagesWrapper.search}
            />
            <View>
              <TextInput
                placeholder='Search'
                multiline={true}
                style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, marginLeft: 10, marginTop: -10, fontWeight: '400', width: 100 }}
              >
              </TextInput>
            </View>
            <View style={{ borderRightWidth: 1, height: 50, marginTop: -10, borderColor: 'rgba(241, 241, 241, 1)', flex: 1, alignItems: 'flex-end' }}></View>
            <TouchableOpacity
            onPress={() => this.setState({ show1: true })}
            // style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}
          >
            <View style={{ alignItems: 'center', marginTop: 5, marginRight: 20 }}>
              <Image
                source={ImagesWrapper.dragmenu}
                style={{ marginLeft: 15 }}
              />
            </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{ marginTop: 25, marginBottom: 30 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <ImageBackground
                  source={ImagesWrapper.eventimage}
                  style={{ height: 185, width: '60%' }}
                >
                  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ borderWidth: 1, width: '60%', height: 25, backgroundColor: 'rgba(241, 241, 241, 1)', borderColor: 'rgba(241, 241, 241, 1)' }}>
                      <View style={{ flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Image
                          source={ImagesWrapper.peopleimg}
                          style={{ marginLeft: 5 }}
                        />
                        <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 12, fontFamily: Fonts.mulishRegular, marginLeft: 5, fontWeight: '400' }}>423 attending</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={styles.eventRow}>
                    <Text style={styles.eventName1}>Fundraising strategies</Text>
                    <Image
                      source={ImagesWrapper.favourite}
                      // style={{ marginLeft: 20 }}

                    />
                  </View>
                  <View style={styles.eventRow}>
                    <Text style={styles.eventName2}>By</Text>
                    <Text style={{ borderWidth: 1, height: 20, width: 20, borderRadius: 20, marginLeft: 5, marginRight: 5 }}></Text>
                    <Text style={styles.eventName2}>Ben Thompson</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.calendar}
                    />
                    <Text style={styles.eventRow1}>4th July 2021</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.clock}
                    />
                    <Text style={styles.eventRow1}>5pm - 7pm</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.video}
                    />
                    <Text style={styles.eventRow1}>Zoom</Text>
                  </View>

                </View>

              </View>


            </View>



          </View>
          <View style={{ flex: 1, marginTop: '7%' }}>
            <View style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <ImageBackground
                  source={ImagesWrapper.eventimage}
                  style={{ height: 185, width: '60%' }}
                >
                  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ borderWidth: 1, width: '60%', height: 25, backgroundColor: 'rgba(241, 241, 241, 1)', borderColor: 'rgba(241, 241, 241, 1)' }}>
                      <View style={{ flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Image
                          source={ImagesWrapper.peopleimg}
                          style={{ marginLeft: 5 }}
                        />
                        <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 12, fontFamily: Fonts.mulishRegular, marginLeft: 5, fontWeight: '400' }}>423 attending</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={styles.eventRow}>
                    <Text style={styles.eventName1}>Fundraising strategies</Text>
                    <Image
                      source={ImagesWrapper.favourite}
                      // style={{ marginLeft: 20 }}

                    />
                  </View>
                  <View style={styles.eventRow}>
                    <Text style={styles.eventName2}>By</Text>
                    <Text style={{ borderWidth: 1, height: 20, width: 20, borderRadius: 20, marginLeft: 5, marginRight: 5 }}></Text>
                    <Text style={styles.eventName2}>Ben Thompson</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.calendar}
                    />
                    <Text style={styles.eventRow1}>4th July 2021</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.clock}
                    />
                    <Text style={styles.eventRow1}>5pm - 7pm</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.video}
                    />
                    <Text style={styles.eventRow1}>Zoom</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: '7%' }}>
            <View style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <ImageBackground
                  source={ImagesWrapper.eventimage}
                  style={{ height: 185, width: '60%' }}
                >
                  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ borderWidth: 1, width: '60%', height: 25, backgroundColor: 'rgba(241, 241, 241, 1)', borderColor: 'rgba(241, 241, 241, 1)' }}>
                      <View style={{ flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Image
                          source={ImagesWrapper.peopleimg}
                          style={{ marginLeft: 5 }}
                        />
                        <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 12, fontFamily: Fonts.mulishRegular, marginLeft: 5, fontWeight: '400' }}>423 attending</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={styles.eventRow}>
                    <Text style={styles.eventName1}>Fundraising strategies</Text>
                    <Image
                      source={ImagesWrapper.favourite}
                      // style={{ marginLeft: 20 }}
                    />
                  </View>
                  <View style={styles.eventRow}>
                    <Text style={styles.eventName2}>By</Text>
                    <Text style={{ borderWidth: 1, height: 20, width: 20, borderRadius: 20, marginLeft: 5, marginRight: 5 }}></Text>
                    <Text style={styles.eventName2}>Ben Thompson</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.calendar}
                    />
                    <Text style={styles.eventRow1}>4th July 2021</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.clock}
                    />
                    <Text style={styles.eventRow1}>5pm - 7pm</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.video}
                    />
                    <Text style={styles.eventRow1}>Zoom</Text>
                  </View>

                </View>

              </View>


            </View>



          </View>
        </ScrollView>

        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <TouchableOpacity 
          style={{ borderWidth: 1, height: 50, width: '43%', borderRadius: 30, backgroundColor: '#58C4C6', borderColor: '#58C4C6', bottom: 20, right: 30, position: 'absolute' }} 
          activeOpacity={0.5} 
          onPress={() => this.props.navigation.navigate('createeventscreen')}
          >
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  source={ImagesWrapper.plusimage}
                />
                <Text style={{ color: '#FFFFFF', fontFamily: Fonts.mulishRegular, fontSize: 16, fontWeight: '600', marginLeft: 5 }}>Create event</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          isVisible={this.state.show}
          onBackdropPress={() => this.setState({ show: false })}
          style={{
            justifyContent: 'flex-end',
            margin: 0
          }}
          onRequestClose={() => {
            this.setState({show:false})
         }}
        >
          {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}> */}
            <View style={{
                        height: 270, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
             
            }}>
              <View style = {{marginTop: 30, marginLeft: 20}}>
              <Text style = {{color: 'rgba(30, 28, 36, 1)', fontWeight: '600', fontSize: 16, fontFamily: Fonts.mulishRegular}}>Switch category</Text>
              <View style = {{flexDirection: 'row', marginTop: 20}}>
                <Text style = {styles.popupText}>Public events</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
                </View>

              </View>
              <View style = {{flexDirection: 'row', marginTop: 20}}>
                <Text style = {styles.popupText}>Private events</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
                </View>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 20}}>
                <Text style = {styles.popupText}>My registered events</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
              </View>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 20}}>
                <Text style = {styles.popupText}>My favorite events</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn1}
                  style = {{marginRight: 30}}
                />
              </View>
              </View>
              </View>

            </View>
          {/* </View> */}
        </Modal>

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
          {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}> */}
            <View style={{
                        height: 175, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
            }}>
              <View style = {{marginLeft: 19, marginTop: 35}}>
              <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.popupText}>Show all events</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn1}
                  style = {{marginRight: 33}}
                />
                </View>

              </View>
              <View style = {{flexDirection: 'row', marginTop: 15}}>
                <Text style = {styles.popupText}>Events coming up this week</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
                </View>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 15}}>
                <Text style = {styles.popupText}>Events coming up this month</Text>
                <View style = {{ flex:1, alignItems: 'flex-end'}}>
                <Image
                  source={ImagesWrapper.radiobtn}
                  style = {{marginRight: 30}}
                />
              </View>
              </View>
              </View>

            </View>
          {/* </View> */}
        </Modal>

      </View>



    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  eventName: {
    fontFamily: Fonts.mulishSemiBold,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(30, 28, 36, 1)',
    marginLeft: 20,
    // marginRight: 50
  },
  searchBorder: {
    borderWidth: 1.5,
    height: 50,
    width: '90%',
    borderRadius: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#F1F1F1',
    backgroundColor: 'rgba(241, 241, 241, 0.25)'
  },
  card: {
    width: '85%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 3
  },
  eventName1: {
    fontFamily: Fonts.mulishSemiBold,
    fontWeight: '600',
    fontSize: 14,
    color: 'rgba(30, 28, 36, 1)',
    marginRight:15
  },
  eventName2: {
    fontFamily: Fonts.mulishSemiBold,
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(30, 28, 36, 1)',
    // marginLeft: '-30%'
  },
  eventRow: {
    flexDirection: 'row',
    marginLeft: '-50%',
    marginTop: 15,
    alignItems: 'center'
  },
  eventRow1: {
    fontFamily: Fonts.mulishRegular,
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(134, 133, 133, 1)',
    marginLeft: 10
  },
  popupText: {
    color: 'rgba(134, 133, 133, 1)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.mulishRegular
  }
})
