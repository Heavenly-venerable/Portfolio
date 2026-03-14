declare module '#auth-utils' {
  interface User {
    id: number
    email: string
    name: string
    role: 'admin' | 'editor'
  }

  interface UserSession {
    user: User
    loggedInAt: number
  }

  interface SecureSessionData {
  }
}

export { }
