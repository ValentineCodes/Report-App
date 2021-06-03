import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../constants/colors';
import {styles} from '../styles/contactCard';

export default function ContactCard({
  index,
  image,
  fullName,
  rank,
  number,
  setViewImage,
  setImageIndex,
}) {
  function viewImage(index) {
    setImageIndex(index);
    setViewImage(true);
  }
  return (
    <View style={{...styles.container, marginTop: 30}}>
      <View style={styles.header}>
        {/* Profile Pic */}
        <TouchableOpacity
          onPress={viewImage.bind(this, index)}
          style={styles.image}>
          <Image
            source={image}
            resizeMode="cover"
            style={{width: '100%', height: '100%', borderRadius: 100}}
          />
        </TouchableOpacity>

        {/* Full Name */}
        <View style={{marginLeft: 10}}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.rank}>{rank}</Text>
        </View>
      </View>

      {/* Call */}
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${number}`)}
        style={styles.call}>
        <Icon name="call-outline" type="ionicon" color={Colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}
