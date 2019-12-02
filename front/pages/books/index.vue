<template>
  <div>
    <h1 class="c-green-light">Books</h1>
    <button class="btn btn--table c-blue" @click="modal.create = true">
      <AntdIcon type="plus-o" />
    </button>
    <div class="table__wrapper">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>

        <transition-group name="table-row" tag="tbody">
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.genre }}</td>
            <td class="actions">
              <AntdIcon
                type="edit-o"
                class="edit"
                @click.native="update(book.id)"
              />
              <AntdIcon
                type="delete-o"
                class="delete"
                @click.native="remove(book.id)"
              />
            </td>
          </tr>
        </transition-group>
      </table>
    </div>

    <Modal v-if="modal.create" title="Create Book" @close="close('create')">
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

          <button class="btn c-blue">Add</button>
        </ValidationObserver>
      </div>
    </Modal>

    <Modal v-if="modal.update" title="Update Book" @close="close('update')">
      <div>
        <ValidationObserver ref="update" tag="form" @submit.prevent="update">
          <ValidationProvider
            v-slot="{ classes, errors }"
            rules="required"
            slim
          >
            <div class="control" :class="classes">
              <label>title</label>
              <div class="control__input">
                <input v-model="form.update.title" type="text" />
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
                <input v-model.number="form.update.isbn" type="number" />
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
                <input v-model="form.update.publicationDate" type="text" />
              </div>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <button class="btn c-golden">Update</button>
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
      id: null,
      form: {
        create: {
          title: null,
          isbn: null,
          publicationDate: null,
          writer: {
            id: null
          }
        },
        update: {
          title: null,
          isbn: null,
          publicationDate: null
        }
      },
      modal: {
        create: false,
        update: false
      }
    }
  },
  computed: {
    books() {
      return this.allBooks
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
            let result = {
              allBooks: [...previous.allBooks]
            }

            result.allBooks.push(subscriptionData.data.onCreatedBook)

            return result
          }
        },
        {
          document: UPDATED,
          updateQuery: (previous, { subscriptionData }) => {
            let result = {
              allBooks: [...previous.allBooks]
            }

            result.allBooks[
              result.allBooks.findIndex(
                book => book.id == subscriptionData.data.onUpdatedBook.id
              )
            ] = subscriptionData.data.onUpdatedBook

            return result
          }
        },
        {
          document: DELETED,
          updateQuery: (previous, { subscriptionData }) => {
            let result = {
              allBooks: [...previous.allBooks]
            }

            result.allBooks = result.allBooks.filter(
              book => book.id != subscriptionData.data.onDeletedBook.id
            )

            return result
          }
        }
      ]
    }
  },
  mixins: [clear],
  methods: {
    async create() {
      const valid = await this.$refs.create.validate()

      if (!valid) return

      try {
        const { data } = await this.$apollo.mutate({
          mutation: CREATE,
          variables: {
            data: this.form.create
          }
        })

        if (data) {
          this.close('create')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async update(id) {
      if (id % 1 == 0) {
        this.id = id

        try {
          const book = this.books.find(book => {
            return book.id == id
          })

          Object.keys(book).forEach(key =>
            key in this.form.update ? (this.form.update[key] = book[key]) : null
          )

          this.modal.update = true
        } catch (error) {
          console.log(error)
        }

        return
      }

      const valid = await this.$refs.update.validate()

      if (!valid) return

      try {
        const { data } = await this.$apollo.mutate({
          mutation: UPDATE,
          variables: {
            id: this.id,
            data: this.form.update
          }
        })

        if (data) {
          this.close('update')
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
    },
    close(modal) {
      this.modal[modal] = false
      this.clear(this.form[modal])
    }
  }
}
</script>
