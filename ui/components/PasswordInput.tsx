import { Ionicons } from '@expo/vector-icons'
import React, { forwardRef, useState } from 'react'
import {
  TextInput as RNTextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native'
import { T } from '@/ui/constants/theme'

type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'> & {
  label?: string
  error?: string
}

const getLabelStyles = (isFocused: boolean, error?: string) => [
  styles.label,
  isFocused && styles.labelFocused,
  error && styles.labelError,
]

const getInputContainerStyles = (isFocused: boolean, error?: string) => [
  styles.inputContainer,
  isFocused && styles.inputContainerFocused,
  error && styles.inputContainerError,
]

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
        <View style={getInputContainerStyles(isFocused, error)}>
          <RNTextInput
            ref={ref}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isSecure}
            placeholder={placeholder || label}
            placeholderTextColor={T.color.textTertiary}
            editable={true}
            autoCorrect={false}
            {...props}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleSecure}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={T.size.icon.md}
              color={isFocused ? T.color.primary : T.color.textSecondary}
            />
          </TouchableOpacity>
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
  inputContainer: {
    borderWidth: T.border.width.medium,
    borderColor: T.color.border,
    borderRadius: T.border.radius.md,
    backgroundColor: T.color.white,
    paddingHorizontal: T.spacing.lg,
    minHeight: T.size.input.height,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerFocused: {
    borderColor: T.color.borderFocus,
    ...T.shadow.small,
  },
  inputContainerError: {
    borderColor: T.color.errorBorder,
  },
  input: {
    flex: 1,
    fontSize: T.font.size.md,
    color: T.color.textPrimary,
    paddingVertical: T.spacing.lg,
    paddingHorizontal: 0,
  },
  iconButton: {
    padding: T.spacing.sm,
    marginLeft: T.spacing.xs,
  },
  errorText: {
    color: T.color.error,
    fontSize: T.font.size.xs,
    marginTop: T.spacing.xs,
    marginLeft: T.spacing.xs,
  },
})
