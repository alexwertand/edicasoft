<template>
    <b-container>
        <h1>List of users</h1>
        
        <b-row>
            <b-container class="justify-content-md-center">
                <template v-for="user in users">
                    <user
                        :id="user.id"
                        :email="user.email"
                        :name="user.name"
                        :city="user.address.city"
                        :key="user.id"
                    />
                </template>

                <create-user/>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
    import User from './User';
    import CreateUser from './CreateUser';

    export default {
        components: {
            User, CreateUser
        },
        created() {
            this.$store.dispatch('getUsers');
        },
        computed: {
            users() {
                return this.$store.state.users;
            },
        }
    }
</script>

<style>
    .user-item {
        background-color: #f0f8ff;
    }

    .inactive  {
        opacity: 0.5;
        pointer-events: none;
    }

    .error {
        position: absolute;
        left: 15px;
        bottom: -1px;
        font-size: 10px;
        color: red;
    }
</style>