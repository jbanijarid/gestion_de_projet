<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../http-api';
import TaskCard from '../components/TaskCard.vue';
import Draggable from 'vuedraggable';

const taskList = ref([]);

onMounted(async () => {
  await fetchTasks();
});

const fetchTasks = async () => {
  const resp = await api.getTasks();
  taskList.value = resp.data;
};

const handleTaskDeleted = (taskId) => {
  // Update the local taskList by filtering out the deleted task
  taskList.value = taskList.value.filter(task => task._id !== taskId);
};



const onDragEnd = (etat, movedTask) => {
    // const taskId = movedTask.originalTarget.__vnode.ctx.props.id;
    const taskId = movedTask.target.__vnode.ctx.props.id;
    taskList.value.forEach((task, index) => {
        if (task._id === taskId) {
          console.log(task.state);
          taskList.value[index].state = etat;
          console.log(task.name);
          console.log(task.description);
          console.log(task.state);

        }
    });

};

const rowDrag = (movedTask) =>{

};
</script>

<template>
  <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="task-column" data-etat="todo">
                    <h3>To Do</h3>
                    <draggable :list="taskList.filter(task => task.state === 'todo')" @drop="movedTask => onDragEnd('todo', movedTask)" group="taskList" tag="div">
                        <template #item="{ element }">
                          <TaskCard
                          :key="element._id"
                          :id="element._id"
                          :name="element.name"
                          :description="element.description"
                          :project-id="element.project"
                          :state="element.state"
                          @taskDeleted="handleTaskDeleted"
                        /> 
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" data-etat="progress">
                    <h3>In Progress</h3>
                    <draggable :list="taskList.filter(task => task.state === 'progress')" @drop="movedTask => onDragEnd('progress', movedTask)" group="taskList" tag="div">
                        <template #item="{ element }">
                          <TaskCard
                          :key="element._id"
                          :id="element._id"
                          :name="element.name"
                          :description="element.description"
                          :project-id="element.project"
                          :state="element.state"
                          @taskDeleted="handleTaskDeleted"
                        /> 
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="col-md-4">
                <div class="task-column" data-etat="done">
                    <h3>Done</h3>
                    <draggable :list="taskList.filter(task => task.state === 'done')" @drop="movedTask => onDragEnd('done', movedTask)" group="taskList" tag="div">
                      <template #item="{ element }">
                        <TaskCard
                          :key="element._id"
                          :id="element._id"
                          :name="element.name"
                          :description="element.description"
                          :project-id="element.project"
                          :state="element.state"
                          @taskDeleted="handleTaskDeleted"
                        /> 
                      </template>
                    </draggable>
                </div>
            </div>
        </div>
  </div>
</template>

<style scoped>
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
