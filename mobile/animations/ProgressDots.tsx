import React, { useRef, useEffect } from 'react';
import { View } from 'react-native'
import { Animated } from 'react-native';

const AnimatedView = Animated.View

export function ProgressDots() {
  const anims = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    const loops = anims.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        ])
      )
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, []);

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {anims.map((anim, i) => (
        <AnimatedView
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#10b981',
            opacity: anim,
          }}
        />
      ))}
    </View>
  );
}