<template>
<form @submit.prevent="addTodo">
    <input type="text" name="title" placeholder="add todo..." v-model="inputTitle">
    <input type="submit" value="Submit" class="btn">
</form>
   
</template>

<script>
export default {
    name: 'AddTodo',

    data() {
        return {
            inputTitle: "",
        }
    },

    methods: {
        addTodo() {
            this.$emit('add-todo', this.inputTitle);
            this.inputTitle = '';
        }
    }

}
</script>

<style>

</style>