import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  cancelAnimation,
} from 'react-native-reanimated';
import {Icon} from 'react-native-elements';

import {styles} from '../styles/reportButton';

export default function ReportButton({reportCrime, isReporting, isReported}) {
  const initialButtonSize = Dimensions.get('screen').width / 2.1;

  const buttonScale = useSharedValue(0.9);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonScale.value}],
    };
  });

  const animateButton = () => {
    buttonScale.value = withRepeat(
      withTiming(1, {
        duration: 1500,
      }),
      10000,
      true,
    );
  };

  useEffect(() => {
    animateButton();

    return () => {
      cancelAnimation(buttonScale);
    };
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={reportCrime} activeOpacity={0.8}>
        <Animated.View
          style={[
            {...styles.button, display: isReported ? 'none' : 'flex'},
            animatedButtonStyle,
          ]}>
          {/* Toggle Loading Indicator */}
          {isReporting ? (
            <ActivityIndicator animating={true} color="white" size="large" />
          ) : (
            <Icon name="radio-outline" type="ionicon" size={50} color="red" />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
