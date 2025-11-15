import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LottieView from 'lottie-react-native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FadeUp } from '@/ui/components/animation/FadeUp'
import { Button } from '@/ui/components/Button'
import { T } from '@/ui/constants/theme'
import { RootStackParamList } from '@/ui/navigation/types'

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>

export const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>()

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('@/assets/lottie/auth-animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.titleContainer}>
        <LottieView
          source={require('@/assets/lottie/welcome.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <FadeUp delay={500}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Secure authentication made simple</Text>
        </View>
      </FadeUp>

      <FadeUp delay={700}>
        <View style={styles.buttonsContainer}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
          />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Signup')}
            variant="outline"
          />
        </View>
      </FadeUp>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.color.background,
    paddingHorizontal: T.layout.screenPadding,
    paddingVertical: T.layout.sectionSpacing,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: T.spacing.lg,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: T.layout.sectionSpacing,
  },
  subtitle: {
    fontSize: T.font.size.lg,
    color: T.color.primaryLight,
    textAlign: 'center',
    lineHeight: T.spacing.xxl,
  },
  buttonsContainer: {
    marginBottom: T.spacing.xl,
  },
})
