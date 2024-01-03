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
const notInSprintTaskList = ref([]);

const props = defineProps(['projectId']);

onMounted(async () => {
  await fetchTasks();
});

const fetchTasks = async () => {
  try {
    if (projectStore.getIsSprint() === false) {
      const resp = await api.getAllTasksByProjectId(props.projectId);
      taskList.value = resp.data;
    } else {
      const resp = await api.getTasksBySprintId(props.projectId);
      taskList.value = resp.data;
      const sprint = await api.getSprintById(props.projectId);
      const projectTasks = await api.getAllTasksByProjectId(sprint.data.project);
      const sprintTasks = taskList.value.map(task => task._id);
      notInSprintTaskList.value = projectTasks.data.filter(task => !sprintTasks.includes(task._id));
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
  }
};

const handleTaskDeleted = async (taskId) => {
  // Update the local taskList by filtering out the deleted task
  taskList.value = taskList.value.filter(task => task._id !== taskId);
  if (projectStore.getIsSprint()) {
    const task = await api.getTaskById(taskId);
    notInSprintTaskList.value.push(task.data);
  }
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
  if (projectStore.getIsSprint() === true) {
    const sprint = await api.getSprintById(id);
    id = sprint.data.project;
  }
  console.log(id);
  const body = {
    name: "",
    description: "",
    project: id,
    state: type
  }
  taskList.value.push(body);
};

const addExistingTask = async () => {
  const select = document.getElementById("tasklist");
  const taskId = select.options[select.selectedIndex].value;
  await api.addTaskToSprint(props.projectId, taskId);
  notInSprintTaskList.value = notInSprintTaskList.value.filter(task => task._id !== taskId);
  const task = await api.getTaskById(taskId);
  taskList.value.push(task.data);
}
</script>

<template>
  <div class="container-fluid">

    <div v-if="projectStore.getIsSprint()" class="project-task-list">
      <select class="select-bar" id="tasklist">
        <option v-for="task in notInSprintTaskList" v-bind:value="task._id">
          {{ task.name }}
        </option>
      </select>
      <b-button variant="success" class="btn" @click="addExistingTask">Add task</b-button>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="task-column" id="todo" data-etat="todo">
          <h3>To Do</h3>
          <draggable :list="taskList.filter(task => task.state === 'todo')"
            @drop="movedTask => onDragEnd('todo', movedTask)" group="taskList" tag="div" :item-key="task => task._id">
            <template #item="{ element }">
              <TaskCard :key="element._id" :id="element._id" :name="element.name" :description="element.description"
                :project-id="element.project" :state="element.state" :members="element.distributeTo"
                @taskDeleted="handleTaskDeleted" />
            </template>
          </draggable>
          <div v-if="isOwner" class="add-new-task" @click="addNewTask('todo')">+ add new task</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="task-column" id="progress" data-etat="progress">
          <h3>In Progress</h3>
          <draggable :list="taskList.filter(task => task.state === 'progress')"
            @drop="movedTask => onDragEnd('progress', movedTask)" group="taskList" tag="div" :item-key="task => task._id">
            <template #item="{ element }">
              <TaskCard :key="element._id" :id="element._id" :name="element.name" :description="element.description"
                :projectId="element.project" :state="element.state" :members="element.distributeTo"
                @taskDeleted="handleTaskDeleted" />
            </template>
          </draggable>
          <div v-if="isOwner" class="add-new-task" @click="addNewTask('progress')">+ add new task</div>
        </div>

      </div>
      <div class="col-md-4">
        <div class="task-column" id="done" data-etat="done">
          <h3>Done</h3>
          <draggable :list="taskList.filter(task => task.state === 'done')"
            @drop="movedTask => onDragEnd('done', movedTask)" group="taskList" tag="div" :item-key="task => task._id">
            <template #item="{ element }">
              <TaskCard :key="element._id" :id="element._id" :name="element.name" :description="element.description"
                :project-id="element.project" :state="element.state" :members="element.distributeTo"
                @taskDeleted="handleTaskDeleted" />
            </template>
          </draggable>
          <div v-if="isOwner" class="add-new-task" @click="addNewTask('done')">+ add new task</div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-column {
  /* border: 1px solid #ddd; */
  padding: 5px;
  margin: .5rem 3rem 1rem 0;
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  width: 18vw;
}

.task-card {
  margin-bottom: 10px;
}

.add-new-task {
  cursor: pointer;
  font-size: 16px;
  color: var(--text-primary);
}

.add-new-task:hover {
  color: var(--text-light);
}

.project-task-list {
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
}

.select-bar {
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: var(--text-light);
}

.project-task-list .btn {
  margin-left: 10px;
}

#todo {
  background-image: linear-gradient(to right bottom, rgba(4, 174, 212, 0.7), rgba(2, 130, 83, 0.067));
}

#progress {
  background-image: linear-gradient(to right bottom, rgba(212, 139, 4, 0.7), rgba(2, 130, 83, 0.067));
}

#done {
  background-image: linear-gradient(to right bottom, rgba(4, 212, 136, 0.7), rgba(2, 130, 83, 0.067));
}</style>
