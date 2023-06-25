<script setup>
import {reactive } from 'vue'
import { useRouter } from 'vue-router'

import useAuth from '@/composables/useAuth'

const formData = reactive({
    username: '',
    password: ''
})

const router = useRouter()

const login = () => {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(res => res.json())
    .then(data => {
        
        if(data.user){
            // set user to keep track of logged in user
            const { user } = useAuth();
            user.value = data.user
            
            // redirect to dashboard
            router.push('/dashboard')
        }

    })
    .catch(err => console.error(err))
}


</script>

<template>
    <main>
        <h1>Login</h1>
        <p>This page should be visible to you only if you're NOT logged in</p>

        <form @submit.prevent="login">
            <label for="Username">Username</label>
            <input type="text" v-model="formData.username" name="Username" />

            <label for="password">Password</label>
            <input type="password" v-model="formData.password" name="password" />

            <button type="submit" >Login</button>
        </form>

    </main>
</template>
