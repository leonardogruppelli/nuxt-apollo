<template>
  <div>
    <Cards :cards="cards" />
  </div>
</template>

<script>
import Cards from '~/components/organisms/cards'

export default {
  components: {
    Cards
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          icon: 'calendar-o',
          title: 'books',
          text: '279',
          color: 'c-golden'
        },
        {
          id: 2,
          icon: 'bar-chart-o',
          title: 'things',
          text: '64',
          color: 'c-blue'
        },
        {
          id: 3,
          icon: 'user-o',
          title: 'users',
          text: '13',
          color: 'c-green'
        },
        {
          id: 4,
          icon: 'check-o',
          title: 'contracts',
          text: '98',
          color: 'c-purple'
        }
      ]
    }
  }
}
</script>
