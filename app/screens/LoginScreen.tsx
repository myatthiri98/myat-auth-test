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
import { loginSchema, type LoginFormData } from '@/core/auth/auth.schemas'
import { BackgroundWrapper } from '@/ui/components/BackgroundWrapper'
import { Button } from '@/ui/components/Button'
import { CloseButton } from '@/ui/components/CloseButton'
import { CurvedCard } from '@/ui/components/CurvedCard'
import { PasswordInput } from '@/ui/components/PasswordInput'
import { TextInput } from '@/ui/components/TextInput'
import { T } from '@/ui/constants/theme'
import { RootStackParamList } from '@/ui/navigation/types'

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>()
  const { login, isLoading } = useAuth()
  const insets = useSafeAreaInsets()

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
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

  const onSubmit = async (data: LoginFormData) => {
    await login(data)
  }

  const onSignupPress = () => {
    navigation.navigate('Signup')
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
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <CurvedCard style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          <View style={styles.form}>
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
              title="Sign in"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              style={styles.loginButton}
            />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>{`Don't have an account?`} </Text>
              <TouchableOpacity onPress={onSignupPress}>
                <Text style={styles.signupLink}>{`Sign Up`}</Text>
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
    marginBottom: T.spacing.xxxl,
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
  loginButton: {
    marginTop: T.spacing.xl,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: T.spacing.xxl,
    paddingBottom: T.spacing.lg,
  },
  signupText: {
    fontSize: T.font.size.sm,
    color: T.color.textSecondary,
  },
  signupLink: {
    fontSize: T.font.size.sm,
    color: T.color.primary,
    fontWeight: T.font.weight.semibold,
  },
})
