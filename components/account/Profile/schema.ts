import {object, string} from 'yup'
import {validationService} from '../../../services'

const {requiredEmail, requiredPassword, password} = validationService.method

export default object({
  email: requiredEmail(),
  currentPassword: requiredPassword(),
  newPassword: password(),
  additional: string().trim().max(1000, `This field must be at most 1000 characters`)
})
