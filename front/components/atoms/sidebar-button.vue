<template>
  <button
    class="sidebar-button"
    :class="sidebar && 'sidebar-button--active'"
    @click="setSidebar"
  >
    Toggle Sidebar <AntdIcon type="left-circle-o" />
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    ...mapActions(['setSidebar'])
  }
}
</script>
