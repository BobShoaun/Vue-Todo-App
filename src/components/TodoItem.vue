<template>
  <p>
    <input type="checkbox" v-on:changed="setComplete" />

    {{todo.title}}
    <button @click="$emit('del-todo', todo.id)">x</button>
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
      this.todo.is_completed = !this.todo.is_completed;
    },
  },
};
</script>

<style scoped>
</style>