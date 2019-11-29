<template>
  <main>
    <Breadcrumb />
    <slot />
  </main>
</template>

<script>
import Breadcrumb from '~/components/atoms/breadcrumb'

export default {
  components: {
    Breadcrumb
  }
}
</script>
