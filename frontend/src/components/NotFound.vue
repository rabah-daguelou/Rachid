<template>
    <div id="notFound">
        <div>
      <p> La page que vous aviez demandé n'existe pas! </p>
        <button @click="home"> Retour </button>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "NotFound",
    methods: {
        home() {
            this.$router.push('/')
        }
    }
  };
  
  </script>
  
  <style>
    #notFound {
        width: 320px;
        font-size: .9rem;
        height: 100px;
        background: rgb(236, 126, 126);
        margin: 20px auto;
        padding: 10px;
        
    }
  </style>
  