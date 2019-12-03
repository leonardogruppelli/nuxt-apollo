<template>
  <div class="dashboard">
    <Cards :cards="cards" />
    <Panels>
      <ul>
        <li>
          <Panel>
            <Activity class="chart" :data="activity" />
          </Panel>
        </li>
        <li>
          <Panel>
            <Users class="chart" :data="users" />
            <Users class="chart" :data="users" />
          </Panel>
        </li>
      </ul>
    </Panels>
  </div>
</template>

<script>
import Cards from '~/components/organisms/cards'
import Panels from '~/components/organisms/panels'
import Panel from '~/components/molecules/panel'
import Activity from '~/components/charts/line'
import Users from '~/components/charts/doughnut'

export default {
  components: {
    Cards,
    Panels,
    Panel,
    Activity,
    Users
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
  },
  asyncData() {
    const colors =  []

    for (var i = 0; i <= 6; i++) {
      colors.push(`rgba(164, 255, 255, ${1 - (i * 0.1)})`)
    }

    return {
      activity: {
        labels: ['opa', 'teste', 'lorem', 'lala', 'ipsum', 'vue', 'nuxt'],
        datasets: [
          {
            label: 'Nuxt.js Commit Activity',
            backgroundColor: 'transparent',
            borderColor: '#A4FFFF',
            lineTension: 0,
            data: ['1', '1.2', '1.1', '1.3', '1.3', '1.2', '1.4']
          }
        ]
      },
      users: {
        labels: ['opa', 'teste', 'lorem', 'lala', 'ipsum', 'vue', 'nuxt'],
        datasets: [
          {
            label: 'Nuxt.js Commit Activity',
            backgroundColor: colors,
            borderWidth: 0,
            data: ['1', '2', '1', '3', '3', '2', '4']
          }
        ]
      }
    }
  }
}
</script>
