import React, {useEffect, useState, useRef} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {mapStyle} from '../styles/mapStyle';

export default function Map() {
  const _map = useRef(null);

  useEffect(() => {
    // if (_map.current) {
    //   _map.current.animateCamera(
    //     {
    //       center: {
    //         latitude: 50.1109221,
    //         longitude: 8.6812167,
    //       },
    //       zoom: 15,
    //     },
    //     5000,
    //   );
    // } else {
    //   console.log('not animated');
    // }
    return;
  }, []);

  function showMyLocation(lat, long) {
    if (_map.current) {
      _map.current.animateCamera(
        {
          center: {
            latitude: 50.1109221,
            longitude: 8.6812167,
          },
          zoom: 15,
        },
        5000,
      );
    } else {
      console.log('not animated');
    }
  }

  return (
    <MapView
      style={{flex: 1}}
      ref={_map}
      customMapStyle={mapStyle}
      showsCompass={false}
      initialRegion={{
        latitude: 6.39067,
        longitude: 6.94409,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}>
      <Marker
        coordinate={{
          latitude: 6.252252252252252,
          longitude: 7.10532512492047,
        }}
        title="Help!">
        <Image
          source={require('../images/image.jpg')}
          style={{width: 30, height: 30, borderRadius: 100}}
        />
      </Marker>
    </MapView>
  );
}
