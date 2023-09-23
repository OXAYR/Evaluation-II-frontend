<template>
  <div class="flex justify-around">
    <div class="flex flex-col justify-center w-1/3">
      <h1 class="text-5xl">
        Driving <span class="text-rose-500">Dreams</span>, One Rental at a Time
      </h1>
      <p class="mt-4">
        Welcome to our premier online destination for hassle-free car rentals.
        Discover a wide range of vehicles, competitive rates, and seamless
        booking experiences. Start your journey with us today!
      </p>
      <div class="mt-8">
        <router-link
          class="bg-rose-500 w-32 text-center py-3 px-3 rounded-lg text-white shadow-sm"
          to="/home/user/cars">
          Book me a car
        </router-link>
      </div>
    </div>
    <div class="mt-20">
      <img src="../../assets/car3.png" alt="" />
    </div>
  </div>
</template>

<script setup></script>
