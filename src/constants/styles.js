import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from './colors';
const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  overallContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  container: {
    width: screenWidth / 1.25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f00',
    textAlign: 'center',
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
  label: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
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
  picker: {
    backgroundColor: Colors.primary,
    elevation: 5,
    paddingHorizontal: 20,
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordTime: {
    fontSize: screenWidth / 20,
    color: 'white',
  },
  imageContainer: {
    width: screenWidth / 5,
    height: screenWidth / 5,
    marginRight: 10,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cancelButton: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  videoContainer: {
    width: screenWidth / 5,
    height: screenWidth / 5,
    backgroundColor: 'black',
  },
  filePopUpContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
  },
  changeImageIconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 25,
    marginTop: 10,
  },
  send: {
    color: 'white',
    fontSize: 18,
  },
});
