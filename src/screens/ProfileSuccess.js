import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';



class ProfileSuccess extends React.Component {
  render() {
    return (


      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={ImagesWrapper.profile}
          ></Image>
          <Text style={{ fontSize: 20, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', marginLeft: '5%',color:'#1E1C24' }}>Memphis Talks</Text>
          <TouchableOpacity style={{ marginLeft: '20%' }} onPress={() => this.props.navigation.navigate('Notification')}>
            <Image source={ImagesWrapper.notification3}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: '7%' }}
            onPress={() => this.props.navigation.navigate('ChatScreen')}
          >
            <Image source={ImagesWrapper.chat}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 8 }}>
          <ImageBackground source={ImagesWrapper.manpic}
            style={styles.imgBackground} >

            <LinearGradient
              colors={['rgba(10, 7, 7, 0)', 'rgba(0, 0, 0, 1)']}
              //locations={[0.32,0.68]}
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }} >

              <Text style={styles.text}>I'm Ben Thompson. I’m here to find career guidance. Get in touch with me for strategies for fund raising.</Text>

            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: '#EBF8F8' }}>
          <Image source={ImagesWrapper.checkcircle} style={{ marginLeft: '7%' }}></Image>
          <View style={{ padding: 10 }}>
            <Text style={styles.text1}>Profile created, you can start by </Text>
            <Text style={styles.text1}>exploring the feed.</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 15 }}>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('BioSuccess')}> */}
            <View style={styles.tabView}>
              <Image
                style={{ resizeMode: 'contain' }}
                source={ImagesWrapper.feed} />
              <Text style={styles.tabLabels}>Feed</Text>
            </View>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar1')}> */}

            <View style={styles.tabView}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={ImagesWrapper.people}
              />
              <Text style={styles.tabLabels}>People</Text>
            </View>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar2')}> */}
            <View style={styles.tabView}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={ImagesWrapper.stories}
              />
              <Text style={styles.tabLabels}>Stories</Text>
            </View>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar3')}> */}

            <View style={styles.tabView}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={ImagesWrapper.meetings}
              />
              <Text style={styles.tabLabels}>Meetings</Text>
            </View>
            {/* </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('tabbar4')}> */}
            <View style={styles.tabView}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={ImagesWrapper.events}
              />
              <Text style={styles.tabLabels}>Events</Text>
            </View>
            {/* </TouchableOpacity> */}
          </View>
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
  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  linearGradient: {
    //flex:2,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: "flex-end"
    //opacity: 0.9,
    //backgroundColor:'#58C4C6'
  },
  buttontext: {
    color: '#F9F9FB',
    fontSize: 16,
    fontFamily: Fonts.mulishRegular,
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: 'transparent'
  },
  header: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '9%'
  },
  text: {
    color: '#F1F1F1',
    fontWeight: '600',
    fontFamily: Fonts.mulishRegular,
    fontSize: 20,
    padding: '7%',
    lineHeight: 25
  },
  text1: {
    color: '#1E1C24',
    fontFamily: Fonts.mulishSemiBold,
    fontSize: 14,
    fontWeight: '600',
    
    
  },
  tabLabels: {
    fontFamily: Fonts.mulishRegular,
    fontSize: 12,
    fontWeight: '400',
    paddingTop: 10,
    color: '#B1AAAA'
  },
  tabView: {
    flexDirection: 'column',
    alignItems: 'center'
  }

});


export default ProfileSuccess;