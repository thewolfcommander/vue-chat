<template>
  <div class="chat container">
    <h2 class="teal-text center">Vue Chat</h2>
    <div class="card">
      <div class="card-content">
          <ul class="messages" v-chat-scroll>
              <li v-for="msg in messages" :key="msg.id" >
                  <div class="msg-container" v-if="msg.name !== name">
                        <span class="teal-text name">{{ msg.name }}: </span>
                        <span class="grey-text text-darken-3 message">{{ msg.message }} </span>
                        <span class="grey-text time">{{ msg.timestamp }}</span>
                  </div>
                  <div class="self-container" v-if="msg.name === name">
                        <span class="teal-text name">{{ msg.name }}: </span>
                        <span class="grey-text text-darken-3 message">{{ msg.message }} <i class="material-icons delete" @click="deleteMessage(msg, name)">delete</i> </span>
                        <span class="grey-text time">{{ msg.timestamp }}</span>
                  </div>
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
import moment from 'moment'
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
      let ref = db.collection('messages').orderBy('timestamp')

      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
              let doc = change.doc

              this.messages.push({
                  id: doc.id,
                  name: doc.data().name,
                  message: doc.data().message,
                  timestamp: moment(doc.data().timestamp).format('lll')
              })
          })
      })
  },
  methods: {
      deleteMessage(msg, name) {
          if (msg.name === name) {
              db.collection('messages').doc(msg.id).delete().then(() => {
                  this.messages = this.messages.filter(message => {
                      return message.id !== msg.id
                  })
              }).catch(err => {
                      console.log(err)
                  })
          }
      }
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
    background: teal;
}

.chat h2 {
  font-size: 2em;
}

.chat .messages {
    position: relative;
    max-height: 300px;
    overflow: auto;
}

.chat .msg-container {
    background: white;
    padding: 10px 20px;
    max-width: 300px;
    position: relative;
    left: 0;
    border-radius: 40px 10px 40px 2px;
    box-shadow: 1px 4px 8px rgba(0,0,0,0.25);
    margin: 10px 0;
}

.chat .self-container {
    background: rgb(233, 233, 123);
    padding: 10px 20px;
    position: relative;
    max-width: 300px;
    border-radius: 10px 40px 2px 40px;
    box-shadow: 1px 4px 8px rgba(0,0,0,0.25);
    margin: 10px 0;
}

.chat span {
    font-size: 1.0em;
}

.chat .name,
.chat .message {
    display: block;
}

.chat .name {
    font-size: 0.9em;
    font-weight: bolder;

}

.chat .time {
    display: block;
    font-size: 0.7em;
    font-style: italic;
}

.chat .self-container .name {
    color: orangered!important;
}

.chat .messages::-webkit-scrollbar {
    width: 3px;
}

.chat .messages::-webkit-scrollbar-track {
    background: #ddd;
}

.chat .messages::-webkit-scrollbar-thumb {
    background: orangered;
}

.chat .delete {
    font-size: 1.4em;
    position: absolute;
    right: 6px;
    bottom: 2px;
    cursor: pointer;
    color: orangered;
}


</style>
