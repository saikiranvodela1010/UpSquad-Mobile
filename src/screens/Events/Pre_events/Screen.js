import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,RefreshControl
} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Fonts from '../../../res/Fonts';
import ImagesWrapper from '../../../res/ImagesWrapper';
import {plainToClass} from 'class-transformer';
import {
  getLoginDetails,
  getLoginDetails_update,
  getProfileImage,
  getTocken,
  getUserId,
  getUserName,
  getUserEmail,
} from '../../../res/GetUserInfo';
import {
  increaseBurgerAction,
  decreaseBurgerAction,
  fetchData,
  CallregisteredEvents,
  toggleShowSort,
  toggleShowFilter,
  updateEventType,
  CallFavEvents,
  CallPrivateEvents,
  CallPublicEvents,
  CallLoadMore,
  CallShowPB,
  CallGetFavListOfIDS,CallAddFavEvent,CallRemoveFavEvent,
} from './Index';
import {Person} from './Model/model';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import Icon from 'react-native-vector-icons/Fontisto';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMesage from 'react-native-vector-icons/MaterialCommunityIcons';
import IconGrid from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import StoragePrefs from '../../../res/StoragePrefs';
import {Data} from './Model/Root';
import {ZoomDetails} from './Model/ZoomDetails';
import { stubTrue } from 'lodash';
const profilepic =
  'https://firebasestorage.googleapis.com/v0/b/bhanu-fd7cd.appspot.com/o/images%2Fbalarama%2FWhatsApp%20Image%202021-12-15%20at%208.43.15%20PM.jpeg?alt=media&token=19ac6f26-f3eb-4c8e-b82a-a81aad68120c';
const iconcolor = '#868585';
const textColor="#1E1C24";
const windowWidth = Dimensions.get('window').width;
const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

const headerLeftmargin = 20;
const containerHeight = 200;
let modelData = 0;
let globalY=0;
const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

class CellContainer extends React.Component {
  constructor(args) {
    super(args);
  }
  render() {
    const {item, listOfEventsToItem, onRequired, onAddFav, onRemoveFav} =
      this.props;

    let root = plainToClass(Data, item);
    var bh = new Date(root.getEventStartDate());
    var bh1 = new Date(root.getEventEndDate());
   console.log(root.getEventID(),"getEventID");
    return (
      <View {...this.props}>
         
        <Image
          source={{
            uri:
              root.getImageURLS().length > root.getImageURLS()[0] !=
                undefined && root.getImageURLS()[0] != null
                ? root.getImageURLS()[0]
                : profilepic,
          }}
          style={{
            width: '33%',
            height: '100%',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginHorizontal: 10,
            marginVertical: 7,
          }}>
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '20%',
            }}>
            <Text
              numberOfLines={1}
              style={{flex: 1, fontSize: 16,color:textColor, fontWeight: '600',  fontFamily: Fonts.mulishSemiBold,}}>
              {root.getEventTitle()}
            </Text>

            {listOfEventsToItem.includes(root.getEventID()) ? (
              <IconAnt
                onPress={() => {
                  // onRequired();
                  onRemoveFav(root.getEventID());
                  
                }}
                name="heart"
                size={23}
                color={'red'}
              />
            ) : (
              <IconMesage
                onPress={() => {
                  // onRequired();

onAddFav(root.getEventID());  
                  
                }}
                name="heart-outline"
                size={23}
                color={iconcolor}
              />
            )}
          </View>

          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '20%',
            }}>
            <Text numberOfLines={1} style={{fontSize: 16, fontWeight: '600',fontFamily:Fonts.mulishRegular,color:textColor}}>
              By
            </Text>
            <Image
              source={{uri: profilepic}}
              onPress={() => {
                console.log('bahnu');
              }}
              style={{
                height: (containerHeight) * 0.2-14,
                width: (containerHeight) * 0.2-14,
                borderRadius: 999,
                marginHorizontal: 5,
              }}
            />
            <Text
              numberOfLines={1}
              style={{flex: 1, fontSize: 16,  fontWeight: '600',marginHorizontal:5,  fontFamily: Fonts.mulishRegular,color:textColor}}>
              Ben Thompson
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '20%',
            }}>
            <IconFeather
              style={{marginHorizontal: 2}}
              name="calendar"
              size={23}
              color={iconcolor}
            />
            <Text numberOfLines={1} style={{flex: 1, color: iconcolor,marginHorizontal:5,fontFamily:Fonts.mulishRegular}}>
              {bh.getDate() +
                ' ' +
                monthNames[bh.getMonth()] +
                ' ' +
                bh.getFullYear()}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '20%',
            }}>
            <Image
              source={ImagesWrapper.timer}
              style={{width: 23, height: 23, marginHorizontal: 2}}
            />

            <Text numberOfLines={1} style={{flex: 1, color: iconcolor,marginHorizontal:5,fontFamily:Fonts.mulishRegular}}>
              {bh.getHours() >= 12
                ? 24 - bh.getHours() + 'pm'
                : bh.getHours() + 'am'}{' '}
              -
              {bh1.getHours() >= 12
                ? 24 - bh1.getHours() + 'pm'
                : bh1.getHours() + 'am'}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '20%',
            }}>
            <Image
              source={ImagesWrapper.video}
              style={{width: 23, height: 23, marginHorizontal: 2}}
            />
            <Text numberOfLines={1} style={{flex: 1, color: iconcolor,marginHorizontal:5,fontFamily:Fonts.mulishRegular}}>
              Zoom
            </Text>
          </View>
          {/* <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '20%',
            }}>
          
            <Text numberOfLines={1} style={{flex: 1, color: iconcolor}}>
              {root.getEventID()}
            </Text>
          </View> */}
        </View>
        {/* {this.props.children} */}
        <View
          style={{
            alignSelf: 'flex-end',
            width: '33%',
            height: 30,
            backgroundColor: '#F1F1F1',
            opacity: 0.6,
            borderBottomLeftRadius: 10,
            flexDirection: 'row',
            position: 'absolute',
          }}></View>
        <View
          style={{
            alignSelf: 'flex-end',
            width: '33%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000000',
            opacity: 0.6,
            marginLeft: 10,
            borderBottomLeftRadius: 10,
            flexDirection: 'row',
            position: 'absolute',
          }}>
          <IconAnt onPress={() => {}} name="user" size={14} color={'black'} />

          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: 'black',
              marginTop: 'auto',
              marginBottom: 'auto',
              fontFamily:Fonts.mulishRegular
            }}>
            {root.getTotalAttendences() - 1} attending
          </Text>
        </View>
      </View>
    );
  }
}

class Screen extends Component {
  dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  componentDidMount() {
    this.props.CallGetFavListOfIDS(modelData);
    //this.props.CallPublicEvents();
    //   // alert(getLoginDetails().firstName);
    //  // getLoginDetails_update();
    this.props.CallShowPB(true);
  }

  constructor(args) {
    super(args);

    let {width} = Dimensions.get('window');

    this._layoutProvider = new LayoutProvider(
      index => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.FULL:
            dim.width = width-headerLeftmargin;
            dim.height =
              this.props.infoData.response.length == 0
                ? Dimensions.get('window').height -
                  55 -
                  55 -
                  2 * headerLeftmargin -
                  (Platform.OS === 'ios' ? 80 : 70) -
                  (Platform.OS === 'ios' ? 30 : 10) -
                  10
                : containerHeight;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: this.dataProvider.cloneWithRows(
        this.props.infoData.response,
      ),
    };
  }

  //Given type and data return the view component
  _rowRenderer(type, data, index) {
    console.log(index, 'INDEXXXXXXXXXXXXXXXXXXXXXX');
    if (this.props.infoData.response.length > 0) {
      if (index + 1 == this.props.infoData.response.length) {
        this.props.CallShowPB(false);
      }
      return (
        <CellContainer
          style={styles.container}
          item={this.props.infoData.response[index]}
          listOfEventsToItem={this.props.listofevents}
          onRequired={() => {
            console.log('required damn');
            alert('Required DAMN');

            this.setState(state => {
              return {
                dataProvider: state.dataProvider.cloneWithRows(
                  this.props.infoData.response,
                ),
              };
            });
          }}
          onAddFav=
          {(value) => {
            console.log('Add fav',value);
            this.props.CallShowPB(true);
              this.props.CallAddFavEvent(value,getUserId());
             // this.props.CallGetFavListOfIDS(modelData);


          }}
          
          onRemoveFav=
          {(value) => {
         
            console.log('remove fav',value);
            this.props.CallShowPB(true);
            this.props.CallRemoveFavEvent(value,getUserId());
          }}
          >{/* <Text>Data: {data}</Text> */}
        </CellContainer>
      );
    } else {
      console.log('OMGGGG ');
      if (
        this.props.infoData.status == 'SUCCSESS_STATUS' ||
        this.props.infoData.status == 'FAILURE_STATUS'
      ) {
        this.props.CallShowPB(false);
      }
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text>
            {this.props.infoData.msg == undefined
              ? 'No events found'
              : this.props.infoData.msg}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
            
        <View
          style={{
            height: 55,
            backgroundColor: 'white',
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: headerLeftmargin,
          }}>
          {getProfileImage() == null || undefined ? (
            <IconAnt
              onPress={() => {}}
              name="user"
              size={23}
              color={iconcolor}
            />
          ) : (
            <Image
              source={{uri: getProfileImage()}}
              style={{width: 30, height: 30, borderRadius: 30}}
            />
          )}
          {/* <Image
            source={{uri: getProgileImage()}}
            style={{width: 30, height: 30, borderRadius: 30}}
          /> */}
          <View style={{backgroundColor: 'white', flex: 1}}>
            <Text
              numberOfLines={1}
              style={{
                marginHorizontal: 10,
                textAlign: 'left',
                fontSize: 20,
                color: '#1E1C24',
                height: 30,
                fontWeight: '600',
                fontFamily: Fonts.mulishSemiBold,
              }}>
              {getUserName()}
            </Text>
          </View>
          <Icon
            style={{marginHorizontal: 20}}
            name="bell"
            size={23}
            color={iconcolor}
          />
          <IconMesage name="message-text-outline" size={23} color={iconcolor} />
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: 'grey',
            width: '100%',
            opacity: 0.2,
          }}></View>

        <View
          style={{
            height: 55,
            backgroundColor: 'white',
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: headerLeftmargin,
            marginTop: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{fontSize: 18, fontWeight: '600', flex: 1,fontFamily:Fonts.mulishSemiBold,color:textColor}}>
            {this.props.statusOfEvents}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.toggleShowSort();
            }}>
            <Image
              source={ImagesWrapper.menu}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            height: 2 * headerLeftmargin,
            marginHorizontal: headerLeftmargin,
            width: windowWidth - 2 * headerLeftmargin,
            borderWidth: 1,
            borderColor: '#F1F1F1',
            backgroundColor: '#F1f1f125',
            borderRadius: 2 * headerLeftmargin,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <IconAnt
            onPress={() => {}}
            style={{marginHorizontal: 14}}
            name="search1"
            size={23}
            color={iconcolor}
          />

          <TextInput
            numberOfLines={1}
            style={{flex: 1, fontSize: 16, marginHorizontal: 0,fontFamily:Fonts.mulishRegular}}
            placeholderColor="#868585"
            placeholder="Search"></TextInput>
          <View
            style={{
              height: '100%',
              width: 2,
              backgroundColor: '#F1f1f1',
            }}></View>

          <View>
            <TouchableOpacity
              onPress={() => {
                //  this.props.fetchDataBurger();
                this.props.toggleShowFilter();
              }}>
              <Image
                style={{width: 30, height: 30, marginHorizontal: 10}}
                resizeMode="center"
                source={ImagesWrapper.dragmenu}
              />
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <Text
          numberOfLines={1}
          style={{fontSize: 18, fontWeight: '900', marginTop: 10}}>
          {this.props.listofevents.length}
        </Text> */}

        {/* <Text numberOfLines={1} style={{fontSize:18,fontWeight:'900',marginTop:10}}>
					{this.props.infoData.status}</Text> */}

        {this.props.loadMore?   <ActivityIndicator   onLayout={(event) => {
this.props.CallGetFavListOfIDS(modelData);

// this.props.CallShowPB(true);
              // alert("Layout is done");


            }} size="large" />  :null}

        <RecyclerListView 
          style={{flex: 1, width: '100%', marginTop: 10,}}
          layoutProvider={this._layoutProvider}
          
          // scrollViewProps={{
          //   refreshControl: (
          //     <RefreshControl
          //       refreshing={true}
              
          //     />
          //   )
          // }}
          dataProvider={this.dataProvider.cloneWithRows(
            this.props.infoData.response.length == 0
              ? [1]
              : this.props.infoData.response,
          )}
          rowRenderer={this._rowRenderer}
          onEndReached={() => {
            // alert("end Reached");
          }}
        
          
          onScroll={(event) => {
         
            const positionY = event.nativeEvent.contentOffset.y;
     if(positionY<1&&globalY==0)
     {
    //  alert(positionY);
      this.props.CallLoadMore(true);
     }
     globalY=positionY;
          }}
             
         
          renderFooter={() => {
            if (this.props.loadMore) {
              return (
                <Text
                  style={{
                    flex: 1,
                    alignContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  Loading More
                </Text>
              );
            }
          }}
        />

        <Modal transparent={true} visible={this.props.showPB}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <View
              style={{
                width: '25%',
                height: '10%',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#58C4C6',
                marginBottom: 10,
                backgroundColor: '#58C4C6',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </View>
        </Modal>

        <Modal
          transparent
          isVisible={this.props.showFilter}
          onBackdropPress={() => {
            this.props.toggleShowFilter();
          }}
          onRequestClose={() => {
            this.props.toggleShowFilter();
          }}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}>
          {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}> */}
          <View
            style={{
              height: 175,
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              bottom: 0,
              position: 'absolute',
            }}>
            <View style={{marginLeft: 19, marginTop: 35}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.popupText}>Show all events</Text>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Image
                    source={ImagesWrapper.radiobtn1}
                    style={{marginRight: 33}}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <Text style={styles.popupText}>Events coming up this week</Text>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Image
                    source={ImagesWrapper.radiobtn}
                    style={{marginRight: 30}}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <Text style={styles.popupText}>
                  Events coming up this month
                </Text>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Image
                    source={ImagesWrapper.radiobtn}
                    style={{marginRight: 30}}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* </View> */}
        </Modal>

        <Modal
          transparent={true}
          isVisible={this.props.showSort}
          onBackdropPress={() => {
            this.props.toggleShowSort();
          }}
          onRequestClose={() => {
            this.props.toggleShowSort();
          }}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}>
          {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}> */}
          <View
            style={{
              height: 270,
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              bottom: 0,
              position: 'absolute',
            }}>
            <View style={{marginTop: 30, marginLeft: 20}}>
              <Text
                style={{
                  color: 'rgba(30, 28, 36, 1)',
                  fontWeight: '600',
                  fontSize: 16,
                  fontFamily: Fonts.mulishSemiBold,
                }}>
                Switch category
              </Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={styles.popupText}>Public events</Text>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (modelData != 0) {
                        this.props.CallShowPB(true);
                        modelData = 0;
                        this.props.updateEventType(modelData);
                        this.props.CallGetFavListOfIDS(modelData);
                      }
                      this.props.toggleShowSort();
                    }}>
                    <Image
                      source={
                        modelData == 0
                          ? ImagesWrapper.radiobtn1
                          : ImagesWrapper.radiobtn
                      }
                      style={{marginRight: 30,height:20,width:20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={styles.popupText,{flex:1}}>Private events</Text>
                
                  <TouchableOpacity
                    onPress={() => {
                      if (modelData != 1) {
                        this.props.CallShowPB(true);
                        modelData = 1;
                        this.props.updateEventType(modelData);
                        this.props.CallGetFavListOfIDS(modelData);
                      }
                      this.props.toggleShowSort();
                    }}>
                    <Image
                      source={
                        modelData == 1
                          ? ImagesWrapper.radiobtn1
                          : ImagesWrapper.radiobtn
                      }
                      style={{marginRight: 30,height:20,width:20}}
                    />
                  </TouchableOpacity>

           
              </View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={styles.popupText,{flex:1}}>My registered events</Text>
                
                  <TouchableOpacity
                    onPress={() => {
                      if (modelData != 2) {
                        this.props.CallShowPB(true);
                        this.props.CallShowPB();
                        modelData = 2;
                        this.props.updateEventType(modelData);
                        this.props.CallGetFavListOfIDS(modelData);
                      }
                      this.props.toggleShowSort();
                    }}>
                    <Image
                      source={
                        modelData == 2
                          ? ImagesWrapper.radiobtn1
                          : ImagesWrapper.radiobtn
                      }
                      style={{marginRight: 30,height:20,width:20}}
                    />
                  </TouchableOpacity>
             
              </View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={styles.popupText,{flex:1}}>My favorite events</Text>
             
                  <TouchableOpacity
                    onPress={() => {
                      if (modelData != 3) {
                        this.props.CallShowPB(true);
                        modelData = 3;
                        this.props.updateEventType(modelData);
                        this.props.CallGetFavListOfIDS(modelData);
                      }
                      this.props.toggleShowSort();
                    }}>
                    <Image
                      source={
                        modelData == 3
                          ? ImagesWrapper.radiobtn1
                          : ImagesWrapper.radiobtn
                      }
                      style={{marginRight: 30,height:20,width:20}}
                    />
                  </TouchableOpacity>
              
              </View>
            </View>
          </View>
          {/* </View> */}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  ///reducer -> view
  return {
    numberOfBurger: state.numberOfBurger,
    responceString: state.responceString,
    statusOfEvents: state.statusOfEvents,
    infoData: state.infoData,
    showSort: state.showSort,
    showFilter: state.showFilter,
    loadMore: state.loadMore,
    showPB: state.showPB,
    listofevents: state.listofevents,
  };
};

const mapDispatchToProps = dispatch => {
  ///view ->reducer
  return {
    increaseBurger: parameter => {
      dispatch(increaseBurgerAction(parameter));
    },
    decreaseBurger: () => {
      dispatch(decreaseBurgerAction());
    },
    fetchDataBurger: () => {
      dispatch(fetchData());
    },
    CallregisteredEvents: parameter => {
      dispatch(CallregisteredEvents(parameter));
    },
    toggleShowSort: () => {
      dispatch(toggleShowSort());
    },
    toggleShowFilter: () => {
      dispatch(toggleShowFilter());
    },
    updateEventType: param => {
      dispatch(updateEventType(param));
    },

    CallPublicEvents: () => {
      dispatch(CallPublicEvents());
    },

    CallPrivateEvents: parameter => {
      dispatch(CallPrivateEvents(parameter));
    },

    CallFavEvents: parameter => {
      dispatch(CallFavEvents(parameter));
    },

    CallLoadMore: (param) => {
      dispatch(CallLoadMore(param));
    },

    CallShowPB: p => {
      dispatch(CallShowPB(p));
    },
    CallGetFavListOfIDS: p => {
      dispatch(CallGetFavListOfIDS(p));
    },
    CallAddFavEvent: (a,b) => {
      dispatch(CallAddFavEvent(a,b));
    },
    CallRemoveFavEvent: (a,b) => {
      dispatch(CallRemoveFavEvent(a,b));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
const styles = {
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    marginVertical: 5,
    alignContent:'center',
    marginLeft:headerLeftmargin,
    marginHorizontal: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffbb00',
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7cbb00',
  },
};
