import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import CalendarPicker from './Calendar';
import moment from 'moment';
import StoragePrefs from '../../res/StoragePrefs';
import Modal from 'react-native-modal';


class MeetingsScreen extends React.Component {
  storagePrefs = new StoragePrefs();
  constructor() {
    super();
    this.state = {

      isChecked: false,
      selectedStartDate: null,
      show: false,
      show1 : false,
      communityName:'',
      communityLogo:''

    }
    this.onDateChange = this.onDateChange.bind(this);
  }
  async componentDidMount() {
      
    const universityDetails = await this.storagePrefs.getObjectValue("universityDetails")
     //console.log('universityDetails',universityDetails);
    this.setState({communityName:universityDetails.universityName,communityLogo:universityDetails.universityLogo});
   

    }
    async componentDidUpdate(){
        const universityDetails = await this.storagePrefs.getObjectValue("universityDetails")
        // console.log('universityDetails',universityDetails);
        this.setState({communityName:universityDetails.universityName,communityLogo:universityDetails.universityLogo});
    }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      //selectedEndDate: date,
    });
  }


  render() {
    const { selectedStartDate } = this.state;
    //const { selectedEndDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    //const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    const minDate = new Date();
    return (

      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

<View style={[styles.header]}>
          <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
               <Image source= {{uri : this.state.communityLogo!=null && this.state.communityLogo!="" ? this.state.communityLogo: 'https://www.careerquo.com/assets/images/18.png' }}
                            style={{marginLeft:25,height: 30,width: 30, borderRadius: 25}}
                    ></Image>
                    </TouchableOpacity>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', color: '#1E1C24', marginLeft: '5%',width:170 }}>{this.state.communityName}</Text>
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
        <ScrollView>
          <View style={{ borderBottomColor: '#959494', borderBottomWidth: 0.5, width: '100%' }}></View>
          <View style={{ flex: 1, backgroundColor: 'rgba(235, 248, 248, 1)' }}>
            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '5%', marginBottom: '5%' }}>
              <View style={{ flexDirection: 'column', marginRight: '23%' }}>
                <Text style={{ fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: 'rgba(30, 28, 36, 1)' }}>
                  You have 6 recommendations
                </Text>

              </View>

              <View style={{}}>
                {this.state.show == false ?
                  <TouchableOpacity onPress={() => { this.setState({ show: true }) }} >
                    <Text style={{ color: '#58C4C6', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginLeft: '13%' }}>
                      View all
                    </Text>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={() => { this.setState({ show: false }) }}>
                    <Image
                    style={{ resizeMode: 'contain' , marginLeft: '33%'}}
                    source={ImagesWrapper.close} />
                  </TouchableOpacity>
                }
              </View>

            </View>
            {this.state.show==true?
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 30 }}>

              <View style={{ flexDirection: 'row', marginLeft: 45 }}>
                <View style={{ width: 190, height: 280, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 1, shadowOpacity: 1, marginTop: 40 }}>
                  <ImageBackground
                    source={ImagesWrapper.manpic1}
                    style={{ width: '100%', height: 120, borderTopLeftRadius: 5, borderTopRightRadius: 5, overflow: 'hidden' }}  >
                  </ImageBackground>
                  <Text style={{ paddingLeft: '10%', paddingTop: '9%', color: '#1E1C24', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>John Doe</Text>
                  <Text style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Talk to them about fundraising strategies for charity</Text>
                  <View style={{ paddingLeft: '10%', paddingTop: '7%', flexDirection: 'row' }}>
                    <TouchableOpacity>
                      <Image
                        source={ImagesWrapper.scalendar}>

                      </Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{ marginLeft: '6%', marginTop: 1, color: '#58C4C6', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Schedule a 1:1</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '105%', height: '23%', borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 1, flexDirection: 'row', position: 'absolute', right: 9, top: -43 }}>
                    <View style={{ width: 30, height: 30, borderRadius: 30, borderWidth: 0.5, marginTop: '5%', marginLeft: '5%' }}>
                    </View>
                    <View style={{ width: '70%', marginTop: '5%', padding: 1, marginLeft: 5 }}>
                      <Text style={{ fontSize: 12, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: 'rgba(134, 133, 133, 1)' }}><Text style={{ fontFamily: Fonts.mulishSemiBold, fontWeight: '400', color: '#000000' }}>Kate</Text> suggested that you and John should connect.</Text>
                    </View>
                  </View>

                </View>

                <View style={{ width: 190, height: 280, borderRadius: 5, backgroundColor: '#FFFFFF', marginLeft: 35, elevation: 1, shadowOpacity: 1, marginTop: 40 }}>
                  <ImageBackground
                    source={ImagesWrapper.manpic1}
                    style={{ width: '100%', height: 120, borderTopLeftRadius: 5, borderTopRightRadius: 5, overflow: 'hidden' }}  >
                  </ImageBackground>
                  <Text style={{ paddingLeft: '10%', paddingTop: '9%', color: '#1E1C24', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>John Doe</Text>
                  <Text style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Talk to them about fundraising strategies for charity</Text>
                  <TouchableOpacity>
                    <View style={{ paddingLeft: '10%', paddingTop: '7%', flexDirection: 'row' }}>
                      <Image
                        source={ImagesWrapper.scalendar}>
                      </Image>
                      <Text style={{ marginLeft: '6%', marginTop: 1, color: '#58C4C6', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>Schedule a 1:1</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: '105%', height: '23%', borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 1, flexDirection: 'row', position: 'absolute', right: 9, top: -43 }}>
                    <View style={{ width: 30, height: 30, borderRadius: 30, borderWidth: 0.5, marginTop: '5%', marginLeft: '5%' }}>
                    </View>
                    <View style={{ width: '70%', marginTop: '5%', padding: 1, marginLeft: 5 }}>
                      <Text style={{ fontSize: 12, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: 'rgba(134, 133, 133, 1)' }}><Text style={{ fontFamily: Fonts.mulishSemiBold, fontWeight: '400', color: '#000000' }}>Kate</Text> suggested that you and John should connect.</Text>
                    </View>
                  </View>

                </View>
              </View>
            </ScrollView>:null}

          </View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ marginTop: '6%', marginLeft: '6%', marginBottom: '4%', marginRight: '8%', flexDirection: 'row' }}>
              <View>
                <Text style={{ fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', color: 'rgba(30, 28, 36, 1)' }}>
                  3 Meetings coming up
                </Text>
              </View>
              <TouchableOpacity onPress={() => this.setState({ show1: true })}>
                <Image source={ImagesWrapper.dotsmenu} style={{ marginLeft: '65%' }}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ marginTop: 5 }}>
              <View style={{ width: '88%', height: 340, borderWidth: 1, borderRadius: 10, paddingTop: 15, borderColor: 'rgba(241, 241, 241, 1)', marginLeft: 'auto', marginRight: 'auto' }}>
                <CalendarPicker
                  //scrollable
                  selectedStartDate={selectedStartDate}
                  //selectedEndDate={selectedEndDate}
                  onDateChange={this.onDateChange}
                  headerWrapperStyle={{ borderBottomWidth: 1, borderBottomColor: "rgba(241, 241, 241, 1)", width: '100%', paddingBottom: 15 }}
                  dayLabelsWrapper={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                  previousComponent={<View style={{ marginLeft: 143 }}><Image
                    source={ImagesWrapper.prev}

                  /></View>}
                  nextComponent={<View style={{marginLeft:3}}><Image
                    source={ImagesWrapper.next}

                  /></View>}
                  weekdays={['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']}
                  months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: Fonts.mulishRegular,
                    color: 'rgba(134, 133, 133, 1)'
                  }}
                  monthTitleStyle={{
                    fontSize: 16,
                    fontWeight: '600',
                    fontFamily: Fonts.mulishRegular,
                    marginLeft:'2%'
                  }}
                  yearTitleStyle={{
                    fontSize: 16,
                    fontWeight: '600',
                    fontFamily: Fonts.mulishRegular,
                  }}
                  width={350}
                />
              </View>
            </View>

          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', width: '88%', marginTop: '7%', height: 118, borderRadius: 10, borderColor: 'red', backgroundColor: 'rgba(241, 241, 241, 1)', marginLeft: 'auto', marginRight: 'auto' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 118 }}>
                  <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>
                    27</Text>
                  <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>
                    July</Text>
                </View>
                <View style={{ marginLeft: 12, marginBottom: 'auto', marginTop: 'auto' }}>
                  <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: '600' }}>1:1 with John Croft </Text>

                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.clock}
                      style={{ marginTop: 10 }}
                    />
                    <Text style={styles.eventRow1}>4:30 pm - 5:00 pm</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.video}
                      style={{ marginTop: 10 }}
                    />
                    <Text style={styles.eventRow1}>Zoom</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: 'rgba(177, 170, 170, 1)', fontSize: 12, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginTop: 20, marginLeft: 50 }} >30 min</Text>
                </View>
              </View>


            </View>
            <View style={{ flexDirection: 'row', width: '88%', marginTop: '7%', height: 118, borderRadius: 10, borderColor: 'red', backgroundColor: 'rgba(241, 241, 241, 1)', marginLeft: 'auto', marginRight: 'auto' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 118 }}>
                  <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>
                    30</Text>
                  <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>
                    July</Text>
                </View>
                <View style={{ marginLeft: 12, marginBottom: 'auto', marginTop: 'auto' }}>
                  <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: '600' }}>1:1 with Rhonda</Text>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.clock}
                      style={{ marginTop: 10 }}
                    />
                    <Text style={styles.eventRow1}>4:30 pm - 5:00 pm</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.video}
                      style={{ marginTop: 10 }}
                    />
                    <Text style={styles.eventRow1}>Zoom</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: 'rgba(177, 170, 170, 1)', fontSize: 12, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginTop: 20, marginLeft: 50 }} >30 min</Text>
                </View>
              </View>


            </View>
            <View style={{ flexDirection: 'row', width: '88%', marginTop: '7%', height: 118, borderRadius: 10, borderColor: 'red', backgroundColor: 'rgba(241, 241, 241, 1)', marginLeft: 'auto', marginRight: 'auto', marginBottom: 90 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 118 }}>
                  <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>
                    31</Text>
                  <Text style={{ color: 'rgba(134, 133, 133, 1)', fontSize: 20, fontFamily: Fonts.mulishRegular, fontWeight: '600' }}>
                    July</Text>
                </View>
                <View style={{ marginLeft: 12, marginBottom: 'auto', marginTop: 'auto' }}>
                  <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: '600' }}>1:1 with Kate Whilles</Text>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.clock}
                      style={{ marginTop: 10 }}
                    />
                    <Text style={styles.eventRow1}>4:30 pm - 5:00 pm</Text>
                  </View>
                  <View style={styles.eventRow}>
                    <Image
                      source={ImagesWrapper.video}
                      style={{ marginTop: 10 }}
                    />
                    <Text style={styles.eventRow1}>Zoom</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: 'rgba(177, 170, 170, 1)', fontSize: 12, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginTop: 20, marginLeft: 50 }} >30 min</Text>
                </View>
              </View>


            </View>

            <Modal
          transparent={true}
          isVisible={this.state.show1}
          onBackdropPress={() => this.setState({ show1: false })}
          style={{
            justifyContent: 'flex-end',
            margin: 0
          }}
          onRequestClose={() => {
            this.setState({ show1: false })
          }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>

            <View style={{
              height: 130, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 0, position: 'absolute'
            }}>
              <View style={{ marginLeft: 30, marginTop: 10 }}>

                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('setavailabilityscreen')}>
                  <View style={{ marginTop: 25 }}>
                    <Text style={styles.popupText}>Set availability</Text>
                    

                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.popupText}>Sync calendar</Text>
                    
                  </View>
                </TouchableOpacity>
                

              </View>

            </View>
          </View>
        </Modal>


          </View>


        </ScrollView>

        <View style={{ backgroundColor: '#FFFFFF' }}>
          <TouchableOpacity
            style={{ borderWidth: 1, height: 50, width: '45%', borderRadius: 30, backgroundColor: '#58C4C6', borderColor: '#58C4C6', bottom: 20, right: 30, position: 'absolute' }}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('createmeetingscreen')}
          >
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  source={ImagesWrapper.plusimage}
                />
                <Text style={{ color: '#FFFFFF', fontFamily: Fonts.mulishRegular, fontSize: 16, fontWeight: '600', marginLeft: 5 }}>Create meeting</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  eventRow: {
    flexDirection: 'row',

  },
  eventRow1: {
    fontFamily: Fonts.mulishRegular,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(134, 133, 133, 1)',
    marginLeft: 10,
    marginTop: 10
  },
  popupText: {
    color: 'rgba(30, 28, 36, 1)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.mulishRegular,
    width:'73%'
  },

});


export default MeetingsScreen;