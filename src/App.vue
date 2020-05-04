<template>
  <div id="app">
    <router-link :to="{ name: 'Welcome' }"><img src="@/assets/logo.png" width="50px" class="image" /></router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

#app .image {
  position: absolute;
  top: 20px;
  left: 48%;
  bottom: 100px;
  translate: transform(-50%, -50%);
}
</style>
