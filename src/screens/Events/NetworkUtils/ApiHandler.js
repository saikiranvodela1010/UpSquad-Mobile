let baseURL = 'https://devapi.upsquad.com';


export default  eventsHandler =
 {
  registeredEvents:baseURL+'/events/register/',
  privateEvents:baseURL+'/events/private/',
  publicEvents:baseURL+'/events/public',
  allfavoriteEventsIDs:baseURL+'/users/allfavoriteEventsIDs/', //get userid 
  favEvents:baseURL+"/events/getAllFavoriteEventsDetails",  //body post
  addToFavorite:baseURL+"/users/addToFavorite",
  removeToFavorite:baseURL+"/users/removeFromFavorite", //patch
 };

 