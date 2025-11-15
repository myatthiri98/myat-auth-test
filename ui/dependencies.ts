import { Dependencies } from '@/core/_context_/dependencies'
import { AsyncStorageAuthGateway } from '@/infra/auth-gateway/async-storage.auth.gateway'

const mobileDependencies: Dependencies = {
  authStorage: new AsyncStorageAuthGateway(),
}

export const dependencies: Dependencies = mobileDependencies
