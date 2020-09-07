<template>
  <div id="app">

    <h2>Your things to do</h2>
    <TodoList v-bind:todos="todos" 
              v-on:delete-todo="deleteTodo"/>
    <AddTodo v-on:add-todo="addTodo" />

  </div>
</template>

<script>
import db from "./firebase.js";
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export default {
  name: 'App',
  components: {
    TodoList,
    AddTodo
  },
  
  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },

    addTodo(title) {
      const newTodo = {
          title: title,
          completed: false,
          timestamp: new Date(),
        };
      db.collection('todos').add(newTodo).then(docRef => {
        newTodo.id = docRef.id;
        this.todos.push(newTodo);
      });
      
    }
  },

  data() {
    return { todos: [] };
  },

  created() {
    db.collection("todos")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let todo = {
            id: doc.id,
            title: doc.data().title,
            completed: doc.data().completed,
            timestamp: doc.data().timestamp
          }
          this.todos.push(todo);
        });
      });

    // fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    //   .then(response => response.json())
    //   .then(json => this.todos = json);
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
