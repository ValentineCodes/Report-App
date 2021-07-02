import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const _validateEmail = (email, onValidateEnd) => {
  firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(snapshot => {
      if (snapshot.docs[0] === undefined) {
        onValidateEnd.setIsEmailValid(true);
        onValidateEnd.setEmailErrMsg('');
      } else {
        onValidateEnd.setIsEmailValid(false);
        onValidateEnd.setEmailErrMsg('Email Already Exists. Try another one.');
      }
      onValidateEnd.setIsValidatingEmail(false);
    })
    .catch(err => alert('Registation Failed!. Must be your Data Connection'));
};

export const _validateNIN = (NIN, onValidateEnd) => {
  firestore()
    .collection('users')
    .where('nin', '==', NIN)
    .get()
    .then(snapshot => {
      if (snapshot.docs[0] === undefined) {
        onValidateEnd.setIsNINValid(true);
        onValidateEnd.setNINErrMsg('');
      } else {
        onValidateEnd.setIsNINValid(false);
        onValidateEnd.setNINErrMsg('NIN Already Exists. Try another one.');
      }
      onValidateEnd.setIsValidatingNIN(false);
    })
    .catch(err => alert('NIN Validation Failed!. Please try again.'));
};

export const _addUser = (user, setIsCreating, hideContainer) => {
  firestore()
    .collection('users')
    .add({
      name: user.name,
      address: user.address,
      email: user.email,
      nin: user.NIN,
      number: user.number,
      joinedOn: firestore.FieldValue.serverTimestamp(),
    })
    .then(snapshot => snapshot.id)
    .then(userID => {
      // Save user id
      AsyncStorage.setItem('user_ID', userID)
        .then(res => {
          setIsCreating(false);
          // Remove Registeration Screen
          hideContainer();
        })
        .catch(err => {
          return;
        });
    })
    .catch(err => {
      alert('Registration Failed!. Must be your Data Connection:::');
      setIsCreating(false);
    });
};

export const _updateUser = (user, onUpdate) => {
  // Get user id
  AsyncStorage.getItem('user_ID')
    .then(userID => {
      // Update User Profile
      firestore()
        .collection('users')
        .doc(userID)
        .update({
          name: user.name,
          address: user.address,
          email: user.email,
          number: user.number,
        })
        .then(res => {
          onUpdate.setIsUpdating(false);
          onUpdate.setIsEditing(false);
          onUpdate.hideContainer();
          onUpdate.dispatch({
            type: 'addProfile',
            payload: {profileImage: '', ...user},
          });
        })
        .catch(err => {
          return;
        });
    })
    .catch(err => {
      return;
    });
};
