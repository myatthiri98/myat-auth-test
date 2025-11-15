import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet } from 'react-native'
import { T } from '@/ui/constants/theme'

export function BackgroundWrapper(
  props: Readonly<{ children: React.ReactNode }>,
) {
  return (
    <LinearGradient
      colors={[T.color.primary, T.color.primaryLight]}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container]}
    >
      {props.children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
