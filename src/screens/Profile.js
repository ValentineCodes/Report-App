import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  BackHandler,
  Keyboard,
} from 'react-native';

import {Icon} from 'react-native-elements';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';

import {Colors} from '../constants/colors';

import {styles} from '../styles/profile';

export default function Profile({showProfile}) {
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('Valentine Orga');
  const [location, setLocation] = useState(
    'Big Chuck Hostel(RM C7) at Kingdom Hall',
  );
  const [phoneNumber, setPhoneNumber] = useState('09071903678');

  const [isNameValid, setIsNameValid] = useState(true);
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const [nameErrMsg, setNameErrMsg] = useState('');
  const [locationErrMsg, setLocationErrMsg] = useState('');
  const [numberErrMsg, setNumberErrMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isSelectingProfileImage, setIsSelectingProfileImage] = useState(false);

  const screenHeight = Dimensions.get('screen').height;

  const initialPosition = -(screenHeight / 2.5);

  const position = useSharedValue(initialPosition);
  const imagePickerContainerHeight = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      top: position.value,
    };
  });

  const animatedFooterStyle = useAnimatedStyle(() => {
    return {
      top: position.value,
    };
  });

  const animatedImagePickerContainerStyle = useAnimatedStyle(() => {
    return {
      height: `${imagePickerContainerHeight.value}%`,
    };
  });

  const showContainer = () => {
    position.value = withSpring(screenHeight / 7, {
      damping: 6,
      stiffness: 10,
    });
  };

  const hideContainer = () => {
    position.value = withTiming(initialPosition - 100, {
      duration: 500,
    });

    setTimeout(() => showProfile(false), 500);

    return true;
  };

  const showImagePickerContainer = () => {
    imagePickerContainerHeight.value = withTiming(100, {
      duration: 200,
    });

    setIsSelectingProfileImage(true);
    Keyboard.dismiss();
  };

  const hideImagePickerContainer = () => {
    imagePickerContainerHeight.value = withTiming(0, {
      duration: 200,
    });

    setIsSelectingProfileImage(false);
  };

  async function useCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Alert App',
          message: 'Alert needs access to your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          width: 100,
          height: 100,
          cropping: true,
          mediaType: 'photo',
        })
          .then(image => {
            if (
              image.mime === 'image/jpeg' ||
              image.mime === 'image/png' ||
              image.mime === 'image/gif'
            ) {
              setProfileImage({
                uri: image.path,
                type: image.mime,
                filename: image.path.substr(image.path.lastIndexOf('/') + 1),
              });
              setIsEditing(true);
              hideImagePickerContainer();
            } else {
              alert('This is not an image. Select an image');
            }
          })
          .catch(err => {
            return;
          });
      } else {
        return;
      }
    } catch (err) {
      return;
    }
  }

  function selectImageFromLibrary() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        if (
          image.mime === 'image/jpeg' ||
          image.mime === 'image/png' ||
          image.mime === 'image/gif'
        ) {
          setProfileImage({
            uri: image.path,
            type: image.mime,
            filename: image.path.substr(image.path.lastIndexOf('/') + 1),
          });
          setIsEditing(true);
          hideImagePickerContainer();
        } else {
          alert('This is not an image. Select an image');
        }
      })
      .catch(err => {
        return;
      });
  }

  function addName(name) {
    setName(name);
    if (name.trim() && name.match(/^[a-z ,.'-]+$/i)) {
      setIsNameValid(true);
      setNameErrMsg('');
    } else {
      setIsNameValid(false);
    }
  }

  const addLocation = location => {
    setLocation(location);
    if (location.trim()) {
      setIsLocationValid(true);
      setLocationErrMsg('');
    } else {
      setIsLocationValid(false);
    }
  };

  function addNumber(num) {
    setPhoneNumber(num.trim());
    if (
      num.trim().length >= 10 &&
      num.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
    ) {
      setIsNumberValid(true);
      setNumberErrMsg('');
    } else {
      setIsNumberValid(false);
    }
  }

  function validateName() {
    if (name.trim() && name.match(/^[a-z ,.'-]+$/i)) {
      setNameErrMsg('');
    } else {
      setIsNameValid(false);
      if (!name.trim()) {
        setNameErrMsg('Name is required');
      } else {
        setNameErrMsg('Name must be letters and/or a hyphen(-).');
      }
    }
  }

  const validateLocation = () => {
    if (location.trim()) {
      setLocationErrMsg('');
    } else {
      setIsLocationValid(false);
      if (!location.trim()) {
        setLocationErrMsg('Location is required');
      }
    }
  };

  function validateNumber() {
    if (
      phoneNumber.trim().length >= 10 &&
      phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
    ) {
      setNumberErrMsg('');
    } else {
      setIsNumberValid(false);
      if (!phoneNumber.trim()) {
        setNumberErrMsg('Phone Number is required');
      } else {
        setNumberErrMsg('Invalid Phone Number.');
      }
    }
  }

  function updateProfile() {
    setIsUpdating(true);
    setIsEditing(false);
    Keyboard.dismiss();

    setTimeout(() => {
      setIsUpdating(false);
      setIsEditing(false);
      hideContainer();
    }, 1500);
  }

  //Functions Below Render Components Conditionally

  const renderValidationIcons = (inputContentType, isValid) => {
    if (inputContentType) {
      if (isValid) {
        return (
          <Icon
            name="check"
            color="#22cc22"
            size={Dimensions.get('screen').width / 20}
            style={{marginRight: 10}}
          />
        );
      } else {
        return (
          <Icon
            name="close"
            color="#b3001e"
            size={Dimensions.get('screen').width / 20}
            style={{marginRight: 10}}
          />
        );
      }
    } else {
      return null;
    }
  };

  const renderUpdateButton = () => {
    if (isEditing) {
      return (
        <TouchableOpacity
          onPress={
            isNameValid && isLocationValid && isNumberValid
              ? updateProfile
              : Keyboard.dismiss
          }>
          <Text
            style={{
              ...styles.signUp,
              color:
                isNameValid && isLocationValid && isNumberValid
                  ? Colors.secondary
                  : 'grey',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      );
    } else if (isUpdating) {
      return <ActivityIndicator color={Colors.secondary} size="large" />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    showContainer();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      hideContainer,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={!isUpdating ? hideContainer : null}
      activeOpacity={1}
      style={styles.overallContainer}>
      <Animated.View style={[animatedContainerStyle]}>
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          <Text style={styles.headerTitle}>My Profile</Text>

          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={
                profileImage == ''
                  ? require('../images/default_profile_pic.png')
                  : {uri: profileImage.uri}
              }
              style={styles.profileImage}
            />
            <TouchableOpacity
              onPress={showImagePickerContainer}
              style={styles.editButton}>
              <Icon
                reverse
                name="camera-outline"
                type="ionicon"
                color={Colors.secondaryTransparent}
                size={Dimensions.get('screen').width / 28}
              />
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View style={styles.fieldContainer}>
            <View
              style={{
                ...styles.inputFieldContainer,
                borderBottomColor: nameErrMsg ? '#b3001e' : Colors.secondary,
              }}>
              <Icon
                name="person-outline"
                type="ionicon"
                color={nameErrMsg ? '#b3001e' : Colors.secondary}
                size={Dimensions.get('screen').width / 20}
              />

              <TextInput
                placeholder="Name"
                placeholderTextColor="#ccc"
                maxLength={50}
                onChangeText={name => addName(name)}
                onFocus={() => setIsEditing(true)}
                onBlur={validateName}
                value={name}
                style={styles.inputField}
                returnKeyType="go"
                onSubmitEditing={updateProfile}
                selectTextOnFocus
              />

              {renderValidationIcons(name, isNameValid)}
            </View>
            {nameErrMsg ? (
              <Text style={styles.errorMsg}>{nameErrMsg}</Text>
            ) : null}
          </View>

          {/* Location */}
          <View style={styles.fieldContainer}>
            <View
              style={{
                ...styles.inputFieldContainer,
                borderBottomColor: locationErrMsg
                  ? '#b3001e'
                  : Colors.secondary,
              }}>
              <Icon
                name="location-outline"
                type="ionicon"
                color={locationErrMsg ? '#b3001e' : Colors.secondary}
                size={Dimensions.get('screen').width / 20}
              />

              <TextInput
                placeholder="Location(lodge details, street, e.t.c)"
                placeholderTextColor="#ccc"
                maxLength={150}
                onChangeText={location => addLocation(location)}
                onFocus={() => setIsEditing(true)}
                onBlur={validateLocation}
                value={location}
                style={styles.inputField}
                returnKeyType="go"
                onSubmitEditing={updateProfile}
                selectTextOnFocus
              />

              {renderValidationIcons(location, isLocationValid)}
            </View>
            {locationErrMsg ? (
              <Text style={styles.errorMsg}>{locationErrMsg}</Text>
            ) : null}
          </View>

          {/* Phone Number */}
          <View style={styles.fieldContainer}>
            <View
              style={{
                ...styles.inputFieldContainer,
                borderBottomColor: numberErrMsg ? '#b3001e' : Colors.secondary,
              }}>
              <Icon
                name="call-outline"
                type="ionicon"
                color={numberErrMsg ? '#b3001e' : Colors.secondary}
                size={Dimensions.get('screen').width / 20}
              />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#ccc"
                maxLength={15}
                onChangeText={num => addNumber(num)}
                onFocus={() => setIsEditing(true)}
                onBlur={validateNumber}
                value={phoneNumber}
                style={styles.inputField}
                returnKeyType="go"
                keyboardType="number-pad"
                textContentType="telephoneNumber"
                onSubmitEditing={updateProfile}
                selectTextOnFocus
              />

              {renderValidationIcons(phoneNumber, isNumberValid)}
            </View>
            {numberErrMsg ? (
              <Text style={styles.errorMsg}>{numberErrMsg}</Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.footer, animatedFooterStyle]}>
        {renderUpdateButton()}
      </Animated.View>

      {/* Container For Selecting Profile Image */}

      <Animated.View
        style={[
          styles.imagePickerContainer,
          animatedImagePickerContainerStyle,
        ]}>
        <TouchableOpacity
          activeOpacity={0}
          onPress={hideImagePickerContainer}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Take A Photo */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={useCamera}
            style={{
              ...styles.imagePickerButton,
              paddingVertical: isSelectingProfileImage ? 20 : 0,
            }}>
            <Text style={styles.imagePickerButtonText}>Take A Photo</Text>
          </TouchableOpacity>

          {/* Choose Existing Photo */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={selectImageFromLibrary}
            style={{
              ...styles.imagePickerButton,
              paddingVertical: isSelectingProfileImage ? 20 : 0,
            }}>
            <Text style={styles.imagePickerButtonText}>
              Choose Existing Photo
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}
