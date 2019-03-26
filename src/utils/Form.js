import Errors from './Errors'
import axios from 'axios'

export default class {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
  constructor (data) {
    this.originalData = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
    this.submitting = false
    this.disable = true
  }

    /**
     * Fetch all relevant data for the form.
     */
  data () {
    let data = {}

    for (let property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }

    /**
     * Reset the form fields.
     */
  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }
    this.submitting = false

    this.errors.clear()
  }

    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
  post (url) {
    return this.submit('post', url)
  }

    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
  put (url) {
    return this.submit('put', url)
  }

    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
  patch (url) {
    return this.submit('patch', url)
  }

    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
  delete (url) {
    return this.submit('delete', url)
  }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
  submit (requestType, url) {
    this.submitting = true
    return new Promise((resolve, reject) => {
      axios[requestType](url, this.data())
                .then(response => {
                  this.onSuccess(response.data)
                  resolve(response.data)
                })
                .catch(error => {
                  if (error.response) {
                    this.onFail(error.response.data)
                    reject(error.response.data)
                  }
                  else {
                    this.onFail({message: 'someting went wrong'})
                  }
                })
    })
  }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
  onSuccess (data) {
        // alert(data.message); // temporary
    console.log('biuygiuygiuygiuyiu')

    this.disable = true
  }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
  onFail (errors) {
    console.log(this.errors, 'reeeeeee')

    this.errors.record(errors)
    this.submitting = false
    this.disable = false
  }
        /**

            stylish submit buttons
        **/
  onSubmitting () {
    return this.submitting
  }

    /**
        this is used to disable button, to give indecation that the form submiited
    */
  disabled () {
    return this.disable
  }

    /**

    */
  typing (filed) {
        // clear errors
        // allow submiting
    this.disable = false
    // this.errors.clear(filed)
  }
  changed (filed) {
    console.log('hhhhh')
  }
}
