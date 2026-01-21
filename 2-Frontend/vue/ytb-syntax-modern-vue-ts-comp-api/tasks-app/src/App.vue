<!-- parent component -->

<script lang="ts" setup>

  //imports
  import { computed, ref } from 'vue';
  import TaskForm from './components/TaskForm.vue';
  import type { Task } from './types';
  import TaskList from './components/TaskList.vue';

  // variables
  const message = ref("Tasks App");
  const tasks = ref<Task[]>([]); // generic type

  const totalDone = computed(() => tasks 
    .value
    .reduce((total, task) => task.done ? total + 1 : total, 0)
  ) 

  // functions
  function addTask(newTask: string) 
  {
    tasks.value.push(
    {
      id: crypto.randomUUID(),
      title: newTask,
      done: false
    });
  }
  function toggleDone(id: string) 
  {
    const task = tasks.value.find(task => task.id === id);
    if (task) 
    {
      task.done = !task.done;
    }
  }
</script>

<template>
  <main>
    <h1> {{ message }} </h1>
    <TaskForm @add-task="addTask" />
    <h3 v-if="!tasks.length">Add a task to get started. </h3>
    <h3 v-else> {{ totalDone }} / {{ tasks.length }} tasks completed.</h3>
    <TaskList :tasks @toggle-done="toggleDone" />
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
