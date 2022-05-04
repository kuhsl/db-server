<template>
  <div class="public_authorize">
    <h1>Authorization for Public Data</h1>
    <AuthLogin />
  </div>
</template>

<script>
import AuthLogin from '@/components/AuthLogin.vue'

export default {
  name: 'public_authorize',
  components: {
    AuthLogin
  },
  
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