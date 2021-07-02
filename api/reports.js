import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const _sendReport = (uID, chatID, coords) => {
  // Sending the chatID with the report so the Admin can send messages to the document
  firestore()
    .collection('reports')
    .add({
      uID,
      chatID,
      coords: [coords],
      timestamp: firestore.FieldValue.serverTimestamp(),
    })
    .catch(err => alert('Report Failed!. Must be your Data Connection'));
};

export const _processReport = (coords, dispatchChatID) => {
  //Get user id from local storage
  AsyncStorage.getItem('user_ID')
    .then(uID => {
      // Create chat room in firebase firestore
      firestore()
        .collection('chats')
        .add({
          messages: [],
        })
        .then(snapshot => snapshot.id)
        .then(chatID => {
          // Store chat_ID locally to be used for sending messages from the client side

          dispatchChatID(chatID);
          _sendReport(uID, chatID, coords);
        })
        .catch(err => alert('Report Failed!. Must be your Data Connection'));
    })
    .catch(err => {
      return;
    });
};

export const _addNewCoords = (reportID, coords) => {
  firestore()
    .collection('reports')
    .doc(reportID)
    .update({
      coords: firebase.firestore.FieldValue.arrayUnion(coords),
    })
    .catch(err => {
      return;
    });
};
