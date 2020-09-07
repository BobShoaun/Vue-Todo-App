<template>
  <p>
    <input type="checkbox" v-on:changed="setComplete" />

    {{todo.title}}
    <button @click="$emit('delete-todo', todo.id)">x</button>
  </p>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: null,
  },
  methods: {
    setComplete() {
      this.todo.completed = !this.todo.completed;
    },
  },
};
</script>

<style scoped>
</style>