import { Dependencies } from '@/core/_context_/dependencies'

export const logoutUser = async (dependencies: Dependencies): Promise<void> => {
  const { authStorage } = dependencies
  await authStorage.removeUser()
}
