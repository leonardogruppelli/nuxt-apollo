<template>
  <aside class="sidebar" :class="sidebar && 'sidebar--active'">
    <ul>
      <li>
        <nuxt-link to="/" :class="route.includes('index') && 'active'">
          <AntdIcon type="pie-chart-o" />
          <span>Dashboard</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/books" :class="route.includes('books') && 'active'">
          <AntdIcon type="table-o" />
          <span>Books</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/users" :class="route.includes('users') && 'active'">
          <AntdIcon type="user-o" />
          <span>Users</span>
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebar']),
    route() {
      return this.$nuxt.$route.name
    }
  }
}
</script>
