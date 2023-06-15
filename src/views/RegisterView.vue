<template>
    <div id="Register">
        <div class="w-full p-6 flex justify-center items-center">
            <div class="w-full max-w-xs">
                <div class="bg-black p-8 shadow rounded p-6">
                    <h1 class="mb-6 text-lg text-gray-300 font-thin">Let's get rocking!</h1>
                    <div class="mb-4">
                        <TextInput label="First Name" :labelColor="false" placeholder="John" v-model:input="firstName" inputType="text" :error="errors.first_name ? errors.first_name[0] : ''"  />
                    </div>

                    <div class="mb-4">
                        <TextInput label="Last Name" :labelColor="false" placeholder="Doe" v-model:input="lastName" inputType="text" :error="errors.last_name ? errors.last_name[0] : ''"  />
                    </div>

                    <div class="mb-4">
                        <TextInput label="Email" :labelColor="false" placeholder="john.doe@example.org" v-model:input="email" inputType="email" :error="errors.email ? errors.email[0] : ''"  />
                    </div>

                    <div class="mb-4">
                        <TextInput label="Password" :labelColor="false" placeholder="password" v-model:input="password" inputType="password" :error="errors.password ? errors.password[0] : ''"  />
                    </div>

                    <div class="mb-4">
                        <TextInput label="Confirm Password" :labelColor="false" placeholder="password" v-model:input="confirmPassword" inputType="password" />
                    </div>
                    
                    <button class="block w-full bg-green-600 text-white rounded-sm py-3 text-sm tracking-wide" type="submit" @click="register">Register</button>
                </div>
                <p class="text-center text-md text-gray-900">
                    Already have an account?
                    <router-link to="login" class="text-blue-600 no-underline hover:underline">
                        Login
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '@/components/global/TextInput.vue';
import axios from 'axios';
import { useUserStore } from '../store/user-store';
import { useProfileStore } from '@/store/profile-store';
import { useSongStore } from '@/store/song-store';
import { usePostStore } from '@/store/post-store';
import { useVideoStore } from '@/store/video-store';
import { useRouter } from 'vue-router';

let errors = ref([]);
let firstName = ref(null);
let lastName = ref(null);
let email = ref(null);
let password = ref(null);
let confirmPassword = ref(null);

const router = useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const postStore = usePostStore();
const videoStore = useVideoStore();

const register = async () => {
    errors.value = [];
    try {
        let res = await axios.post('api/register', {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value
        });
        userStore.setUserDetails(res);
        await profileStore.fetchProfileById(userStore.id);
        await songStore.fetchSongsByUserId(userStore.id);
        await postStore.fetchPostsByUserId(userStore.id);
        await videoStore.fetchVideosByUserId(userStore.id);
        router.push('account/profile/' + userStore.id);
    }catch (err) {
        errors.value = err.response.data.errors;
    }
}
</script>

<style lang="scss">

</style>