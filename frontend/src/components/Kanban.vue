<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../http-api';
import TaskCard from '../components/TaskCard.vue';
import Draggable from 'vuedraggable';
import { useUserStore } from '../stores/userConection';
import { useProjectStore } from '../stores/project';
const store = useUserStore();
const projectStore = useProjectStore();
const isOwner = store.isOwner;
const taskList = ref([]);

const props = defineProps(['projectId']);

onMounted(async () => {
  await fetchTasks();
});

const fetchTasks = async () => {
  try {
    if(projectStore.getIsSprint() === false){
      const resp = await api.getAllTasksByProjectId(props.projectId);
      taskList.value = resp.data;
    } else {
      const resp = await api.getTasksBySprintId(props.projectId);
      taskList.value = resp.data;
    }
    
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
  }
};

const handleTaskDeleted = (taskId) => {
  // Update the local taskList by filtering out the deleted task
  taskList.value = taskList.value.filter(task => task._id !== taskId);
};


const onDragEnd = async (etat, movedTask) => {
  try {
    const taskId = movedTask.target.__vnode.ctx.props.id;
    const taskIndex = taskList.value.findIndex(task => task._id === taskId);

    if (taskIndex !== -1) {
      taskList.value[taskIndex].state = etat;
      await api.updateTask(taskId, { state: etat });
    }
  } catch (error) {
    console.error('Erreur lors du déplacement de la tâche:', error);
  }
};

const addNewTask = async (type) => {
  let id = props.projectId;
  if(projectStore.getIsSprint() === true){
    const sprint = await api.getSprintById(id);
    id = sprint.data.project;
  }
  console.log(id);
  const body = {
    name:"",
    description:"",
    project: id,
    state:type
  }
  taskList.value.push(body);
};
</script>

<template>
  <div class="container-fluid">
    <div v-if="projectStore.getIsSprint()" class="projectTaskList">
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="task-column" data-etat="todo">
          <h3>To Do</h3>
          <draggable :list="taskList.filter(task => task.state === 'todo')"
            @drop="movedTask => onDragEnd('todo', movedTask)" group="taskList" tag="div" :item-key="task => task._id">
            <template #item="{ element }">
              <TaskCard :key="element._id" :id="element._id" :name="element.name" :description="element.description"
                :project-id="element.project" :state="element.state" :members="element.distributeTo" @taskDeleted="handleTaskDeleted" />
            </template>
          </draggable>
          <div v-if="isOwner"  class="addNewTask" @click="addNewTask('todo')">+ add new task</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="task-column" data-etat="progress">
          <h3>In Progress</h3>
          <draggable :list="taskList.filter(task => task.state === 'progress')"
            @drop="movedTask => onDragEnd('progress', movedTask)" group="taskList" tag="div" :item-key="task => task._id">
            <template #item="{ element }">
              <TaskCard :key="element._id" :id="element._id" :name="element.name" :description="element.description"
                :projectId="element.project" :state="element.state" :members="element.distributeTo" @taskDeleted="handleTaskDeleted" />
            </template>
          </draggable>
          <div v-if="isOwner" class="addNewTask" @click="addNewTask('progress')">+ add new task</div>
        </div>

      </div>
      <div class="col-md-4">
        <div class="task-column" data-etat="done">
          <h3>Done</h3>
          <draggable :list="taskList.filter(task => task.state === 'done')"
            @drop="movedTask => onDragEnd('done', movedTask)" group="taskList" tag="div" :item-key="task => task._id">
            <template #item="{ element }">
              <TaskCard :key="element._id" :id="element._id" :name="element.name" :description="element.description"
                :project-id="element.project" :state="element.state" :members="element.distributeTo" @taskDeleted="handleTaskDeleted" />
            </template>
          </draggable>
          <div v-if="isOwner"  class="addNewTask" @click="addNewTask('done')">+ add new task</div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-column {
  border: 1px solid #ddd;
  padding: 5px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 75%;
}

.task-card {
  margin-bottom: 10px;
}
.addNewTask {
  cursor: pointer;
  font-size: 16px;
  color: var(--text-primary);
}
.addNewTask:hover {
  color: var( --text-light);
}
</style>
