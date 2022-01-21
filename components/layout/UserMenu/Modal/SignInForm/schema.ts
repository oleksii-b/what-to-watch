import {object} from 'yup'
import {validationService} from '../../../../../services'

const {requiredString, password} = validationService.method

export default object({
  username: requiredString(),
  password: password(),
})
