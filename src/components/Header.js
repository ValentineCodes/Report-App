import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';

export default function Header({showContacts, showProfile, showMyLocation}) {
  return (
    <View style={styles.container}>
      {/* Left */}
      {/* <View style={styles.iconsContainer}> */}
      {/* Crimes List Icon */}
      {/* <TouchableOpacity>
          <Icon name="book" type="font-awesome" color="rgba(255,255,255,0.7)" />
        </TouchableOpacity> */}

      {/* Call The Police Icon */}
      {/* <TouchableOpacity onPress={() => showContacts()}>
          <Icon
            name="call-outline"
            type="ionicon"
            color="rgba(255,255,255,0.7)"
          />
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity onPress={() => showContacts()}>
        <Icon
          name="call-outline"
          type="ionicon"
          color="rgba(255,255,255,0.7)"
        />
      </TouchableOpacity> */}

      {/* Middle */}
      <Text style={styles.logo}>REPORT</Text>

      {/* Right */}
      {/* <View style={styles.iconsContainer}> */}
      {/* Notifications */}
      {/* <TouchableOpacity>
          <Icon
            name="chatbox-outline"
            type="ionicon"
            color="rgba(255,255,255,0.8)"
          />
        </TouchableOpacity> */}

      {/* Profile Image */}
      {/* <TouchableOpacity
          onPress={() => showProfile(true)}
          style={styles.profilePicContainer}>
          <Image
            source={require('../../assets/images/image.jpg')}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity
        onPress={() => showProfile(true)}
        style={styles.profilePicContainer}>
        <Image
          source={require('../../assets/images/image.jpg')}
          style={styles.profilePic}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '26%',
  },
  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  profilePicContainer: {
    width: Dimensions.get('screen').width / 14,
    height: Dimensions.get('screen').width / 14,
    borderRadius: 100,
  },
  profilePic: {width: '100%', height: '100%', borderRadius: 100},
});
