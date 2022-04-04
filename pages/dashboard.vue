<template>
<div>
  <div v-if="$auth.user.account_type == 'Church'" class="mt-4">
    <div class="container">
      <h4 class="font-weight-bold m-0">Hi, {{ this.$auth.user.church_name }}</h4>
      <small class="text-secondary">Welcome</small>

      <div class="row mt-4">
        <div class="col-md-3 mb-3 mb-lg-0">
          <div class="card p-3 shadow-sm">
            <p class="pb-2">Main Wallet Balance</p>
            <h4>&#8358;{{ Intl.NumberFormat().format(this.$auth.user.wallet_balance) }}</h4>
          </div>
        </div>
        <div class="col-md-3 mb-3 mb-lg-0">
          <div class="card p-3 shadow-sm">
            <p class="pb-2">Total Sub Wallets</p>
            <h4>{{ wallets }}</h4>
            <h4 v-if="$fetchState.pending">Loading...</h4>
          </div>
        </div>
      </div>

      <div class="mt-5 mb-5">
      <div class="d-flex justify-content-between">
      <p class="mb-3 font-weight-bold">Recent transactions</p>
      <nuxt-link to="/transactions" class="font-weight-bold main-link">See all <i class="bi-arrow-right"></i></nuxt-link>
      </div>
      <div v-if="!transactions" class="card shadow-sm">
      <p class="text-center">No transactions yet</p>
      </div>

      <div v-else class="card shadow-sm">
      <div class="list-group list-group-flush p-0">
        <a v-for="transaction in transactions" :key="transaction.id" href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <div class="d-flex">
              <div class="mr-3 align-self-center">
                <div v-if="transaction.type == 'Debit'" class="debit text-center">
                  <i class="bi-arrow-up-right"></i>
                </div>
                <div v-else class="credit text-center">
                  <i class="bi-arrow-down-left"></i>
                </div>
              </div>
              <div>
              <small class="font-weight-bold">{{ transaction.description }}</small><br>
              <small class="text-secondary" v-text="$moment(transaction.created_at).format('llll')"></small>
              </div>
            </div>
            <small v-if="transaction.type == 'Debit'" class="mb-1 font-weight-bold text-danger align-self-center">{{ transaction.currency == 'USD' ? '$': '&#8358;'}}{{ Intl.NumberFormat().format(transaction.amount) }}</small>
            <small v-if="transaction.type == 'Credit'" class="mb-1 font-weight-bold text-success align-self-center">{{ transaction.currency == 'USD' ? '$': '&#8358;'}}{{ Intl.NumberFormat().format(transaction.amount) }}</small>
          </div>
        </a>
      </div>
      </div>
    </div>
    </div>
  </div>

  <div v-else>
  <div class="bal_div p-4 p-lg-5">
     <div class="d-flex justify-content-between mt-2">
          <div>
            <h4 class="font-weight-bold m-0">Hi, {{ this.$auth.user.firstname }} &#128522;</h4>
            <small class="" style="color:#eaeaea">Welcome</small>
          </div>
          <div class="align-self-center">
            <nuxt-link to="/profile">
             <img v-if="$auth.user.profile_picture == null" src="/images/user.png" class="user-image d-block mx-auto">
              <img v-else :src="`${ $config.apiURL }/storage/${$auth.user.profile_picture}`" class="user-image d-block mx-auto">
            </nuxt-link>
          </div>
        </div>

        <div class="text-center mt-5 mr-auto ml-auto pl-4 pr-4">
          <VueSlickCarousel :arrows="true" :dots="true">
            <div>
              <p class="primary-white">Naira balance</p>
              <div class="">
                <div>
                  <small class="font-weight-bold pt-2">&#8358;<span class="money-text">{{ Intl.NumberFormat().format(this.$auth.user.wallet_balance) }}</span> &nbsp;&nbsp;<i @click="$nuxt.refresh()" class="bi-arrow-clockwise" style="font-size:20px;cursor:pointer"></i></small>
                </div>
                <div class="mt-3">
                  <nuxt-link class="btn fund-btn font-weight-bold mt-3" to="/fund-wallet">Fund</nuxt-link>&nbsp;
                  <nuxt-link class="btn fund-btn font-weight-bold mt-3" to="/wallet">View</nuxt-link>
                </div>
              </div>
              </div>
              <div>
              <p class="primary-white">Dollar balance</p>
              <div class="">
                <div>
                  <small class="font-weight-bold pt-2">&#36;<span class="money-text">{{ Intl.NumberFormat().format(this.$auth.user.dollar_balance) }}</span></small>
                </div>
                <div class="mt-3">
                  <nuxt-link class="btn fund-btn font-weight-bold mt-3" to="/fund-dollar-wallet">Fund</nuxt-link>&nbsp;
                  <nuxt-link class="btn fund-btn font-weight-bold mt-3" to="/wallet">View</nuxt-link>
                </div>
              </div>
              </div>
            </VueSlickCarousel>
        </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mr-auto ml-auto">

        <div v-if="$auth.user.address == null" class="alert alert-warning text-center">
          Please complete your account info. <nuxt-link class="font-weight-bold" to="/profile">Click here</nuxt-link>
        </div>
        <!-- <div class="d-flex justify-content-between mt-4">
          <div>
            <h4 class="font-weight-bold m-0">Hi, {{ this.$auth.user.firstname }} &#128522;</h4>
            <small class="text-secondary">ID: {{ this.$auth.user.phone_number }}</small>
          </div>
          <div class="align-self-center">
            <nuxt-link to="/profile">
             <img v-if="$auth.user.profile_picture == null" src="/images/user.png" class="user-image d-block mx-auto">
              <img v-else :src="`${ $config.apiURL }/storage/${$auth.user.profile_picture}`" class="user-image d-block mx-auto">
            </nuxt-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="balance_div p-4 p-lg-5 mt-2">
              <p class="primary-white">Wallet balance</p>
              <div class="">
                <div>
                  <small class="font-weight-bold pt-2">&#8358;<span class="money-text">{{ Intl.NumberFormat().format(+this.$auth.user.wallet_balance + +this.$auth.user.virtual_balance) }}</span></small>
                </div>
                <div>
                  <nuxt-link class="btn fund-btn font-weight-bold mt-3" to="wallet">View</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div> -->

    <div class="mt-3 mt-lg-5 mb-3">
    <div class="row">
        <div class="col-6 mb-3">
            <nuxt-link to="/savings/list" class="main-link">
            <div class="card payout-card p-3 p-lg-4 h-100">
                <i class="bi-piggy-bank" style="color: #ffc837;font-size:30px;"></i>
                <p class="font-weight-bold pt-3 dark-text">Savings</p>
                <p class="second-text text-secondary">Create a regular or fixed savings plan.</p>
            </div>
            </nuxt-link>
        </div>
        <div class="col-6 mb-3">
            <nuxt-link to="savings/ajo" class="main-link">
            <div class="card airtime-card p-3 p-lg-4 h-100">
                <i class="bi-people" style="color: #06B6D4;font-size:30px;"></i>
                <p class="font-weight-bold pt-3 dark-text">Ajo</p>
                <p class="second-text text-secondary">Create or join an active Ajo savings.</p>
            </div>
            </nuxt-link>
        </div>
    </div>

    <div class="row mt-2">
        <div class="col-6 mb-3">
            <nuxt-link to="/cards" class="main-link">
            <div class="card data-card p-3 p-lg-4 h-100">
                <i class="bi-card-checklist" style="color: #4ADE80;font-size:30px;"></i>
                <p class="font-weight-bold pt-3 dark-text">Virtual Cards</p>
                <p class="second-text text-secondary">Create virtual cards for your online transactions.</p>
            </div>
            </nuxt-link>
        </div>
        <div class="col-6 mb-3">
            <nuxt-link to="bills" class="main-link">
            <div class="card bills-card p-3 p-lg-4 h-100">
                <i class="bi-receipt" style="color: #ff784b;font-size:30px;"></i>
                <p class="font-weight-bold pt-3 dark-text">Pay Bills</p>
                <p class="second-text text-secondary">Pay your Cable TV, electricity and data bills.</p>
            </div>
            </nuxt-link>
        </div>
    </div>
    </div>

    <div class="mt-3 mb-5">
      <div class="d-flex justify-content-between">
      <p class="mb-3 font-weight-bold">Recent transactions</p>
      <nuxt-link to="/transactions" class="font-weight-bold main-link">See all <i class="bi-arrow-right"></i></nuxt-link>
      </div>
      <div v-if="!transactions" class="card shadow-sm">
      <p class="text-center">No transactions yet</p>
      </div>

      <div v-else class="card shadow-sm">
      <div class="list-group list-group-flush p-0">
        <a v-for="transaction in transactions" :key="transaction.id" href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <div class="d-flex">
              <div class="mr-3 align-self-center">
                <div v-if="transaction.type == 'Debit'" class="debit text-center">
                  <i class="bi-arrow-up-right"></i>
                </div>
                <div v-else class="credit text-center">
                  <i class="bi-arrow-down-left"></i>
                </div>
              </div>
              <div>
              <small class="font-weight-bold">{{ transaction.description }}</small><br>
              <small class="text-secondary" v-text="$moment(transaction.created_at).format('llll')"></small>
              </div>
            </div>
            <small v-if="transaction.type == 'Debit'" class="mb-1 font-weight-bold text-danger align-self-center">{{ transaction.currency == 'USD' ? '$': '&#8358;'}}{{ Intl.NumberFormat().format(transaction.amount) }}</small>
            <small v-if="transaction.type == 'Credit'" class="mb-1 font-weight-bold text-success align-self-center">{{ transaction.currency == 'USD' ? '$': '&#8358;'}}{{ Intl.NumberFormat().format(transaction.amount) }}</small>
          </div>
        </a>
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

    data() {
      return {
        books: [],
      }
    },

  async fetch() {
      let books = await this.$axios.get(`${this.$config.apiURL}/books`);
      this.books = books.data.data;
      await this.$auth.fetchUser();
  },

  methods: {
    async logout() {

      try {
        await this.$auth.logout();
        this.$router.push('/login')
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
</style>
