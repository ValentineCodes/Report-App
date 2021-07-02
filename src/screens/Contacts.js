import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import ContactCard from '../components/ContactCard';

import {Colors} from '../constants/colors';
import {contacts} from '../constants/contacts';

import {styles} from '../styles/contacts';

export default function Contacts({onRender, setIsContactsVisible}) {
  const [imageIndex, setImageIndex] = useState('');
  const [viewImage, setViewImage] = useState(false);

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  const containerPos = useSharedValue(screenHeight);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: containerPos.value}],
    };
  });

  const showContacts = () => {
    containerPos.value = withTiming(0, {
      duration: 500,
    });
    setTimeout(() => setIsContactsVisible(true), 400);
  };

  const hideContacts = () => {
    containerPos.value = withTiming(screenHeight, {
      duration: 500,
    });

    setTimeout(() => setIsContactsVisible(false), 400);
  };

  useEffect(() => {
    onRender(showContacts, hideContacts);
  }, []);

  const renderContactImage = () => {
    if (viewImage) {
      return (
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => setViewImage(false)}
          style={styles.popUpContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.image}>
            <Image
              source={contacts[imageIndex].image}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5} onPress={hideContacts}>
          <Icon
            name="chevron-down-outline"
            type="ionicon"
            color={Colors.secondary}
            reverseColor="white"
            size={screenWidth / 13}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Emergency Contacts</Text>
      </View>

      {/* Emergency Contacts */}

      <FlatList
        data={contacts}
        keyExtractor={contact => Math.random().toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ContactCard
            index={index}
            image={item.image}
            fullName={item.fullName}
            rank={item.rank}
            number={item.number}
            setViewImage={setViewImage}
            setImageIndex={setImageIndex}
          />
        )}
      />

      {renderContactImage()}
    </Animated.View>
  );
}
