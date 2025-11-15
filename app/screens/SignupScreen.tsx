import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '@/core/auth/auth.context'
import { signupSchema, type SignupFormData } from '@/core/auth/auth.schemas'
import { BackgroundWrapper } from '@/ui/components/BackgroundWrapper'
import { Button } from '@/ui/components/Button'
import { CloseButton } from '@/ui/components/CloseButton'
import { CurvedCard } from '@/ui/components/CurvedCard'
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
  const insets = useSafeAreaInsets()

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const passwordsMatch = Boolean(
    password && confirmPassword && password === confirmPassword,
  )

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
    <BackgroundWrapper>
      <StatusBar style="dark" />
      <CloseButton
        onPress={() => navigation.goBack()}
        style={[styles.closeButton, { top: insets.top + T.spacing.md }]}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + T.spacing.massive,
            paddingBottom: T.spacing.xxl,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <CurvedCard style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  label="Full Name"
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
                  label="Enter Email"
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
                  autoComplete="password-new"
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <PasswordInput
                  label="Confirm Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.confirmPassword?.message}
                  autoComplete="off"
                  showCheckIcon={passwordsMatch}
                />
              )}
            />

            <Button
              title="Sign up"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              style={styles.signupButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={onLoginPress}>
                <Text style={styles.loginLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CurvedCard>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    right: T.layout.screenPadding,
    zIndex: 100,
  },
  card: {
    marginTop: T.spacing.lg,
  },
  header: {
    marginBottom: T.spacing.xl,
  },
  title: {
    fontSize: T.font.size.huge,
    fontWeight: T.font.weight.bold,
    color: T.color.textPrimary,
    marginBottom: T.spacing.sm,
    letterSpacing: -0.5,
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
    marginTop: T.spacing.xl,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: T.spacing.xxl,
    paddingBottom: T.spacing.lg,
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
