const project = [
    {
        id: 1,
        name: "project1",
        description : "description1",
        ownerId : 1,
        teamMembers : [
            1,2,3
        ],
    }
]

import {ref} from 'vue';
import { useUserStore } from '../stores/userConection';
import {api} from '../../http-api';


const store = useUserStore();
const userProjects = [];

const getAllProjects = () => {
  api.getAllProjectsByUsername(store.userInfo.username)
    .then((data) => {
      userProjects.push(data.data);
    })
    .catch((e) => {
      console.error(e.message);
    });
};

getAllProjects();

export default userProjects; 
