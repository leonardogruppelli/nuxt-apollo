<template>
  <div class="container" :class="!sidebar && 'container--full'">
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebar'])
  }
}
</script>
