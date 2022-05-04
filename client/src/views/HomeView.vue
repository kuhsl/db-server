
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MyDataMain msg="Welcome to Database for MyData"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MyDataMain from '@/components/MyDataMain.vue'

export default {
  name: 'HomeView',
  components: {
    MyDataMain
  }
}
</script>
