import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/colors';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  msgContainer: {
    backgroundColor: 'rgba(248, 30, 7, 0.85)',
    marginTop: 5,
    marginRight: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderTopRightRadius: 2,
    maxWidth: '90%',
  },

  msg: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timestamp: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: screenWidth / 30,
  },
});
