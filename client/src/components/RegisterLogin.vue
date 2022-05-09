<template>
    <div class="register_login">
        <div>
        <label>ID</label>
        <input class="inputId" v-model="idpw.user_id" placeholder="input ID">
        </div>
        <div>
        <label>PW</label>
        <input type="password" class="inputPw" v-model="idpw.user_pw" placeholder="input PW">
        </div>
        <div>
        <button type="button" class="registerBtn" @click="checkLoginToRegister">Log in</button>
        </div>
        </div>
</template>

<script>
  import axios from 'axios';
  import header from '../header.js';

  export default {
    name:'RegisterLogIn',
    data() {
        return {
          idpw: {
              user_id: "",
              user_pw: ""
          }
        };
    },
    methods:{
      checkLoginToRegister(){
        axios({
        method: 'post',
        url: 'http://'+header.server+':3000/api/'+this.scope,
        data: this.idpw
      }).then((response) => {
        console.log(response);
        if(response.data=='success') {
          console.log('login success');
          this.$router.push({path:'/'+this.scope+'/register', query:{user_id : this.idpw.user_id}});
        }
        else{alert("login failed!")}
      }).catch(function(error){
        console.log(error);
      });
      }
    },
    props: {
      scope: String
    }
  }
</script>

<style scoped>
  *{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: bold;
  }
  input{
    width: 17%;
    min-width: 170px;
    height: 22px;
    border-radius: 20px;
    border: 1px;
    margin: 8px 0;
    padding: 8px 12px;
    background-color:rgba( 255, 255, 255, 0.5 );
    font-size:15px;
    color:#2c3e50;
  }
  input::placeholder{
    color:#c7c7c7;
  }
  button{
    width: 230px;
    height:50px;
    background-color: #2c3e50;
    color:white;
    font-size:20px;
    font-weight: bold;
    border-radius:48px;
    border:0px;
    margin:10px;
  }
  button:hover{
    color: white;
    background-color:#42b983;;
  }
  label{
    font-size:15px;
    margin-right:6px;
  }
</style>
