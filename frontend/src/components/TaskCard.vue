<template>
    <div class="task-card" :class="{ 'edit-mode': editMode }">
      <div v-if="!editMode" class="header" @click="toggleEditMode">
        <h2>{{ props.name }}</h2>
      </div>
      <div v-else class="header">
        <input v-model="editedName" class="edit-input" />
        <button @click="saveChanges">Save</button>
      </div>
      <div class="content">
        <p v-if="!editMode">{{ props.description }}</p>
        <textarea v-else v-model="editedDescription" class="edit-input"></textarea>
      </div>
      <div class="footer">
        <div class="info">
          <p>Project: {{ project.name }}</p>
          <p>Owner: {{ owner.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import projects from '../data/projects.js';
  import users from '../data/users.js';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    id: Number,
    name: String,
    description: String,
    projectId: Number,
  });
  
  const editMode = ref(false);
  const editedName = ref(props.name);
  const editedDescription = ref(props.description);
  
  const project = computed(() => {
    return projects.find((p) => p.id === props.projectId) || {};
  });
  
  const owner = computed(() => {
    return users.find((user) => user.id === project.value.ownerId) || {};
  });
  
  const toggleEditMode = () => {
    editMode.value = !editMode.value;
    if (!editMode.value) {
      // Reset edited values if not in edit mode
      editedName.value = props.name;
      editedDescription.value = props.description;
    }
  };
  
  const saveChanges = () => {
    // Save changes to parent component or perform any desired action
    // In a real application, you might want to emit an event or call an API to update the data
    console.log('Name:', editedName.value);
    console.log('Description:', editedDescription.value);
    // Toggle back to view mode after saving
    toggleEditMode();
  };
  </script>
  
  <style scoped>
  .task-card {
    /* Your existing styles */
  }
  
  .task-card.edit-mode {
    cursor: text;
  }
  
  .edit-input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
  }
  
  .header {
    cursor: pointer;
  }
  
  .header button {
    margin-left: 8px;
  }
  
  @media screen and (min-width: 600px) {
    .task-card {
      width: 300px;
    }
  }
  </style>
  