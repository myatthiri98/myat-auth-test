import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated'

type Props = {
  delay?: number
  children: React.ReactNode
  initialScale?: number
}

export const ScaleIn = ({ delay = 0, initialScale = 0, children }: Props) => {
  const scale = useSharedValue(initialScale)

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1))
  }, [delay, initialScale, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
