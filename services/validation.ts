import {string} from 'yup'
import '../scripts/validation'

export const method = {
  // @ts-ignore
  requiredString: () => string().requiredString(),
  // @ts-ignore
  requiredEmail: () => string().requiredString().email(`Email is not valid`),
  // @ts-ignore
  password: () => string().password(),
  // @ts-ignore
  requiredPassword: () => string().requiredString().password(),
}
