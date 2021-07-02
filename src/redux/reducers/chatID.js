export default function chatIDReducer(state = '', action) {
  if (action.type == 'addChatID') {
    return action.payload;
  } else {
    return state;
  }
}
