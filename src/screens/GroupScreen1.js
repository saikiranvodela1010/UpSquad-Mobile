import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';


export default class GroupScreen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParticipants: [],
      selectedItems: [],
      //checked:0
      data: [
        {
          id: "1",
          name: "Kannie Sils",
          isSelect: false,
          selectedClass: 'notselected'
        },
        {
          id: "2",
          name: "Jay Jay",
          isSelect: false,
          selectedClass: 'notselected'
        },
        {
          id: "3",
          name: "Katy Brown",
          isSelect: false,
          selectedClass: 'notselected'
        },
        {
          id: "4",
          name: "Thomas White",
          isSelect: false,
          selectedClass: 'notselected'
        },
        {
          id: "5",
          name: "Kannie Sils",
          isSelect: false,
          selectedClass: 'notselected'
        },
        {
          id: "6",
          name: "Jay Jay",
          isSelect: false,
          selectedClass: 'notselected'
        },
        {
          id: "7",
          name: "Katy Brown",
          isSelect: false,
          selectedClass: 'notselected'
        },
      ]

    };
  }
  renderSeparator = () => {
    return (
      <View style={styles.border}></View>
    );
  };

  getListViewItem = (data) => {
    const filteredItems = this.state.selectedItems.filter(item => item.id == data.id)
    if (filteredItems == '') {
      //this.setState({checked:item.id})
      this.state.selectedItems.push(data)
      this.setState({ selectedParticipants: this.state.selectedItems })
      console.log('slect1:', this.state.selectedParticipants)
      console.log('length', data.length)
    }

  }
  remove = (data) => {
    // data.isSelect = 'notselected';
    const filteredItems = this.state.selectedItems.filter(item => item.id != data.id)
    const filteredItems1 = this.state.selectedParticipants.filter(item => item.id != data.id)

    //var selectedItems = selectedItems.filter(item => item.id != data.id)
    this.setState({ selectedItems: filteredItems })
    //console.log(selectedItems);
    //  console.log('slect:',selectedItems)
    this.setState({ selectedParticipants: filteredItems1 })
    console.log('slect1:', this.state.selectedParticipants)


  }
  selectItem = item => {
    item.isSelect = true;
    item.selectedClass = item.isSelect ? 'selected' : 'notselected';

    // const index = this.state.data.findIndex(
    //   item => item.id === item.id
    // );

    // this.state.data[index] = item;

    // this.setState({
    //   data: this.state.data,
    // });
    this.getListViewItem(item)
  };
  deselectItem = item => {
    item.isSelect = false;
    item.selectedClass = item.isSelect ? 'selected' : 'notselected';

    // const index = this.state.data.findIndex(
    //   item => item.id === item.id
    // );

    // this.state.data[index] = item;

    // this.setState({
    //   data: this.state.data,
    // });
    this.remove(item)
  };



  render() {
    return (

      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('groupscreen')}>
            <Image
              source={ImagesWrapper.back}
              style={{
                marginTop: 6,
                marginLeft: 20,
                tintColor: '#000000',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Create group</Text>
        </View>
        <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>

        <View style={styles.searchBorder}>
          <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, alignItems: 'center' }}>
            <Image
              source={ImagesWrapper.search}
              style={{ marginRight: 5 }}
            />

            <TextInput
              placeholder='Search message'
              style={{ color: '#868585', fontSize: 14, fontFamily: Fonts.mulishRegular, fontWeight: '400', marginLeft: 4, marginBottom: 2, marginTop: 2, width: '60%' }}
            >
            </TextInput>
          </View>
        </View>
        {/* </TouchableOpacity> */}
        <Text style={{ color: '#1E1C24', fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', marginLeft: 30, marginTop: 20, marginBottom: 15 }}>{this.state.selectedParticipants == '' ? 'Add participants'
          : <Text>{this.state.selectedParticipants.length} of {this.state.data.length} selected</Text>}</Text>
        {/* <Text style = {{color: '#1E1C24', fontSize: 16, fontFamily: Fonts.mulishSemiBold, fontWeight: '600', marginLeft: 30, marginTop: 20, marginBottom: 15}}>3 of 28 selected</Text> */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.selectedParticipants == null ? null :

            <View style={{ flexDirection: 'row', marginLeft: 20 }}>

              {this.state.selectedParticipants.map((item, index) => {
                return (
                  <View style={{ marginBottom: 30, alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black', alignItems: 'flex-end', flexDirection: "row-reverse" }}>

                      <TouchableOpacity onPress={() => this.deselectItem(item)}>
                        <Image source={ImagesWrapper.remove} />
                      </TouchableOpacity>

                    </View>
                    <Text style={styles.name1}>{item.name}</Text>
                  </View>

                )
              })}

            </View>

          }
        </ScrollView>

        {this.state.selectedParticipants != '' ?
          <View style={{ paddingTop: '5%' }}>
            <View style={styles.border}></View>
          </View> : null
        }

        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.selectItem(item)}>

              <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                {item.selectedClass == 'selected' ?
                  <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black', alignItems: 'flex-end', flexDirection: 'row-reverse' }}>
                    <Image
                      source={ImagesWrapper.select}
                    />
                  </View> :
                  <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }}>

                  </View>
                }

                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          }
          ItemSeparatorComponent={this.renderSeparator}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          {this.state.selectedParticipants != '' ?
            <TouchableOpacity activeOpacity={0.5} style={styles.toucahbleOpacity}

              onPress={() => this.props.navigation.navigate('groupscreen2', {
                participants: this.state.selectedParticipants,

              })}


            >

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={ImagesWrapper.frontarrow}

                />
              </View>
            </TouchableOpacity>
            :
            <View activeOpacity={0.5} style={styles.toucahbleOpacity}

            >

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={ImagesWrapper.frontarrow}

                />
              </View>
            </View>

          }
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.mulishSemiBold,
    fontWeight: '600',
    color: '#1E1C24',
    fontSize: 20,
    marginLeft: 20
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
    color: '#1E1C24',
    fontFamily: Fonts.mulishSemiBold,
    marginTop: 'auto',
    marginBottom: 'auto',
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
  searchBorder: {
    borderWidth: 1.5,
    height: 55,
    width: '85%',
    borderRadius: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    borderColor: '#F1F1F1',
  },
  toucahbleOpacity: {
    right: 30,
    bottom: 40,
    position: 'absolute',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#58C4C6',
    borderColor: '#58C4C6'
  },
  name1: {
    fontSize: 14,
    fontWeight: '600',
    //marginLeft:5,
    color: '#1E1C24',
    fontFamily: Fonts.mulishSemiBold,
    marginTop: 5,
    marginLeft: 10



  },
  heading: {
    color: '#1E1C24',
    fontSize: 16,
    fontFamily: Fonts.mulishSemiBold,
    fontWeight: '600',
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 15
  },
  searchText: {
    color: '#868585',
    fontSize: 14,
    fontFamily: Fonts.mulishRegular,
    marginLeft: 20,
    marginTop: -10,
    fontWeight: '400',
    width: '60%'
  },
  listItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: '7%',
    alignItems: 'flex-end',
    flexDirection: "row-reverse"
  },
})