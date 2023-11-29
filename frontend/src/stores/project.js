// project.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
  const state = {
    projectId: null,
  };

  const setProjectId = (id) => {
    state.projectId = id;
  };

  const getProjectId = () => {
    return state.projectId;
  };

  return { setProjectId, getProjectId };
});
