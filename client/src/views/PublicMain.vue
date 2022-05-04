<template>
  <div class="public_main">
    <h1>Public login</h1>
    <RegisterLogin  scope="public"/>
  </div>
</template>

<script>
import RegisterLogin from '@/components/RegisterLogin.vue'

export default {
  name: 'public_main',
  components: {
    RegisterLogin
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
</style>
