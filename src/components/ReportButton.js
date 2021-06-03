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

import {styles} from '../styles/reportButton';

export default function ReportButton({reportCrime, isReporting, isReported}) {
  const initialButtonSize = Dimensions.get('screen').width / 2.1;

  const buttonSize = useSharedValue(initialButtonSize);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      width: buttonSize.value,
      height: buttonSize.value,
    };
  });

  const animateButton = () => {
    buttonSize.value = withRepeat(
      withTiming(initialButtonSize + 15, {
        duration: 1500,
      }),
      10000,
      true,
    );
  };

  useEffect(() => {
    animateButton();

    return () => {
      cancelAnimation(buttonSize);
    };
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reportCrime} activeOpacity={0.8}>
        <Animated.View
          style={[
            {
              ...styles.button,
              backgroundColor:
                !isReporting && isReported ? '#b3001e' : 'rgba(0,8,51, 1)',
            },
            animatedButtonStyle,
          ]}>
          {/* Toggle Loading Indicator */}
          {isReporting ? (
            <ActivityIndicator animating={true} color="white" size="large" />
          ) : (
            <Text style={styles.text}>
              {isReported ? 'Reported' : 'Report'}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
