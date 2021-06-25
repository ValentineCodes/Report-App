import firestore from '@react-native-firebase/firestore';

export const _createChat = uid => {
  firestore()
    .collection('chats')
    .add({
      uid,
      timestamp: firestore.FieldValue.serverTimestamp(),
    })
    .then(snapshot => snapshot.get())
    .then(chat => console.log(chat.data()))
    .catch(err => console.log(err));
};
