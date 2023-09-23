<template>
  <div class="card w-fit h-96 mt-5">
    <router-link to>
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center mb-4 px-4 py-2">
          <h1 class="font-bold text-3xl">Users</h1>
        </div>
        <div class="overflow-y-auto p-4">
          <Users />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import Users from "@/components/owner/Users.vue";
</script>
