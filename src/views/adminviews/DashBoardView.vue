<template>
  <div class="">
    <div class="bg-white p-4 text-left my-4 rounded lg:ml-12">
      <h1 class="text-2xl sm:text-3xl font-bold text-silver">
        Welcome Back, Manager
      </h1>
      <p class="text-sm font-medium text-silver">
        Here you can create, edit, manage cars, view users, and handle
        reservations.
      </p>
    </div>

    <div
      class="flex flex-col gap-4 lg:flex-row justify-evenly sm:items-start my-4">
      <AddCar />

      <div class="hidden md:block">
        <UserView />
      </div>
      <div class="hidden md:block">
        <ReservationsView />
      </div>
    </div>

    <div class="ml-12">
      <AdminCarListView />
    </div>
  </div>
</template>

<script setup>
import AdminCarListView from "./AdminCarListView.vue";
import UserView from "./UserView.vue";
import ReservationsView from "@/views/adminviews/ReservationView.vue";
import AddCar from "@/components/admin/AddCar.vue";
</script>
