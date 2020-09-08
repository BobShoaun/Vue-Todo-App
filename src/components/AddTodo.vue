<template>
  <form @submit.prevent="add">
    <input class="w-9/12 rounded-sm text-gray-800 border shadow px-2 h-6" type="text" name="title" placeholder="add todo..." v-model="inputTitle" />
    <input class="w-1/5 rounded-sm float-right text-gray-800 font-bold h-6 border bg-yellow-300 hover:bg-yellow-400" type="submit" value="add" />
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
      if (this.inputTitle == "")
        return;
      this.$emit("add-todo", this.inputTitle);
      this.inputTitle = "";
    }
  },
};
</script>

<style scoped>

</style>