
<script lang="ts" setup>

  // imports
  import { ref } from 'vue';

  // variables
  const emit = defineEmits<{ addTask: [newTask: string] }>();
  const newTask = ref("");
  const error = ref("");

  // functions
  function formSubmitted() 
  {
    if (newTask.value.trim()) 
    {
        emit("addTask", newTask.value.trim());
        newTask.value = ""; 
    } else {
      error.value = "Error, task cannot be empty";
    }
  }
</script>

<template>
  <main>
    <form @submit.prevent="formSubmitted">
      <label>
        New Task
        <input 
          v-model="newTask" 
          name="newTask"
          :aria-invalid="!!error || undefined"
          @error="error = ''"
          >
        <small v-if="error" id="invalid-helper">
          {{ error }}
        </small>
      </label>
      <div class="button-container">
        <button>Add</button>
      </div>
    </form>
  </main>
</template>
 