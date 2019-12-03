import Cookies from 'universal-cookie'

export default function({ app, req, store, route, redirect }) {
  const cookies = new Cookies(req && req.headers.cookie)
  const token = app.$apolloHelpers.getToken()
  const user = cookies.get('user')

  store.dispatch('close')

  if (!token || !user) {
    app.$apolloHelpers.onLogout()
    return
  }

  if (!token && route.name != 'authentication') {
    redirect('/authentication')
    return
  }

  if (token && route.name == 'authentication') {
    redirect('/')
    return
  }
}
