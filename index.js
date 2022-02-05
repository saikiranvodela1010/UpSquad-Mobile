/**
 * @format
 */
 import 'react-native-gesture-handler';
 import {AppRegistry} from 'react-native';
 import {name as appName} from './app.json';
 import Redux from './Redux';
//  import Mini from './Mini';
//  import Mini2 from './Mini2';
 import getLoginDetails_update from './src/res/GetUserInfo';
 
 AppRegistry.registerComponent(appName, () => Redux);
 