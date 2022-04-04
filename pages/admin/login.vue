<template>
<div class="login_div">
	<div class="container">
		<div class="row">
			<div class="col-md-4 ml-auto mr-auto">
					<h4 class="font-weight-bold pt-4" style="color: #002244;">Welcome back</h4>
          <p class="text-secondary">Login to continue</p>
          <img src="images/link.svg" class="mx-auto d-block mb-5 mt-5" style="width:60%">
					<form @submit.prevent="submit">
						<div class="form-group row">
							<div class="col-md-12">
								<input placeholder="Email" v-model="form.email" id="email" type="email" class="auth-input form-control" value="" autocomplete="off">
								<!-- <div v-if="errors.email">{{ errors.email }}</div> --></div>
						</div>
						<div class="form-group row">
							<div class="col-md-12">
                <div class="input-group">
								<input placeholder="Password" v-model="form.password" id="password" type="password" class="form-control" name="password" autocomplete="off">
                <div class="input-group-append">
                <span class="input-group-text">
                  <i @click="togglePassword" style="color:#000" class="bi-eye-slash" id="togglePassword"></i>
                </span>
                </div>
                </div>
              </div>
						</div>
            <nuxt-link to="/reset-password" class="auth font-weight-bold">Forgot your password?</nuxt-link>

						<div class="form-group row mb-0 mt-4">
							<div class="col-md-12">
								<button id="my-button" data-style="slide-right" type="submit" class="ladda-button btn sign_btn btn-block mb-3"> Login </button>

								<nuxt-link class="btn reg_btn btn-block" to="/register">Create new account </nuxt-link>
							</div>
						</div>
					</form>
				</div>
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
            email: '',
            password: ''
          },
          is_disabled: false
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
      async submit() {
        var l = Ladda.create(document.querySelector('#my-button'));
        l.start();
        try {
          await this.$auth.loginWith('local', { data: this.form })
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
      }
    },
    // computed: {
    //   checkvar() {
    //     if(this.form.email == "" || this.form.password == "") {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // }
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

body{
  background: #fffde7;
}

.card{
  border-radius: 10px;
}

nuxt-link:hover{
  text-decoration: none;
}

.login_div{
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
  }

  p{
    margin: 0;
  }

  h4{
    margin: 0;
  }

@media (max-width: 768.98px) {

}
</style>
