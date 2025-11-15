import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { T } from '@/ui/constants/theme'

interface ToastContainerProps {
  title?: string
  content?: string
  titleColor?: string
  contentColor?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

const iconNameMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  warning: 'warning',
  info: 'information-circle',
}

const getIconConfig = (type: string) => {
  const validType = (['success', 'error', 'warning', 'info'] as const).includes(
    type as any,
  )
    ? (type as 'success' | 'error' | 'warning' | 'info')
    : 'info'

  const iconColorMap: Record<string, string> = {
    success: T.color.success,
    error: T.color.error,
    warning: T.color.warning,
    info: T.color.primary,
  }

  return {
    name: iconNameMap[validType] || iconNameMap.info,
    color: iconColorMap[validType] || iconColorMap.info,
  }
}

const getThemeColors = () => {
  return {
    backgroundColor: T.color.white,
    titleColor: T.color.textPrimary,
    contentColor: T.color.textSecondary,
  }
}

export const ToastContainer = ({
  title,
  content,
  titleColor,
  contentColor,
  type = 'info',
}: ToastContainerProps) => {
  const themeColors = getThemeColors()
  const iconConfig = getIconConfig(type)

  const finalTitleColor = titleColor || themeColors.titleColor
  const finalContentColor = contentColor || themeColors.contentColor

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.backgroundColor },
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: iconConfig.color }]}
      >
        <Ionicons name={iconConfig.name} size={16} color={T.color.white} />
      </View>
      <View style={styles.contentContainer}>
        {title && (
          <Text style={[styles.title, { color: finalTitleColor }]}>
            {title}
          </Text>
        )}
        {content && (
          <Text style={[styles.content, { color: finalContentColor }]}>
            {content}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: T.border.radius.md,
    justifyContent: 'center',
    paddingVertical: T.spacing.md,
    paddingHorizontal: T.spacing.md + T.spacing.xs,
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: T.color.shadowDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '90%',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: T.spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: T.font.size.md,
    fontWeight: T.font.weight.semibold,
    lineHeight: 20,
  },
  content: {
    fontSize: T.font.size.sm,
    fontWeight: T.font.weight.regular,
    lineHeight: 18,
    marginTop: T.spacing.xxs,
  },
})

export default React.memo(ToastContainer)
