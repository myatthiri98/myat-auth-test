import React from 'react'
import { StyleSheet } from 'react-native'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import { ToastContainer } from '@/ui/components/ToastContainer'
import { T } from '@/ui/constants/theme'

const AppToast = () => {
  const backgroundColor = T.color.white
  const textColor = T.color.textPrimary
  const secondaryTextColor = T.color.textSecondary

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={[styles.toastBase, styles.successToast, { backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
        text1Style={[styles.text1, { color: textColor }]}
        text2Style={[styles.text2, { color: secondaryTextColor }]}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={[styles.toastBase, styles.errorToast, { backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
        text1Style={[styles.text1, { color: textColor }]}
        text2Style={[styles.text2, { color: secondaryTextColor }]}
      />
    ),
    customToast: (props: any) => {
      const toastProps = props.props || props
      return (
        <ToastContainer
          title={toastProps.title}
          content={toastProps.content}
          titleColor={toastProps.titleColor}
          contentColor={toastProps.contentColor}
          type={toastProps.toastType || toastProps.type || 'info'}
        />
      )
    },
  }

  return <Toast config={toastConfig} />
}

const styles = StyleSheet.create({
  toastBase: {
    borderRadius: T.border.radius.md,
  },
  successToast: {
    borderLeftColor: T.color.success,
    borderLeftWidth: T.border.width.thick,
  },
  errorToast: {
    borderLeftColor: T.color.error,
    borderLeftWidth: T.border.width.thick,
  },
  contentContainer: {
    paddingHorizontal: T.spacing.md + T.spacing.xs,
  },
  text1: {
    fontSize: T.font.size.md,
    fontWeight: T.font.weight.semibold,
  },
  text2: {
    fontSize: T.font.size.sm,
  },
})

export default React.memo(AppToast)
