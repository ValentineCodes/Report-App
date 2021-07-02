import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/colors';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  msgContainer: {
    backgroundColor: 'rgba(37, 211, 102, 0.9)',
    marginTop: 5,
    marginLeft: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderTopLeftRadius: 2,
    maxWidth: '80%',
  },
  msg: {
    color: 'white',
  },
  timestamp: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: screenWidth / 30,
    marginRight: 5,
  },
});
