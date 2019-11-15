<template>
  <div>
    <Sidebar />
    <Container>
      <Header />
      <Content>
        <nuxt />
      </Content>
    </Container>
  </div>
</template>

<script>
import Header from '~/components/organisms/header'
import Sidebar from '~/components/organisms/sidebar'
import Container from '~/components/organisms/container'
import Content from '~/components/organisms/content'

export default {
  components: {
    Header,
    Sidebar,
    Container,
    Content
  }
}
</script>