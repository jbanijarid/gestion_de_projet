
<script setup>
import TaskCard from '../components/TaskCard.vue';
import Draggable from 'vuedraggable';
import { ref } from 'vue';
import tasksData from '../data/tasks.js';
import Kanban from '../components/Kanban.vue';

const tasks = ref(tasksData);


const onDragEnd = (etat, movedTask) => {
    // console.log(movedTask.item.__draggable_context.element.id)
    const taskId = movedTask.item.__draggable_context.element.id;

console.log(etat);
    tasks.value.forEach((task, index) => {
        if (task.id === taskId) {
            tasks.value[index].etat = etat;
            // console.log(tasks.value[index].etat);
        }
    });

    // Assurez la réactivité en forçant une mise à jour
    // tasks.value = [...tasks.value];
};






</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="task-column" >
                    <h3>To Do</h3>
                    <draggable :list="tasks.filter(task => task.etat === 'todo')" itemKey="task => task.id" @end="movedTask => onDragEnd('todo', movedTask)">>
                        <template #item="{ element }">
                            <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" />
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" >
                    <h3>In Progress</h3>
                    <draggable :list="tasks.filter(task => task.etat === 'progress')" itemKey="task => task.id" @end="movedTask => onDragEnd('progress', movedTask)">
                        <template #item="{ element }">
                            <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" />
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" >
                    <h3>Done</h3>
                    <draggable :list="tasks.filter(task => task.etat === 'done')" itemKey="task => task.id" @end="movedTask => onDragEnd('done', movedTask)">>
                        <template #item="{ element }">
                            <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" />
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
    <!-- <kanban :tasks="tasks" /> -->
</template>
  

  
<style>
.task-column {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-card {
    margin-bottom: 10px;
}
</style>
  