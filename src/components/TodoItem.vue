<template>
  <span>
    <input class="todo-item" type="checkbox" v-model="todo.completed" v-on:change="$emit('update-todo', todo)" />
    <input v-if="todo.editing" class="todo-item" type="text" 
    v-model="todo.title" @blur="doneEditTitle" @keyup.enter="doneEditTitle" 
    @keyup.esc="cancelEditTitle" v-focus />
    <div v-else class="todo-item" @dblclick="editTitle" v-bind:class="{'completed': todo.completed}"> {{todo.title}} </div>
    <button class="todo-item" @click="$emit('delete-todo', todo.id)">x</button>
  </span>
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