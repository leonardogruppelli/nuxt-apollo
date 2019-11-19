import { configure, extend, localize } from 'vee-validate'
import {
  alpha_spaces,
  between,
  confirmed,
  email,
  max,
  min,
  required
} from 'vee-validate/dist/rules'

export default function() {
  const config = {
    classes: {
      valid: 'control--success',
      invalid: 'control--error'
    }
  }

  configure(config)

  extend('alpha_spaces', alpha_spaces)
  extend('between', between)
  extend('confirmed', confirmed)
  extend('email', email)
  extend('max', max)
  extend('min', min)
  extend('required', required)

  localize({
    en: {
      messages: {
        alpha_spaces: 'this field may only contain alphabetic characters as well as spaces...',
        between: 'this field must be between {min} and {max} characters...',
        confirmed: 'confirmation does not match...',
        email: 'inform a valid e-mail...',
        max: 'this field may not be greater than {length} characters...',
        min: 'this field must be at least {length} characters...',
        required: 'this field is required...'
      }
    }
  })
}
