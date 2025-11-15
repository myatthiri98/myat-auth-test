import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useAuth } from '@/core/auth/auth.context'
import { signupSchema, type SignupFormData } from '@/core/auth/auth.schemas'
import { Button } from '@/ui/components/Button'
import { CloseButton } from '@/ui/components/CloseButton'
import { PasswordInput } from '@/ui/components/PasswordInput'
import { TextInput } from '@/ui/components/TextInput'
import { T } from '@/ui/constants/theme'
import { RootStackParamList } from '@/ui/navigation/types'

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>

export const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>()
  const { signup, isLoading } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reset()
      clearErrors()
    })
    return unsubscribe
  }, [navigation, reset, clearErrors])

  const onSubmit = async (data: SignupFormData) => {
    await signup(data)
  }

  const onLoginPress = () => {
    navigation.navigate('Login')
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <CloseButton onPress={() => navigation.goBack()} />

      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              label="Name"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.name?.message}
              autoCapitalize="words"
              autoComplete="name"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              label="Email"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <PasswordInput
              label="Password"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.password?.message}
              autoComplete="password"
            />
          )}
        />

        <Button
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
          style={styles.signupButton}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={onLoginPress}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.color.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: T.layout.screenPadding,
    paddingTop: T.spacing.massive,
    paddingBottom: T.layout.sectionSpacing,
  },
  header: {
    marginBottom: T.layout.sectionSpacing,
  },
  title: {
    fontSize: T.font.size.huge,
    fontWeight: T.font.weight.bold,
    color: T.color.textPrimary,
    marginBottom: T.spacing.sm,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: T.font.size.md,
    color: T.color.textSecondary,
    lineHeight: T.spacing.xxl,
  },
  form: {
    flex: 1,
  },
  signupButton: {
    marginTop: T.spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: T.spacing.xxl,
  },
  loginText: {
    fontSize: T.font.size.sm,
    color: T.color.textSecondary,
  },
  loginLink: {
    fontSize: T.font.size.sm,
    color: T.color.primary,
    fontWeight: T.font.weight.semibold,
  },
})
