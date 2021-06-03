import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, Icon} from 'react-native-elements';
import {Colors} from '../constants/colors';

export default function PopUp(props) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={{color: 'white', marginLeft: 3}}>{props.selectedValue}</Text>
      <Icon name="chevron-down" type="ionicon" color="white" size={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    backgroundColor: Colors.secondaryTransparent,
    marginVertical: 5,
    marginLeft: 10,
  },
});
