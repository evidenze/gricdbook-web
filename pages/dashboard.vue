<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mr-auto ml-auto">

    <div v-if="$fetchState.pending" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
    <div class="mt-5">
      <div v-if="!books.length">
      <p class="text-secondary text-center pt-5">No books yet</p><br>
      <p class="text-center"><button class="btn btn-success" @click="showBookModal">Add book</button></p>
      </div>

      <div v-else class="card shadow-sm mt-5">
        <p><button class="btn btn-success" @click="showBookModal">Add book</button></p>
        <div class="table-responsive mt-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Published</th>
                <th scope="col">Author</th>
                <th scope="col">Publisher</th>
                <th scope="col">ISBN</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <td>{{ book.title }}</td>
                <td>{{ book.published }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.publisher }}</td>
                <td>{{ book.isbn }}</td>
                <td>{{ book.category }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <modal name="book-modal" height="auto" :scrollable="true" :shiftY="1.0">
                <div class="container p-4">

                  <p class="font-weight-bold pb-3 pt-3">Add new book</p>
                    <form @submit.prevent="submit">
                      <div class="form-group row">
                      <div class="col-md-12">
                        <label>Title</label>
                        <input type="text" v-model="book.title" class="auth-input form-control" required autocomplete="off">
                    </div>
                    </div>

                     <div class="form-group row">
                      <div class="col-md-12">
                        <label>Author</label>
                        <input type="text" v-model="book.author" class="auth-input form-control" required autocomplete="off">
                    </div>
                    </div>

                     <div class="form-group row">
                      <div class="col-md-12">
                        <label>Publisher</label>
                        <input type="text" v-model="book.publisher" class="auth-input form-control" required autocomplete="off">
                    </div>
                    </div>

                     <div class="form-group row">
                      <div class="col-md-12">
                        <label>Year Published</label>
                        <input type="number" v-model="book.published" class="auth-input form-control" required autocomplete="off">
                    </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-md-12">
                        <label>Short Description</label>
                        <textarea role="5" type="text" v-model="book.description" class="auth-input form-control" required autocomplete="off"></textarea>
                    </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-md-12">
                        <label>ISBN</label>
                        <input type="text" v-model="book.isbn" class="auth-input form-control" required autocomplete="off">
                    </div>
                    </div>

                     <div class="form-group row">
                      <div class="col-md-12">
                          <label>Category</label>
                         <select class="custom-select" required v-model="book.category">
                            <option selected value="">Choose category...</option>
                            <option value="General">General</option>
                            <option value="Fiction">Fiction</option>
                        </select>
                    </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-md-12">
                        <label>Book cover</label>
                        <input ref="image" @change="uploadImage" type="file" class="auth-input form-control" required autocomplete="off">
                    </div>
                    </div>

                    <div class="form-group row mb-0 mt-3">
                      <div class="col-md-12">
                        <button id="submit-button" data-style="slide-right" type="submit" class="ladda-button btn btn-dark btn-block">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
            </modal>
    </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import * as Ladda from 'ladda';

  export default {
    layout: 'dashboard',
      data() {
        return {
          books: [],
          book: {
            title: '',
            description: '',
            published: '',
            publisher: '',
            category: '',
            author: '',
            image: '',
            isbn: '',
          }
        }
    },

    async fetch() {
      let books = await this.$axios.get(this.$config.apiURL+'/v1/books');
      this.books = books.data.data.results;
    },

      methods: {
        showBookModal() {
          this.$modal.show('book-modal');
        },

         uploadImage() {
        this.book.image = this.$refs.image.files[0];
      },

       async submit() {
        const formData = new FormData();
        formData.append('image', this.book.image);
        formData.append('publisher', this.book.publisher);
        formData.append('category', this.book.category);
        formData.append('isbn', this.book.isbn);
        formData.append('author', this.book.author);
        formData.append('description', this.book.description);
        formData.append('title', this.book.title);
        formData.append('published', this.book.published);

        var l = Ladda.create(document.querySelector('#submit-button'));
          l.start();
          try {
          let response = await this.$axios.$post(this.$config.apiURL+'/v1/books', formData);
            if (response) {
              l.stop();
              this.$toast.success(response.message);
              this.$modal.hide('book-modal');
              this.$nuxt.refresh();
            }
        } catch (e) {
          l.stop();
          if(e.response.status == 422) {
            for (let item in e.response.data.errors) {
              this.$toast.error(e.response.data.errors[item]);
            }
          }
          if(e.response.status == 400 || e.response.status == 500 || e.response.status == 401) {
            this.$toast.error(e.response.data.message);
          }
        }
      },

      }
}
</script>

<style scoped>

</style>
