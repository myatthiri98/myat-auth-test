import { Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/core/auth/auth.context'
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScaleIn delay={100}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        </ScaleIn>

        <View style={styles.content}>
          <View style={styles.welcomeContainer}>
            <LottieView
              source={require('@/assets/lottie/welcome.json')}
              autoPlay
              loop
              style={styles.animation}
            />
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
      </ScrollView>

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
    paddingHorizontal: T.spacing.lg,
    paddingVertical: T.spacing.md,
  },
  headerTitle: {
    fontSize: T.font.size.xxl,
    fontWeight: T.font.weight.bold,
    color: T.color.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: T.spacing.xxxl,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: T.spacing.xl,
  },
  avatar: {
    width: T.size.avatar.large,
    height: T.size.avatar.large,
    borderRadius: T.border.radius.full,
    backgroundColor: T.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...T.shadow.primary,
  },
  avatarText: {
    fontSize: T.font.size.huge,
    fontWeight: T.font.weight.bold,
    color: T.color.white,
  },
  content: {
    paddingHorizontal: T.spacing.lg,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: T.spacing.xl,
  },
  userName: {
    fontSize: T.font.size.xl,
    fontWeight: T.font.weight.semibold,
    color: T.color.textPrimary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.color.backgroundCard,
    borderRadius: T.border.radius.lg,
    padding: T.spacing.md,
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
    color: T.color.textSecondary,
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
    marginTop: T.spacing.lg,
    marginBottom: T.spacing.xxxl,
  },
  animation: {
    width: 150,
    height: 100,
  },
})
