<template>
    <div class="auth_login">
        <div>
        <label>ID</label>
        <input class="inputId" v-model="idpw.user_id" placeholder="input ID">
        </div>
        <div>
        <label>PW</label>
        <input  type="password" class="inputPw" v-model="idpw.user_pw" placeholder="input PW">
        </div>
        <div>
        <button type="button" class="registerBtn" @click="userAuthenticate">Log in</button>
        </div>
        </div>
</template>
<script>
  import axios from 'axios';
  import header from '../header.js';

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  export default {
    name:'AuthLogin',
    data() {
        return {
          idpw: {
            user_id: "",
            user_pw: ""
          },
          auth: {
            response_type: urlParams.get('response_type'),
            scope: urlParams.get('scope').replace('_data',''),
            operator_id: urlParams.get('operator_id'),
            redirect_uri: urlParams.get('redirect_uri'),
            state: urlParams.get('state'),
            user_id: ""
          }
        };
    },
    methods:{
      userAuthenticate(){
          axios({
          method: 'post',
          url: 'http://'+header.server+':3000/api/'+this.auth.scope+'/authenticate',
          data: this.idpw
        }).then((response) => {
          console.log(response);
          if(response.data=='success') {
            console.log('login success');
            this.userAuthorize();
          }else{alert("login failed!");}
        }).catch(function(error){
          console.log(error);
        });
      },
      userAuthorize(){
          this.auth.user_id=this.idpw.user_id;
          axios({
          method: 'post',
          url: 'http://'+header.server+':3000/api/'+this.auth.scope+'/authorize',
          data: this.auth
        }).then((response) => {
          console.log(response);
          if(response.data!='fail') {
            console.log('authorization success');
            console.log('redirect... http://163.152.71.223/cb?code='+response.data+'&state='+this.auth.state); 
            //window.location.assign('http://www.naver.com');
            window.location.assign('http://163.152.71.223/cb?code='+response.data+'&state='+this.auth.state); 
          }else{
            alert("authorization failed!");
            window.location.assign('http://163.152.71.223/cb?error=access_denied');
            }
        }).catch(function(error){
          console.log(error);
        }); 
      },
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

