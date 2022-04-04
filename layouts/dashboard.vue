<template>
  <div>
    <!-- <v-idle :duration="300" @idle="onidle" /> -->
    <div class="wrapper">
            <nav id="sidebar" class="sidebar shadow-sm">
               <img v-if="$auth.user.profile_picture == null" src="/images/user.png" class="user-image d-block mx-auto mb-2 mt-3">
               <img v-else :src="`${ $config.apiURL }/storage/${$auth.user.profile_picture}`" class="user-image d-block mx-auto mb-2 mt-3">
              <p v-if="$auth.user.account_type == 'Church'" class="font-weight-bold text-center">{{ this.$auth.user.church_name }}</p>
              <p v-else class="font-weight-bold text-center">{{ this.$auth.user.firstname+" "+this.$auth.user.lastname }}</p>
                <nav v-if="$auth.user.account_type == 'Church'" class="sidenav">
                  <nuxt-link to="/dashboard"> <i class="bi-speedometer2 side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Home</nuxt-link>
                  <nuxt-link to="/church/wallets"> <i class="bi-wallet side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Wallets</nuxt-link>
                  <!-- <nuxt-link to="/dashboard"> <i class="bi-speedometer2 side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Staffs</nuxt-link>
                  <nuxt-link to="/dashboard"> <i class="bi-speedometer2 side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Transfers</nuxt-link>
                  <nuxt-link to="/dashboard"> <i class="bi-speedometer2 side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Store</nuxt-link> -->
                  <nuxt-link to="/withdrawals"> <i class="bi-bank side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Withdrawals</nuxt-link>
                  <nuxt-link to="/profile"> <i class="bi-sliders side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Settings</nuxt-link>
                  <nuxt-link @click.native="logout"  to="#"> <i class="bi-box-arrow-right side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Logout</nuxt-link>
                </nav>
                <nav v-else class="sidenav">
                    <nuxt-link to="/dashboard"> <i class="bi-speedometer2 side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Home</nuxt-link>
                    <nuxt-link to="/profile"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Profile</nuxt-link>
                    <nuxt-link to="/savings/list"> <i class="bi-piggy-bank side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Savings</nuxt-link>
                    <nuxt-link to="/bills"> <i class="bi-receipt side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Pay Bills</nuxt-link>
                    <nuxt-link to="/withdrawals"> <i class="bi-bank side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Transfers</nuxt-link>
                    <nuxt-link @click.native="logout"  to="#"> <i class="bi-box-arrow-right side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Logout</nuxt-link>

                    <div v-if="$auth.user.email == 'evidenzeekanem@gmail.com' || $auth.user.email == 'graceamahbs2@gmail.com' || $auth.user.email == 'iametefia@gmail.com' || $auth.user.email == 'conquerorsamson@gmail.com' || $auth.user.email == 'iamzoe4all@gmail.com' || $auth.user.email == 'udohblessing2159@gmail.com'">
                    <p class="mt-5 mb-2 font-weight-bold">Admin</p>
                    <nuxt-link to="/admin/overview"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Overview</nuxt-link>
                    <nuxt-link v-if="$auth.user.email == 'evidenzeekanem@gmail.com' || $auth.user.email == 'conquerorsamson@gmail.com'" to="/admin/revenue"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Revenue</nuxt-link>
                    <nuxt-link to="/admin/list/today"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Users</nuxt-link>
                    <nuxt-link to="/admin/transfers"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Transfers</nuxt-link>
                    <nuxt-link to="/admin/ajos"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Ajos</nuxt-link>
                    <nuxt-link to="/admin/airtimes"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Airtimes</nuxt-link>
                    <nuxt-link to="/admin/datas"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Data</nuxt-link>
                    <nuxt-link to="/admin/cards"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Virtual Cards</nuxt-link>
                    <nuxt-link to="/admin/portals"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Portals</nuxt-link>
                    <nuxt-link to="/admin/churches"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Churches</nuxt-link>
                    <nuxt-link to="/admin/regular-savings"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Regular Savings</nuxt-link>
                    <nuxt-link to="/admin/fixed-savings"> <i class="bi-person side"></i>&nbsp;&nbsp;&nbsp;&nbsp; Fixed Savings</nuxt-link>
                    </div>
                </nav>
            </nav>
            <div class="main shadow-sm">
              <!-- <i @click="showSidebar" id="open-btn" class="open-btn navbar-brand bi-filter-left mb-3" style="font-size:30px"></i> -->
              <Nuxt />
            </div>
             <div v-if="$auth.user.account_type == 'Church'" class="bottom-nav d-lg-none p-2 shadow-sm text-center">
                        <div class="row">
                            <div class="col">
                                <nuxt-link to="/dashboard" style="font-size:13px" class="main-link">
                                <i class="bi-house-door" style="font-size: 20px"></i><br>
                                Home
                                </nuxt-link>
                            </div>
                            <div class="col">
                                <nuxt-link to="/church/wallets" style="font-size:13px" class="main-link">
                                <i class="bi-piggy-bank" style="font-size: 20px"></i><br>
                                Wallets
                                </nuxt-link>
                            </div>
                            <div class="col">
                                <nuxt-link to="/dashboard" style="font-size:13px" class="main-link">
                                <i class="bi-receipt" style="font-size: 20px"></i><br>
                                Store
                                </nuxt-link>
                            </div>
                            <div class="col">
                            <nuxt-link to="/withdrawals" style="font-size:13px" class="main-link">
                            <i class="bi-bank" style="font-size: 20px"></i><br>
                              Withdrawals
                            </nuxt-link>
                            </div>
                            <div class="col">
                            <nuxt-link to="/profile" style="font-size:13px" class="main-link">
                            <i class="bi-person" style="font-size: 20px"></i><br>
                              Profile
                            </nuxt-link>
                            </div>
                        </div>
                    </div>
             <div v-else class="bottom-nav d-lg-none p-2 shadow-sm text-center">
                        <div class="row">
                            <div class="col">
                                <nuxt-link to="/dashboard" style="font-size:13px" class="main-link">
                                <i class="bi-house-door" style="font-size: 20px"></i><br>
                                Home
                                </nuxt-link>
                            </div>
                            <div class="col">
                                <nuxt-link to="/savings/list" style="font-size:13px" class="main-link">
                                <i class="bi-piggy-bank" style="font-size: 20px"></i><br>
                                Savings
                                </nuxt-link>
                            </div>
                            <div class="col">
                                <nuxt-link to="/bills" style="font-size:13px" class="main-link">
                                <i class="bi-receipt" style="font-size: 20px"></i><br>
                                Bills
                                </nuxt-link>
                            </div>
                            <div class="col">
                            <nuxt-link to="/withdrawals" style="font-size:13px" class="main-link">
                            <i class="bi-bank" style="font-size: 20px"></i><br>
                              Transfers
                            </nuxt-link>
                            </div>
                            <div class="col">
                            <nuxt-link to="/profile" style="font-size:13px" class="main-link">
                            <i class="bi-person" style="font-size: 20px"></i><br>
                              Profile
                            </nuxt-link>
                            </div>
                        </div>
                    </div>
        </div>
        <div @click="closeSidebar" id="overlay" class="overlay"></div>
  </div>
</template>

// <script>
//   function initFreshChat() {
//     window.fcWidget.init({
//       token: "6f913c61-ac50-4bf4-b391-b822fefef69b",
//       host: "https://wchat.freshchat.com"
//     });
//   }
//   function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src="https://wchat.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,"Freshdesk Messaging-js-sdk")}window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);
// </script>
<script>

  export default {

    // mounted() {
    //    this.$nextTick(function () {
    //     var _this = this;
    //         window.addEventListener('beforeunload', function (e) {
    //           e.preventDefault();
    //           _this.logout();
    //       });
    //   })
    // },

  methods: {
    showSidebar() {
      window.document.getElementById('sidebar').style.left = '0';
      window.document.getElementById('overlay').classList.add('active');
    },

    closeSidebar() {
      window.document.getElementById('sidebar').style.left = '-280px';
      window.document.getElementById('overlay').classList.remove('active');
    },

    async onidle() {
      await this.$auth.logout();
      this.$router.push('/login')
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
.user-image{
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
}


.showDetails{
  cursor: pointer;
}

.details {
  background: #fafafa ;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 20px;
  left: 20px;
}

.client_icon{
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: cover;
}

.details_dropdown {
  width: 100%;
  background: #fff;
  display: none;
}

.details_dropdown a {
 display: block;
 padding-top: 15px;
 text-decoration: none;
}

p{
  font-size: 15px;
}

.bottom-nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    margin-top: 10px;
}
</style>
