import React, { forwardRef, useState } from 'react'
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native'
import { T } from '@/ui/constants/theme'

type CustomTextInputProps = TextInputProps & {
  label?: string
  error?: string
}

export const TextInput = forwardRef<RNTextInput, CustomTextInputProps>(
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

    const handleFocus = (e: any) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: any) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <View style={styles.container}>
        {label && (
          <Text
            style={[
              styles.label,
              isFocused && styles.labelFocused,
              error && styles.labelError,
            ]}
          >
            {label}
          </Text>
        )}
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
          placeholder={placeholder || label}
          placeholderTextColor={T.color.textTertiary}
          editable={true}
          autoCorrect={false}
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    )
  },
)

TextInput.displayName = 'TextInput'

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
  input: {
    borderWidth: T.border.width.medium,
    borderColor: T.color.border,
    borderRadius: T.border.radius.md,
    backgroundColor: T.color.white,
    paddingHorizontal: T.spacing.lg,
    paddingVertical: T.spacing.lg,
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
  errorText: {
    color: T.color.error,
    fontSize: T.font.size.xs,
    marginTop: T.spacing.xs,
    marginLeft: T.spacing.xs,
  },
})
