import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth / 1.7,
  },
  button: {
    width: screenWidth / 2,
    height: screenWidth / 2,
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
    fontSize: screenWidth / 13,
  },
});
