import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { T } from '@/ui/constants/theme'

type CurvedCardProps = {
  children: React.ReactNode
  style?: ViewStyle
}

export const CurvedCard = ({ children, style }: CurvedCardProps) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.curveTop} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.color.white,
    borderTopLeftRadius: T.border.radius.xxl,
    borderTopRightRadius: T.border.radius.xxl,
    paddingTop: T.spacing.xxl,
    paddingHorizontal: T.layout.screenPadding,
    paddingBottom: T.spacing.xxxl,
    ...T.shadow.large,
  },
  curveTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: T.color.white,
    borderTopLeftRadius: T.border.radius.xxl,
    borderTopRightRadius: T.border.radius.xxl,
  },
})
