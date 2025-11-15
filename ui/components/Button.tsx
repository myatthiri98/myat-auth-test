import React from 'react'
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { T } from '@/ui/constants/theme'

type ButtonProps = {
  title: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  style?: ViewStyle
}

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable)

const getButtonStyles = (
  variant: 'primary' | 'secondary' | 'outline',
  isDisabled: boolean,
  animatedStyle: any,
  customStyle?: ViewStyle,
) => {
  const variantStyles = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
  }

  return [
    styles.button,
    variantStyles[variant],
    isDisabled && styles.disabledButton,
    animatedStyle,
    customStyle,
  ]
}

const getTextStyles = (
  variant: 'primary' | 'secondary' | 'outline',
  isDisabled: boolean,
) => {
  const variantTextStyles = {
    primary: styles.primaryButtonText,
    secondary: styles.secondaryButtonText,
    outline: styles.outlineButtonText,
  }

  return [
    styles.buttonText,
    variantTextStyles[variant],
    isDisabled && styles.disabledButtonText,
  ]
}

const getActivityIndicatorColor = (
  variant: 'primary' | 'secondary' | 'outline',
) => {
  return variant === 'primary' ? T.color.white : T.color.primary
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}: ButtonProps) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(T.animation.scale.press)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  const isDisabled = disabled || loading
  const buttonStyles = getButtonStyles(
    variant,
    isDisabled,
    animatedStyle,
    style,
  )
  const textStyles = getTextStyles(variant, isDisabled)
  const indicatorColor = getActivityIndicatorColor(variant)

  return (
    <AnimatedTouchable
      style={buttonStyles}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: T.spacing.lg,
    paddingHorizontal: T.spacing.xxxl,
    borderRadius: T.border.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: T.spacing.sm,
    minHeight: T.size.button.height,
  },
  primaryButton: {
    backgroundColor: T.color.primary,
    ...T.shadow.large,
  },
  secondaryButton: {
    backgroundColor: T.color.background,
  },
  outlineButton: {
    backgroundColor: T.color.transparent,
    borderWidth: T.border.width.medium,
    borderColor: T.color.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: T.font.size.md,
    fontWeight: T.font.weight.semibold,
    letterSpacing: 0.5,
  },
  primaryButtonText: {
    color: T.color.white,
  },
  secondaryButtonText: {
    color: T.color.primary,
  },
  outlineButtonText: {
    color: T.color.primary,
  },
  disabledButtonText: {
    color: T.color.textTertiary,
  },
})
