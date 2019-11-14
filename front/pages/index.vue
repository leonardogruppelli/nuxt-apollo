<template>
  <div class="container">
    <div>
      <h1 class="title">nuxt-apollo</h1>
    </div>
    <Modal></Modal>
    <ul>
      <li v-for="book in allBooks" :key="book.id">{{ book.title }}</li>
    </ul>
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import Modal from '~/components/molecules/modal'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { LIST } from '~/apollo/queries/books'
import { CREATED, UPDATED, DELETED } from '~/apollo/subscriptions/books'

export default {
  components: {
    Modal
  },
  apollo: {
    allBooks: {
      prefetch: true,
      query: LIST,
      subscribeToMore: [
        {
          document: CREATED,
          updateQuery: (previous, { subscriptionData }) => {
            return Object.assign({}, previous, {
              allBooks: [
                ...previous.allBooks,
                subscriptionData.data.onCreatedBook
              ]
            })
          }
        },
        {
          document: UPDATED
        },
        {
          document: DELETED,
          updateQuery: (previous, { subscriptionData }) => {
            return Object.assign({}, previous, {
              allBooks: [
                ...previous.allBooks.filter(
                  book => book.id != subscriptionData.data.onDeletedBook.id
                )
              ]
            })
          }
        }
      ]
    }
  },
  methods: {
    async create() {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: CREATE,
          variables: {
            email: email,
            password: password
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      await this.$apolloHelpers.onLogout()

      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>