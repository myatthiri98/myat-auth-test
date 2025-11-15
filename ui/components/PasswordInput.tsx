import { Ionicons } from '@expo/vector-icons'
import React, { forwardRef, useState } from 'react'
import {
  TextInput as RNTextInput,
  View,
  Pressable,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native'
import { T } from '@/ui/constants/theme'

type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'> & {
  label?: string
  error?: string
  showCheckIcon?: boolean
}

const getLabelStyles = (isFocused: boolean, error?: string) => [
  styles.label,
  isFocused && styles.labelFocused,
  error && styles.labelError,
]

type IconButtonProps = {
  showCheckIcon: boolean
  isSecure: boolean
  isFocused: boolean
  onToggle: () => void
}

const IconButton = ({
  showCheckIcon,
  isSecure,
  isFocused,
  onToggle,
}: IconButtonProps) => {
  if (showCheckIcon) {
    return (
      <View style={styles.iconButton}>
        <Ionicons
          name="checkmark-circle"
          size={T.size.icon.md}
          color={T.color.success}
        />
      </View>
    )
  }

  return (
    <Pressable
      style={styles.iconButton}
      onPress={onToggle}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons
        name={isSecure ? 'eye-off-outline' : 'eye-outline'}
        size={T.size.icon.md}
        color={isFocused ? T.color.primary : T.color.textSecondary}
      />
    </Pressable>
  )
}

export const PasswordInput = forwardRef<RNTextInput, PasswordInputProps>(
  (
    {
      label,
      error,
      value = '',
      onChangeText,
      onFocus,
      onBlur,
      placeholder,
      showCheckIcon = false,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isSecure, setIsSecure] = useState(true)

    const handleFocus = (e: any) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: any) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const toggleSecure = () => {
      setIsSecure(!isSecure)
    }

    return (
      <View style={styles.container}>
        {label && <Text style={getLabelStyles(isFocused, error)}>{label}</Text>}
        <View style={styles.inputWrapper}>
          <RNTextInput
            ref={ref}
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              error && styles.inputError,
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isSecure}
            placeholder={placeholder || label}
            placeholderTextColor={T.color.textTertiary}
            editable={true}
            autoCorrect={false}
            textContentType="none"
            {...props}
          />
          <IconButton
            showCheckIcon={showCheckIcon}
            isSecure={isSecure}
            isFocused={isFocused}
            onToggle={toggleSecure}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

const styles = StyleSheet.create({
  container: {
    marginVertical: T.spacing.sm,
  },
  label: {
    fontSize: T.font.size.sm,
    color: T.color.textSecondary,
    marginBottom: T.spacing.xs,
    fontWeight: T.font.weight.medium,
  },
  labelFocused: {
    color: T.color.primary,
  },
  labelError: {
    color: T.color.error,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: T.border.width.medium,
    borderColor: T.color.border,
    borderRadius: T.border.radius.md,
    backgroundColor: T.color.white,
    paddingHorizontal: T.spacing.md,
    paddingVertical: T.spacing.md,
    paddingRight: 48,
    fontSize: T.font.size.md,
    color: T.color.textPrimary,
    height: T.size.input.height,
  },
  inputFocused: {
    borderColor: T.color.borderFocus,
    ...T.shadow.small,
  },
  inputError: {
    borderColor: T.color.errorBorder,
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: T.size.input.height,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  errorText: {
    color: T.color.error,
    fontSize: T.font.size.xs,
    marginTop: T.spacing.xs,
    marginLeft: T.spacing.xs,
  },
})
