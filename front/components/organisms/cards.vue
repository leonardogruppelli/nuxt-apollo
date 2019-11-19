<template>
  <div class="cards">
    <ul>
      <li v-for="card in cards" :key="card.id">
        <Card :icon="card.icon" :title="card.title" :text="card.text" :color="card.color" />
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '~/components/molecules/card'

export default {
  components: {
    Card,
  },
  props: ["cards"]
}
</script>