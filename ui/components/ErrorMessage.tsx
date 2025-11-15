import { useEffect } from 'react'
import { showErrorToast } from '@/ui/utils/toast'

type ErrorMessageProps = {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  useEffect(() => {
    if (message) showErrorToast(message, 'Error')
  }, [message])

  return null
}
