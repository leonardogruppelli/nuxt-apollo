<template>
  <header class="header">
    <div class="header__logo">
      <Logo />
    </div>
    <button v-on:click="logout">Logout</button>
  </header>
</template>

<script>
import Logo from '~/components/atoms/logo'

export default {
  components: {
    Logo
  },
  methods: {
    async logout() {
      await this.$apolloHelpers.onLogout()

      this.$router.push({
        path: '/authentication'
      })
    }
  }
}
</script>
