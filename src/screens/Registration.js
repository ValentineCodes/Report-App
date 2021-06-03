import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Keyboard,
  ScrollView,
} from 'react-native';

import {Icon} from 'react-native-elements';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';

import {Colors} from '../constants/colors';

import {styles} from '../styles/registration';

export default function Registration({closePopUp}) {
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [NIN, setNIN] = useState('')
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isNameValid, setIsNameValid] = useState(false);
  const [isNINValid, setIsNINValid] = useState(false)
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isNumberValid, setIsNumberValid] = useState(false);

  const [nameErrMsg, setNameErrMsg] = useState('');
  const [NINErrMsg, setNINErrMsg] = useState('')
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [numberErrMsg, setNumberErrMsg] = useState('');

  const [isCreating, setIsCreating] = useState(false);
  const [isSelectingProfileImage, setIsSelectingProfileImage] = useState(false);

  const screenHeight = Dimensions.get('screen').height;

  const containerPosition = useSharedValue(screenHeight - 80);
  const imagePickerContainerHeight = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: containerPosition.value}],
    };
  });

  const animatedFooterStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: containerPosition.value}],
    };
  });

  const animatedImagePickerContainerStyle = useAnimatedStyle(() => {
    return {
      height: `${imagePickerContainerHeight.value}%`,
    };
  });

  const showContainer = () => {
    containerPosition.value = withSpring(screenHeight / 15, {
      damping: 6,
      stiffness: 10,
    });
  };

  const hideContainer = () => {
    containerPosition.value = withTiming(screenHeight - 80, {
      duration: 500,
    });

    setTimeout(closePopUp, 400);

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

  const useCamera = async () => {
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
              hideImagePickerContainer();
            } else {
              alert('This is not an image. Select an image');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log('Denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const selectImageFromLibrary = () => {
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
          hideImagePickerContainer();
        } else {
          alert('This is not an image. Select an image');
        }
      })
      .catch(err => {
        return;
      });
  };

  const addName = name => {
    setName(name);
    if (name.trim() && name.match(/^[a-z ,.'-]+$/i)) {
      setIsNameValid(true);
      setNameErrMsg('');
    } else {
      setIsNameValid(false);
    }
  };

  const addNIN = NIN => {
    setNIN(NIN);
    if (NIN.trim() && NIN.match(/^[a-z ,.'-]+$/i)) {
      setIsNINValid(true);
      setNINErrMsg('');
    } else {
      setIsNINValid(false);
    }
  };

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
    if (email.trim()) {
      setIsEmailValid(true);
      setEmailErrMsg('');
    } else {
      setIsEmailValid(false);
    }
  };

  const addNumber = num => {
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
  };

  const validateName = () => {
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
  };

   const validateNIN = () => {
    if (NIN.trim()) {
      setNINErrMsg('');
    } else {
      setIsNINValid(false);
      if (!NIN.trim()) {
        setNINErrMsg('NIN is required');
      } else {
        setNINErrMsg('Invalid NIN');
      }
    }
  };

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
    if (email.trim()) {
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

  const validateNumber = () => {
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
  };

  const createProfile = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      hideContainer();
    }, 1500);
  };

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

  useEffect(() => {
    showContainer();

    return () => {
      cancelAnimation(containerPosition);
    };
  }, []);
  return (
    <View style={styles.overallContainer}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Text style={styles.headerTitle}>Create Profile</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={
              !profileImage
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
              placeholder="Full Name"
              placeholderTextColor="#ccc"
              maxLength={50}
              onChangeText={name => addName(name)}
              onBlur={validateName}
              value={name}
              style={styles.inputField}
              returnKeyType="go"
              onSubmitEditing={
                isNameValid && isAddressValid && isEmailValid && isNINValid && isNumberValid
                  ? createProfile
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
              size={Dimensions.get('screen').width / 20}
            />

            <TextInput
              textContentType="fullStreetAddress"
              placeholder="Address(lodge, street, e.t.c)"
              placeholderTextColor="#ccc"
              maxLength={150}
              onChangeText={address => addAddress(address)}
              onBlur={validateAddress}
              value={address}
              style={styles.inputField}
              returnKeyType="go"
              onSubmitEditing={
               isNameValid && isAddressValid && isEmailValid && isNINValid && isNumberValid
                  ? createProfile
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
              size={Dimensions.get('screen').width / 20}
            />

            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#ccc"
              maxLength={100}
              onChangeText={email=> addEmail(email)}
              onBlur={validateEmail}
              value={email}
              style={styles.inputField}
              returnKeyType="go"
              onSubmitEditing={
                isNameValid && isAddressValid && isEmailValid && isNINValid && isNumberValid
                  ? createProfile
                  : null
              }
              selectTextOnFocus
            />

            {renderValidationIcons(email, isEmailValid)}
          </View>
          {emailErrMsg ? (
            <Text style={styles.errorMsg}>{emailErrMsg}</Text>
          ) : null}
        </View>

        {/* NIN */}

         <View style={styles.fieldContainer}>
          <View
            style={{
              ...styles.inputFieldContainer,
              borderBottomColor: NINErrMsg ? '#b3001e' : Colors.secondary,
            }}>
            <Icon
              name="mail-outline"
              type="ionicon"
              color={NINErrMsg ? '#b3001e' : Colors.secondary}
              size={Dimensions.get('screen').width / 20}
            />

            <TextInput
              placeholder="National Identification Number(NIN)"
              placeholderTextColor="#ccc"
              maxLength={100}
              onChangeText={email => addNIN(email)}
              onBlur={validateNIN}
              value={NIN}
              style={styles.inputField}
              returnKeyType="go"
              onSubmitEditing={
                isNameValid && isAddressValid && isEmailValid && isNINValid && isNumberValid
                  ? createProfile
                  : null
              }
              keyboardType='number-pad'
              selectTextOnFocus
            />

            {renderValidationIcons(NIN, isNINValid)}
          </View>
          {NINErrMsg ? (
            <Text style={styles.errorMsg}>{NINErrMsg}</Text>
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
              placeholder="Phone Number/Emergency Contact"
              placeholderTextColor="#ccc"
              maxLength={15}
              onChangeText={num => addNumber(num)}
              onBlur={validateNumber}
              value={phoneNumber}
              style={styles.inputField}
              returnKeyType="go"
              onSubmitEditing={
                isNameValid && isAddressValid && isEmailValid && isNINValid && isNumberValid
                  ? createProfile
                  : null
              }
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              selectTextOnFocus
            />
            {renderValidationIcons(phoneNumber, isNumberValid)}
          </View>
          {numberErrMsg ? (
            <Text style={styles.errorMsg}>{numberErrMsg}</Text>
          ) : null}
        </View>
      </Animated.View>

      {/* Sign Up Button */}
      <Animated.View style={[styles.footer, animatedFooterStyle]}>
        {isCreating ? (
          <ActivityIndicator color={Colors.secondary} size="large" />
        ) : (
          <TouchableOpacity
            onPress={
              isNameValid && isAddressValid && isEmailValid && isNINValid && isNumberValid
                ? createProfile
                : Keyboard.dismiss
            }>
            <Text
              style={{
                ...styles.signUp,
                color:
                  isNameValid && isAddressValid && isEmailValid && isNINValid && isNumberValid
                    ? Colors.secondary
                    : 'grey',
              }}>
              Create
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Container For Selecting Profile Image */}

      <Animated.View
        style={[
          styles.overallImagePickerContainer,
          animatedImagePickerContainerStyle,
        ]}>
        <TouchableOpacity
          activeOpacity={0}
          onPress={hideImagePickerContainer}
          style={styles.imagePickerContainer}>
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
    </View>
  );
}
