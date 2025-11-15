# User Authentication App 🔐

A modern React Native authentication application built with **Clean Architecture** principles, featuring beautiful UI animations, Lottie animations, and persistent authentication using AsyncStorage.

## 📱 Features

### ✅ Core Features

- **User Authentication Flow**
  - Welcome screen with animation
  - Login with email and password
  - Signup with name, email, and password
  - Secure logout functionality

- **State Management**
  - React Context API for global auth state
  - Clean separation of concerns
  - Dependency injection pattern

- **Persistent Authentication**
  - AsyncStorage integration
  - Auto-login on app restart
  - Secure user data storage

- **Form Validation**
  - Email format validation
  - Password length requirements (min 6 characters)
  - Real-time error messages
  - Field-level validation feedback

### 🎨 UI/UX Features

- **Modern Design**
  - Clean, minimalist interface
  - Consistent color scheme
  - Card-based layouts
  - Professional typography

- **Smooth Animations**
  - React Native Reanimated
  - Lottie animations on welcome screen
  - Floating label inputs
  - Spring animations on buttons
  - Fade-in transitions

- **Enhanced Components**
  - Password visibility toggle with eye icon
  - Animated error messages with shake effect
  - Loading states on buttons
  - Keyboard-aware forms

### 🏗️ Architecture Features

- **Clean Architecture (Hexagonal)**
  - Separation of concerns
  - Domain-driven design
  - Ports and adapters pattern
  - Dependency injection

- **Type Safety**
  - Full TypeScript coverage
  - Strict type checking
  - Interface-based design

## 📁 Project Structure

```
myat-auth-test/
├── core/                              # Business Logic Layer (Domain)
│   ├── _context_/
│   │   └── dependencies.ts            # DI type definition
│   ├── auth/
│   │   ├── auth.types.ts              # Type definitions
│   │   ├── auth.context.tsx           # Auth context definition
│   │   ├── auth.provider.tsx          # Auth state management
│   │   ├── auth.schemas.ts            # Validation schemas
│   │   ├── authentification.fixture.ts # Test fixtures
│   │   └── usecases/                  # Business use cases
│   │       ├── login.usecase.ts
│   │       ├── login.usecase.spec.ts
│   │       ├── signup.usecase.ts
│   │       ├── signup.usecase.spec.ts
│   │       ├── logout.usecase.ts
│   │       └── logout.usecase.spec.ts
│   └── ports/                         # Interface definitions
│       └── auth.storage.ts
│
├── infra/                             # Infrastructure Layer (Adapters)
│   └── auth-gateway/
│       └── async-storage.auth.gateway.ts
│
├── ui/                                # UI Layer
│   ├── dependencies.ts                # DI container
│   ├── components/                    # Reusable components
│   │   ├── animation/                 # Animation components
│   │   │   ├── FadeUp.tsx
│   │   │   └── ScaleIn.tsx
│   │   ├── Button.tsx
│   │   ├── TextInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── CloseButton.tsx
│   │   ├── ConfirmationModal.tsx
│   │   ├── ToastContainer.tsx
│   │   └── index.ts                   # Component exports
│   ├── constants/
│   │   └── theme.ts                   # Theme constants
│   ├── utils/                         # Utility functions
│   │   ├── toast.ts
│   │   └── toastConfig.tsx
│   └── navigation/
│       ├── AppNavigator.tsx
│       └── types.ts
│
├── app/                               # Application Layer
│   └── screens/
│       ├── WelcomeScreen.tsx
│       ├── LoginScreen.tsx
│       ├── SignupScreen.tsx
│       └── HomeScreen.tsx
│
├── assets/
│   └── lottie/                        # Lottie animation files
│       ├── auth-animation.json
│       ├── loading.json
│       └── welcome.json
│
├── App.tsx                            # Root component
├── index.ts                           # Entry point
└── package.json
```

## 🏛️ Architecture Overview

### Clean Architecture Principles

This project follows **Hexagonal Architecture** (Ports & Adapters):

```
┌─────────────────────────────────────────────────────────┐
│                    UI Layer (app/)                      │
│  Screens: Welcome, Login, Signup, Home                  │
│  Uses: useAuth() hook from AuthContext                  │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Core Layer (core/auth/)                    │
│  • AuthContext & AuthProvider                           │
│  • Use Cases: login, signup, logout                     │
│  • Ports: AuthStorage (interface)                       │
│  • Dependencies: Type definitions                       │
│  • Schemas: Validation schemas                          │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│        Infrastructure Layer (infra/)                    │
│  • AsyncStorageAuthGateway (implements AuthStorage)     │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│        DI Container (ui/dependencies.ts)                │
│  Creates instances and wires dependencies               │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Benefits

1. **Testability**: Easy to test business logic with fake implementations
2. **Maintainability**: Changes to infrastructure don't affect business logic
3. **Scalability**: Easy to add new features following the same pattern
4. **Flexibility**: Can swap implementations (e.g., AsyncStorage → Backend API)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   cd myat-auth-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on a platform**
   - **iOS** (Mac only):

     ```bash
     npm run ios
     # or press 'i' in the Expo terminal
     ```

   - **Android**:

     ```bash
     npm run android
     # or press 'a' in the Expo terminal
     ```

## 📖 Usage Guide

### 1. Welcome Screen

- Displays animated welcome screen with animation
- Options to navigate to Login or Signup

### 2. Sign Up

- Enter your name, email, and password
- Password must be at least 6 characters
- Email must be in valid format
- All fields are required

### 3. Login

- Enter registered email and password
- Toggle password visibility with eye icon
- Error messages for invalid credentials

### 4. Home Screen

- Displays user profile information
- Shows name, email, and status
- Logout button to end session

### Authentication Persistence

- User stays logged in after closing the app
- Authentication state is persisted using AsyncStorage
- Auto-login on app restart

## 🧪 Testing the App

### Test Scenario 1: New User Registration

1. Open the app → Click "Sign Up"
2. Enter:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
3. Click "Sign Up"
4. You should be automatically logged in and see the Home screen

### Test Scenario 2: Login with Existing User

1. Logout from Home screen
2. Click "Login" on Welcome screen
3. Enter the credentials you created
4. Click "Login"
5. You should see the Home screen with your profile

### Test Scenario 3: Validation Errors

1. Try to sign up with:
   - Invalid email format: "notanemail"
   - Short password: "123"
2. You should see validation error messages

### Test Scenario 4: Persistent Auth

1. Login to the app
2. Close the app completely
3. Reopen the app
4. You should automatically be logged in (no Welcome screen)

## 🛠️ Technologies Used

### Core

- **React Native** (0.81.5) - Mobile framework
- **Expo** (~54.0) - Development platform
- **TypeScript** (5.9.2) - Type safety

### State Management

- **React Context API** - Global state management
- **React Hooks** - Component state and lifecycle

### Navigation

- **React Navigation** (v7) - Navigation library
- **Native Stack Navigator** - Stack-based navigation

### UI & Animations

- **React Native Reanimated** (v4) - High-performance animations
- **Lottie React Native** - Vector animations
- **Expo Vector Icons** - Icon library

### Validation & Storage

- **Zod** - Schema validation
- **AsyncStorage** - Local data persistence

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Auto-fix linting issues

```bash
npm run lint:fix
```

## 🎯 Implementation Highlights

### 1. Dependency Injection

The app uses a centralized DI container (`ui/dependencies.ts`) to manage dependencies:

```typescript
const mobileDependencies: Dependencies = {
  authStorage: new AsyncStorageAuthGateway(),
}
```

### 2. Use Case Pattern

Business logic is encapsulated in use cases:

```typescript
// login.usecase.ts
export const loginUser = async (
  credentials: LoginCredentials,
  dependencies: Dependencies,
): Promise<User> => {
  // Business logic here
}
```

### 3. Port & Adapter Pattern

Interfaces define contracts, implementations are swappable:

```typescript
// Port (Interface)
export interface AuthStorage {
  getUser(): Promise<User | null>
  saveUser(user: User): Promise<void>
  // ...
}

// Adapter (Implementation)
export class AsyncStorageAuthGateway implements AuthStorage {
  async getUser(): Promise<User | null> {
    // AsyncStorage implementation
  }
}
```

### 4. Type-Safe Navigation

Navigation is fully typed using TypeScript:

```typescript
export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  Signup: undefined
  Home: undefined
}
```
