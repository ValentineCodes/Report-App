import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
//Screens
import Home from './src/screens/Home';
import Registration from './src/screens/Registration';

import {Colors} from './src/constants/colors';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    setIsRegistering(true);
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
