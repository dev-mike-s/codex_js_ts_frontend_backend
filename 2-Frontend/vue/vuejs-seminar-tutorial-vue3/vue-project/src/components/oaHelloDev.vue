<!-- Beispiel: Options API -->
<script>

  // imports
  import { computed } from 'vue'

  // functions
  export default {
    data() {
      return {
        vorname: 'Mike',
        nachname: 'S',
        alter: 100,
        jobTitle: 'Junior Dev'
      };
    },
    computed: {
      fullName() {
        return `${this.vorname} ${this.nachname}`;
      }
    }
  };
</script>

<template>
  <h1>Options API:</h1>
  <h2>Hallo {{ jobTitle }} !</h2>
  <div>
    <p>Dein Vorname lautet:   {{ vorname }}</p>
    <p>Dein Nachname lautet:  {{ nachname }}</p>
    <p>also vollständig:      {{ fullName }}</p>
  </div>
</template>

