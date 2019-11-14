<template>
  <div class="container">
    <div class="load"></div>
    <h1>Login</h1>
    <ValidationObserver
      tag="form"
      ref="observer"
      v-on:submit.prevent="login"
    >
      <ValidationProvider
        name="e-mail"
        rules="email|required"
        v-slot="{ errors }"
      >
        <div
          class="control"
          :class="
            errors.length &&
              'control--error'
          "
        >
          <label>e-mail</label>
          <div class="control__input">
            <input
              type="text"
              v-model="
                credentials.email
              "
              placeholder="email"
            />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <ValidationProvider
        name="password"
        rules="required"
        v-slot="{ errors }"
      >
        <div
          class="control"
          :class="
            errors.length &&
              'control--error'
          "
        >
          <label>e-mail</label>
          <div class="control__input">
            <input
              type="password"
              v-model="
                credentials.password
              "
              placeholder="password"
            />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <button class="btn bg-blue">
        Login
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
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
      },
      error: ''
    }
  },
  methods: {
    async login() {
      const valid = await this.$refs.observer.validate()

      if (!valid) return

      const {
        email,
        password
      } = this.credentials

      try {
        const {
          data
        } = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            email: email,
            password: password
          }
        })

        const token =
          data.signin &&
          data.signin.token

        if (token) {
          this.error = ''

          await this.$apolloHelpers.onLogin(
            token
          )

          this.$router.push({
            path: '/'
          })
        } else {
          this.error =
            'email or password are invalid'
        }
      } catch (error) {
        this.error =
          'email or password are invalid'
      }
    }
  }
}
</script>
