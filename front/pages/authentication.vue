<template>
  <div class="authentication">
    <div class="authentication__wrapper">
      <div class="authentication__content">
        <div class="authentication__content__image">
          <Logo />
        </div>
        <div class="authentication__content__form">
          <h1>Login</h1>

          <ValidationObserver
            ref="observer"
            tag="form"
            v-on:submit.prevent="login"
          >
            <ValidationProvider
              v-slot="{ classes, errors }"
              rules="required|email"
              slim
            >
              <div class="control" :class="classes">
                <label>e-mail</label>
                <div class="control__input">
                  <input
                    v-model="credentials.email"
                    type="text"
                    placeholder="e-mail"
                  />
                </div>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ classes, errors }"
              rules="required|min:5"
              slim
            >
              <div class="control" :class="classes">
                <label>password</label>
                <div class="control__input">
                  <input
                    v-model="credentials.password"
                    type="password"
                    placeholder="password"
                  />
                </div>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <div class="control">
              <span>{{ this.error }}</span>
            </div>

            <button class="btn bg-white">Login</button>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/atoms/logo'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { LOGIN } from '~/apollo/mutations/authentication'

export default {
  layout: 'authentication',
  components: {
    Logo,
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
        } else {
          this.error = 'invalid e-mail or password...'
        }
      } catch (error) {
        this.error = 'invalid e-mail or password...'
      }
    }
  }
}
</script>
