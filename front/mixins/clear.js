export default {
  methods: {
    clear(form) {
      Object.keys(form).forEach(key => {
        if (form[key] instanceof Object) {
          Object.keys(form[key]).forEach(_key => {
            if (form[key][_key] instanceof Object) {
              Object.keys(form[key][_key]).forEach(__key => {
                form[key][_key][__key] = null
              })
            } else {
              form[key][_key] = null
            }
          })
        } else {
          form[key] = null
        }
      })
    }
  }
}
