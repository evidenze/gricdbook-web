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
    <div class="mt-2">
      <div v-if="!books.length">
      <p class="text-secondary text-center pt-5">No books yet. Sign in to add books.</p>
      </div>

      <div v-else>
        <p class="pb-3 font-weight-bold">Showing {{ books.length }} result(s)</p>
        <div class="row">
          <div v-for="book in books" :key="book.id" class="col-md-4 mb-3">
            <div class="card shadow-sm p-4 h-100">
              <img class="mx-auto d-block mb-3 rounded" style="width:100%" :src="`${ $config.apiURL }/${book.image}`">
              <h4 class="font-weight-bold">{{ book.title }}</h4>
              <p class="text-secondary">{{ book.author }}</p>
              <p class="text-secondary">{{ book.published }}</p>
            </div>
          </div>
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
      let books = await this.$axios.get(this.$config.apiURL+'/v1/books');
      this.books = books.data.data.results;
    },
}
</script>

<style scoped>

</style>
