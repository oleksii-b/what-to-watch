namespace User {
  export type Name = string

  export type Password = string

  export type Email = string

  export type LoginCredentials = {
    username: Name
    password: Password
  }

  export type Data = {
    readonly authToken: string
    readonly creationDate: Date
    readonly paymentsMode: string
    readonly userId: string
    username: Name
    email?: Email
  }

  export type Profile = {
    username: Name
    currentPassword: Password
    newPassword: Password
    email?: Email
    profile?: {
      additional?: string
    }
  }

  export type Error = {
    username?: string
    password?: string
    currentPassword?: string
    email?: string
  }
}
