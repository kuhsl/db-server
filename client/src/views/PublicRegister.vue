<template>
  <div class="parent">
    <div class="child left"></div>
    <div class="child center">
        <div>
        <label>Name</label>
        <input class="inputName" v-model="info.name" placeholder="input name" style="min-width: 170px;">
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
        <label>SSN</label>
        <input class="inputSSN" v-model="info.ssn" placeholder="input ssn" style="min-width: 170px;">
        </div>
        <div>
        <label>Birth</label>
        <input type="date" class="inputBirth" v-model="info.birth" placeholder="YYYY-MM-DD" style="min-width: 170px;">
        </div>
        <div>
        <label>Address</label>
        <input class="inputAddress" v-model="info.address" placeholder="input address" style="min-width: 170px;">
        </div>
        <div>
        <label>Spouse</label>
        <input class="spouse_name" v-model="spouse_name" placeholder="input spouse name" style="min-width: 170px;">
        <input class="spouse_ssn" v-model="spouse_ssn" placeholder="input spouse ssn" style="min-width: 170px;">
        </div>
        <div>
        <label>Child 1</label>
        <input class="child_1_name" v-model="child_1_name" placeholder="input child1 name" style="min-width: 170px;">
        <input class="child_1_ssn" v-model="child_1_ssn" placeholder="input child1 ssn" style="min-width: 170px;">
        </div>
        <div>
        <label>Child 2</label>
        <input class="child_2_name" v-model="child_2_name" placeholder="input child2 name" style="min-width: 170px;">
        <input class="child_2_ssn" v-model="child_2_ssn" placeholder="input child2 ssn" style="min-width: 170px;">
        </div>
        <div>
        <label>Child 3</label>
        <input class="child_3_name" v-model="child_3_name" placeholder="input child3 name" style="min-width: 170px;">
        <input class="child_3_ssn" v-model="child_3_ssn" placeholder="input child3 ssn" style="min-width: 170px;">
        </div>
    </div>
    <div class="child right"></div>
  </div>  
  <div>
      <button type="button" class="registerBtn" @click="publicInsert">Register</button>
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
                relations:'',
                ssn:'',
                birth:'',
                sex:'',
                address:'',
            },
            spouse_name:'',
            spouse_ssn:'',
            child_1_name:'',
            child_1_ssn:'',
            child_2_name:'',
            child_2_ssn:'',
            child_3_name:'',
            child_3_ssn:'',
        };
    },
    created() {
      this.user_id=this.$route.query.user_id;
      this.info.user_id=this.user_id;
    },
    methods:{
      publicInsert() {

        if(this.spouse_name!='')
        {
          this.info.relations+='s:'+this.spouse_ssn+':'+this.spouse_name+';';
          if(this.child_1_name!='')
          {
            this.info.relations+='c:'+this.child_1_ssn+':'+this.child_1_name+';';
            if(this.child_2_name!='')
            {
              this.info.relations+='c:'+this.child_2_ssn+':'+this.child_2_name+';';
              if(this.child_3_name!='')
                this.info.relations+='c:'+this.child_3_ssn+':'+this.child_3_name+';';
            }
          }
        }
        console.log(this.info.relations);

        axios({
        method: 'post',
        url: 'https://'+header.server+':'+header.port+'/api/public/register',
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
  .parent{
    display: flex;
    text-align: center;
  }
  .parent .child {
    flex: 1;
    text-align: left;
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
    margin:10px 60px;
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
