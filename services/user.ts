/// <reference path="../types/user.d.ts" />
import userbase from 'userbase-js'

const singUp = async (
  username: User.Name,
  password: User.Password,
  email: string,
) =>
  await userbase
    .signUp({
      username,
      password,
      email,
      rememberMe: `local`,
    })

const singIn = async (username: User.Name, password: User.Password) =>
  await userbase
    .signIn({
      username,
      password,
      rememberMe: `local`,
    })

const signOut = async () =>
  await userbase.signOut()

const resetPassword = async (username: User.Name) =>
  await userbase.forgotPassword({username})

const update = async (data: User.Profile) => {
  const user = {...data}
  const {profile} = user

  for (let key in profile) {
    if (!profile[key]) {
      delete profile[key]
    }
  }

  if (!Object.keys(profile).length) {
    user.profile = null
  }

  return await userbase.updateUser(user)
}

export {singUp}
export {singIn}
export {signOut}
export {update}
export {resetPassword}
