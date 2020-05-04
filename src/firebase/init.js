import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBdIjadhS3JcAjIqqdIj6EYXXm67-IA310",
    authDomain: "vue-chat-4097c.firebaseapp.com",
    databaseURL: "https://vue-chat-4097c.firebaseio.com",
    projectId: "vue-chat-4097c",
    storageBucket: "vue-chat-4097c.appspot.com",
    messagingSenderId: "468074079021",
    appId: "1:468074079021:web:913e50fb9ba0afe6c3e9a4",
    measurementId: "G-CR93RPRFFG"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebaseApp.firestore().settings({ timestampsInSnapshots: true})

export default firebaseApp.firestore()