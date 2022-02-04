export class Data {
  microsoftTeamDetails = null;
  zoomDetails = null;
  entireOrganization = null;
  selectedTeams = null;
  downloadLink = null;
  downloadLinkIds = null;
  eventLocation = null;
  sessionSurveyStatus = null;
  imageUrls = null;
  _id = null;
  selectedTeamsIds = null;
  zoomReports = null;
  registerInvites = null;
  signupInvitees = null;
  userRegisterEvent = null;
  universityId = null;
  eventAgenda = null;
  apiUrl = null;
  eventTitle = null;
  eventOrganizer = null;
  roomName = null;
  eventDescription = null;
  eventVenue = null;
  eventType = null;
  hostEmail = null;
  hostId = null;
  hostisProfessional = null;
  isProfessional = null;
  eventStartDate = null;
  eventEndDate = null;
  videoUrl = null;
  videoType = null;
  createdAt = null;
  zoomUserId = null;
  sessionSurvey = null;
  surveyStatus = null;
  surveyDescription = null;
  v = null;
  updatedAt = null;
  firstName=null;
  lastName=null;
  profileImg:null;     // "https://www.careerquo.com/assets/images/18.png"

   getHostName()
   {
return this.firstName+" "+this.lastName;
   }
   getProfileImage()
   {
     return this.profileImg;
   }



  getMicrosoftTeamDetails() {
    return this.microsoftTeamDetails;
  }

  getZoomDetails() {
    return this.zoomDetails;
  }

  getEntireOrganization() {
    return this.entireOrganization;
  }

  getSelectedTeams() {
    return this.selectedTeams;
  }

  getDownloadLink() {
    return this.downloadLink;
  }

  getDownloadLinkIds() {
    return this.downloadLinkIds;
  }

  getEventLocation() {
    return this.eventLocation;
  }

  getSessionSurveyStatus() {
    return this.sessionSurveyStatus;
  }

  getImageUrls() {
    return this.imageUrls;
  }

  getId() {
    return this._id;
  }

  getSelectedTeamsIds() {
    return this.selectedTeamsIds;
  }

  getZoomReports() {
    return this.zoomReports;
  }

  getRegisterInvites() {
    return this.registerInvites;
  }

  getSignupInvitees() {
    return this.signupInvitees;
  }

  getUserRegisterEvent() {
    return this.userRegisterEvent;
  }

  getUniversityId() {
    return this.universityId;
  }

  getEventAgenda() {
    return this.eventAgenda;
  }

  getApiUrl() {
    return this.apiUrl;
  }

  getEventTitle() {
    return this.eventTitle;
  }

  getEventOrganizer() {
    return this.eventOrganizer;
  }

  getRoomName() {
    return this.roomName;
  }

  getEventDescription() {
    return this.eventDescription;
  }

  getEventVenue() {
    return this.eventVenue;
  }

  getEventType() {
    return this.eventType;
  }

  getHostEmail() {
    return this.hostEmail;
  }

  getHostId() {
    return this.hostId;
  }

  getHostisProfessional() {
    return this.hostisProfessional;
  }

  getIsProfessional() {
    return this.isProfessional;
  }

  getEventStartDate() {
    return this.eventStartDate;
  }

  getEventEndDate() {
    return this.eventEndDate;
  }

  getVideoUrl() {
    return this.videoUrl;
  }

  getVideoType() {
    return this.videoType;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getZoomUserId() {
    return this.zoomUserId;
  }

  getSessionSurvey() {
    return this.sessionSurvey;
  }

  getSurveyStatus() {
    return this.surveyStatus;
  }

  getSurveyDescription() {
    return this.surveyDescription;
  }

  getV() {
    return this.v;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}

export class EventLocation {
  id = null;
  name = null;
  isChecked = null;

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getIsChecked() {
    return this.isChecked;
  }
}

export class MicrosoftTeamDetails {
  teamsId = null;
  joinWebUrl = null;

  getTeamsId() {
    return this.teamsId;
  }

  getJoinWebUrl() {
    return this.joinWebUrl;
  }
}

export class MobileNumber {
  countryName = null;
  city = null;
  number = null;
  type = null;
  country = null;

  getCountryName() {
    return this.countryName;
  }

  getCity() {
    return this.city;
  }

  getNumber() {
    return this.number;
  }

  getType() {
    return this.type;
  }

  getCountry() {
    return this.country;
  }
}

export class Participant {
  user_email = null;
  id = null;
  name = null;
  duration = null;
  join_time = null;
  leave_time = null;

  getUserEmail() {
    return this.user_email;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDuration() {
    return this.duration;
  }

  getJoinTime() {
    return this.join_time;
  }

  getLeaveTime() {
    return this.leave_time;
  }
}

export class RegisterInvite {
  email = null;

  getEmail() {
    return this.email;
  }
}

export class SelectedTeamsId {
  id = null;
  teamId = null;

  getId() {
    return this.id;
  }

  getTeamId() {
    return this.teamId;
  }
}

export class SignupInvitee {
  email = null;

  getEmail() {
    return this.email;
  }
}

export class UserRegisterEvent {
  companyOrOrganization = null;
  firstName = null;
  lastName = null;
  email = null;

  getCompanyOrOrganization() {
    return this.companyOrOrganization;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmail() {
    return this.email;
  }
}

export class ZoomDetails {
  hostUrl = null;
  joinUrl = null;
  registrationUrl = null;
  uuid = null;
  mobileNumbers = null;
  password = null;
  id = null;

  getHostUrl() {
    return this.hostUrl;
  }

  getJoinUrl() {
    return this.joinUrl;
  }

  getRegistrationUrl() {
    return this.registrationUrl;
  }

  getUuid() {
    return this.uuid;
  }

  getMobileNumbers() {
    return this.mobileNumbers;
  }

  getPassword() {
    return this.password;
  }

  getId() {
    return this.id;
  }
}

export class ZoomReports {
  duration = null;
  participantsCount = null;
  uuid = null;
  id = null;
  participants = null;

  getDuration() {
    return this.duration;
  }

  getParticipantsCount() {
    return this.participantsCount;
  }

  getUuid() {
    return this.uuid;
  }

  getId() {
    return this.id;
  }

  getParticipants() {
    return this.participants;
  }
}
