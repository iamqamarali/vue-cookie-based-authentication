<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'

const router = useRouter()
const { user } = useAuth()

const logout = () => {
  fetch('/api/logout', {
    method: 'POST',
    credentials: 'include'
  }).then(res => res.json())
    .then(data => {
  
      if (data.success) {
        user.value = null
        router.push('/')
      }
      
    })
    .catch(err => console.error(err))
}


</script>

<template>
  <div class="container">
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/login">Login</RouterLink>
      </li>
      <li>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
      </li>
      <li v-if="user">
        <button @click.prevent="logout" >Logout</button>
      </li>
    </ul>

    <RouterView />
  </div>
</template>

<style >

</style>
