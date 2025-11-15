import Toast from 'react-native-toast-message'

interface ToastOptions {
  title?: string
  content?: string
  titleColor?: string
  contentColor?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  visibilityTime?: number
}

export const showToast = ({
  title,
  content,
  titleColor,
  contentColor,
  type = 'info',
  visibilityTime = 4000,
}: ToastOptions) => {
  return Toast.show({
    type: 'customToast',
    props: {
      title,
      content,
      titleColor,
      contentColor,
      toastType: type,
    },
    visibilityTime,
  })
}

export const showSuccessToast = (message: string, title?: string) => {
  return Toast.show({
    type: 'success',
    text1: title || 'Success',
    text2: message,
    visibilityTime: 4000,
  })
}

export const showErrorToast = (message: string, title?: string) => {
  return Toast.show({
    type: 'error',
    text1: title || 'Error',
    text2: message,
    visibilityTime: 5000,
  })
}

export const showInfoToast = (message: string, title?: string) => {
  return showToast({
    title: title || 'Info',
    content: message,
    type: 'info',
  })
}

export const showWarningToast = (message: string, title?: string) => {
  return showToast({
    title: title || 'Warning',
    content: message,
    type: 'warning',
  })
}
