<template>
  <form @submit.prevent="add" class="grid grid-cols-12 gap-3">
    <input class="col-span-7 rounded-sm text-gray-800 border shadow h-6 px-2" type="text" name="title" placeholder="todo title..." v-model="inputTitle" />
    <input class="col-span-3 rounded-sm text-gray-800 border shadow h-6 px-2" type="number" name="title" placeholder="priority..." v-model="priority" />
    <input class="col-span-2 rounded-sm text-gray-800 font-bold h-6 border bg-yellow-300 hover:bg-yellow-400" type="submit" value="add" />
  </form>
  
</template>

<script>
export default {
  name: "AddTodo",

  data() {
    return {
      inputTitle: "",
      priority: null,
    };
  },

  methods: {
    add() {
      if (this.inputTitle == "")
        return;
      if (this.priority == null)
        this.priority = 0;
      this.$emit("add-todo", this.inputTitle, this.priority);
      this.inputTitle = "";
      this.priority = null;
    }
  },
};
</script>

<style scoped>

</style>