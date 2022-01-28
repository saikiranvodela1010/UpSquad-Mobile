import StoragePrefs from './StoragePrefs';
import {useEffect} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';
let  storagePrefs = new StoragePrefs();

let   logindetails={};
let logedin="UNDEFINED";

  async function  getuserLogedIn()
{

    logedin= await storagePrefs.getIsLogedIn(); 
}
getuserLogedIn();


export function getISUSERLOGEDIN()
{
    return logedin;
}




  async function  updateUserDetails()
{

     logindetails=await storagePrefs.getObjectValue('userDetails'); 
  console.log(logindetails.firstName,"bhanupro");
  

}

export function set_updateUserDetails(val)
{

     logindetails=val;
  

}



updateUserDetails();


export function getLoginDetails()
{
    return logindetails;
}

export function getLoginDetails_update()
{
    updateUserDetails();
}
export function getTocken()
{
    return logindetails.token;
}
export function getProfileImage()
{
    return logindetails.profileImage;
}
export function getUserName()
{
    return logindetails.userName;
}
export function getUserId()
{
    return logindetails.userId;
}

export function getUserEmail()
{
   // alert(logindetails.userEmail);
    return logindetails.userEmail;
}




//  {
// "firstName": "Bhanu",
//  "isAdmin": false,
//   "isProfessional": false, 
//   "lastName": "Prasad",
//    "progileImage": "", 
//    "token": "",
//  "userEmail": "Bhanupro@gmail.com", 
//  "userId": "61ee852149bcd11c899603e3",
//   "userName": "Bhanu Prasad"
// }


