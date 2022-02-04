let baseURL = 'https://devapi.upsquad.com';
let shareEventbaseUrl='http://socialsharedev.upsquad.com/event/register/';
let dummyProfilepic="https://www.careerquo.com/assets/images/18.png";
export default  eventsHandler =
 {
  registeredEvents:baseURL+'/events/register/',
  privateEvents:baseURL+'/events/private/',
  publicEvents:baseURL+'/events/public',
  allfavoriteEventsIDs:baseURL+'/users/allfavoriteEventsIDs/', //get userid 
  favEvents:baseURL+"/events/getAllFavoriteEventsDetails",  //body post
  addToFavorite:baseURL+"/users/addToFavorite",
  removeToFavorite:baseURL+"/users/removeFromFavorite", //patch
  eventDetails:baseURL+"/events/getEventDetails/",
  shareEventbaseUrl:shareEventbaseUrl,
  dummyProfilepic:dummyProfilepic, 
};

 