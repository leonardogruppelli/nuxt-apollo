<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in allBooks" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.genre }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { LIST } from '~/apollo/queries/books'
import { CREATED, UPDATED, DELETED } from '~/apollo/subscriptions/books'

export default {
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
    }
  }
}
</script>
