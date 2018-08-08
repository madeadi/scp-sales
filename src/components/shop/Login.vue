<template>  
  <div class="c-modalLogin" v-if="visible">
    <div class="form">
      <div class="header">One more step before checking out</div>
      <div class="row">
        <div class="col-sm-9">
          <input name="email" v-model="email" class="form-control"
            placeholder="Enter your email">
        </div>
        <div class="col-sm-3">
          <button class="btn btn-primary btn-sm check-email" @click="checkEmail">Check</button>
        </div>
      </div>
      
      <div class="nextstep" v-if="isEmailChecked">
        <div class="notification small text-success">
          <span v-if="isEmailRegistered">Your have a Scoop account.</span>
          <span v-else>
            You don't have a Scoop account yet. We will create one for you.            
          </span>
        </div>

        <input name="password" type="password" v-model="password" 
            class="form-control" placeholder="Password">
        <input name="repassword" type="password" v-model="repassword" class="form-control"
          v-if="!isEmailRegistered" placeholder="Re-Type Password">        
      </div>

      <div class="footer" v-if="isEmailChecked">
        <button class="btn btn-default" @click="hideLogin">Cancel</button>
        <button class="btn btn-primary" @click="loginHelper" v-if="isEmailRegistered">Login</button>
        <button class="btn btn-primary" @click="registerHelper" v-else>Register</button>
      </div>
    </div>        
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from './../../api/fixtures'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      repassword: '',
      isEmailRegistered: false,
      isEmailChecked: false
    }
  },
  computed: mapGetters({
    visible: 'loginModal',
    profile: 'getProfile'
  }),
  methods: {
    ...mapActions([
      'hideLogin',
      'login',
      'register'
    ]),

    loginHelper: function () {
      var cb = status => {
        console.log(status)
      }

      this.login(cb, this.email, this.password)
    },

    registerHelper: function () {
      var email = this.email
      var password = this.password
      var repassword = this.repassword

      if (password !== repassword) {
        console.log('password do not match')
      } else {
        if (this.register({email, password})) {
          this.hideLogin()
        }
      }
    },

    checkEmail: function () {
      var cb = status => {
        this.isEmailRegistered = status
        this.isEmailChecked = true
      }

      api.checkEmail(cb, this.email)
    }
  }
}
</script>

<style scoped>
.c-modalLogin {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  z-index: 100;
}
.form {
  background-color: white;
  width: 400px;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem;
  margin-top: 100px;
  border-radius: 7px;
}
.nextstep input {
  margin: 0.5rem 0;
}
.header::after, .footer::before {
  display: block;
  border-bottom: 1px solid #ddd;
  content: "";
  margin: 1rem 0;
}

.footer {
  text-align: right;
}

btn.check-email {
  margin-top: 0.3rem;
}
</style>