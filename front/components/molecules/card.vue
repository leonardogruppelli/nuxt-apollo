<template>
  <div class="card" :class="color">
    <div class="card__icon">
      <AntdIcon :type="icon" />
    </div>
    <div class="card__content">
      <p>{{ title }}</p>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['icon', 'title', 'text', 'color']
}
</script>
