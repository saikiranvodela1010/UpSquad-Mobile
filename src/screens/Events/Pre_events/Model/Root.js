import { Type, plainToClass,Expose } from 'class-transformer';
import { ZoomDetails } from './ZoomDetails';
import { EventLocation } from './EventLocation';
import { RegisterInvites} from'./RegisterInvites' 
import { UserRegisterEvent } from './UserRegisterEvent';
export class Root {
  success=null;
  msg=null;
  data= null;
 


  
  getSuccess()
  {  
    return this.success;
  }
  
  setSuccess(value) 
  {   
     this.success=value;
  }
  
  getMsg()
  {  
    return this.msg;
  }
  
  setMsg(value) 
  {   
     this.msg=value;
  }
  
  setData(value) {
 this.data=value;
  }
  
  getData() {
 return this.data;
  }

}


 export  class Data {
  _id=null;
  zoomDetails=null;
  entireOrganization=null;
  selectedTeams=null;
  downloadLink=null;
  downloadLinkIds=null;
  eventLocation=null;
  sessionSurveyStatus=null;
  imageUrls=null;
  selectedTeamsIds=null;
  zoomReports=null;
  registerInvites= null; ////////////
  signupInvitees=null ;
  userRegisterEvent=null;////////
  universityId=null;
  eventAgenda=null;
  apiUrl=null;
  eventTitle=null;
  EventOrganizer=null;
  roomName=null;
  eventDescription=null;
  eventVenue=null;
  eventType=null;   //1 private 2 means publlic
  hostEmail=null;
  hostId=null;          
  hostisProfessional=null;
  isProfessional=null;
  eventStartDate=null;
  eventEndDate=null;
  videoUrl=null;
  videoType=null;
  createdAt=null;
  zoomUserId=null;
  sessionSurvey=null;
  surveyStatus=null;
  surveyDescription=null;
  __v=null;

  getTotalAttendences()
  {
    return this.signupInvitees.length+this.registerInvites.length+this.userRegisterEvent.length;
  }




 
  getEventID() {
    return this._id;
  }

  
  setId(value) {
 this.id=value;
  }

  
  getZoomDetails()
  {
return this.zoomDetails;
  }
  
  setZoomDetails(value)
  {
 this.zoomDetails=value;
  }
  
  setEventStartDate(value)
  {
 this.eventStartDate=value;
  }

  getEventStartDate()
  {
return this.eventStartDate;
  }
  
  setEventEndDate(value)
  {
 this.eventEndDate=value;
  }
  getEventEndDate()
  {
return this.eventEndDate;
  }

  setEventTitle(value)
  {
 this.eventTitle=value;
  }

  getEventTitle()
  {
return this.eventTitle;
  }

  getImageURLS()
  {
return this.imageUrls;
  }

  getImageURLS()
  {
return this.imageUrls;
  }
  



}



  