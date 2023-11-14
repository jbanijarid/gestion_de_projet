
<script setup>
import TaskCard from '../components/TaskCard.vue';
import Draggable from 'vuedraggable';
import { ref } from 'vue';
import tasksData from '../data/tasks.js';
import Kanban from '../components/Kanban.vue';

const tasks = ref(tasksData);

//TODO: ça marche mais avec bug 
const onDragEnd = (etat, movedTask) => {
    const taskId = movedTask.originalTarget.__vnode.ctx.props.id;
    tasks.value.forEach((task, index) => {
        if (task.id === taskId) {
            tasks.value[index].etat = etat;
        }
    });
};


</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="task-column" data-etat="todo">
                    <h3>To Do</h3>
                    <draggable :list="tasks.filter(task => task.etat === 'todo')" @drop="movedTask => onDragEnd('todo', movedTask)" group="tasks" tag="div" item-key="id">
                        <template #item="{ element }">
                            <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" />
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" data-etat="progress">
                    <h3>In Progress</h3>
                    <draggable :list="tasks.filter(task => task.etat === 'progress')" @drop="movedTask => onDragEnd('progress', movedTask)" group="tasks" tag="div" item-key="id">
                        <template #item="{ element }">
                            <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" />
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" data-etat="done">
                    <h3>Done</h3>
                    <draggable :list="tasks.filter(task => task.etat === 'done')" @drop="movedTask => onDragEnd('done', movedTask)" group="tasks" tag="div" item-key="id">
                        <template #item="{ element }">
                            <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" />
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
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
  