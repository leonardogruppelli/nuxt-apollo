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
                  <input v-model="credentials.email" type="text" />
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
                  <input v-model="credentials.password" type="password" />
                </div>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <div class="control">
              <span>{{ this.error }}</span>
            </div>

            <button class="btn c-green-light">Login</button>
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
import Cookies from 'universal-cookie'
import { mapActions } from 'vuex'

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
    ...mapActions(['setUser']),
    async login() {
      const valid = await this.$refs.observer.validate()

      if (!valid) return

      try {
        const { data } = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: this.credentials
        })

        const token = data.signin && data.signin.token
        const user = data.signin && data.signin.writer

        if (token) {
          const cookies = new Cookies()

          await this.$apolloHelpers.onLogin(token)

          cookies.set('user', user)
          this.setUser(user)

          this.$router.push({
            path: '/'
          })
        } else {
          this.error = 'invalid e-mail or password...'
        }
      } catch (error) {
        console.log(error)
        this.error = 'invalid e-mail or password...'
      }
    }
  }
}
</script>
