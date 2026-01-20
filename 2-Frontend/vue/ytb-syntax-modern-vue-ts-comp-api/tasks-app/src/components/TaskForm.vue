
<script lang="ts" setup>

  // imports
  import { ref } from 'vue';

  // variables
  const emit = defineEmits<{ addTask: [newTask: string] }>();
  const newTask = ref("");

  // functions
  function formSubmitted() {
    if (newTask.value.trim()) {
        emit("addTask", newTask.value.trim());
        newTask.value = ""; 
    }
  }

</script>

<template>
  <main>
    <form @submit.prevent="formSubmitted">
      <label>
        New Task
        <input v-model="newTask" name="newTask">
      </label>
      <div class="button-container">
        <button>Add</button>
      </div>
    </form>
  </main>
</template>
