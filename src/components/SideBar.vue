<template>
  <div>
    <div class="fixed top-4 left-4 z-50">
      <button
        @click="toggleSidebar"
        class="block text-silver text-3xl cursor-pointer focus:outline-none lg:hidden">
        &#9776;
      </button>
    </div>
    <div
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
      }"
      class="fixed top-0 left-0 h-screen w-72 p-4 text-white bg-gray-950 transition-transform transform ease-in-out duration-300 lg:translate-x-0">
      <div class="mt-10">
        <router-link to="/" class="mb-4">
          <p class="font-semibold text-3xl text-silver">RentWheels</p>
        </router-link>
      </div>
      <div id="sideBar" class="mt-24">
        <router-link
          v-for="(link, index) in sidebarLinks"
          :key="index"
          :to="link.to"
          class="mb-7 text-silver block rounded-xl py-3 px-12 font-bold text-xl"
          >{{ link.text }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const { userRole } = JSON.parse(localStorage.getItem("user"));
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const sidebarLinks = computed(() => {
  return [
    { to: `/${userRole}`, text: "Dashboard" },
    { to: `/${userRole}/vehicles`, text: "Vehicles" },
    { to: `/${userRole}/bookings`, text: "Bookings" },
    { to: `/${userRole}/users`, text: "Users" },
  ];
});
</script>
