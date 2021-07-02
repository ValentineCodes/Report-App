let initialState = [];

export default function chatMsgsReducer(state = initialState, action) {
  if (action.type == 'addMsg') {
    return [action.payload, ...state];
  } else if (action.type == 'addFirestoreMsgs') {
    return action.payload;
  } else if (action.type == 'updateMsg') {
    return action.payload
    // let editedState = state.map(msg =>
    //   msg.id == action.payload.id
    //     ? {
    //         id: msg.id,
    //         msg: msg.msg,
    //         timestamp: action.payload.timestamp,
    //         sender: action.payload.sender,
    //         status: action.payload.status,
    //       }
    //     : msg,
    // );
    // let prevMsgs = editedState.filter(msg => msg.id !== action.payload.id);
    // let msgEdited = editedState.filter(msg => msg.id == action.payload.id);
    // let newState = [...msgEdited, ...prevMsgs];
    return newState;
  } else if (action.type == 'clearMsgs') {
    return [];
  } else {
    return state;
  }
}
