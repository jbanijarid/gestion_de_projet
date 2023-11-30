<script setup>
import { onMounted, defineProps, ref } from 'vue';
import { api } from '../../http-api';
import Kanban from '../components/Kanban.vue';
import router from '../router';
import { useProjectStore } from "../stores/project";
import { useUserStore } from '../stores/userConection';

const projectStore = useProjectStore();
const store = useUserStore();
const props = defineProps(['projectId']);
const isOwner = ref(false);
const project = ref(null);
const newMemberUsername = ref('');
const removeMemberUsername = ref('');
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
  isOwner.value = store.getUseeId == project.value.owner;
  store.setOwner(isOwner.value);
};

const addMemberToProject = async () => {
  try {
    if (newMemberUsername.value !== '') {
      const resp = await api.getUserByName(newMemberUsername.value);
      // console.log(resp.data._id);
      const response = await api.addProjectMember(props.projectId, { memberId: resp.data._id });
      newMemberUsername.value = '';
      await fetchProjectDetails();
    }
  } catch (error) {
    console.error('Failed to add a new member to the project: ', error);
    message.value = 'error mesage ';
  }
};

const removeMemberFromProject = async () => {
  try {
    if (removeMemberUsername.value !== '') {
      const resp = await api.getUserByName(removeMemberUsername.value);
      // console.log(resp.data._id);
      const response = await api.removeProjectMember(props.projectId, resp.data._id );
      removeMemberUsername.value = '';
      await fetchProjectDetails();
    }
    await fetchProjectDetails();
  } catch (error) {
    console.error('Failed to remove a member from the project:', error);
  }
};

const goToSprints = async () => {
  // console.log(projectStore.getProjectId());
  router.push({ name: 'sprints', params: { projectId: props.projectId } });
};


const getRandomType = () => {
  const type = ["secondary", "primary", "dark", "success", "info"];
  return type[Math.floor(Math.random() * type.length + 1)];
}

const getFirstName = (userName) => {
  return userName.split(" ")[0];

}

</script>

<template>
  <div class="project-details-container">
    <div v-if="project">
      <div class="project-info">


        <b-row>
          <b-col cols="7">
            <div class="project-details">
              <h1>{{ project.name }}</h1>
              <!-- <div class="create-sprint-container">
                <button class="btn" @click="goToSprints()" id="sp">Go to Sprints</button>
              </div> -->
              <div class="details">
                <p><strong>Description:</strong> {{ project.description }}</p>
              </div>
            </div>
          </b-col>

          <b-col>
            <div class="team-members">
              <div class="team-members-items">
                <!-- <p v-html="getRandomEmoji()"></p> -->
                <!-- <b-avatar-group size="5rem">
                  <b-avatar v-for="member in project.teamMembers" :key="member._id" :variant="getRandomType()"
                    :text="getfirestName(member.username)" size="4rem"
                    >
                  </b-avatar>
                </b-avatar-group> -->

                <b-avatar-group>
                  <b-avatar v-for="member in project.teamMembers" :key="member._id" :variant="getRandomType()"
                    :text="getFirstName(member.username)" size="4rem">
                  </b-avatar>
                </b-avatar-group>
              </div>
            </div>
          </b-col>

          <b-col>
            <div v-if="isOwner" class="add-remove-section">
              <b-tabs content-class="mt-3" class="">
                <b-tab title="add" active>
                  <div class="add-remove-member-section">
                    <input v-model="newMemberUsername" placeholder="New Member Username" class="new-remove-member-input" />
                    <b-button variant="success" @click="addMemberToProject">Add</b-button>
                  </div>
                </b-tab>
                <b-tab title="remove">
                  <div class="add-remove-member-section">
                    <input v-model="removeMemberUsername" placeholder="Username to remove " class="new-remove-member-input" />
                    <b-button variant="danger" @click="removeMemberFromProject">Remove</b-button>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </b-col>
        </b-row>
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
  max-width: 100vw;
  margin: 0 auto;
  padding: 20px;
}

.project-info {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details {
  margin-bottom: 20px;
}
.add-remove-section {
  font-size: .5em;
}
.add-remove-member-section {
  margin-top: 1em;
  display: flex;
  height: 2em;
  width: .1rem;
}

.new-remove-member-input {
  /* flex-grow: 1; */
  margin-right: .5em;
  width: 9rem;
  font-size: 1em;

}

.create-sprint-container {
  position: relative;
}

.team-members-items {
  display: flex;
  flex-wrap: wrap;
}


.delete-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  cursor: pointer;
  display: none;
}

b-avatar:hover .delete-icon {
  display: block;
}
</style>
  