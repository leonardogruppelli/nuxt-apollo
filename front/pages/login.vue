<template>
  <div class="container">
    <h1>Login</h1>
    <ValidationObserver ref="observer" tag="form" @submit.prevent="login">
      <ValidationProvider v-slot="{ classes, errors }" name="e-mail" rules="required|email" slim>
        <div class="control" :class="classes">
          <label>e-mail</label>
          <div class="control__input">
            <input v-model="credentials.email" type="text" placeholder="email" />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <ValidationProvider v-slot="{ classes, errors }" name="password" rules="required" slim>
        <div class="control" :class="classes">
          <label>e-mail</label>
          <div class="control__input">
            <input v-model="credentials.password" type="password" placeholder="password" />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <button class="btn bg-blue">Login</button>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { LOGIN } from '~/apollo/mutations/authentication'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      const valid = await this.$refs.observer.validate()

      if (!valid) return

      const { email, password } = this.credentials

      try {
        const { data } = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            email: email,
            password: password
          }
        })

        const token = data.signin && data.signin.token

        if (token) {
          await this.$apolloHelpers.onLogin(token)

          this.$router.push({
            path: '/'
          })
        }
      } catch (error) {
        this.error = 'email or password are invalid'
      }
    }
  }
}
</script>
