<template>
  <ul class="breadcrumb">
    <li v-for="(link, index) in path" :key="index">
      <nuxt-link
        v-if="index < total"
        :to="path.slice(0, index + 1).join('/') || '/'"
      >
        {{ !index ? 'dashboard' : link % 1 === 0 ? name : link }}
      </nuxt-link>
      <span v-else>
        {{ !index ? 'dashboard' : link % 1 === 0 ? name : link }}
      </span>

      <AntdIcon v-if="index < total" type="right-o" />
    </li>
  </ul>
</template>

<script>
import pluralize from 'pluralize'

export default {
  computed: {
    path() {
      const path =
        this.$nuxt.$route.path == '/'
          ? ['/']
          : this.$nuxt.$route.path.split('/')

      return path
    },
    name() {
      return pluralize.singular(this.$nuxt.$route.name.split('-')[0])
    },
    total() {
      return this.path.length - 1
    }
  }
}
</script>
