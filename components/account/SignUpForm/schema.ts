import {object} from 'yup'
import {validationService} from '../../../services'

const {requiredString, requiredEmail, requiredPassword} = validationService.method

export default object({
  username: requiredString(),
  email: requiredEmail(),
  password: requiredPassword(),
  confirmPassword: requiredPassword()
    .test(
      null,
      `Passwords do not match`,
      function (value = ``) {
        return value === this.parent.password
      }
    ),
})
