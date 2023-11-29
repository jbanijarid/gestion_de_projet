<script setup>
import { onMounted, defineProps, ref } from 'vue';
import { api } from '../../http-api';
import Kanban from '../components/Kanban.vue';
import router from '../router';
import { useProjectStore } from "../stores/project";

const projectStore = useProjectStore();

const props = defineProps(['projectId']);

const project = ref(null);
const newMemberUsername = ref('');
const message = ref(null);

onMounted(async () => {
  try {
    await fetchProjectDetails();
  } catch (error) {
    console.error('Failed to fetch project details:', error);
    // Handle error (e.g., show a notification to the user)
  }
});

const fetchProjectDetails = async () => {
  const response = await api.getProjectById(props.projectId);
  await projectStore.setProjectId(props.projectId);
  project.value = response.data;
};

const getRandomEmoji = () => {
  const min = 128512;
  const max = 128567;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return `&#${randomNum}`;
};

const addMemberToProject = async () => {
  try {
    if (newMemberUsername.value !== '') {
      const resp = await api.getUserByName(newMemberUsername.value);
      console.log(resp.data._id);
      const response = await api.addProjectMember(props.projectId, { memberId: resp.data._id });
      newMemberUsername.value = '';
      await fetchProjectDetails();
    }
  } catch (error) {
    console.error('Failed to add a new member to the project:', error);
    message.value = 'error mesage ';
  }
};

const removeMemberFromProject = async (memberId) => {
  try {
    const response = await api.removeProjectMember(props.projectId, memberId);
    console.log(response);
    await fetchProjectDetails();
  } catch (error) {
    console.error('Failed to remove a member from the project:', error);
  }
};

const goToSprints = async () => {
  // console.log(projectStore.getProjectId());
  router.push({ name: 'sprints', params: { projectId: props.projectId } });
};


</script>

<template>
  <div class="project-details-container">
    <div v-if="project">
      <div class="project-details">

        <h1>{{ project.name }}</h1>
        <div class="create-sprint-container">
          <button class="btn" @click="goToSprints()" id="sp">Go to Sprints</button>
        </div>
        <div class="details">
          <p><strong>Description:</strong> {{ project.description }}</p>
        </div>
        <!-- Display all teamMembers with a random emoji -->
        <div class="team-members">
          <div v-for="member in project.teamMembers" :key="member._id" class="member-card">
            <p v-html="getRandomEmoji()"></p>
            <span class="member-username">{{ member.username }}</span>
            <span class="remove-member-icon" @click="removeMemberFromProject(member._id)">❌</span>
          </div>
        </div>
        <!-- Add a new member to the project -->
        <div class="add-member-section">
          <input v-model="newMemberUsername" placeholder="New Member Username" class="new-member-input" />
          <button @click="addMemberToProject" class="btn">Add Member</button>
        </div>
      </div>
      <Kanban :id-project="props.projectId" />
    </div>

    <div v-else>
      <!-- Handle loading or error state -->
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
  </div>
</template>
  
  
<style scoped>
.project-details-container {
  max-width: 10000px;
  margin: 0 auto;
  padding: 20px;
}

.project-details {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details {
  margin-bottom: 20px;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
}

.member-card {
  margin: 0 10px 10px 0;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.member-card p {
  margin: 0;
  margin-right: 10px;
}

.member-username {
  font-weight: bold;
}

.add-member-section {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.new-member-input {
  flex-grow: 1;
  margin-right: 10px;
}

.kanban-title {
  margin-top: 20px;
  font-size: 24px;
}

.create-sprint-container {
  position: relative;
}

#sp {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
}
</style>
  