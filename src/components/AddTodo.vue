<template>
  <form @submit.prevent="add">
    <input type="text" name="title" placeholder="add todo..." v-model="inputTitle" />
    <input type="submit" value="Submit" class="btn" />
  </form>
</template>

<script>
export default {
  name: "AddTodo",

  data() {
    return {
      inputTitle: "",
    };
  },

  methods: {
    add() {
      this.$emit("add-todo", this.inputTitle);
      this.inputTitle = "";
    }
  },
};
</script>

<style scoped>

</style>