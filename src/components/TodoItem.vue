<template>
<div class="mb-2">
    <input class="todo-item" type="checkbox" v-model="todo.completed" v-on:change="$emit('update-todo', todo)" />
    <input v-if="todo.editing" class="todo-item rounded-sm text-gray-800 border shadow mx-2 px-1 h-6" type="text" 
    v-model="todo.title" @blur="doneEditTitle" @keyup.enter="doneEditTitle" 
    @keyup.esc="cancelEditTitle" v-focus />
    <div v-else class="todo-item mx-3" @dblclick="editTitle" v-bind:class="{'completed': todo.completed}"> {{todo.title}} </div>
    <button class="float-right bg-red-400 hover:bg-red-500 px-2 rounded text-gray-800 font-bold text-sm" @click="$emit('delete-todo', todo.id)">x</button>
  </div>
</template>

<script>

export default {
  name: "TodoItem",
  props: {
    todo: null,
  },
  methods: {
    editTitle() {
      this.beforeEditTitle = this.todo.title;
      this.todo.editing = true;
    },
    doneEditTitle() {
      if (this.todo.title.trim().length == 0)
        this.todo.title = this.beforeEditTitle;
      this.todo.editing = false;
      this.$emit('update-todo', this.todo);
    },
    cancelEditTitle() {
      this.todo.title = this.beforeEditTitle;
      this.todo.editing = false;
    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      } 
    }
  },

  data() {
    return {
      beforeEditTitle: "",
    }
  }
};
</script>

<style scoped>

.todo-item {
  display: inline-block;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

</style>