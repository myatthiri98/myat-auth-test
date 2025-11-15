import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LottieView from 'lottie-react-native'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { HomeScreen } from '@/app/screens/HomeScreen'
import { LoginScreen } from '@/app/screens/LoginScreen'
import { SignupScreen } from '@/app/screens/SignupScreen'
import { WelcomeScreen } from '@/app/screens/WelcomeScreen'
import { useAuth } from '@/core/auth/auth.context'
import { T } from '@/ui/constants/theme'

import { RootStackParamList } from '@/ui/navigation/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppNavigator = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('@/assets/lottie/loading.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: T.color.background,
  },
  animation: {
    width: 150,
    height: 150,
  },
})
