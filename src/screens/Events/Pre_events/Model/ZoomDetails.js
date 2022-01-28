import {Type, plainToClass, Expose} from 'class-transformer';

// "zoomDetails": {
//   "password": 123455,
//   "hostUrl": "",
//   "joinUrl": "HHHH",
//   "registrationUrl": "",
//   "id": 0,
//   "uuid": "",
//   "mobileNumbers": []
// },

export class ZoomDetails {
  password= null;
  hostUrl= null;
  joinUrl= null;
  registrationUrl= null;
  id= null;
  uuid= null;
  mobileNumbers=null;

  
  getPassword() {
    return this.password;
  }
  
  setJoinUrl(value) {
    this.joinUrl = value;
  }
  
  getRegistrationUrl() {
    return this.registrationUrl;
  }

  
  setPassword(newValue) {
    this.password = newValue;
    console.log(this.password, ' new Value');
  }
}
