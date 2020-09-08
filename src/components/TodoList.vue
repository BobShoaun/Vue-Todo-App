<template>
    <div>
    <div v-for="todo in todos" v-bind:key="todo.id">
      <TodoItem v-bind:todo="todo" 
                v-on:delete-todo="$emit('delete-todo', todo.id)" 
                v-on:update-todo="$emit('update-todo', todo)"
                 />
    </div>
</div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",

  props: {
    todos: null,
  },

  components: {
    TodoItem,
  },

};
</script>

<style scoped>
</style>