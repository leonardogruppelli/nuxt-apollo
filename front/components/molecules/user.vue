<template>
  <div class="user">
    <div class="user__name">
      <p>{{ name }} 
        <span><AntdIcon type="caret-down-fill" /></span>
      </p>
    </div>
    <ul class="user__controls">
      <li class="info">
        <div class="user__controls__info">
          <p>{{ user.email }}</p>
          <span>{{ user.role }}</span>
        </div>

        <div class="user__controls__image">
          <Picture
            class="round"
            src="https://via.placeholder.com/50"
            alt="User"
          />
        </div>
      </li>
      <li>
        <button class="btn btn--full btn--has-icon-right c-blue" @click="logout">
          Profile <AntdIcon type="user-o" />
        </button>
      </li>
      <li>
        <button class="btn btn--full btn--has-icon-right c-red" @click="logout">
          Logout <AntdIcon type="logout-o" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Picture from '~/components/atoms/picture'
import Cookies from 'universal-cookie'
import { mapGetters } from 'vuex'

export default {
  components: {
    Picture
  },
  computed: {
    ...mapGetters(['user']),
    name() {
      return `${this.user.firstname} ${this.user.lastname}`
    }
  },
  methods: {
    async logout() {
      const cookies = new Cookies()

      await this.$apolloHelpers.onLogout()

      cookies.remove('user')

      this.$router.push({
        path: '/authentication'
      })
    }
  }
}
</script>
