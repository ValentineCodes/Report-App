import firestore from '@react-native-firebase/firestore';

export const _sendReport = (uid, coords) => {
  // Create chat room
  firestore()
    .collection('chats')
    .add({})
    .then(snapshot => snapshot.id)
    .then(chatID => {
      // Send report
      firestore()
        .collection('reports')
        .add({
          uid,
          chatID,
          coords,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(snapshot => snapshot.get())
        .then(report => console.log(report.data()))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
