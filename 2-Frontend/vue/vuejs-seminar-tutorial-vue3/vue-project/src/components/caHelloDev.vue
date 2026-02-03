<!-- Beispiel: Composition API -->
<script setup>

  // imports
  import { ref, computed } from 'vue';

  // variables
  const vorname = ref('Mike');
  const nachname = ref('S');
  const fullName = computed(() => ` ${vorname.value} ${nachname.value} `);
  const alter = ref(100);

  // functions

</script>

<template>
  <h1>Composition API:</h1>
  <h2>Hallo {{ jobTitle }} !</h2>
  <div>
    <p>Dein Vorname lautet:   {{ vorname }}</p>
    <p>Dein Nachname lautet:  {{ nachname }}</p>
    <p>also vollständig:      {{ fullName }}</p>
  </div>
</template>

<style scoped>

</style>