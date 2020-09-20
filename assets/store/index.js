import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        users: [],
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        addUser(state, user) {
            state.users.push(user);
        },
        deleteUser(state, id) {
            state.users.forEach((user, index) => {if (user.id == id) state.users.splice(index, 1);
            });
        },
        updateUser(state, user) {
            state.users.forEach((item, index) => {
                if (item.id == user.id) {
                    state.users.splice(index, 1, user);
                }
            });
        },
    },
    actions: {
        getUsers({commit}) {
            axios
                .get('https://jsonplaceholder.typicode.com/users')
                .then(response => {
                    commit('setUsers', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        createUser({commit}, data) {
            axios
                .post('https://jsonplaceholder.typicode.com/users',
                    {
                        body: data,
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }
                )
                .then(response => {
                    commit('addUser', response.data.body);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteUser({commit}, id) {
            axios
                .delete('https://jsonplaceholder.typicode.com/users/' + id)
                .then(response => {
                    commit('deleteUser', id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updateUser({commit}, data) {
            axios
                .put('https://jsonplaceholder.typicode.com/users/' + data.id,
                {
                    body: data.data,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => {
                    let user = response.data.body;
                        user.id = response.data.id;

                    commit('updateUser', user);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});

export default store;