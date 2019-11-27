<template>
  <div>
    <ValidationObserver ref="observer" tag="form" @submit.prevent="update">
      <ValidationProvider v-slot="{ classes, errors }" rules="required" slim>
        <div class="control" :class="classes">
          <label>title</label>
          <div class="control__input">
            <input v-model="form.title" type="text" />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <ValidationProvider v-slot="{ classes, errors }" rules="required" slim>
        <div class="control" :class="classes">
          <label>isbn</label>
          <div class="control__input">
            <input v-model.number="form.isbn" type="number" />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <ValidationProvider v-slot="{ classes, errors }" rules="required" slim>
        <div class="control" :class="classes">
          <label>publication date</label>
          <div class="control__input">
            <input v-model="form.publicationDate" type="text" />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <button class="btn bg-yellow">Update</button>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { GET } from '~/apollo/queries/books'
import { UPDATE } from '~/apollo/mutations/books'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      id: null,
      form: {
        title: '',
        isbn: null,
        publicationDate: '',
        writer: {
          id: ''
        }
      }
    }
  },
  apollo: {
    getBook: {
      query: GET,
      prefetch: true,
      variables() {
        return {
          id: this.id
        }
      },
      update(data) {
        return (this.form = data.getBook)
      }
    }
  },
  asyncData({ params }) {
    return {
      id: params.id
    }
  },
  methods: {
    async update() {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: UPDATE,
          variables: {
            id: this.id,
            data: this.form
          }
        })

        if (data) {
          alert('success')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
