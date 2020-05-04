<template>

    <div class="new-message">
        <form @submit.prevent="addMessage">
            <label for="new-message">Type Something (Press enter to send):</label>
            <input type="text" name="new-message" placeholder="e.g.: Hi, How are you?" v-model="newMessage" required>
            <i class="material-icons send" @click="addMessage">send</i>
        </form>
    </div>
    
</template>


<script>
import db from '@/firebase/init'

export default {
    name: 'NewMessage',
    props: ['name'],
    data() {
        return {
            newMessage: null,
        }
    },
    methods: {
        addMessage() {
            if (this.newMessage) {
                db.collection('messages').add({
                    name: this.name,
                    message: this.newMessage,
                    timestamp: Date.now()
                }).then(() => {
                    this.newMessage = null
                }).catch(err => {
                    console.log("Error in sending message")
                })
            }
        }
    }
}
</script>

<style>

.new-message form {
    position: relative;
}

.new-message .send {
    position: absolute;
    right: 10px;
    bottom: 15px;
    background: teal;
    padding: 10px;
    color: white;
    vertical-align: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

</style>