<template>
  <div class="card w-fit h-96 mt-5">
    <router-link to>
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center mb-4 px-4 py-2">
          <h1 class="font-bold text-3xl">Reservations</h1>
        </div>
        <div class="overflow-y-auto p-4">
          <AllReservations />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import AllReservations from "@/components/admin/AllReservations.vue";
</script>
