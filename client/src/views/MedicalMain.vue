<template>
  <div class="medical_main">
    <h1>Medical login</h1>
    <RegisterLogin  scope="medical"/>
  </div>
</template>

<script>
import RegisterLogin from '@/components/RegisterLogin.vue'

export default {
  name: 'medical_main',
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
