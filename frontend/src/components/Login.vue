<template>
    <div>
     

      <form class="form" @submit.prevent="login">
         <h1> C o n n e x i o n </h1>
        <div class="form-group">
            <label for="email"> Email </label>
            <input type="text" id="email" class="" autocomplete ="current-email"  v-model="user.email">
        </div>

        <div class="form-group">
            <label for="password" > Mot de passe </label>
            <input type="password" class="" autocomplete ="current-password"  v-model="user.password">
        </div>

        <div class="form-group btn">
            <button type="submit" class="btn btn-primary btn-sm" @click="login"> Se connecter </button>
        </div>
        
      </form>  
      
        
    </div>
   
  </template>
  
  <script>
  
  export default {
    name: "Login",
    data () {
        return {
            user: {
                email:'',
                password:''
            }
        }
    },

    components: {
      
      
    },
    methods: {
        login () {
    
            this.$router.push('admin')
        }
    }
  };
  
  </script>
  
  <style>
    form {
        max-width: 320px;
        margin: 10px auto;
        background: rgb(199, 195, 195);
        padding: 5px;
    }
    .form-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    } 
    .btn {
        
        justify-content: center;
    }
  </style>