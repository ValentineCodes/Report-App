import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderRadius: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 100,
    width: screenWidth / 7,
    height: screenWidth / 7,
  },
  name: {
    fontSize: screenWidth / 22,
    fontWeight: 'bold',
    color: 'white',
  },
  rank: {
    fontSize: screenWidth / 30,
    color: '#ccc',
  },
  call: {
    marginHorizontal: 10,
  },
});
