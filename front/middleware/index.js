import Cookies from 'universal-cookie'

export default function({ app, req, store, route, redirect }) {
  const token = app.$apolloHelpers.getToken()
  const cookies = new Cookies(req && req.headers.cookie)

  store.dispatch('close')

  if (!token) {
    cookies.remove('user')
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
