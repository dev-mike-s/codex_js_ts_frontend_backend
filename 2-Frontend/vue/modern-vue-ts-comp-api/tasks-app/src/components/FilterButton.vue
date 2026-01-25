
<script lang="ts" setup>

    // imports
    import type { TaskFilter } from '../types';

    // variables
    const props = defineProps<{
        filter: TaskFilter;
        currentFilter: TaskFilter;
    }>();

    // functions
    const emits = defineEmits<{
        setFilter: [filter: TaskFilter];
    }
    >();
    
</script>

<template>

    <button 
        class="secondary" 
        @click="emits('setFilter', props.filter)"
        :class="{ constrast: props.currentFilter === props.filter }"
    >
            {{  props.filter }}
    </button>

</template>

<style scoped>
</style>