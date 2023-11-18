
import { defineStore } from 'pinia'
import { ref ,computed } from 'vue';

export const useUserStore = defineStore('user-connection', () => {
    const user = ref(null);
    const connected = ref(false);
    
    const userInfo = computed(() =>user.value);
    const getUserName = computed(() =>user.value?.username);

    const setUser = (userData) => {
        user.value = userData ;
    }
    
    const isConnected = computed(() => connected.value);
    const connecte = () => {
        connected.value = true;
        console.log('store connect ! ');
    }
    const deConnecte = () => {
        connected.value = false;
    }

    
    return {getUserName, user, connected,userInfo,setUser, isConnected, connecte, deConnecte }
});