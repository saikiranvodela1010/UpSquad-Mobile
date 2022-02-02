import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {set_updateUserDetails} from './GetUserInfo';
export default class StoragePref extends React.Component {
    async setValue(key, value) {
        await AsyncStorage.setItem(key, value);
    }

    async getValue(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
        }
    }
    async setObjectValue(key, value) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
       let value2=await this.getObjectValue('userDetails');
        set_updateUserDetails(value2);
    }
    async getArrayValue(key, callback) {
        try {
            await AsyncStorage.getItem(key, (err, result) => {
                return callback(JSON.parse(result));
            });
        } catch (e) {
            return e;
        }
    }

    async getObjectValue(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return JSON.parse(value);
        }
        catch (e) {

        }
    }
    async setIsLogedIn(value) {
       
        await AsyncStorage.setItem("logedin",value);
    }

    async getIsLogedIn() {
        try {
            const value = await AsyncStorage.getItem("logedin");
            return value;
        }
        catch (e) {
return "NO";
        }
    }


      

}