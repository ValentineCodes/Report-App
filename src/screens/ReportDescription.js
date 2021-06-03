import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  PermissionsAndroid,
  BackHandler,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {Icon} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';

import CriminalDescription from '../components/CriminalDescription';
import SelectImages from '../components/SelectImages';
import SelectVideo from '../components/SelectVideo';

import {Colors} from '../constants/colors';

import {styles} from '../styles/reportDescription';

export default function ReportDescription({closePopUp}) {
  const [alertMessage, setAlertMessage] = useState('');
  const [criminalDescription, setCriminalDescription] = useState({
    gender: '',
    skinColor: '',
    height: '',
    age: '',
    voice: '',
  });
  const [voiceNote, setVoiceNote] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const [isWatchingVideo, setIsWatchingVideo] = useState(false);
  const [viewImages, setViewImages] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);
  const [isSelectingImage, setIsSelectingImage] = useState(false);

  const [isSending, setIsSending] = useState(false);

  //All The Criminal Description Logic

  const [pickerItems, setPickerItems] = useState([]);

  function addDescription(property) {
    if (pickerItems.includes('Male'))
      setCriminalDescription(current => ({...current, gender: property}));
    if (pickerItems.includes('Dark'))
      setCriminalDescription(current => ({...current, skinColor: property}));
    if (pickerItems.includes('Tall'))
      setCriminalDescription(current => ({...current, height: property}));
    if (pickerItems.includes('Old'))
      setCriminalDescription(current => ({...current, age: property}));
    if (pickerItems.includes('Deep'))
      setCriminalDescription(current => ({...current, voice: property}));

    setPickerItems([]);
  }

  const screenHeight = Dimensions.get('screen').height;
  const containerPosition = useSharedValue(screenHeight - 80);
  const imagePickerContainerHeight = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
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
    containerPosition.value = withSpring(screenHeight / 5, {
      damping: 6,
      stiffness: 10,
    });
  };

  const hideContainer = () => {
    if (!isSending) {
      containerPosition.value = withTiming(screenHeight - 80, {
        duration: 500,
      });

      setTimeout(() => closePopUp(false), 400);
    }
    return true;
  };

  const showImagePickerContainer = () => {
    imagePickerContainerHeight.value = withTiming(100, {
      duration: 200,
    });

    setIsSelectingImage(true);
    Keyboard.dismiss();
  };

  const hideImagePickerContainer = () => {
    imagePickerContainerHeight.value = withTiming(0, {
      duration: 200,
    });

    setIsSelectingImage(false);
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
              const photo = {
                key: Math.random().toString(),
                uri: image.path,
                type: image.mime,
                filename: image.path.substr(image.path.lastIndexOf('/') + 1),
              };
              setImages(currentImages => [photo, ...currentImages]);
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
  }

  function selectImageFromLibrary() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      multiple: true,
      compressImageQuality: 0.5,
      mediaType: 'photo',
    })
      .then(response => {
        let selectionIsValid = true;

        for (let x = 0; x < response.length; x++) {
          if (
            response[x].mime === 'image/jpeg' ||
            response[x].mime === 'image/png' ||
            response[x].mime === 'image/gif'
          ) {
            selectionIsValid = true;
          } else {
            selectionIsValid = false;
            break;
          }
        }

        if (selectionIsValid) {
          if (images.length + response.length > 10) {
            alert('You cannot upload more than 10 images');
          } else {
            const selectedImages = [];
            response.map(image =>
              selectedImages.push({
                key: Math.random().toString(),
                uri: image.path,
                type: image.mime,
                filename: image.path.substr(image.path.lastIndexOf('/') + 1),
              }),
            );
            setImages(currentImages => [...selectedImages, ...currentImages]);
            hideImagePickerContainer();
          }
        } else {
          alert("There's a video in your selection. Select only images");
        }
      })
      .catch(err => {
        return;
      });
  }

  const sendReport = () => {
    setIsSending(true);
    setTimeout(() => {
      ToastAndroid.show('Sent Successfully', ToastAndroid.SHORT);
      containerPosition.value = withTiming(screenHeight - 80, {
        duration: 500,
      });

      setTimeout(() => closePopUp(false), 400);
      setIsSending(false);
    }, 1500);

    return true;
  };

  //Functions Below Render Components Conditionally

  const renderPicker = () => {
    if (pickerItems.length != 0) {
      return (
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => setPickerItems([])}
          style={styles.popUpContainer}>
          <View style={styles.picker}>
            {pickerItems.map(property => (
              <TouchableOpacity
                key={property}
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 0.5,
                  alignItems: 'center',
                }}
                onPress={addDescription.bind(this, property)}>
                <Text style={{color: 'white'}}>{property}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  const renderImageSlider = () => {
    if (viewImages) {
      return (
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => setViewImages(false)}
          style={styles.popUpContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.filePopUpContainer}>
            <Image
              source={{uri: images[imageIndex].uri}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
            <View style={styles.changeImageIconContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{height:'100%', width:'20%', justifyContent:'center'}}
                onPress={() => {
                  if (imageIndex !== 0)
                    setImageIndex(currentIndex => currentIndex - 1);
                }}>
                <Icon
                  name="chevron-back"
                  type="ionicon"
                  color={
                    imageIndex == 0
                      ? 'rgba(255,255,255,0.2)'
                      : 'white'
                  }
                  size={30}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                 style={{height:'100%', width:'20%', justifyContent:'center'}}
                onPress={() => {
                  if (imageIndex !== images.length - 1)
                    setImageIndex(currentIndex => currentIndex + 1);
                }}>
                <Icon
                  name="chevron-forward"
                  type="ionicon"
                  color={
                    imageIndex == images.length - 1
                      ? 'rgba(255,255,255,0.2)'
                      : 'white'
                  }
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderVideo = () => {
    if (isWatchingVideo) {
      return (
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => setIsWatchingVideo(false)}
          style={styles.popUpContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.filePopUpContainer}>
            <Video
              source={{uri: video.uri}}
              style={{width: '100%', height: '100%'}}
              controls={true}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      hideContainer,
    );
    showContainer();
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={hideContainer}
      style={styles.overallContainer}>
      <Text style={styles.closeHint}>Tap To Close</Text>
      <Animated.View style={[animatedContainerStyle]}>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          <Text style={styles.headerTitle}>Crime Reported!</Text>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}>
            Please provide additional information
          </Text>

          {/* Alert message */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Alert Message</Text>

            <View style={styles.inputFieldContainer}>
              <Icon
                name="alert-outline"
                type="ionicon"
                color={Colors.secondaryTransparent}
                size={Dimensions.get('screen').width / 20}
              />

              <TextInput
                placeholder="e.g Help!. Armed Robbers"
                placeholderTextColor="#ccc"
                maxLength={700}
                onChangeText={val => setAlertMessage(val)}
                value={alertMessage}
                style={styles.inputField}
              />
            </View>
          </View>

          {/* Criminal Description */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Criminal Description</Text>

            <CriminalDescription
              criminalDescription={criminalDescription}
              setPickerItems={setPickerItems}
            />
          </View>

          {/* Images */}
          <TouchableOpacity activeOpacity={1} style={styles.fieldContainer}>
            <Text style={styles.label}>Send Images</Text>

            <SelectImages
              images={images}
              setImages={setImages}
              setViewImages={setViewImages}
              setImageIndex={setImageIndex}
              showImagePickerContainer={showImagePickerContainer}
            />
          </TouchableOpacity>

          {/* Video */}
          {/* <View style={styles.fieldContainer}>
            <Text style={styles.label}>Send Video</Text>

            <SelectVideo
              video={video}
              setIsWatchingVideo={setIsWatchingVideo}
              setVideo={setVideo}
            />
          </View> */}

          {isSending ? (
            <ActivityIndicator
              color={Colors.secondary}
              size={Dimensions.get('screen').width / 7}
            />
          ) : (
            <TouchableOpacity onPress={sendReport}>
              <Icon
                reverse
                name="paper-plane-outline"
                type="ionicon"
                color="#3c3"
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Pop Ups */}

      {renderPicker()}

      {renderImageSlider()}

      {/* {renderVideo()} */}

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
              paddingVertical: isSelectingImage ? 20 : 0,
            }}>
            <Text style={styles.imagePickerButtonText}>Take A Photo</Text>
          </TouchableOpacity>

          {/* Choose Existing Photo */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={selectImageFromLibrary}
            style={{
              ...styles.imagePickerButton,
              paddingVertical: isSelectingImage ? 20 : 0,
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
