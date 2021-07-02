export default function profileReducer(state = {}, action) {
  if (action.type == 'addProfile') {
    return action.payload;
  } else {
    return state;
  }
}
