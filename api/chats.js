import firestore, {firebase} from '@react-native-firebase/firestore';

function getTimestamp() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  return `${hour}:${minutes}`;
}

export const _sendMsg = (chatID, id, msg, updateMsg) => {
  let timestamp = getTimestamp();

  firestore()
    .collection('chats')
    .doc(chatID)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        id,
        msg,
        timestamp,
        status: 'sent',
        sender: 'user',
      }),
    })
    .then(snapshot => {
      updateMsg({
        id,
        timestamp,
        sender: 'user',
        status: 'sent',
      });
    })
    .catch(err => {
      return;
    });
};
