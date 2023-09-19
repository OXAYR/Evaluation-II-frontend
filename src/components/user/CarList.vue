<template>
  <div class="my-8 sm:my-16 md:my-32 text-silver">
    <h1 class="font-bold text-2xl sm:text-3xl text-left">Cars</h1>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <li
        v-for="car in cars"
        :key="car.id"
        class="bg-blue shadow-md rounded-lg group">
        <div class="relative">
          <img
            src="../../assets/car.jpg"
            alt="car image"
            class="w-full h-40 object-cover rounded-t-lg" />
          <div
            class="absolute inset-x-0 bottom-0 bg-opacity-75 bg-blue p-2 text-white text-center">
            {{ car.name }}
          </div>
        </div>
        <div class="bg-white p-4 rounded-b-lg">
          <div class="text-lg font-semibold text-blue">
            Rent: {{ car.rent }}
          </div>
          <div class="text-gray-500 text-sm">
            Type: {{ car.type }} | Make: {{ car.make }}
          </div>
          <div class="text-gray-500 text-sm">
            Model: {{ car.model }} | Status: {{ car.status }}
          </div>
          <div class="text-gray-500 text-sm">Color: {{ car.color }}</div>
          <button
            @click="reservedCar(car)"
            class="w-full mt-4 bg-yellow text-white hover:bg-silver hover:text-blue font-medium rounded p-2">
            Book me
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

defineProps({
  cars: Array,
});

const router = useRouter();

const reservedCar = (car) => {
  router.push({ path: `/book/${car.id}` });
};
</script>
