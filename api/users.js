import firestore from '@react-native-firebase/firestore';

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
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
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
    .then(snapshot => snapshot.get())
    .then(user => {
      console.log(user);
      setIsCreating(false);
      hideContainer();
    })
    .catch(err => {
      console.log('Registration Failed!. Must be your Data Connection:::', err);
      setIsCreating(false);
    });
};
