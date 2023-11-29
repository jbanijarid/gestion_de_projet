<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { api } from '../../http-api.js';
import { useUserStore } from '../stores/userConection';
const store = useUserStore();
const isOwner = store.isOwner;
const emit = defineEmits(['taskDeleted']);
const props = defineProps({
    id: String,
    name: String,
    description: String,
    projectId: String,
    state: String
});

const states = ref([
    { text: 'todo', value: 'todo' },
    { text: 'progress', value: 'progress' },
    { text: 'done', value: 'done' }
])

const isEditMode = ref(false);
const editedName = ref(props.name);
const editedDescription = ref(props.description);
const editedState = ref(props.state);
const deleting = ref(false);

const enterEditMode = () => {
    isEditMode.value = true;
};

const exitEditMode = async () => {
    // Update the task in the database
    if (editedName.value === ""){
        alert("can't create or modify a task with a void name");
        return ;
    }
    isEditMode.value = false;
    try {
        if (!props.id) {
            const body = {
                name: editedName.value,
                description: editedDescription.value,
                project:props.projectId,
                state: editedState.value
            }
            await api.addTask(body);
        } else {
            console.log("not new !");
            await api.updateTask(props.id, {
                name: editedName.value,
                description: editedDescription.value,
                // state: editedState.value
            });
        }
        // Optional: You can emit an event or perform other actions after a successful update
    } catch (error) {
        console.error('Failed to update task:', error);
        // Handle the error (e.g., show a notification to the user)
    }
};
const deleteTaskMode = () => {
    deleting.value = true;
}
const disableDeleteMode = () => {
    deleting.value = false;
}

const deleteTask = async () => {
    try {
        if(props.id){
            await api.deleteTask(props.id);
        }
        emit('taskDeleted', props.id);

    } catch (error) {
        console.log(error);
    }
}


</script>

<template>
    <div class="task-card">
        <div class="header">
            <b-row v-if="!deleting">
                <b-col cols="9">
                    <h3 v-if="!isEditMode">{{ editedName }}</h3>
                    <input v-else v-model="editedName" />
                </b-col>
                <b-col cols="3" v-if="isOwner">
                    <p v-if="!isEditMode" @click="enterEditMode">
                        <font-awesome-icon icon="pen-to-square" class="icon" />
                        <!-- &#128221; -->
                    </p>
                    <div class="edit" v-else>
                        <p @click="deleteTaskMode" id="trash">
                            <font-awesome-icon icon="trash" class="edit-icon" />
                        </p>
                        <p @click="exitEditMode">
                            <!-- &#128190; -->
                            <font-awesome-icon icon="floppy-disk" class="edit-icon" />
                        </p>
                    </div>
                </b-col>
            </b-row>
            <b-row v-else>
                <h3>Delete Task</h3>
            </b-row>
        </div>
        <div class="content">
            <div v-if="!deleting">
                <p v-if="!isEditMode">{{ editedDescription }}</p>
                <textarea v-else v-model="editedDescription"></textarea>
            </div>
            <h5 v-else>you sure that you want to delete {{ editedName }} task ?</h5>
        </div>
        <div class="footer">
            <div class="info" v-if="!deleting">
                <!-- <p v-if="!isEditMode">{{ editedState }}</p> -->
                <!-- <select v-else v-model="editedState">
                    <option v-for="option in states" :value="option.value">
                        {{ option.text }}
                    </option>
                </select> -->
            </div>
            <div v-else class="conferm">
                <b-button variant="danger" class="btn" @click="deleteTask"> delete </b-button>
                <b-button variant="success" class="btn" @click="disableDeleteMode"> cancel </b-button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.task-card {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    position: relative;
}

.task-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.header {
    background-color: #2c3e50;
    color: #fff;
    padding: 12px;
    border-bottom: 1px solid #2980b9;
    position: relative;
}

.icon,
.edit {
    cursor: pointer;
    font-size: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 1rem;

}

.edit {
    /* width: 24px; */
    display: flex;
    flex-direction: row;
}

.edit-icon {
    margin-right: 0.5em;
}

#trash {
    /* position: absolute; */
    right: 0;
    top: 0;
    margin-left: 0.4em;
    /* Add a margin to separate the trash icon */
    color: #f0575fc6;
}

#trash:hover {
    color: #f0575f;
}

.header h3 {
    margin: 0;
    font-size: 1.5rem;
}

.content {
    padding: 1rem;
    font-size: 16px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-top: 1px solid #e2e2e2;
}

.conferm {
    margin-left: 40%;
}

.conferm>.btn {
    margin-left: 5px;
}

.info p {
    margin: 0;
    font-size: 14px;
    color: #555;
}

input,
textarea,
select {
    width: 100%;
    height: 3em;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
    font-size: 16px;
    background-color: #ffffff;
    color: #2c3e50;
}

@media screen and (min-width: 600px) {
    .task-card {
        width: 300px;
    }
}
</style>

