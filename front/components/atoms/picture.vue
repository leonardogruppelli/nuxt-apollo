<template>
  <picture>
    <img :src="src" :alt="alt">
  </picture>
</template>

<script>
export default {
  props: ["src", "alt"]
}
</script>