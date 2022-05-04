<template>
  <div>
    <div class="medical_register">
      <div>
      <label>SSN</label>
      <input class="inputSSN" v-model="info.ssn" placeholder="input SSN">
      </div>
      <div>
      <label>Date</label>
      <input class="inputDate" v-model="info.date_time" placeholder="YYYY-MM-DD --:--">
      </div>
      <div>
      <label>Image path</label>
      <input class="inputImagePath" v-model="info.image_path" placeholder="input image path">
      </div>
    </div>
    <div>
        <button type="button" class="registerBtn" @click="medicalInsert">Register</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import header from '../header.js';

  export default {
    name:'MedicalRegister',
    data(){
      return {
          info: {
            user_id : '',
            date_time : this.getTime(),
            imate_path :'',
          },
        };
    },
    created() {
      this.user_id=this.$route.query.user_id;
      this.info.user_id=this.user_id;
    },
    methods:{
      medicalInsert() {
        axios({
        method: 'post',
        url: 'http://'+header.server+':3000/api/medical/register',
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
      getTime() {
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var dateString = year + '-' + month  + '-' + day;

        var hours = ('0' + today.getHours()).slice(-2); 
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2); 
        var timeString = hours + ':' + minutes  + ':' + seconds;

        return dateString+' '+timeString;
      }
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