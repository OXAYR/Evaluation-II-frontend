<template>
  <div class="">
    <div class="bg-white p-4 text-left my-4 rounded lg:ml-12">
      <h1 class="text-2xl sm:text-3xl font-bold text-silver">
        Welcome Back, Owner
      </h1>
      <p class="text-sm font-medium text-silver">
        Here you can create, edit, manage cars, view users, and handle
        reservations.
      </p>
    </div>

    <div
      class="flex flex-col gap-4 flex-wrap lg:flex-row justify-between sm:items-start my-4">
      <AddCar class="w-2/3" />
      <div class="mt-14 mr-16">
        <CreateManager />
      </div>
    </div>
    <div>
      <div class="hidden ml-12 md:block"><UserView class="w-full" /></div>
      <div class="hidden ml-12 md:block">
        <ReservationsView class="w-full" />
      </div>
    </div>

    <div class="ml-12">
      <OwnerCarListView />
    </div>
  </div>
</template>

<script setup>
import OwnerCarListView from "./OwnerCarListView.vue";
import UserView from "./UserView.vue";
import ReservationsView from "@/views/ownerviews/ReservationView.vue";
import AddCar from "@/components/owner/AddCar.vue";
import CreateManager from "@/components/owner/CreateManager.vue";
</script>
