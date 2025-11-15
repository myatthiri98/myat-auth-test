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
  initialOffset?: number
}

export const FadeUp = ({ delay = 0, initialOffset = 50, children }: Props) => {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(initialOffset)

  useEffect(() => {
    opacity.value = withDelay(delay, withSpring(1))
    translateY.value = withDelay(delay, withSpring(0))
  }, [delay, initialOffset, opacity, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
