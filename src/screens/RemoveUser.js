import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native';
import ImagesWrapper from '../res/ImagesWrapper';
import Fonts from '../res/Fonts';

export default class RemoveUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedParticipants: [],
            selectedItems: [],
            save: false,
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


    remove = (data) => {
        // data.isSelect = 'notselected';
        const filteredItems = this.state.data.filter(item => item.id != data.id)
        //const filteredItems1 = this.state.selectedParticipants.filter(item => item.id != data.id)

        //var selectedItems = selectedItems.filter(item => item.id != data.id)
        this.setState({ data: filteredItems })
        //console.log(selectedItems);
        //  console.log('slect:',selectedItems)
        // this.setState({ selectedParticipants: filteredItems1 })
        console.log('slect1:', this.state.data)


    }

    // deselectItem = item => {
    //     item.isSelect = false;
    //     item.selectedClass = item.isSelect ? 'selected' : 'notselected';
    //     this.remove(item)
    // };

    save(item) {
        this.setState({ save: true })
        this.remove(item)
    }


    render() {

        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('groupscreen')}>
                        <Image
                            source={ImagesWrapper.back}
                            style={{
                                marginTop: 6,
                                marginLeft: 30,
                                tintColor: '#000000',
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Remove Users</Text>
                    {this.state.save == false ?
                        <Text style={{ color: 'rgba(30, 28, 36, 1)', fontSize: 14, fontFamily: Fonts.mulishRegular, marginLeft: '30%', paddingTop: 10 }}>Save</Text>
                        : <TouchableOpacity>
                            <Text style={{ color: '#58C4C6', fontSize: 14, fontFamily: Fonts.mulishRegular, marginLeft: '51%', paddingTop: 10 }}>Save</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ borderWidth: 1, borderColor: '#F1F1F1' }}></View>
                <View style={styles.searchBorder}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <Image
                            source={ImagesWrapper.search}
                        />
                        <TextInput
                            placeholder='Search contact'
                            style={styles.searchText}
                            multiline = {true}
                        >
                        </TextInput>
                    </View>
                </View>
                <Text style={styles.participants}>Participants</Text>


                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <TouchableOpacity >

                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 30, }}>
                                <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }}>
                                </View>
                                <View style={styles.list}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.save(item)}>
                                    <Text style={styles.remove}>Remove</Text>
                                </TouchableOpacity>


                            </View>
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                    extraData={this.state}
                />
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
        marginLeft: 20,
        marginTop: 5
    },
    list: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '50%'
    },
    remove: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: '21%',

        color: '#58C4C6',
        fontFamily: Fonts.mulishSemiBold,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',


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

    searchBorder: {
        borderWidth: 1.5,
        height: 50,
        width: '85%',
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        borderColor: '#F1F1F1',
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
    participants: {
        color: '#1E1C24',
        fontSize: 16,
        fontFamily: Fonts.mulishSemiBold,
        fontWeight: '600',
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 15
    }
})