<template>
  <div class="Todo">
    <h1>{{ msg }}</h1>
    <label>
      <input type="text" v-model="name" @keyup.enter="createTodo(name)" placeholder="To-do" style="font-size:12pt">
      <button @click="sortTodos(sortedAsc)">{{ sortButton }}</button>
    </label>
    <div class="list-group" v-for="(todo, index) in todos" :key="todo._id">
      <label>
        <input type="checkbox" v-model="todo.checked" @click="checkTodo(todo)" :id="todo.name.split(' ').join('-') + '-checkbox'">
      </label>
      <label>
        <input
            v-if="todo.edit"
            v-model="todo.name"
            @blur="todo.edit = false; updateTodoName(todo)"
            @keyup.enter="todo.edit=false; updateTodoName(todo)"
            :id="todo.name.split(' ').join('-')"
        >
        <label v-else @click="todo.edit = true" :id="todo.name.split(' ').join('-')"> {{todo.name}} </label>
      </label>
      <button @click="deleteTodo(todo._id, index)" :id="todo.name.split(' ').join('-') + '-x-button'">x</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000'

export default {
  name: 'TodoApp',
  props: {
    msg: String
  },
  data() {
    return {
      todos: [],
      name: '',
      sortedAsc: true,
      sortButton: 'ᐃ'
    }
  },
  methods: {
    async checkTodo(todo) {
      await axios.put(`/todo/${todo._id}`, { checked: !todo.checked })
    },
    async deleteTodo(id, index) {
      await axios.delete(`/todo/${id}`)
      this.todos.splice(index, 1)
    },
    async createTodo(name) {
      const todo = (await axios.post('/todo', { name })).data.todo
      this.todos.push(todo)
      this.name = ''
    },
    async updateTodoName(todo){
      await axios.put(`/todo/${todo._id}`, { name: todo.name })
    },
    sortTodos(sortedAsc) {
      this.sortedAsc = !sortedAsc
      this.sortButton = this.sortButton === 'ᐃ' ? 'ᐁ' : 'ᐃ'
      this.todos.sort(function(a,b) {
        return sortedAsc ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
  },
  async mounted() {
    this.todos = (await axios.get('/')).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
