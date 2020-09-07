import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBEzjdO2OJgTY8ert0XVFbfOUyN82HMWHQ",
    authDomain: "vue-todo-app-797f8.firebaseapp.com",
    databaseURL: "https://vue-todo-app-797f8.firebaseio.com",
    projectId: "vue-todo-app-797f8",
    storageBucket: "vue-todo-app-797f8.appspot.com",
    messagingSenderId: "431438036205",
    appId: "1:431438036205:web:3b08cf0ed291f2077fa0e4",
    measurementId: "G-G1ZYC52VXC"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const firestore = firebaseApp.firestore();
  export default firestore;