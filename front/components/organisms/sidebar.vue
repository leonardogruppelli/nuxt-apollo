<template>
  <aside>
    <ul>
      <li>
        <nuxt-link to="/" :class="route.includes('index') && 'active'">
          <AntdIcon type="pie-chart-o" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/books" :class="route.includes('books') && 'active'">
          <AntdIcon type="table-o" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/users" :class="route.includes('users') && 'active'">
          <AntdIcon type="user-o" />
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$nuxt.$route.name
    }
  }
}
</script>
