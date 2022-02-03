import {
  INCREASE_BURGER,
  DECREASE_BURGER,
  FETCH_DATA,
  FETCH_RESPONCE,
  FAILURE_STATUS,
  SUCCSESS_STATUS,
  FETCH_TOGGLE_SHOW_SORT,
  show_Filter,
  UPDATE_EVENT_TYPE,
  Load_More_TYPE,SHOW_PB,LIST_OF_EVENTS
} from './ActionTypes';
import axios from 'axios';
import eventsHandler from '../NetworkUtils/ApiHandler';
import {getLoginDetails,getLoginDetails_update,getProgileImage,getTocken,
  getUserId,getUserName,getUserEmail} from '../../../res/GetUserInfo';
// import { event } from 'react-native-reanimated';
let dispatch;
let typeofevent;
let is_CallShowPB=false;
const instance = axios.create({
 
  timeout:2000,
});
const API =
  'https://devapi.upsquad.com/users/validateEmail/rajkumar@thinkebiz.net';

function GetSpaces() {
  for (let i = 0; i < 50; i++) {
    console.log('');
  }
}

export const toggleShowFilter = () => {
  return {
    type: show_Filter,
    
  };
};

export const CallLoadMore = (parameter) => {
  return {
    type: Load_More_TYPE,
    payload:parameter
  };
};
export const CallShowPB = (parameter) => {
  is_CallShowPB=parameter;
  return {
    type:SHOW_PB,
    payload:parameter
  };
};
// CallEventDetailsAPI


export function updateEventType(param) {
  let resp = '';
  if (param == 0) {
    resp = 'Public events';
  } else if (param == 1) {
    resp = 'Private events';
  } else if (param == 2) {
    resp = 'My registered events';
  } else if (param == 3) {
    resp = 'My favorite events';
  }

  return dispatch => {
    return dispatch({
      type: UPDATE_EVENT_TYPE,
      payload: resp,
    });
  };
}


export function CallEventDetailsAPI(param,b,c) 
{
 // alert(param+"  bhanu");
  return dispatched => {
    
  return instance.get("https://devapi.upsquad.com/events/getEventDetails/"+param)//param)
  .then(response => {
    GetSpaces();
    console.log(response.data,"Event details");
   if(response.data.success==true)
   {
    b.navigate('eventDetails',{ eventData:{
      "data":response.data.data[0],
      "obj":c

    }});
   }
   dispatch({
    type: SHOW_PB,
    payload: false//response.data.data.favoriteEvents,
  });
  })
  .catch(error => {

    dispatch({
      type: SHOW_PB,
      payload: false//response.data.data.favoriteEvents,
    });
 
 alert(error+"DAMN");                     

  })
  ;

};

}


export function CallGetFavListOfIDS(type)
{
  //alert(getUserId());
  GetSpaces();
  GetSpaces();
  getUserId();
  GetSpaces();
  GetSpaces();
  typeofevent=type;
  return dispatched => {
    dispatch=dispatched;
    return axios
    .get(eventsHandler.allfavoriteEventsIDs + getUserId())
    .then(response => {
      GetSpaces();
      GetSpaces();
      GetSpaces();
     console.log(response.data,"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      GetSpaces();
      GetSpaces();
      console.log(response.data.data.favoriteEvents, 'allfavoriteEventsIDs',type);
     try{
        dispatch({
          type: LIST_OF_EVENTS,
          payload: response.data.data.favoriteEvents,
        });
     }
     catch(error)
     {
      dispatched({
        type: LIST_OF_EVENTS,
        payload:[],
      });
     }
     

     if(type==0)
    {
CallPublicEvents();
     }

   else  if(type==1)
     {
      CallPrivateEvents(getUserEmail())
     }
     
   else  if(type==2)
     {
       
      CallregisteredEvents(getUserEmail());

     }
     
   else  if(type==3)
     {
       CallFavEvents(getUserId(),response.data.data.favoriteEvents);
     }
  })
    .catch(error => {
      console.log(error, ' ERROR fav event');
      let resp = {
        status: FAILURE_STATUS,
        response: [],
        msg: error.response,
      };
      dispatch({
        type: FETCH_RESPONCE,
        payload: resp,
      });
      dispatch({
        type:  Load_More_TYPE,
        payload: false//response.data.data.favoriteEvents,
      });
      dispatch({
        type: SHOW_PB,
        payload: false//response.data.data.favoriteEvents,
      });
      alert(error);
      
    });
  };


}


export function CallAddFavEvent(eventid,userid)
{

  GetSpaces();
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    const params = {
      id: eventid,
      userId:userid
    };
    return instance
      .patch(eventsHandler.addToFavorite,params,headers)
      .then(response => {
        GetSpaces();
        console.log(response.data,"Add fav");
       if(response.data.success==true)
       {
      //  alert("Successfully Added");
        try{
          dispatch({
            type: LIST_OF_EVENTS,
            payload: response.data.data.favoriteEvents,
          });

          if(typeofevent==0)
          {
      CallPublicEvents();
           }
      
         else  if(typeofevent==1)
           {
            CallPrivateEvents(getUserEmail())
           }
           
         else  if(typeofevent==2)
           {
             
            CallregisteredEvents(getUserEmail());
      
           }
           
         else  if(typeofevent==3)
           {
             CallFavEvents(getUserId(),response.data.data.favoriteEvents);
           }



       }
       catch(error)
       {

        dispatch({
          type: SHOW_PB,
          payload: false//response.data.data.favoriteEvents,
        });
        alert(error);

        
       }
       }
          
      })
      .catch(error => {
        console.log(error, ' ERROR fav event');
        dispatch({
          type: SHOW_PB,
          payload: false//response.data.data.favoriteEvents,
        });
        alert(error);
      });
  };
}
function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}
export function CallRemoveFavEvent(eventid,userid)
{

  GetSpaces();
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    const params = {
      id: eventid,
      userId:userid
    };
    return instance
      .patch(eventsHandler.removeToFavorite,params,headers)
      .then(response => {
        GetSpaces();
        console.log(response.data,"Remove fav");
        if(response.data.success==true)
       {
     
        console.log(response.data.data.favoriteEvents,"response.data.data.favoriteEvents");

        try{
            let LISTOFNEWEVENTS =response.data.data.favoriteEvents;
            if(LISTOFNEWEVENTS.includes(eventid))
            {
              LISTOFNEWEVENTS=arrayRemove(LISTOFNEWEVENTS,eventid);
            }
          dispatch({
            type: LIST_OF_EVENTS,
            payload: LISTOFNEWEVENTS//response.data.data.favoriteEvents,
          });

          if(typeofevent==0)
          {
           // alert("Successfully Removed");
      CallPublicEvents();
           }
      
         else  if(typeofevent==1)
           {
            CallPrivateEvents(getUserEmail())
           }
           
         else  if(typeofevent==2)
           {
             
            CallregisteredEvents(getUserEmail());
      
           }
           
         else  if(typeofevent==3)
           {
             CallFavEvents(getUserId(),LISTOFNEWEVENTS);
           }



       }
       catch(error)
       {
        dispatch({
          type: SHOW_PB,
          payload: false//response.data.data.favoriteEvents,
        });
        alert(error);
       }

       }
      })
      .catch(error => {
        console.log(error, ' ERROR remove event');
        dispatch({
          type: SHOW_PB,
          payload: false//response.data.data.favoriteEvents,
        });
        alert(error);
      });
  };
}




export function CallPublicEvents() 
{
console.log("Came........");
 
    return  instance
    .get(eventsHandler.publicEvents)
    .then(response => {
      GetSpaces();
      console.log(response.data, 'CallPublicEvents');
      if (response.data.success == true) {
        let resp = {
          status: SUCCSESS_STATUS,
          response: response.data.data,
        };
        dispatch({
          type: FETCH_RESPONCE,
          payload: resp,
        });
      } else {
        let resp = {
          status: FAILURE_STATUS,
          response: [],
          msg: response.data.msg,
        };
        dispatch({
          type: FETCH_RESPONCE,
          payload: resp,
        });
      }
      dispatch({
        type: SHOW_PB,
        payload: false
      });
      dispatch({
        type:  Load_More_TYPE,
        payload: false//response.data.data.favoriteEvents,
      });
    })
    .catch(error => {
      alert(error);
      console.log(error, ' ERROR');

      console.log(error.response.status);
      let resp = {
        status: FAILURE_STATUS,
        response: [],
        msg: error.response,
      };
      dispatch({
        type: FETCH_RESPONCE,
        payload: resp.error,
      });
      dispatch({
        type: SHOW_PB,
        payload: false//response.data.data.favoriteEvents,
      });
      dispatch({
        type:  Load_More_TYPE,
        payload: false//response.data.data.favoriteEvents,
      });
      
      alert(error);
    });
    
}

export function CallPrivateEvents(email) {

    let headers = {
      'Content-Type': 'application/json',
    };
    return instance
      .get(eventsHandler.privateEvents + email)
      .then(response => {
        GetSpaces();
        console.log(response.data, 'CallPrivateEvents');
        if (response.data.success == true) {
          let resp = {
            status: SUCCSESS_STATUS,
            response: response.data.data,
            msg: response.data.msg == undefined ? '' : response.data.msg,
          };
          dispatch({
            type: FETCH_RESPONCE,
            payload: resp,
          });
        } else {
          let resp = {
            status: FAILURE_STATUS,
            response: [],
            msg: response.data.msg == undefined ? '' : response.data.msg,
          };
          dispatch({
            type: FETCH_RESPONCE,
            payload: resp,
          });
        }
        dispatch({
          type: SHOW_PB,
          payload: false
        });
        dispatch({
          type:  Load_More_TYPE,
          payload: false//response.data.data.favoriteEvents,
        });
      })
      .catch(error => {
        console.log(error, ' ERROR');
        console.log(error.response.status);
        let resp = {
          status: FAILURE_STATUS,
          response: [],
          msg: error.response,
        };
        dispatch({
          type: FETCH_RESPONCE,
          payload: resp.error,
        });
        dispatch({
          type: SHOW_PB,
          payload: false//response.data.data.favoriteEvents,
        });
        dispatch({
          type:  Load_More_TYPE,
          payload: false//response.data.data.favoriteEvents,
        });
        alert(error);
      });
  }


export function CallFavEvents(userID,events) {
  GetSpaces();



  console.log(events,"EVENTSSSSSSSSSSSSSSSSS");
  const params = {
    eventsIDs: events,
  };

  console.log(params, ' PARAMS');
    let headers = {
      'Content-Type': 'application/json',
    };
    return instance
    .post(eventsHandler.favEvents, params, headers)

    .then(response => {
      GetSpaces();
     // console.log(response.data.data.length, ' CallFavEvents');
      GetSpaces();
      if (response.data.success == true) {
        let resp = {
          status: SUCCSESS_STATUS,
          response: response.data.data,
          msg: response.data.msg == undefined ? '' : response.data.msg,
        };
        dispatch({
          type: FETCH_RESPONCE,
          payload: resp,
        });
      } else {
        // alert(response.data.msg,"DAMN");
        let resp = {
          status: FAILURE_STATUS,
          response: [],
          msg: response.data.msg,
        };
        dispatch({
          type: FETCH_RESPONCE,
          payload: resp,
        });
      }
      dispatch({
        type: SHOW_PB,
        payload: false
      });
      dispatch({
        type:  Load_More_TYPE,
        payload: false//response.data.data.favoriteEvents,
      });
    })
    .catch(error => {
      console.log(error, ' ERRORorrr');

      let resp = {
        status: FAILURE_STATUS,
        response: [],
        msg: error.response,
      };
      dispatch({
        type: FETCH_RESPONCE,
        payload: resp,
      });
      dispatch({
        type: SHOW_PB,
        payload: false//response.data.data.favoriteEvents,
      });
      dispatch({
        type:  Load_More_TYPE,
        payload: false//response.data.data.favoriteEvents,
      });
      alert(error);
    });
  
}

export const toggleShowSort = () => {
  return {
    type: FETCH_TOGGLE_SHOW_SORT,
  };
};

export function CallregisteredEvents(email) {
  
    let headers = {
      'Content-Type': 'application/json',
    };
    //  alert(eventsHandler.addEvents);

    return instance
      .get(eventsHandler.registeredEvents + email)
      .then(response => {
        GetSpaces();
        console.log(response.data, 'CallregisteredEvents');
        // let root = plainToClass(Root, response.data);
        // console.log(root, 'ROOT');

        // GetSpaces();
        // let data = plainToClass(Data, root.getData()[0]);
        // console.log(data, 'DATA');

        // GetSpaces();
        // let zoomDetails = plainToClass(ZoomDetails, data.getZoomDetails());

        // zoomDetails.setJoinUrl('bahnu.com');
        // console.log(zoomDetails, 'zoomDetails');

        // GetSpaces();

        // data.setZoomDetails(zoomDetails);
        // console.log(data, 'DATAXXXX');

        if (response.data.success == true) {
          let resp = {
            status: SUCCSESS_STATUS,
            response: response.data.data,
            msg: response.data.msg == undefined ? '' : response.data.msg,
          };
          dispatch({
            type: FETCH_RESPONCE,
            payload: resp,
          });
        } else {
console.log("elseeeeeeeeeeeeeeee             CallregisteredEvents");

          let resp = {

            status: FAILURE_STATUS,
            response: [],
            msg: response.data.msg,
          };
          dispatch({
            type: FETCH_RESPONCE,
            payload: resp,
          });
        }
        dispatch({
          type: SHOW_PB,
          payload: false
        });
        dispatch({
          type:  Load_More_TYPE,
          payload: false//response.data.data.favoriteEvents,
        });
      })
      .catch(error => { 
        console.log(error, ' ERROR CallregisteredEvents');

        console.log(error.response.status);

        let resp = {
          status: FAILURE_STATUS,
          response: [],
          msg: error.response,
        };
        dispatch({
          type: FETCH_RESPONCE,
          payload: resp,
        });
        dispatch({
          type: SHOW_PB,
          payload: false//response.data.data.favoriteEvents,
        });
        dispatch({
          type:  Load_More_TYPE,
          payload: false//response.data.data.favoriteEvents,
        });
        alert(error);
      });
  
}

export const increaseBurgerAction = parameter => {
  return {
    type: INCREASE_BURGER,
    payload: parameter,
  };
};

export const decreaseBurgerAction = () => {
  return {
    type: DECREASE_BURGER,
  };
};

export function fetchData() {
  console.log('Incoming......');
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    return instance
      .get(API, headers)
      .then(data => {
        console.log(data.data, ' dataXXXXXXXX');
        // let root = plainToClass(Root, data.data);

        // console.log(root, 'BHANUUUUUUUUUUUUUUUUUUUUUU');

        dispatch({
          type: FETCH_DATA,
          payload: data.data.msg + ' wow',
        });
      })
      .catch(error => {
        console.log(error, ' ERROR');
        // console.log(error.response.status);
        dispatch({
          type: FETCH_DATA,
          payload: error,
        });
      });
  };
}












