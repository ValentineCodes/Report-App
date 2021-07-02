import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import {styles} from '../styles/receivedMsg';

export default function SentMsg({msg}) {
  return (
    <View style={styles.container}>
      <View style={styles.msgContainer}>
        <Text style={styles.msg}>{msg}</Text>

        <Text style={styles.timestamp}>Wed 11:04pm</Text>
      </View>
    </View>
  );
}
