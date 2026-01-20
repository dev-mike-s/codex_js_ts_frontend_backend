<!-- parent component -->

<script lang="ts" setup>

  //imports
  import { ref } from 'vue';
  import TaskForm from './components/TaskForm.vue';
  import type { Task } from './types';

  // variables
  const message = ref("Tasks App");
  const tasks = ref<Task[]>([]); // generic type

  // functions
  function addTask(newTask: string) {
    console.log(newTask);
    tasks.value.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false
    });
  }

</script>

<template>
  <main>
    <h1> {{ message }}</h1>
    <TaskForm @add-task="addTask"/>
    <h3>There are {{ tasks.length  }}  tasks.</h3>
  </main>
</template>

<style>
  main {
    max-width: 800px;
    margin: 1rem auto;
  }
  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
