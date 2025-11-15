import React from 'react'
import { StatusBar } from 'react-native'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from '@/core/auth/auth.provider'
import { dependencies } from '@/ui/dependencies'
import { AppNavigator } from '@/ui/navigation/AppNavigator'
import AppToast from '@/ui/utils/toastConfig'

export default function App() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <AuthProvider dependencies={dependencies}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
          <AppToast />
        </AuthProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}
