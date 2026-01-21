
<script lang="ts" setup>

    // imports
    import type { Task } from '../types';
    
    // variables
    const props = defineProps<{
        tasks: Task[];
    }>();

    // functions
    const emits = defineEmits<{
        toggleDone: [id: string]
    }>();

</script>

<template>
    <div class="task-list">
        <article v-for="task in props.tasks" :key="task.id">
            <label>
                <input 
                    @input="emits('toggleDone', task.id)"
                    :checked="task.done"
                    type="checkbox"
                >
                <span :class="{ done: task.done }">
                    {{ task.title }}
                </span>
            </label>
        </article>
    </div>
</template>

<style>
    .task-list {
        margin-top: 1rem;
    }

</style>