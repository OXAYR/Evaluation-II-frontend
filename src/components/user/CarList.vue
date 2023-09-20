<template>
  <div class="my-8 sm:my-16 md:my-32 text-silver text-left">
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
        </div>
        <div class="bg-white p-4 rounded-b-lg">
          <div class="flex justify-between">
            <div class="text-lg font-semibold text-blue">
              {{ car.name }}
            </div>
            <div class="text-lg font-semibold">Rs. {{ car.rent }} /-</div>
          </div>
          <div class="text-gray-500 text-sm">
            Status:
            <span
              :class="
                car.status === 'Available' ? 'text-blue-500' : 'text-red-500'
              "
              >{{ car.status }}</span
            >
          </div>
          <div class="text-gray-500 text-sm">
            Make: {{ car.make }} | Type: {{ car.type }} | Model:
            {{ formatDate(car.model) }}
          </div>
          <div class="text-gray-500 text-sm flex">
            Color:
            <div
              class="ml-2 w-3 h-3 mt-1 rounded-3xl"
              :style="{ background: car.color }" />
          </div>
          <button
            @click="reservedCar(car)"
            class="w-full mt-4 bg-yellow-300 text-black hover:bg-yellow-400 font-medium rounded-lg p-2">
            Book me
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

defineProps({
  cars: Array,
});

const store = useStore();
const router = useRouter();

const emit = defineEmits(["reserve-car"]);

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }
};
const reservedCar = (car) => {
  emit("reserve-car", car);
  router.push({ path: `/home/reserve/${car.id}` });
};
</script>
