<template>
  <div id="app" class="max-w-lg m-auto my-10">

    <h1 class="text-gray-800 text-center font-bold text-5xl">things to do</h1>
    <div class="my-3 p-8 pb-6 bg-gray-800 rounded shadow-lg">
      <TodoList v-bind:todos="incompletedTodos" 
                v-on:delete-todo="deleteTodo"
                v-on:update-todo="updateTodo"
                class="mb-3" />
      <AddTodo v-on:add-todo="addTodo" class="my-4 mb-8"/>
      <hr>
      <h4 class="my-2 text-gray-400 italic">marked as complete</h4>
      <TodoList v-bind:todos="completedTodos" 
                v-on:delete-todo="deleteTodo"
                v-on:update-todo="updateTodo"
                class="" />
    </div>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Ng Bob Shoaun. All rights reserved.
  </p>
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
      this.separateTodos();
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
      this.separateTodos();
    },

    updateTodo(todo) {
      const updatedTodo = {
        title: todo.title,
        completed: todo.completed,
        dateCreated: todo.dateCreated
      }
      db.collection('todos').doc(todo.id).set(updatedTodo);
      this.separateTodos();
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
      this.separateTodos();
    },

    separateTodos() {
      this.completedTodos = [];
      this.incompletedTodos = [];
      this.todos.forEach(todo => {
        if (todo.completed)
          this.completedTodos.push(todo);
        else
          this.incompletedTodos.push(todo);
      });
    }
  },

  data() {
    return { 
      todos: [],
      completedTodos: [],
      incompletedTodos: [] 
    };
  },

  created() {
    this.getTodos();
  },

}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #ffffff;
}
</style>
