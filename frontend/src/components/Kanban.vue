<script setup>
import TaskCard from '../components/TaskCard.vue';
import Draggable from 'vuedraggable';
import Sortable from 'vuedraggable';

const kanbanProps = defineProps({
    tasks: Array
});

let todo = kanbanProps.tasks.filter(task => task.etat === "todo");
let progress = kanbanProps.tasks.filter(task => task.etat === "progress");
let done = kanbanProps.tasks.filter(task => task.etat === "done");

/*const sortable = new Sortable(
    document.querySelectorAll('[sortable]'), {
        draggable: '[sortItem]',
        delay: 0,
    }
);

sortable.on('drag:stop', () => {
	console.log('drag:stop')
})*/

const onDrop = (etat) => (event) => {
    console.log("test");
    const taskId = event.dataTransfer.getData('task-id');
    const taskIndex = kanbanProps.tasks.value.findIndex((task) => task.id === parseInt(taskId, 10));

    if (taskIndex !== -1) {
        if (kanbanProps.tasks.value[taskIndex].etat !== etat) {
            // Change the etat only if the task is dropped into a different column
            kanbanProps.tasks.value[taskIndex].etat = etat;
        }
    }
};

const onDragEnd = (event) => {
    // Handle drag end if needed
};
</script>



<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="task-column" @drop="onDrop('todo')">
                    <h3>To Do</h3>
                    <draggable :list="todo" :group="{name: 'my-group', put: true}">
                        <template #item="{ element }">
                            <div>
                                <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" sortItem/>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" @drop="onDrop('progress')">
                    <h3>In Progress</h3>
                    <draggable :list="progress" :group="{name: 'my-group', put: true}">
                        <template #item="{ element }">
                            <div>
                                <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" sortItem/>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" @drop="onDrop('done')">
                    <h3>Done</h3>
                    <draggable :list="done" :group="{name: 'my-group', put: true}">
                        <template #item="{ element }">
                            <div>
                                <task-card :id="element.id" :name="element.name" :description="element.description"
                                :project-id="element.projectId" :etat="element.etat" sortItem/>
                            </div>
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

