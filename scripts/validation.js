import {addMethod, string} from 'yup'

addMethod(
  string,
  `requiredString`,
  function () {
    return this
      .trim()
      .required(`This field is required`)
  },
)

addMethod(
  string,
  `password`,
  function () {
    return this
      .min(6, `Passwords must be at least 6 characters`)
  },
)
