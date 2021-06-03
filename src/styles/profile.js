import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/colors';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  overallContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  container: {
    backgroundColor: Colors.primary,
    width: '85%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 30,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  profileImageContainer: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    marginTop: 15,
  },
  profileImage: {width: '100%', height: '100%', borderRadius: 100},
  editButton: {position: 'absolute', bottom: -5, right: -10},
  imagePickerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imagePickerButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  imagePickerButtonText: {
    color: 'white',
  },

  fieldContainer: {
    width: '95%',
    marginTop: 15,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 3,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
    borderRadius: 20,
  },
  inputField: {
    flex: 1,
    marginHorizontal: 10,
    color: 'white',
  },
  errorMsg: {
    color: '#b3001e',
    marginLeft: 15,
    marginTop: 5,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: screenWidth / 1.25,
    paddingTop: 10,
  },
  signUp: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
