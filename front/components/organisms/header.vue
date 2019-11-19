<template>
  <header>
    <button v-on:click="logout">Logout</button>
  </header>
</template>

<script>
export default {
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
