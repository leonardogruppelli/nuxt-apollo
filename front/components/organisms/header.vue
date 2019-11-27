<template>
  <header class="header">
    <div class="header__logo">
      <Logo />
    </div>
    <div class="header__button">
      <Button />
    </div>
    <div class="header__breadcrumb">
      <Breadcrumb />
    </div>
    <div class="header__user">
      <User />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/atoms/logo'
import Button from '~/components/atoms/sidebar-button'
import Breadcrumb from '~/components/atoms/breadcrumb'
import User from '~/components/molecules/user'

export default {
  components: {
    Logo,
    Button,
    Breadcrumb,
    User
  }
}
</script>
