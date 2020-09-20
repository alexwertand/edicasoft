<template>
    <b-row
        class="user-item row mb-2"
        :class="{'inactive': inactive}">
        <b-input-group
            class="col-12 col-md-4 col-lg-3 mt-3">
            <b-form-input
                v-model.trim="$v.userData.name.$model"
                placeholder="Enter your name" />

            <div class="error" v-if="$v.userData.name.$error">Required! Min 4 characters!</div>
        </b-input-group>

        <b-input-group
            class="col-12 col-md-4 col-lg-3 mt-3">
            <b-form-input
                v-model.trim="$v.userData.email.$model"
                placeholder="Enter your email"
                type="email" />

            <div class="error" v-if="$v.userData.email.$error">Required! Invalid email!</div>
        </b-input-group>

        <b-input-group
            class="col-12 col-md-4 col-lg-3 mt-3">
            <b-form-input
                v-model.trim="$v.userData.city.$model"
                placeholder="Enter your city"/>

                <div class="error" v-if="$v.userData.city.$error">Required! Min 1 characters!</div>
        </b-input-group>

        <b-input-group
            class="col-12 col-md-12 col-lg-3 justify-content-center justify-content-md-end mt-3 mb-3"
            :class="{'inactive': inactiveCreateBtn}">
            <b-button
                variant="success"
                @click="createUser"
                >CreateUser</b-button>
        </b-input-group>
    </b-row>
</template>

<script>
    import { required, email, minLength } from 'vuelidate/lib/validators';

    let data = {
        name: '',
        email: '',
        city: ''
    }

    export default {
        data() {
            return {
                userData: {},
                inactive: false,
                inactiveCreateBtn: true
            }
        },
        validations: {
            userData: {
                name: {
                    required,
                    minLength: minLength(4)
                },
                email: {
                    required,
                    email
                },
                city: {
                    required,
                    minLength: minLength(1)
                }
            }
        },
        created() {
            this.setData();

            this.$store.subscribe((mutation, state) => {
                if (mutation.type == 'addUser') {
                    this.setData();
                    this.inactive = false;
                }
            });
        },
        watch: {
            userData: {
                handler(newVal, oldVal) {
                    let isTyped = [];
                    
                    Object.keys(data).forEach(key => {
                        isTyped.push(this.$v.userData[key].$anyDirty);
                    })

                    if (isTyped.indexOf(false) == -1 &&
                        !this.$v.userData.name.$error &&
                        !this.$v.userData.email.$error &&
                        !this.$v.userData.city.$error) {
                            if (this.inactiveCreateBtn) this.inactiveCreateBtn = false;
                        } else {
                            this.inactiveCreateBtn = true;
                        }
                },
                deep: true
            }
        },
        methods: {
            setData() {
                Object.keys(data).forEach(key=> {
                    this.$set(this.userData, key, data[key]);
                });
            },
            createUser() {
                this.inactive = true;

                let sendData = {
                    id: new Date().valueOf(),
                    name: this.userData.name,
                    email: this.userData.email,
                    address: {
                        "city": this.userData.city
                    },
                }

                this.$store.dispatch('createUser', sendData);
            }
        }
    }
</script>