<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mr-auto ml-auto">
         <div class="d-flex justify-content-between mt-3">
        <p class="pb-3"><i @click="$nuxt.refresh()" class="bi-arrow-clockwise" style="font-size:20px;cursor:pointer"></i></p>
        </div>
    <div v-if="$fetchState.pending" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
    <div class="mt-2">
      <div v-if="!books.length">
      <p class="text-secondary text-center pt-5">No books yet</p>
      </div>

      <div v-else class="card shadow-sm">
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
    </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'dashboard',
    auth: 'guest',
      data() {
        return {
          books: [],
        }
    },

    async fetch() {
      let books = await this.$axios.get(this.$config.apiURL+'/books');
      this.books = books.data.data;
    },
}
</script>

<style scoped>

</style>
