import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Image,
  ToastAndroid,
} from 'react-native';

import LocationEnabler from 'react-native-location-enabler';
import GetLocation from 'react-native-get-location';
import MapView, {Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';

import Header from '../components/Header';
import ReportButton from '../components/ReportButton';

import {Colors} from '../constants/colors';

import Contacts from './Contacts';
import Profile from './Profile';
import ReportDescription from './ReportDescription';

import {mapStyle} from '../styles/map';
import {styles} from '../styles/home';

const {
  PRIORITIES: {HIGH_ACCURACY},
  useLocationSettings,
} = LocationEnabler;

//Function declarations to show and hide Contacts and Profile Screen
//To be defined from the Contacts Screen Component
let showContacts;
let hideContacts;

let showProfile;
let hideProfile;

export default function Home() {
  const [isReported, setIsReported] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isContactsVisible, setIsContactsVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const _map = useRef(null);

  const initialRegion = {
    latitude: 6.39067,
    longitude: 6.94409,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    })
      .then(location => {
        setUserLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        if (_map.current) {
          _map.current.animateCamera(
            {
              center: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
              zoom: 15,
            },
            5000,
          );
        }
        setIsReporting(false);
        setIsReported(true);
      })
      .catch(error => {
        setIsReporting(false);
        ToastAndroid.show(
          'Unable to send report. Ensure your Location and Data Connectivity is ON.',
          ToastAndroid.LONG,
        );
      });
  };

  const reportCrime = async () => {
    try {
      let permission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (permission) {
        setIsReporting(true);
        getLocation();
      } else {
        permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (permission === 'granted') {
          setIsReporting(true);
          getLocation();
        } else if (permission === 'denied') {
          setIsReporting(false);
          ToastAndroid.show(
            'Cannot send report without access to your location.',
            ToastAndroid.BOTTOM,
          );
        } else {
          setIsReporting(false);
          ToastAndroid.show(
            'Cannot get location permission again unless the app is Reinstalled.',
            ToastAndroid.LONG,
          );
        }
      }
    } catch (err) {
      ToastAndroid.show(
        'Something went wrong when trying to send report. Please Try Again',
        ToastAndroid.LONG,
      );
    }
  };

  const showMyLocation = () => {
    if (userLocation.latitude === null) {
      ToastAndroid.show('Getting Location...', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Updating Location...', ToastAndroid.LONG);
      if (_map.current) {
        _map.current.animateCamera(
          {
            center: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            },
            zoom: 15,
          },
          5000,
        );
      }
    }

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    })
      .then(location => {
        setUserLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        if (_map.current) {
          _map.current.animateCamera(
            {
              center: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
              zoom: 15,
            },
            5000,
          );
        }
      })
      .catch(error => {
        ToastAndroid.show(
          'Unable to get location. Ensure your Location and Data Connectivity is ON.',
          ToastAndroid.LONG,
        );
      });
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (isContactsVisible) {
      hideContacts();
    } else {
      BackHandler.exitApp();
    }

    return true;
  });

  const renderMarker = () => {
    if (userLocation.latitude && userLocation.longitude) {
      return (
        <Marker coordinate={userLocation} title="Valentine Orga">
          <Image
            source={require('../images/image.jpg')}
            style={styles.marker}
          />
        </Marker>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={{flex: 1}}
        ref={_map}
        customMapStyle={mapStyle}
        showsCompass={false}
        initialRegion={initialRegion}>
        {renderMarker()}
      </MapView>

      <Header
        showContacts={() => showContacts()}
        showProfile={setShowProfile}
        showMyLocation={showMyLocation}
      />

      {/* Icon to animate to my location */}
      <TouchableOpacity
        onPress={showMyLocation}
        style={styles.showMyLocationButton}>
        <Icon
          reverse
          name="street-view"
          type="font-awesome"
          color="rgba(255,255,255,0.8)"
          reverseColor={Colors.secondary}
          size={Dimensions.get('screen').width / 14}
        />
      </TouchableOpacity>

      {/* Report Button */}
      <ReportButton
        reportCrime={reportCrime}
        isReporting={isReporting}
        isReported={isReported}
      />

      {/* Components below are rendered above the screen */}

      {/* Crime details popup - This pops up after crime has been reported successfully */}
      {isReported ? <ReportDescription closePopUp={setIsReported} /> : null}

      {/* Emergency Contact */}

      <Contacts
        onRender={(show, hide) => {
          showContacts = show;
          hideContacts = hide;
        }}
        setIsContactsVisible={setIsContactsVisible}
      />

      {/* Profile */}
      {showProfile ? <Profile showProfile={setShowProfile} /> : null}
    </View>
  );
}
