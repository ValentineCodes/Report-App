import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').width / 1.7,
  },
  button: {
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').width / 2.5,
    borderRadius: 100,
    borderWidth: 0.4,
    borderColor: 'rgba(0,0,0,1)',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,8,51, 1)',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Dimensions.get('screen').width / 13,
  },
});
