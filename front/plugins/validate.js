import { extend } from 'vee-validate'
import { required, email, min, alpha_spaces } from 'vee-validate/dist/rules'

export default function() {
  extend('required', required)
  extend('email', email)
  extend('min', min)
  extend('alpha_spaces', alpha_spaces)
}
