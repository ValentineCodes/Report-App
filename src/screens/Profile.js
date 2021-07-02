import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  BackHandler,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {_validateEmail, _updateUser} from '../../api/users';

import {Colors} from '../constants/colors';

import {styles} from '../styles/profile';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function Profile({showProfile}) {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(profile.profileImage);
  const [name, setName] = useState(profile.name);
  const [address, setAddress] = useState(profile.address);
  const [email, setEmail] = useState(profile.email);
  const [number, setNumber] = useState(profile.number);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const [nameErrMsg, setNameErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [numberErrMsg, setNumberErrMsg] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSelectingProfileImage, setIsSelectingProfileImage] = useState(false);

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
    position.value = withTiming(screenHeight / 7, {
      duration: 1000,
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

  const addAddress = address => {
    setAddress(address);
    if (address.trim()) {
      setIsAddressValid(true);
      setAddressErrMsg('');
    } else {
      setIsAddressValid(false);
    }
  };

  const addEmail = email => {
    setEmail(email);
    if (
      email.trim() &&
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      // Ensuring that email is not validated if they input the same email
      if (email.trim() !== profile.email.trim()) {
        setIsValidatingEmail(true);

        _validateEmail(email, {
          setIsEmailValid,
          setEmailErrMsg,
          setIsValidatingEmail,
        });
      }
    } else {
      setIsEmailValid(false);
    }
  };

  function addNumber(num) {
    setNumber(num.trim());
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

  const validateAddress = () => {
    if (address.trim()) {
      setAddressErrMsg('');
    } else {
      setIsAddressValid(false);
      if (!address.trim()) {
        setAddressErrMsg('Address is required');
      }
    }
  };

  const validateEmail = () => {
    if (
      email.trim() &&
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setEmailErrMsg('');
    } else {
      setIsEmailValid(false);
      if (!email.trim()) {
        setEmailErrMsg('Email is required');
      } else {
        setEmailErrMsg('Invalid Email');
      }
    }
  };

  function validateNumber() {
    if (
      number.trim().length >= 10 &&
      number.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
    ) {
      setNumberErrMsg('');
    } else {
      setIsNumberValid(false);
      if (!number.trim()) {
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

    _updateUser(
      {
        name,
        address,
        email,
        number,
      },
      {
        setIsUpdating,
        setIsEditing,
        hideContainer,
        dispatch,
      },
    );
  }

  //Functions Below Render Components Conditionally

  const renderValidationIcons = (inputContentType, isValid) => {
    if (inputContentType) {
      if (isValid) {
        return (
          <Icon
            name="check"
            color="#22cc22"
            size={screenWidth / 20}
            style={{marginRight: 10}}
          />
        );
      } else {
        return (
          <Icon
            name="close"
            color="#b3001e"
            size={screenWidth / 20}
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
            isNameValid && isAddressValid && isEmailValid && isNumberValid
              ? updateProfile
              : Keyboard.dismiss
          }>
          <Text
            style={{
              ...styles.signUp,
              color:
                isNameValid && isAddressValid && isEmailValid && isNumberValid
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
                  ? require('../../assets/images/default_profile_pic.png')
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
                size={screenWidth / 28}
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
                size={screenWidth / 20}
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
                onSubmitEditing={
                  isNameValid && isAddressValid && isEmailValid && isNumberValid
                    ? updateProfile
                    : null
                }
                selectTextOnFocus
              />

              {renderValidationIcons(name, isNameValid)}
            </View>
            {nameErrMsg ? (
              <Text style={styles.errorMsg}>{nameErrMsg}</Text>
            ) : null}
          </View>

          {/* Address */}
          <View style={styles.fieldContainer}>
            <View
              style={{
                ...styles.inputFieldContainer,
                borderBottomColor: addressErrMsg ? '#b3001e' : Colors.secondary,
              }}>
              <Icon
                name="location-outline"
                type="ionicon"
                color={addressErrMsg ? '#b3001e' : Colors.secondary}
                size={screenWidth / 20}
              />

              <TextInput
                placeholder="Address(lodge details, street, e.t.c)"
                placeholderTextColor="#ccc"
                maxLength={150}
                onChangeText={address => addAddress(address)}
                onFocus={() => setIsEditing(true)}
                onBlur={validateAddress}
                value={address}
                style={styles.inputField}
                returnKeyType="go"
                onSubmitEditing={
                  isNameValid && isAddressValid && isEmailValid && isNumberValid
                    ? updateProfile
                    : null
                }
                selectTextOnFocus
              />

              {renderValidationIcons(address, isAddressValid)}
            </View>
            {addressErrMsg ? (
              <Text style={styles.errorMsg}>{addressErrMsg}</Text>
            ) : null}
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <View
              style={{
                ...styles.inputFieldContainer,
                borderBottomColor: emailErrMsg ? '#b3001e' : Colors.secondary,
              }}>
              <Icon
                name="mail-outline"
                type="ionicon"
                color={emailErrMsg ? '#b3001e' : Colors.secondary}
                size={screenWidth / 20}
              />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#ccc"
                maxLength={100}
                onChangeText={email =>
                  isValidatingEmail
                    ? ToastAndroid.show(
                        'Cannot edit value until validation is complete. Careful Next Time!',
                        ToastAndroid.LONG,
                      )
                    : addEmail(email)
                }
                onFocus={() => setIsEditing(true)}
                onBlur={validateEmail}
                value={email}
                style={styles.inputField}
                returnKeyType="go"
                onSubmitEditing={
                  isNameValid && isAddressValid && isEmailValid && isNumberValid
                    ? updateProfile
                    : null
                }
                selectTextOnFocus
              />

              {isValidatingEmail ? (
                <ActivityIndicator color={Colors.secondary} size="small" />
              ) : email ? (
                isEmailValid ? (
                  <Icon
                    name="check"
                    color="#22cc22"
                    size={screenWidth / 20}
                    style={{marginRight: 10}}
                  />
                ) : (
                  <Icon
                    name="close"
                    color="#b3001e"
                    size={screenWidth / 20}
                    style={{marginRight: 10}}
                  />
                )
              ) : null}
            </View>
            {emailErrMsg ? (
              <Text style={styles.errorMsg}>{emailErrMsg}</Text>
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
                size={screenWidth / 20}
              />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#ccc"
                maxLength={15}
                onChangeText={num => addNumber(num)}
                onFocus={() => setIsEditing(true)}
                onBlur={validateNumber}
                value={number}
                style={styles.inputField}
                returnKeyType="go"
                keyboardType="number-pad"
                textContentType="telephoneNumber"
                onSubmitEditing={
                  isNameValid && isAddressValid && isEmailValid && isNumberValid
                    ? updateProfile
                    : null
                }
                selectTextOnFocus
              />

              {renderValidationIcons(number, isNumberValid)}
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
