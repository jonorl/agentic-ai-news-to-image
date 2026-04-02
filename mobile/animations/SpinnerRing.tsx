import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const AnimatedView = Animated.View

export function SpinnerRing({
  size,
  borderColor,
  accentColor,
  reverse = false,
  duration = 1200,
}: {
  size: number;
  borderColor: string;
  accentColor: string;
  reverse?: boolean;
  duration?: number;
}) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? ['360deg', '0deg'] : ['0deg', '360deg'],
  });

  return (
    <AnimatedView
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 4,
        borderColor,
        borderTopColor: accentColor,
        transform: [{ rotate }],
      }}
    />
  );
}