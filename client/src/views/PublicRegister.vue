<template>
    <div class="public_register">
        <div>
        <label>name</label>
        <input class="inputName" v-model="info.name" placeholder="input name" style="min-width: 170px;">
        </div>
        <div>
        <label>relation</label>
        <input class="inputRelation" v-model="info.relation" placeholder="input relation" style="min-width: 170px;">
        </div>
        <div>
        <label>ssn</label>
        <input class="inputSSN" v-model="info.ssn" placeholder="input ssn" style="min-width: 170px;">
        </div>
        <div>
        <label>birth</label>
        <input class="inputBirth" v-model="info.birth" placeholder="YYYY-MM-DD" style="min-width: 170px;">
        </div>
        <div>
        <label>
        Male
        <input type="radio" value="M" v-model="info.sex" style="width:12px;height:12px;border:1px;margin-right: 12px">
        Female
        <input type="radio" value="F" v-model="info.sex" style="width:12px;height:12px;border:1px;">
        </label>
        </div>
  
        <div>
        <button type="button" class="registerBtn" @click="publicInsert">Register</button>
        </div>
        </div>
</template>

<script>
  import axios from 'axios';
  import header from '../header.js';

  export default {
    name:'PublicRegister',
    data() {
        return {
            info: {
                user_id: this.user_id,
                name:'',
                relation:'',
                ssn:'',
                birth:'',
                sex:'',
            },
        };
    },
    created() {
      this.user_id=this.$route.query.user_id;
      this.info.user_id=this.user_id;
    },
    methods:{
      publicInsert() {
        axios({
        method: 'post',
        url: 'http://'+header.server+':3000/api/public/register',
        data: this.info,
      }).then((response) => {
        console.log(response);
        if(response.data=='ok') {
          console.log('data registration success');
          this.$router.push({path:'/'});
        }
        else{alert("data registration failed!")}
      }).catch(function(error){
        console.log(error);
      });
      },
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