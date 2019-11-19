export default function({ app, route, redirect }) {
  const token = app.$apolloHelpers.getToken()

  if (!token && route.name != 'authentication') {
    redirect('/authentication')
    return
  }

  if (token && route.name == 'authentication') {
    redirect('/')
    return
  }
}
