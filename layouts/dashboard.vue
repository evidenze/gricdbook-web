<template>
  <div>
    <!-- <v-idle :duration="300" @idle="onidle" /> -->
    <div class="wrapper">
            <nav id="sidebar" class="sidebar shadow-sm">

                <nav class="sidenav">
                    <nuxt-link to="/"> <i class="bi-speedometer2 side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Home</nuxt-link>
                    <nuxt-link to="/dashboard"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Profile</nuxt-link>
                    <nuxt-link to="/savings/list"> <i class="bi-piggy-bank side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Savings</nuxt-link>
                    <nuxt-link to="/bills"> <i class="bi-receipt side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Pay Bills</nuxt-link>
                    <nuxt-link to="/withdrawals"> <i class="bi-bank side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Transfers</nuxt-link>
                    <nuxt-link @click.native="logout"  to="#"> <i class="bi-box-arrow-right side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Logout</nuxt-link>
                </nav>
            </nav>
            <div class="main shadow-sm">
              <!-- <i @click="showSidebar" id="open-btn" class="open-btn navbar-brand bi-filter-left mb-3" style="font-size:30px"></i> -->
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
