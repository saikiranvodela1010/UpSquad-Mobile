import { Load_More } from './Action';
import {
  INCREASE_BURGER,
  DECREASE_BURGER,
  FETCH_DATA,
  FETCH_RESPONCE,
  FETCH_TOGGLE_SHOW_SORT,show_Filter,
      UPDATE_EVENT_TYPE,
      PRIVATE_EVENT_TYPE,
      PUBLIC_EVENT_TYPE,
      FAV_EVENT_TYPE,Load_More_TYPE,SHOW_PB,LIST_OF_EVENTS
} from './ActionTypes';

//initializing state

// Action functions which return action type and
// optional payLoad to burgerReducer

const initialState = {
  numberOfBurger: 10,
  responceString: 'Loading.....',
  bhanu: 'HECK',
  statusOfEvents: 'Public events',
  infoData: {
    status: 'DEFAULT',
    response: [],
    msg:"Loading.."
  },
  showSort: false,
  showFilter:false,
  loadMore:false,
  showPB:false,
  listofevents:[],
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_BURGER:
      return {
        ...state,
        numberOfBurger: state.numberOfBurger + action.payload,
      };
    case DECREASE_BURGER:
      return {
        ...state,
        numberOfBurger: state.numberOfBurger - 1,
      };
    case FETCH_DATA:
      return {
        ...state,
        responceString: action.payload.toString(),
      };
    case FETCH_RESPONCE:
      return {
        ...state,
        infoData: action.payload,
      };
    case FETCH_TOGGLE_SHOW_SORT:
      return {
        ...state,
        showSort: !state.showSort,
      };
    case show_Filter:
      return {
        ...state,
        showFilter: !state.showFilter,
      };
      case UPDATE_EVENT_TYPE:
      return {
        ...state,
        statusOfEvents: action.payload,
      };


      case PRIVATE_EVENT_TYPE:
        return {
          ...state,
          infoData: action.payload,
        };

        case PUBLIC_EVENT_TYPE:
          return {
            ...state,
            infoData: action.payload,
          };


         case FAV_EVENT_TYPE:
            return {
              ...state,
              infoData: action.payload,
            };


            case Load_More_TYPE :
              return {
                ...state,
                loadMore: action.payload,
              };
              case SHOW_PB :
              return {
                ...state,
                showPB: action.payload,
              };

              case LIST_OF_EVENTS :
                
                return {
                  ...state,
                  listofevents: action.payload,
                };
    default:
      return state;
  }
};

export default burgerReducer;
