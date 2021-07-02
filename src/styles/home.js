import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/colors';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.primary},
  marker: {width: 30, height: 30, borderRadius: 100},
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth / 1.7,
  },
  button: {
    width: screenWidth / 2.5,
    height: screenWidth / 2.5,
    borderRadius: 100,
    borderWidth: 0.4,
    borderColor: 'rgba(0,0,0,1)',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: screenWidth / 13,
  },
  chatButton: {
    position: 'absolute',
    bottom: screenWidth / 2,
    right: 10,
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  callButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
