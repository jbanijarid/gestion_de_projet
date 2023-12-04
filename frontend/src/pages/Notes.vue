
  
<script setup>
import { onMounted, defineProps, ref } from 'vue';
import { useProjectStore } from "../stores/project";
import { api } from '../../http-api';

const projectStore = useProjectStore();
const note = ref(null);
const gavinNote = ref(0);

let projectId = null;
const averageRating = ref(null);

onMounted(async () => {
    projectId = projectStore.getProjectId();
    await getAllNote();


})
const getAllNote = async () => {
    try {
        const resp = await api.getNotesByProject(projectId);
        console.log("Response from API:", resp.data);
        if (resp.data.length > 0) {
            note.value = resp.data[0].values;
            averageRating.value = computedAverageRating();
        } else {
            // Handle the case when there are no notes
            console.warn("No notes found for the project");
        }
    } catch (error) {
        console.error("Can not get all notes!", error);
    }
}


const addNote = async () => {
    let resp = null
    if (gavinNote) {
        try {
            resp = await api.addNoteToProject(projectId, { value: gavinNote.value });
        } catch {
            const noteResp = await api.creatNote({ projectId: projectId });
            if (noteResp.success) {
                addNote()
            }
        } finally {
            getAllNote();
            gavinNote.value = null;
        }
    }
}

const computedAverageRating = () => {
    console.log("note.value:", note.value);
    if (note.value && note.value.length > 0) {
        console.log("Values in the array:", note.value);
        const sum = note.value.reduce((acc, noteValue) => acc + noteValue, 0);
        console.log("Sum of values:", sum);
        const average = Math.round(sum / note.value.length);
        console.log("Calculated Average:", average);
        return average;
    }
    return 0;
}

const updateRating = (rating) => {
    gavinNote.value = rating;
}

</script>

<template>
    <div class="averageRating">
        <div class="rating">
            <b-row align-h="start">
                <b-col>
                    <span v-for="star in 5" :key="star"
                        :class="{ filled: star <= averageRating, empty: star > averageRating }">
                        &#9733;
                    </span>
                </b-col>
                <b-col>
                    <p>{{ averageRating ? averageRating : 0}}</p>
                </b-col>
                <b-col>
                    total notes : {{ note?.length ?note?.length: 0  }}
                </b-col>
            </b-row>
        </div>
    </div>

    <div class="gavinRating">
        <div class="rating">
            <b-row>

                <b-col>
                    <span v-for="star in 5" :key="star" :class="{ filled: star <= gavinNote, empty: star > gavinNote }"
                        @click="updateRating(star)">
                        &#9733;
                    </span>
                </b-col>
                <b-col>
                    <!-- <p>{{ gavinNote }}</p> -->
                    <b-button variant="success" @click="addNote">Add Note</b-button>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

  
<style scoped>
.averageRating {
    text-align: center;
    margin-bottom: 20px;
}

.gavinRating {
    text-align: center;
    margin-top: 20px;
}

.rating {
    font-size: 24px;
    cursor: pointer;
}

.filled {
    color: #FFD700; /* Gold color for filled stars */
}

.empty {
    color: #ccc; /* Color for empty stars */
    cursor: pointer;
}

.star {
    margin-right: 5px;
}

/* Hover effect for stars */
.filled:hover, .empty:hover {
    transform: scale(1.2);
}

/* Responsive design */
@media (max-width: 768px) {
    .rating {
        font-size: 18px;
    }
}

/* Button styling */
.b-button {
    margin-top: 10px;
    font-size: 16px;
}

/* Additional styling for total notes */
.b-col.total-notes {
    font-size: 14px;
    color: #555;
}

</style>
  