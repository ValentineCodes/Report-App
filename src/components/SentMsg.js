import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import {Colors} from '../constants/colors';

import {styles} from '../styles/sentMsg';

export default function SentMsg({msg}) {
  return (
    <View style={styles.container}>
      <View style={styles.msgContainer}>
        <Text style={styles.msg}>{msg.msg}</Text>

        <View style={styles.footer}>
          <Text style={styles.timestamp}>{msg.timestamp}</Text>
          <Icon
            name={
              msg.status === 'sent' ? 'checkmark-done-outline' : 'time-outline'
            }
            type="ionicon"
            size={15}
            color="white"
          />
        </View>
      </View>
    </View>
  );
}
