<template>
  <div class="modal__wrapper">
    <div class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2>{{ title }}</h2>
          <button class="modal__close" @click="close">
            Close <AntdIcon type="close-o" />
          </button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
        <div class="modal__footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
