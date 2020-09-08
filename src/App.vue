<template>
  <div id="app" class="max-w-md m-auto my-10">
    <h2 class="text-gray-800 text-center font-bold text-4xl">THINGS TO DO</h2>
    <div class="my-3 p-6 bg-gray-800 rounded-md shadow-md">

    <TodoList v-bind:todos="todos" 
              v-on:delete-todo="deleteTodo"
              v-on:update-todo="updateTodo"
              class="mb-5" />
    <AddTodo v-on:add-todo="addTodo" />

    </div>
    

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
    async deleteTodo(id) {
      await db.collection('todos').doc(id).delete();
      this.todos = this.todos.filter(todo => todo.id !== id);
    },

    async addTodo(title) {
      const newTodo = {
        title: title,
        completed: false,
        dateCreated: new Date(),
      };
      const docRef = await db.collection('todos').add(newTodo)
      newTodo.id = docRef.id;
      newTodo.editing = false;
      this.todos.push(newTodo);
    },

    updateTodo(todo) {
      const updatedTodo = {
        title: todo.title,
        completed: todo.completed,
        dateCreated: todo.dateCreated
      }
      db.collection('todos').doc(todo.id).set(updatedTodo);
    },

    async getTodos() {
      const querySnapshot = await db.collection("todos").get()
      querySnapshot.forEach(doc => {
        const todo = {
          id: doc.id,
          title: doc.data().title,
          completed: doc.data().completed,
          dateCreated: doc.data().dateCreated,
          editing: false
        }
        this.todos.push(todo);
      });
      this.todos = this.todos.sort((a, b) => a.dateCreated.seconds - b.dateCreated.seconds);
    }
  },

  data() {
    return { todos: [] };
  },

  created() {
    this.getTodos();
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #ffffff;
}
</style>
