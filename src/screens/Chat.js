import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ImageBackground,
  PermissionsAndroid,
  BackHandler,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  Keyboard,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {_sendMsg} from '../../api/chats';

import SentMsg from '../components/SentMsg';
import ReceivedMsg from '../components/ReceivedMsg';

import {Colors} from '../constants/colors';

import {styles} from '../styles/chat';

export default function Chat({closePopUp}) {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const chatMsgs = useSelector(state => state.chatMsgs);
  const chatID = useSelector(state => state.chatID);
  const dispatch = useDispatch();

  const [chatExpanded, setChatExpanded] = useState(false);
  const [msg, setMsg] = useState('');

  const containerPosition = useSharedValue(screenHeight - 80);
  const containerWidth = useSharedValue(screenWidth / 1.1);
  const containerHeight = useSharedValue(80);

  const animatedContainerPosition = useAnimatedStyle(() => {
    return {
      transform: [{translateY: containerPosition.value}],
    };
  });

  const animatedContainerSize = useAnimatedStyle(() => {
    return {
      width: containerWidth.value,
      height: `${containerHeight.value}%`,
    };
  });

  const showContainer = () => {
    containerPosition.value = withSpring(screenHeight / 9, {
      damping: 4,
      stiffness: 10,
    });
  };

  const hideContainer = () => {
    containerPosition.value = withTiming(screenHeight - 80, {
      duration: 500,
    });

    setTimeout(() => {
      dispatch({
        type: 'clearMsgs',
      });
      closePopUp(false);
    }, 400);
    return true;
  };

  const expandContainer = () => {
    containerWidth.value = withTiming(screenWidth, {
      duration: 500,
    });
    containerHeight.value = withTiming(100, {
      duration: 500,
    });
    containerPosition.value = withTiming(1, {
      duration: 500,
    });
    setChatExpanded(true);
  };

  const contractContainer = () => {
    containerWidth.value = withTiming(screenWidth / 1.1, {
      duration: 500,
    });
    containerHeight.value = withTiming(80, {
      duration: 500,
    });
    containerPosition.value = withTiming(screenHeight / 9, {
      duration: 500,
    });
    setChatExpanded(false);
  };

  const updateMsg = payload => {
    dispatch({
      type: 'updateMsg',
      payload,
    });
  };

  const sendMsg = () => {
    setMsg('');

    let id = uuid.v4();

    if (msg.trim() !== '') {
      // Store message in redux store
      dispatch({
        type: 'addMsg',
        payload: {
          id,
          msg,
          timestamp: '',
          status: '!sent',
          sender: 'user',
        },
      });

      // Send message to firebase firestore
      _sendMsg(chatID, id, msg, updateMsg);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      hideContainer,
    );

    // Show chat container when rendered on the home screen
    showContainer();
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <TouchableOpacity activeOpacity={1} style={styles.overallContainer}>
      <Animated.View style={[animatedContainerPosition, animatedContainerSize]}>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          <ImageBackground
            source={require('../../assets/images/chat_bg_img1.jpg')}
            style={{width: '100%', height: '100%'}}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.chatTitle}>Crime Reported!!!</Text>
                <Text style={styles.chatInfo}>Chat with us</Text>
              </View>

              {/* location */}
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPress={chatExpanded ? contractContainer : expandContainer}
                  style={styles.expand}>
                  <Icon
                    name={chatExpanded ? 'contract-outline' : 'expand-outline'}
                    type="ionicon"
                    size={20}
                    color="grey"
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={hideContainer} style={styles.close}>
                  <Icon
                    name="close-outline"
                    type="ionicon"
                    size={30}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Messages */}
            <ScrollView style={{flex: 1}}>
              {chatMsgs.map(message =>
                message.status == 'received' ? (
                  <ReceivedMsg key={message.id} msg={message} />
                ) : (
                  <SentMsg key={message.id} msg={message} />
                ),
              )}
            </ScrollView>

            {/* TextInput Field */}
            <View style={styles.footer}>
              <View style={styles.inputContainer}>
                <TextInput
                  multiline
                  autoFocus
                  placeholder="Type a message"
                  value={msg}
                  onChangeText={txt => setMsg(txt)}
                  style={styles.inputField}
                />
                <Icon
                  name="attach-outline"
                  type="ionicon"
                  size={27}
                  color="grey"
                  style={{transform: [{rotateZ: '-50deg'}]}}
                />
              </View>

              <TouchableOpacity
                onPress={sendMsg}
                activeOpacity={0.5}
                style={{marginRight: -5}}>
                <Icon
                  reverse
                  name="paper-plane-outline"
                  type="ionicon"
                  size={20}
                  color="#0a0"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}
