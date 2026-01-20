
<template>
  <div class="home">
    <Counter />
    <div class="buttons">
      <button @click="storeCounter.decreaseCount">-</button>
      <button @click="storeCounter.increaseCount">+</button>
    </div>
    <hr>
    <div>
      The counter is: {{ storeCounter.oddOrEven }}
    </div>
    <hr>
    <h3>Edit counter:</h3>
    <input 
      v-model="storeCounter.count"
      type="number"
    />
  </div>
</template>

<script setup>

  import { ref, computed} from 'vue'
  import { useCounterStore } from '@/stores/counter'
  import Counter from '@/components/Counter.vue'

  const storeCounter = useCounterStore()

  const count = ref(0)

  /* for learning purpose (old code) */
  function increaseCount() {
    count.value++
  }

  function decreaseCount() {
    count.value--
  }

</script>

<style>
  .count {
    font-size: 60px;
    margin: 20px;
  }
  .buttons button {
    font-size: 40px;
    margin: 10px;
  }
</style>