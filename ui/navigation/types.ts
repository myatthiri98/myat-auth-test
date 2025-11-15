export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  Signup: undefined
  Home: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
