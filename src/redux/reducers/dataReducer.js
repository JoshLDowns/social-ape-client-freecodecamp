import {
  SET_SCREAMS,
  POST_SCREAM,
  SET_SCREAM,
  DELETE_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  SUBMIT_COMMENT,
  SUBMIT_NEW_SETTINGS,
} from "../types.js";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if(state.scream.screamId === action.payload.screamId){
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let delIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(delIndex, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [
            action.payload, ...state.scream.comments
          ]
        },
        loading: false
      }
    case SUBMIT_NEW_SETTINGS:
      return {
        ...state,
        loading: false
      }
    default:
      return {
        ...state,
      };
  }
}
