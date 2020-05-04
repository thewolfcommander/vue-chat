<template>
  <div class="chat container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Chatting as {{ name }}</h2>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: ['name'],
  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>

.chat {
  max-width: 600px;
  margin-top: 100px;
}

.chat h2 {
  font-size: 2em;
}


</style>
