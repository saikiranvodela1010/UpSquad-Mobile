import * as React from 'react';
import { View, useWindowDimensions,Text,TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import GroupScreen from '../screens/GroupScreen';
import ProfileSuccess from '../screens/ProfileSuccess';
const FirstRoute = (props) => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
      <TouchableOpacity onPress={()=>{
        //  props.navigate('ProfileSucess')
        <ProfileSuccess/>
      }}>
      <Text style={{textAlign:'center',marginTop:200}}>helllo first</Text>
      </TouchableOpacity>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }}>
      <TouchableOpacity onPress={()=>{
        //   navigation.navigate('ProfileSucess')
      }}>
      <Text style={{textAlign:'center',marginTop:200}}>helllo Second</Text>
      </TouchableOpacity>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: GroupScreen ,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
