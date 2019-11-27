<template>
  <div>
    <h1 class="c-green-light">Books</h1>
    <button class="btn btn--icon c-blue" @click="modal.create = !modal.create">
      <AntdIcon type="plus-o" />
    </button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>

      <transition-group name="table-row" tag="tbody">
        <tr v-for="book in allBooks" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.genre }}</td>
          <td class="actions">
            <nuxt-link
              :to="{ name: 'books-update-id', params: { id: book.id } }"
            >
              <AntdIcon type="edit-o" class="edit" />
            </nuxt-link>
            <AntdIcon
              type="delete-o"
              class="delete"
              @click.native="remove(book.id)"
            />
          </td>
        </tr>
      </transition-group>
    </table>

    <Modal
      v-if="modal.create"
      title="Create Book"
      @close=";[(modal.create = false), clear(form.create)]"
    >
      <div>
        <ValidationObserver ref="create" tag="form" @submit.prevent="create">
          <ValidationProvider
            v-slot="{ classes, errors }"
            rules="required"
            slim
          >
            <div class="control" :class="classes">
              <label>title</label>
              <div class="control__input">
                <input v-model="form.create.title" type="text" />
              </div>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ classes, errors }"
            rules="required"
            slim
          >
            <div class="control" :class="classes">
              <label>isbn</label>
              <div class="control__input">
                <input v-model.number="form.create.isbn" type="number" />
              </div>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ classes, errors }"
            rules="required"
            slim
          >
            <div class="control" :class="classes">
              <label>publication date</label>
              <div class="control__input">
                <input v-model="form.create.publicationDate" type="text" />
              </div>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ classes, errors }"
            rules="required"
            slim
          >
            <div class="control" :class="classes">
              <label>writer</label>
              <div class="control__input">
                <input v-model="form.create.writer.id" type="text" />
              </div>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <button class="btn bg-green">Add</button>
        </ValidationObserver>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '~/components/molecules/modal'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { LIST } from '~/apollo/queries/books'
import { CREATE, UPDATE, DELETE } from '~/apollo/mutations/books'
import { CREATED, UPDATED, DELETED } from '~/apollo/subscriptions/books'
import clear from '~/mixins/clear'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Modal
  },
  data() {
    return {
      form: {
        create: {
          title: null,
          isbn: null,
          publicationDate: null,
          writer: {
            id: null
          }
        }
      },
      modal: {
        create: false,
        update: false
      }
    }
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
  mixins: [clear],
  methods: {
    async create() {
      const valid = await this.$refs.observer.validate()

      if (!valid) return

      try {
        const { data } = await this.$apollo.mutate({
          mutation: CREATE,
          variables: {
            data: this.form.create
          }
        })

        if (data) {
          alert('success')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async remove(id) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: DELETE,
          variables: {
            id: id
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
