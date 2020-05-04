<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <form @submit.prevent="enterChat">
          <label for="name">Enter name:</label>
          <i class="material-icons check" v-if="!name">check_circle</i>
          <i class="material-icons check check-main" v-else>check_circle</i>
          <input type="text" name="name" v-model="name" id="name" class="validate" placeholder="Type something ..." />
          <p class="red-text" v-if="feedback && !name"><small>{{ feedback }}</small></p>
          <p style="margin-top: 20px;" v-if="name">
            <small>
            You will chat as:
            <strong class="teal-text">{{ name}}</strong>
          </small>
          </p>
          <button class="btn teal white-text" v-if="name">Start Chat</button>
          <button class="btn teal white-text disabled" v-else>Start Chat</button>
          
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      name: null,
      feedback: null
    };
  },
  methods: {
    enterChat() {
      if (this.name) {
        this.feedback = null
        this.$router.push({ name: 'Chat', params: { name: this.name},})
      } else {
        this.feedback = "You must provide your name to enter the chat room."
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>

.welcome {
  max-width: 400px;
  margin-top: 100px;
}

.welcome h2 {
  font-size: 2em;
}

.welcome #name {
  position: relative;
}

.welcome .check {
  position: absolute;
  right: 25px;
  top: 145px;
  color: #aaa;
}

.welcome .check-main {
  color: teal!important;
}

.welcome .error {
  color: red;
  margin-top: 10px;
  margin-right: 5px;
}

</style>
