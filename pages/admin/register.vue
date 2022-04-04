<template>
        <div class="container mt-5 mb-5">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                <h4 class="font-weight-bold pt-3" style="color: #002244;">Admin Signup</h4>


                    <form @submit.prevent="submit">

                        <div class="form-row">
                            <div class="col-md-12 form-group">
                              <label>Name</label>
                                <input placeholder="Name" id="firstname" type="text" class="auth-input form-control" v-model="form.name" required autocomplete="firstname">
                            </div>
                        </div>


                        <div class="form-group row">
                            <div class="col-md-12">
                              <label>Email Address</label>
                                <input placeholder="Email address" id="email" type="email" class="auth-input form-control" v-model="form.email" required autocomplete="email">
                            </div>
                        </div>

                       <div class="form-group row">
                          <div class="col-md-12">
                            <label>Password</label>
                            <div class="input-group">
                            <input placeholder="Password" v-model="form.password" id="password" type="password" class="form-control" name="password" autocomplete="off">
                            <div class="input-group-append">
                            <span class="input-group-text">
                              <i @click="togglePassword" style="color:#000" class="bi-eye-slash" id="togglePassword"></i>
                            </span>
                            </div>
                            </div>
                          </div>
                        </div><br>

                        <div class="form-group row mb-0">
                            <div class="col-md-12">
                                <button id="my-button" data-style="slide-right" type="submit" class="ladda-button btn sign_btn font-weight-bold btn-block">
                                    Sign up
                                </button>
                            </div>
                        </div>

                        <p class="text-center pt-4">Already have an account? <nuxt-link class="font-weight-bold" to="/login">
                            Sign in
                        </nuxt-link></p>

                    </form>
                    </div>
                </div>
            </div>

</template>

<script>
import * as Ladda from 'ladda';

  export default {
    auth: 'guest',

      data() {
        return {
            form: {
                email: null,
                password: null,
                name: null,
            },
            is_disabled: false,
            loading: false,
        }
    },

    methods: {
          togglePassword() {
            const togglePassword = document.querySelector("#togglePassword");
            const password = document.querySelector("#password");


            const type = password.getAttribute("type") === "password" ? "text" : "password";
                password.setAttribute("type", type);

                togglePassword.classList.toggle("bi-eye");

          },
        async submit({redirect}) {
          var l = Ladda.create(document.querySelector('#my-button'));
          l.start();
          try {
          let response = await this.$axios.$post(this.$config.apiURL+'/auth/register', {
            name: this.form.firstname,
            email: this.form.email,
            password: this.form.password,
          });

          if (response) {
            let login = await this.$auth.loginWith('local', { data: this.form })
            if(login) {
              this.$router.push('/dashboard');
            }
          }
        } catch (e) {
          l.stop();
          if(e.response.status == 422) {
            for (let item in e.response.data.errors) {
              this.$toast.error(e.response.data.errors[item]);
            }
          }
          if(e.response.status == 500 || e.response.status == 400) {
            this.$toast.error(e.response.data.message);
          }
        }
    },
  }
}
</script>

<style scoped>

.input-group-text{
  background-color: #fff;
  /* border: none;
  border-bottom: 1px solid #000; */
  border-radius: 10px;
  cursor: pointer;
}

.card{
  border-radius: 10px;
}

.login_div{
    padding: 20px 80px;
  }

@media (max-width: 768.98px) {
  .login_div{
    padding: 30px 20px;
  }
}
</style>
