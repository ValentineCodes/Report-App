import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/colors';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  overallContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    height: '100%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: screenWidth / 22,
    fontWeight: 'bold',
    color: 'red',
  },
  chatInfo: {
    fontSize: screenWidth / 30,
    color: '#ccc',
  },
  expand: {
    marginRight: 20,
  },
  timestamp: {
    color: 'white',
    fontSize: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
  },
});
