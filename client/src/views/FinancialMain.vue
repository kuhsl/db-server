<template>
  <div class="financial_main">
    <h1>Financial login</h1>
    <RegisterLogin  scope="financial"/>
  </div>
</template>

<script>
import RegisterLogin from '@/components/RegisterLogin.vue'

export default {
  name: 'financial_main',
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
