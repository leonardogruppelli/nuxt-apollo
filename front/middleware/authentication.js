export default function ({ app, route, redirect }) {
  const token = app.$apolloHelpers.getToken()

  if (!token && route.name != "login") {
    redirect("/login")
  }
}