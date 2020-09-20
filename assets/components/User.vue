<template>
    <b-row
        class="user-item row mb-2"
        :class="{'inactive': inactive}">
        <b-input-group
            class="col-12 col-md-4 col-lg-3 mt-3">
            <b-form-input
                v-model="userData.name"
                placeholder="Enter your name" />

            <div class="error" v-if="$v.userData.name.$invalid">Required! Min 4 characters!</div>
        </b-input-group>

        <b-input-group
            class="col-12 col-md-4 col-lg-3 mt-3">
            <b-form-input
                v-model="userData.email"
                placeholder="Enter your email"
                type="email" />

            <div class="error" v-if="$v.userData.email.$invalid">Required! Invalid email!</div>
        </b-input-group>

        <b-input-group
            class="col-12 col-md-4 col-lg-3 mt-3">
            <b-form-input
                v-model="userData.city"
                placeholder="Enter your city" />

                <div class="error" v-if="$v.userData.email.$invalid">Required! Min 1 characters!</div>
        </b-input-group>

        <b-input-group
            class="col-12 col-md-12 col-lg-3 justify-content-center justify-content-md-end mt-3 mb-3">
            <b-button
                variant="danger"
                @click="deleteUser"
                >DeleteUser</b-button>

            <b-button
                class="ml-3"
                :class="{'inactive': inactiveUpdateBtn}"
                variant="success"
                @click="updateUser"
                >Update</b-button>
        </b-input-group>
    </b-row>
</template>

<script>
    import { required, email, minLength} from 'vuelidate/lib/validators';

    let data = {
        name: '',
        email: '',
        city: ''
    }

    export default {
        props: {
            id: {
                type: Number,
                default: null
            },
            email: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            city: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                userData: {
                    name: this.name,
                    email: this.email,
                    city: this.city,
                },
                inactive: false,
                inactiveUpdateBtn: true
            }
        },
        created() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type == 'updateUser') {
                    this.inactive = false;
                    this.inactiveUpdateBtn = true;
                }
            });
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
                }
            }
        },
        watch: {
            userData: {
                handler(newVal, oldVal) {
                    let isTyped = [];
                    
                    Object.keys(data).forEach(key => {
                        isTyped.push(this.$v.userData[key].$invalid);
                    })

                    if (isTyped.indexOf(true) == -1 &&
                        !this.$v.userData.name.$invalid && 
                        !this.$v.userData.email.$invalid &&
                        !this.$v.userData.city.$invalid) {
                            if (this.inactiveUpdateBtn) this.inactiveUpdateBtn = false;
                        } else {
                            this.inactiveUpdateBtn = true;
                        }
                },
                deep: true
            }
        },
        methods: {
            updateUser() {
                this.inactive = true;

                this.$store.dispatch('updateUser', {
                    id: this.id,
                    data: {
                        name: this.userData.name,
                        email: this.userData.email,
                        address: {
                            "city": this.userData.city
                        },
                    }
                });
            },
            deleteUser() {
                this.inactive = true;
                this.$store.dispatch('deleteUser', this.id);
            }
        }
    }
</script>