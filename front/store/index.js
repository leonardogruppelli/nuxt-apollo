import Cookies from 'universal-cookie'

export const state = () => ({
  user: [],
  sidebar: false
})

export const mutations = {
  SET_USER(state, data) {
    state.user = data
  },
  SET_SIDEBAR(state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const cookies = new Cookies(req && req.headers.cookie)
    const user = cookies.get('user')

    if (user) dispatch('setUser', user)
  },
  setUser({ commit }, data) {
    commit('SET_USER', data)
  },
  setSidebar({ commit }) {
    commit('SET_SIDEBAR')
  }
}

export const getters = {
  user: state => state.user,
  sidebar: state => state.sidebar
}
