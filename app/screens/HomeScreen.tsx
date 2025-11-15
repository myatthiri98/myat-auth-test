import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/core/auth/auth.context'
import { FadeUp } from '@/ui/components/animation/FadeUp'
import { ScaleIn } from '@/ui/components/animation/ScaleIn'
import { Button } from '@/ui/components/Button'
import { ConfirmationModal } from '@/ui/components/ConfirmationModal'
import { T } from '@/ui/constants/theme'

export const HomeScreen = () => {
  const { user, logout, isLoading } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = async () => {
    await logout()
    setShowLogoutModal(false)
  }

  if (!user) return null

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScaleIn delay={100}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
      </ScaleIn>

      <FadeUp delay={300}>
        <View style={styles.content}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons
                name="person-outline"
                size={T.size.icon.md}
                color={T.color.primary}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{user.name}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons
                name="mail-outline"
                size={T.size.icon.md}
                color={T.color.primary}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={T.size.icon.md}
                color={T.color.success}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[styles.infoValue, styles.statusActive]}>
                Active
              </Text>
            </View>
          </View>

          <Button
            title="Logout"
            onPress={() => setShowLogoutModal(true)}
            loading={isLoading}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>
      </FadeUp>

      <ConfirmationModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmVariant="primary"
        icon="log-out-outline"
        iconColor={T.color.error}
        loading={isLoading}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.color.background,
  },
  header: {
    paddingHorizontal: T.layout.screenPadding,
    paddingVertical: T.spacing.xl,
  },
  headerTitle: {
    fontSize: T.font.size.xxxl,
    fontWeight: T.font.weight.bold,
    color: T.color.textPrimary,
    letterSpacing: -0.5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: T.spacing.xxxl,
  },
  avatar: {
    width: T.size.avatar.xlarge,
    height: T.size.avatar.xlarge,
    borderRadius: T.border.radius.full,
    backgroundColor: T.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...T.shadow.primary,
  },
  avatarText: {
    fontSize: T.font.size.giant,
    fontWeight: T.font.weight.bold,
    color: T.color.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: T.layout.screenPadding,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: T.spacing.xxxl,
  },
  welcomeText: {
    fontSize: T.font.size.md,
    color: T.color.textSecondary,
    marginBottom: T.spacing.xs,
  },
  userName: {
    fontSize: T.font.size.xxl,
    fontWeight: T.font.weight.semibold,
    color: T.color.textPrimary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.color.backgroundCard,
    borderRadius: T.border.radius.lg,
    padding: T.layout.cardPadding,
    marginBottom: T.spacing.lg,
    ...T.shadow.small,
  },
  infoIconContainer: {
    width: T.size.iconContainer,
    height: T.size.iconContainer,
    borderRadius: T.border.radius.full,
    backgroundColor: T.color.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: T.spacing.lg,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: T.font.size.xs,
    color: T.color.textTertiary,
    marginBottom: T.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: T.font.size.md,
    color: T.color.textPrimary,
    fontWeight: T.font.weight.semibold,
  },
  statusActive: {
    color: T.color.success,
  },
  logoutButton: {
    marginTop: T.spacing.xxl,
    marginBottom: T.spacing.xxxl,
  },
})
