<template>
  <aside>
    <Logo />
    <ul>
      <li>
        <nuxt-link to="/">
          <AntdIcon type="pie-chart-o" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/books">
          <AntdIcon type="table-o" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/users">
          <AntdIcon type="user-o" />
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import Logo from '~/components/atoms/logo'

export default {
  components: {
    Logo
  }
}
</script>
