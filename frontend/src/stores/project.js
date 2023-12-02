// project.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
  const state = {
    projectId: null,
    isSprint: false
  };

  const setProjectId = (id) => {
    state.projectId = id;
  };

  const getProjectId = () => {
    return state.projectId;
  };

  const setIsSprint = (bool) => {
    state.isSprint = bool;
  }

  const getIsSprint = () => {
    return state.isSprint;
  }

  return { setProjectId, getProjectId, setIsSprint, getIsSprint };
});
