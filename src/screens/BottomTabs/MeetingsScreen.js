import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../../res/ImagesWrapper';
import Fonts from '../../res/Fonts';
import StoragePrefs from '../../res/StoragePrefs';



class MeetingsScreen extends React.Component {
  storagePrefs = new StoragePrefs();
    constructor(props){
        super(props);
       
        this.state={
            communityName:'',
           
        }
       
    }
    async componentDidMount() {
      
        const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
        // console.log('universityDetsils',universityDetsils);
        this.setState({communityName:universityDetsils.universityName});
       

        }
        async componentDidUpdate(){
            const universityDetsils = await this.storagePrefs.getObjectValue("universityDetsils")
            // console.log('universityDetsils',universityDetsils);
            this.setState({communityName:universityDetsils.universityName});
        }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        
          <View style={[styles.header]}>
            <Image source={ImagesWrapper.profile}
              style={{ marginLeft: '9%' }}
            ></Image>
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
          <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
          <View style={{ flex: 1, backgroundColor: 'rgba(235, 248, 248, 1)' }}>
            <View style={{ flexDirection: 'row', marginLeft: '6%', marginTop: '5%' }}>
              <View style={{ flexDirection: 'column', marginRight: '23%' }}>
                <Text style={{ fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: 'rgba(134, 133, 133, 1)' }}>
                  It looks like you don’t have any meetings
                </Text>
                <Text style={{ fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', color: 'rgba(134, 133, 133, 1)' }}>
                  scheduled yet. Here’s how you can start.
                </Text>
              </View>
              <TouchableOpacity>
                <View style={{ paddingTop: '3%',marginLeft:-25}}>
                  <Image
                    style={{ resizeMode: 'contain', marginTop: 4 }}
                    source={ImagesWrapper.close} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: '4%', marginLeft: '6%', marginBottom: '4%', marginRight: '8%' }}>
              <Text style={{ fontSize: 16, fontFamily: Fonts.mulishRegular, fontWeight: '600', color: 'rgba(30, 28, 36, 1)' }}>
                Here are some people recommended for you:
              </Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 30 }}>

            <View style={{ flexDirection: 'row', marginLeft: 45, marginBottom: 30 }}>
                <View style={{ width: 190, height: 280, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 2, marginTop: 40 }}>
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
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('schedulescreen')}>
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
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 1 ,}}>
            <View style={{marginTop:'5%',marginLeft:'6%',flexDirection:'row',marginLeft:'auto',marginRight:'auto'}}>
          <View style={{ borderTopWidth: 1, borderColor: '#F1F1F1',width:'37%', marginTop: '3%'}}></View>
          <View style = {{borderWidth: 1, height: 25, width: '15%', borderRadius: 15, backgroundColor: '#F1F1F1', borderColor: '#F1F1F1', marginBottom: 5, alignItems: 'center', justifyContent: 'center',}}>
            <Text style = {{color: '#868585', fontFamily: Fonts.mulishRegular, fontSize: 16, fontWeight: '600'}}>or</Text>
            </View>
          <View style={{ borderTopWidth: 1, borderColor: '#F1F1F1',width:'37%', marginTop: '3%'}}></View>
          
          </View>
          <View style={{flexDirection:'row',marginLeft:'6%',marginTop:'5%'}}>
          <Image source={ImagesWrapper.meetingsimage}/>
           <View style={{flexDirection:'column',marginLeft:'10%',marginTop:'3%'}}>
           <Text style={{marginRight:'6%',width:'40%',fontSize:16,fontWeight:'600',fontFamily:Fonts.mulishRegular,color:'#1E1C24'}}>Tell the  community about your availibility to get on calls</Text>
           <TouchableOpacity onPress={()=>{
             this.props.navigation.navigate('setavailabilityscreen')
           }}>
           <Text style={{color:'#58C4C6',fontFamily:Fonts.mulishRegular,fontSize:14,fontWeight:'400',paddingTop:'3%'}}>Set your availability</Text>
           </TouchableOpacity>
           </View>
          </View>
          </View>
          
         <View style={{paddingTop:'20%'}}></View>

        </ScrollView>
      
        <View style={{backgroundColor:'#FFFFFF'}}>
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
    marginTop: 25,
    marginBottom: 25,
  },

});


export default MeetingsScreen;