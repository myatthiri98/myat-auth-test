import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native'
import { FadeUp } from '@/ui/components/animation/FadeUp'
import { ScaleIn } from '@/ui/components/animation/ScaleIn'
import { Button } from '@/ui/components/Button'
import { T } from '@/ui/constants/theme'

type ConfirmationModalProps = {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'secondary' | 'outline'
  icon?: keyof typeof Ionicons.glyphMap
  iconColor?: string
  loading?: boolean
}

export const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  icon = 'alert-circle',
  iconColor = T.color.error,
  loading = false,
}: ConfirmationModalProps) => {
  const handleBackdropPress = () => {
    if (!loading) onClose()
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <ScaleIn delay={0} initialScale={0.9}>
              <View style={styles.modalContainer}>
                <FadeUp delay={100}>
                  <View style={styles.iconContainer}>
                    <View
                      style={[
                        styles.iconCircle,
                        { backgroundColor: iconColor },
                      ]}
                    >
                      <Ionicons
                        name={icon}
                        size={T.size.icon.lg}
                        color={T.color.white}
                      />
                    </View>
                  </View>

                  <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                  </View>

                  <View style={styles.buttonContainer}>
                    <Pressable
                      onPress={onClose}
                      disabled={loading}
                      style={({ pressed }) => [
                        styles.cancelButton,
                        pressed && styles.cancelButtonPressed,
                        loading && styles.disabledButton,
                      ]}
                    >
                      <Text
                        style={[
                          styles.cancelButtonText,
                          loading && styles.disabledText,
                        ]}
                      >
                        {cancelText}
                      </Text>
                    </Pressable>

                    <Button
                      title={confirmText}
                      onPress={handleConfirm}
                      variant={confirmVariant}
                      loading={loading}
                      disabled={loading}
                      style={styles.confirmButton}
                    />
                  </View>
                </FadeUp>
              </View>
            </ScaleIn>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: T.color.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: T.layout.screenPadding,
  },
  modalContainer: {
    backgroundColor: T.color.white,
    borderRadius: T.border.radius.xl,
    padding: T.spacing.xxxl,
    width: '100%',
    maxWidth: 400,
    ...T.shadow.large,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: T.spacing.xl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: T.border.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: T.spacing.xxxl,
  },
  title: {
    fontSize: T.font.size.xl,
    fontWeight: T.font.weight.bold,
    color: T.color.textPrimary,
    marginBottom: T.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: T.font.size.md,
    color: T.color.textSecondary,
    textAlign: 'center',
    lineHeight: T.spacing.xxl,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: T.spacing.lg,
    paddingHorizontal: T.spacing.xl,
    borderRadius: T.border.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: T.color.background,
    borderWidth: T.border.width.medium,
    borderColor: T.color.border,
    marginRight: T.spacing.md,
  },
  cancelButtonPressed: {
    opacity: 0.7,
  },
  cancelButtonText: {
    fontSize: T.font.size.md,
    fontWeight: T.font.weight.semibold,
    color: T.color.textPrimary,
  },
  confirmButton: {
    flex: 1,
    marginVertical: 0,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
})
