import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { T } from '@/ui/constants/theme'

type CloseButtonProps = {
  onPress: () => void
}

export const CloseButton = ({ onPress }: CloseButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name="close"
        size={T.size.icon.md}
        color={T.color.textPrimary}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    width: T.size.backButton,
    height: T.size.backButton,
    borderRadius: T.border.radius.full,
    backgroundColor: T.color.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: T.spacing.xl,
    alignSelf: 'flex-end',
    ...T.shadow.medium,
  },
})
