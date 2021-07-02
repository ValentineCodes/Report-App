import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

//Screens
import Home from './src/screens/Home';
import Registration from './src/screens/Registration';

import {Colors} from './src/constants/colors';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const chatID = useSelector(state => state.chatID);
  const dispatch = useDispatch();

  // Listen for messages update in firebase firestore
  const subscriber = firestore()
    .collection('chats')
    .doc(chatID)
    .onSnapshot(msg => {
      if (msg.data() === undefined) {
        return;
      } else {
        dispatch({
          type: 'addFirestoreMsgs',
          payload: msg.data().messages,
        });
      }
    });

  useEffect(() => {
    AsyncStorage.getItem('user_ID').then(res => {
      if (!res) {
        setIsRegistering(true);
      } else {
        return;
      }
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary}}>
      <StatusBar backgroundColor="rgba(0,8,51,0.8)" />
      <Home />

      {/* Registration */}
      {isRegistering ? <Registration closePopUp={setIsRegistering} /> : null}
    </View>
  );
}

export default App;
