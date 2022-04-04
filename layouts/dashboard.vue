<template>
  <div>
    <!-- <v-idle :duration="300" @idle="onidle" /> -->
    <div class="wrapper">
            <nav id="sidebar" class="sidebar shadow-sm">
              <h4 class="text-center">Categories</h4>
                <nav class="sidenav">
                    <nuxt-link to="/"> General</nuxt-link>
                    <nuxt-link v-if="this.$auth.loggedIn" to="/"> Homepage</nuxt-link>
                    <nuxt-link v-if="this.$auth.loggedIn" to="/dashboard"> Dashboard</nuxt-link>
                    <nuxt-link @click.native="logout" v-if="this.$auth.loggedIn"  to="#"> Logout</nuxt-link>
                </nav>
            </nav>
            <div class="main shadow-sm">
              <i @click="showSidebar" id="open-btn" class="open-btn navbar-brand bi-filter-left mb-3" style="font-size:30px"></i>
              <Nuxt />
            </div>
        </div>
        <div @click="closeSidebar" id="overlay" class="overlay"></div>
  </div>
</template>

<script>

  export default {

  methods: {
    showSidebar() {
      window.document.getElementById('sidebar').style.left = '0';
      window.document.getElementById('overlay').classList.add('active');
    },

    closeSidebar() {
      window.document.getElementById('sidebar').style.left = '-280px';
      window.document.getElementById('overlay').classList.remove('active');
    },

    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>
