<template>
  <div class="logo">
    <img :src="logo.src" :alt="logo.alt" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: {
        src: '/images/logo.svg',
        alt: 'Nuxt.js and GraphQL'
      }
    }
  }
}
</script>
