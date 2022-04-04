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
            <div style="cursor:pointer" class="card shadow-sm p-4 h-100" @click="showDetailsModal(book.id)">
              <img class="mx-auto d-block mb-3 rounded" style="width:100%" :src="`${ $config.apiURL }/${book.image}`">
              <h4 class="font-weight-bold">{{ book.title }}</h4>
              <p class="text-secondary">{{ book.author }}</p>
              <p class="text-secondary">{{ book.published }}</p>
            </div>

            <modal :name="`details-modal${book.id}`" height="auto" :shiftX="1.0" :scrollable="true" :shiftY="1.0">
              <div class="bg-light p-4">
                <h4>{{ book.title }}</h4>
              </div>
                <div class="container p-5">
                  <img class="mx-auto d-block mb-3 rounded" style="width:50%" :src="`${ $config.apiURL }/${book.image}`"><br>
                  <small class="text-secondary">{{ book.description }}</small><br>
                  <p class="pb-2 mt-5">Author: <span class="badge badge-info">{{ book.author }}</span></p>
                  <p class="pb-2">Published: <span class="badge badge-info">{{ book.published }}</span></p>
                  <p class="pb-2">Publisher: <span class="badge badge-info">{{ book.publisher }}</span></p>
                  <p>ISBN: <span class="badge badge-info">{{ book.isbn }}</span></p>
                </div>
            </modal>
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
    auth: false,
      data() {
        return {
          books: [],
        }
    },

    async fetch() {
      let books = await this.$axios.get(this.$config.apiURL+'/v1/books');
      this.books = books.data.data.results;
    },

    methods: {
        showDetailsModal(id) {
          this.$modal.show('details-modal'+id);
        },
      },
}
</script>

<style scoped>

</style>
