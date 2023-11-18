const users = [
    {
        id: 1,
        name: "ali",
        rol: "member"
    },
    {
        id: 2,
        name: "nejah",
        rol: "member"
    },
    {
        id: 3,
        name: "jad",
        rol: "member"
    }
]

import { api } from '../../http-api';
import { ref } from 'vue';

const userList = [];
const getAllUser = () => {
    api.getAllUsers()
        .then((data) => {
            userList.push(data.data);
        })
        .catch(e => {
            console.log(e.message);
    });
}

getAllUser();


export default userList; 