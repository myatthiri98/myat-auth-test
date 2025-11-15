import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { AuthProvider } from '@/core/auth/auth.provider'
import { dependencies } from '@/ui/dependencies'
import { AppNavigator } from '@/ui/navigation/AppNavigator'
import AppToast from '@/ui/utils/toastConfig'

export default function App() {
  return (
    <KeyboardProvider>
      <AuthProvider dependencies={dependencies}>
        <StatusBar style="light" />
        <AppNavigator />
        <AppToast />
      </AuthProvider>
    </KeyboardProvider>
  )
}
