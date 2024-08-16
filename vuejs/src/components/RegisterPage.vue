<template>
    <div class="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4 pt-2">S'inscrire</h2>
      <form>
  
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
          />
          <div v-if="form.errors.email.length>0">
            <p v-for="error in form.errors.email" :key="error" class="error text-red-400">
              <span v-for="err in error" :key="err">
                {{ err }}
              </span>
            </p>
          </div>        
        </div>
        <div class="mb-4">
          <div class="relative">
            <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input 
              :type="!hide?'password':'text'" 
              id="password" 
              v-model="form.password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
            />
            <div @click="hide=!hide" class="eye absolute">
              <EyeClose v-if="!hide"></EyeClose>
              <EyeOpen v-if="hide"></EyeOpen>
            </div>
          </div>
          <div v-if="form.errors.password.length>0">
            <p v-for="error in form.errors.password" :key="error" class="error text-red-400">
              <span v-for="err in error" :key="err">
                {{ err }}
              </span>  
            </p>
          </div>
        </div>   
        
        <button 
          type="button" @click="checkForm"
          class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >Connecter</button>
        <a href="http://" class="text-blue-600 text-xs text-right block mt-2">S'inscrire</a>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import EyeClose from './icons/EyeClose.vue';
  import EyeOpen from './icons/EyeOpen.vue';
  export default {
    components: {
      EyeClose,
      EyeOpen
    },
    computed: {
      ...mapGetters(['message'])
    },
    
    data() {
      return {
        hide:false,
        form: {
          errors: {email:[],password:[]},
          email: '',
          password: ''
        }
      };
    },
    mounted() {
      this.$store.dispatch('fetchMessage');
    },
    methods:{
      checkForm: function () {
        const { email, password, errors } = this.form;
        if (!email && !errors.email.some(error => error.required)) {
            errors.email.push({ required: "Email is required" });
        }
        if (!password && !errors.password.some(error => error.required)) {
            errors.password.push({ required: "Password is required" });
        }
        if (email && !this.isEmailValid() && !errors.email.some(error => error.validEmail)) {
            errors.email.push({ validEmail: "Email is not valid" });
        }
        if (password && !this.isPasswordValid() && !errors.password.some(error => error.validPassword)) {
            errors.password.push({ validPassword: "Doit inclure au moins une minuscule, une majuscule et un total de 8 caractères parmi ceux spécifiés" });
        }
        if (password) {
            this.removeError(errors.password, 'required');
            if (this.isPasswordValid()) {
                this.removeError(errors.password, 'validPassword');
            }
        }  
        if (email) {
            this.removeError(errors.email, 'required');
            if (this.isEmailValid()) {
                this.removeError(errors.email, 'validEmail');
            }
        }  
  
    },
    isEmailValid: function () {
        const emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(this.form.email);
    },
    isPasswordValid: function (){
      const passwordPattern=/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
      return passwordPattern.test(this.form.password);
    },
    removeError: function(errorList, errorType) {
      const errorIndex = errorList.findIndex(error => error[errorType]);
      if (errorIndex !== -1) {
          errorList.splice(errorIndex, 1);
      }
    }
    }
  };
  </script>
  <style scoped>
    .eye {
      bottom: 12px;
      right: 10px;
      cursor: pointer;
    }
  </style>
  