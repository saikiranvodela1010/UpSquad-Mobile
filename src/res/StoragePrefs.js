import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

}