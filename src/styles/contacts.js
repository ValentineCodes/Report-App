import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: screenWidth,
    height: screenHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 3,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  headerText: {
    color: Colors.secondary,
    fontSize: screenWidth / 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  popUpContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
  },
});
