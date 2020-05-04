<template>
  <div class="chat container">

    <h2 class="teal-text center">Vue Chat</h2>
    <div class="card">
      <div class="card-content">
          <ul class="messages">
              <li v-for="msg in messages" :key="msg.id">
                  <span class="teal-text">{{ msg.name }}: </span>
                  <span class="grey-text text-darken-3">{{ msg.message }} </span>
                  <span class="grey-text time">{{ msg.timestamp }}</span>
              </li>
          </ul>
      </div>
      <div class="card-action">
          <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import NewMessage from '@/components/NewMessage'

export default {
  name: "Chat",
  props: ['name'],
  components: {
      NewMessage
  },
  data() {
    return {
        messages: []
    };
  },
  created() {
      let ref = db.collection('messages')

      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
              let doc = change.doc

              this.messages.push({
                  id: doc.id,
                  name: doc.data().name,
                  message: doc.data().message,
                  timestamp: doc.data().timestamp
              })
          })
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>

.chat {
  max-width: 600px;
  margin-top: 100px;

  --image: url(https://www.elsetge.cat/myimg/f/0-1350_whatsapp-wallpaper-hd-free-download-iphone-6-wallpaper.jpg);
}

.chat .card {
    border-radius: 8px;
}

.chat .card-content {
    background: var(--image);
}

.chat h2 {
  font-size: 2em;
}

.chat .messages {
    max-width: 300px;
}

.chat li {
    background: white;
    padding: 10px 20px;
    border-radius: 40px 10px 20px 2px;
    box-shadow: 1px 4px 8px rgba(0,0,0,0.25);
    margin: 10px 0;
}

.chat span {
    font-size: 1.1em;
}

.chat .time {
    display: block;
    font-size: 0.9em;
    font-style: italic;
}


</style>
