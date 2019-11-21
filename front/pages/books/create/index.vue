<template>
  <div>
    <ValidationObserver ref="observer" tag="form" @submit.prevent="create">
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

      <ValidationProvider v-slot="{ classes, errors }" rules="required" slim>
        <div class="control" :class="classes">
          <label>writer</label>
          <div class="control__input">
            <input v-model="form.writer.id" type="text" />
          </div>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <button class="btn bg-green">Add</button>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { CREATE } from '~/apollo/mutations/books'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
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
  methods: {
    async create() {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: CREATE,
          variables: {
            data: this.form
          }
        })

        if (data) {
          alert('success')
        }
      } catch (error) {
        console.log(error.response)
      }
    }
  }
}
</script>
