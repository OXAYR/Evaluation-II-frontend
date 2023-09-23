<template>
  <div>
    <nav class="py-5 fixed top-0 left-0 right-0 font-serif">
      <div class="flex justify-between items-center px-10">
        <div class="flex col-span-7">
          <router-link to="/home">
            <p class="font-semibold text-rose-500 text-xl text-silver ml-5">
              RentWheels
            </p>
          </router-link>
        </div>
        <div class="flex">
          <router-link
            to="/home/account"
            class="shadow-sm border border-white text-white hover:bg-white hover:text-black rounded p-2 ml-4 mt-1">
            {{ name }}
          </router-link>
          <router-link
            to="/home/reservations"
            class="text-silver shadow-sm text-black bg-rose-500 hover:bg-rose-600 rounded p-2 ml-4 mt-1 mr-4">
            Reservations
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
const { name } = JSON.parse(localStorage.getItem("user"));
</script>
