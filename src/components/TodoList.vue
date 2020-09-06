<template>
  <div>
    <h2>Your things to do</h2>
    <div v-for="todo in todos" v-bind:key="todo.id">
      <TodoItem v-bind:todo="todo" v-on:del-todo="deleteTodo" />
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  props: { },
  components: {
    TodoItem,
  },
  methods: {
    deleteTodo(todo_id) {
      this.todos = this.todos.filter((todo) => todo.id !== todo_id);
    },
  },
    data() {
      return {todos: []};
    },
  created() {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => response.json())
      .then(json => this.todos = json);
  },
};
</script>

<style scoped>
</style>