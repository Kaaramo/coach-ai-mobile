import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { CoachLogo } from '@/components/coach-logo';
import { ScreenFrame } from '@/components/screen-frame';
import { colors, type } from '@/constants/theme';

function Dot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);
  const scale = useSharedValue(0.85);
  useEffect(() => {
    const make = (target: 'opacity' | 'scale', from: number, to: number) =>
      withRepeat(
        withSequence(
          withTiming(from, { duration: delay, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
          withTiming(to, { duration: 480, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
          withTiming(from, { duration: 720, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        ),
        -1,
        false,
      );
    opacity.value = make('opacity', 0.3, 1);
    scale.value = make('scale', 0.85, 1);
  }, [delay, opacity, scale]);
  const s = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  return (
    <Animated.View
      style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary }, s]}
    />
  );
}

export default function Splash() {
  useEffect(() => {
    const t = setTimeout(() => router.replace('/welcome'), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <ScreenFrame style={{ paddingHorizontal: 0 }}>
      <Pressable
        onPress={() => router.replace('/welcome')}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 }}
      >
        <CoachLogo size={96} />
        <Text style={{ ...type.h2, color: colors.text, letterSpacing: -0.22 }}>Coach AI</Text>
      </Pressable>
      <View
        style={{
          position: 'absolute',
          bottom: 56,
          alignSelf: 'center',
          flexDirection: 'row',
          gap: 8,
          left: 0,
          right: 0,
          justifyContent: 'center',
        }}
      >
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </View>
    </ScreenFrame>
  );
}
