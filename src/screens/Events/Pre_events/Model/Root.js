



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
  firstName= null;
            lastName=null;
            profileImg= null;
  getTotalAttendences()
  {
    return this.signupInvitees.length+this.registerInvites.length+this.userRegisterEvent.length;
  }

getHostName()
{
  return this.firstName+" "+this.lastName;
}
getHostProfilePic()
{
  return this.profileImg;
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



  