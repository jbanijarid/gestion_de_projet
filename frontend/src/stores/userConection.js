
import { defineStore } from 'pinia'
import { ref ,computed } from 'vue';

export const useUserStore = defineStore('user-connection', () => {
    const user = ref(null);
    const connected = ref(false);
    
    const userInfo = computed(() =>user.value);
    const getUseeId = computed(() =>user.value?._id);

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

    
    return {getUseeId, user, connected,userInfo,setUser, isConnected, connecte, deConnecte }
});