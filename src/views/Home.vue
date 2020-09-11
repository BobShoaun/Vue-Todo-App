<template>
  <div class="max-w-lg mx-auto mb-10">

    <h1 class="text-gray-800 text-center font-bold text-5xl">things to do:</h1>
    <div class="my-3 p-8 pb-6 bg-gray-800 rounded shadow-lg">
      <TodoList v-bind:todos="incompletedTodos" 
                v-on:delete-todo="deleteTodo"
                v-on:update-todo="updateTodo"
                class="mb-3" />
      <AddTodo v-on:add-todo="addTodo" class="mt-4 mb-8"/>
      <hr>
      <h4 class="my-2 text-gray-400 italic">marked as complete:</h4>
      <TodoList v-bind:todos="completedTodos" 
                v-on:delete-todo="deleteTodo"
                v-on:update-todo="updateTodo"
                 />
    </div>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Ng Bob Shoaun. All rights reserved.
  </p>
  </div>
</template>

<script>
import db from "@/firebase.js";
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';

export default {
  name: 'Home',

  components: {
    TodoList,
    AddTodo
  },
  
  methods: {

    async deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.separateTodos();
      await db.collection('todos').doc(id).delete();
    },

    async addTodo(title, priority) {
      const newTodo_client = {
        id: -1,
        title,
        completed: false,
        priority,
        dateCreated: new Date(),
        editingTitle: false,
        editingPriority: false,
        allowModify: false,
      }
      this.todos.push(newTodo_client); // client only
      this.separateTodos();

      const newTodo = {
        title,
        completed: false,
        priority,
        dateCreated: new Date(),
      };
      const docRef = await db.collection('todos').add(newTodo);
      const doc = await docRef.get();
      this.todos = this.todos.filter(todo => todo.id !== -1);
      this.todos.push(this.createTodo(doc));
      this.separateTodos();
    },

    updateTodo(todo) {
      if (!todo.allowModify)
        return;
      const updatedTodo = {
        title: todo.title,
        completed: todo.completed,
        priority: todo.priority,
        dateCreated: todo.dateCreated
      }
      db.collection('todos').doc(todo.id).update(updatedTodo);
      this.separateTodos();
    },

    async getTodos() {
      try {
        const querySnapshot = await db.collection("todos").get();
        querySnapshot.forEach(doc => this.todos.push(this.createTodo(doc)));
        this.separateTodos();
      } catch {
        alert("Problem loading todos!");
      }
    },

    separateTodos() {
      this.todos = this.todos.sort((a, b) => b.priority - a.priority);
      this.completedTodos = [];
      this.incompletedTodos = [];
      for (const todo of this.todos) {
        if (todo.completed)
          this.completedTodos.push(todo);
        else
          this.incompletedTodos.push(todo);
      }
    },

    createTodo(doc) {
      return {
        id: doc.id,
        title: doc.data().title,
        completed: doc.data().completed,
        priority: doc.data().priority,
        dateCreated: doc.data().dateCreated,
        editingTitle: false,
        editingPriority: false,
        allowModify: true
      }
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

</style>

