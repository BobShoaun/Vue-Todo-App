<template>
<div class="mb-2 grid grid-cols-18 gap-1">
    <input class="col-span-1 my-auto" type="checkbox" v-model="todo.completed" v-on:change="$emit('update-todo', todo)" />
    
    <input v-if="todo.editingTitle" class="col-span-13 px-1 h-6 rounded-sm text-gray-800 border shadow" type="text" 
    v-model="todo.title" @blur="doneEditTitle" @keyup.enter="doneEditTitle" 
    @keyup.esc="cancelEditTitle" v-focus />

    <div v-else class="col-span-13" @dblclick="editTitle" 
         v-bind:class="{'line-through text-gray-600': todo.completed}"> {{todo.title}} </div>
    
    <input v-if="todo.editingPriority" class="col-span-3 mr-3 px-1 rounded-sm text-gray-800 border shadow" type="number" 
    v-model="todo.priority" @blur="doneEditPriority" @keyup.enter="doneEditPriority" 
    @keyup.esc="cancelEditPriority" v-focus />

    <div v-else class="col-span-3 mr-3 text-right" @dblclick="editPriority" 
         v-bind:class="{'line-through text-gray-600': todo.completed}">{{todo.priority}}</div>

    <button class="col-span-1 my-auto rounded text-gray-800 text-sm h-5 w-5" 
            @click="$emit('delete-todo', todo.id)" v-bind:class="[todo.completed ? 'bg-gray-700 hover:bg-gray-600 ': 'bg-red-400 hover:bg-red-500 ']">
            <i class="fas fa-times align-middle"></i></button>
    
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
      this.todo.editingTitle = true;
    },
    doneEditTitle() {
      if (this.todo.title.trim().length == 0)
        this.todo.title = this.beforeEditTitle;
      this.todo.editingTitle = false;
      this.$emit('update-todo', this.todo);
    },
    cancelEditTitle() {
      this.todo.title = this.beforeEditTitle;
      this.todo.editingTitle = false;
    },
    editPriority() {
      this.beforeEditPriority = this.todo.priority;
      this.todo.editingPriority = true;
    },
    doneEditPriority() {
      if (this.todo.priority == null)
        this.todo.priority = this.beforeEditPriority;
      this.todo.editingPriority = false;
      this.$emit('update-todo', this.todo);
    },
    cancelEditPriority() {
      this.todo.priority = this.beforeEditPriority;
      this.todo.editingPriority = false;
    },
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
      beforeEditPriority: null
    }
  }
};
</script>

<style scoped>

.grid-cols-18 {
   grid-template-columns: repeat(18, minmax(0, 1fr));
}

.col-span-13 {
    grid-column: span 13 / span 13;
}

</style>