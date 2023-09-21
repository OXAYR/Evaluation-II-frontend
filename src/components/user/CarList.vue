<template>
  <div class="my-8 sm:my-16 md:my-32 text-silver text-left">
    <h1 class="font-bold text-2xl sm:text-3xl text-left">Cars</h1>
    <div class="flex justify-between items-center mt-4">
      <select v-model="selectedFilter" class="p-2 border rounded-lg">
        <option value="all">All</option>
        <option value="color">Filter by Color</option>
        <option value="name">Filter by Name</option>
        <option value="type">Filter by Type</option>
        <option value="make">Filter by Make</option>
        <option value="make">Filter by Status</option>
      </select>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="p-2 border rounded-lg w-1/3" />
    </div>

    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <li
        v-for="car in filteredCars"
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
            :class="
              car.status === 'hired'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'w-full bg-yellow-300 text-black hover:bg-yellow-400 font-medium rounded-lg p-2'
            "
            :disabled="car.status === 'Hired'">
            Book me
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";

import { useRouter } from "vue-router";

const props = defineProps({
  cars: Array,
});

const router = useRouter();
const emit = defineEmits(["reserve-car"]);

const selectedFilter = ref("all");
const searchQuery = ref("");

const filteredCars = computed(() => {
  const filter = selectedFilter.value.toLowerCase();
  const query = searchQuery.value.toLowerCase();

  return props.cars.filter((car) => {
    if (filter === "all") {
      return car.name.toLowerCase().includes(query);
    } else if (filter === "color") {
      return car.color.toLowerCase().includes(query);
    } else if (filter === "name") {
      return car.name.toLowerCase().includes(query);
    } else if (filter === "type") {
      return car.type.toLowerCase().includes(query);
    } else if (filter === "make") {
      return car.make.toLowerCase().includes(query);
    } else if (filter === "status") {
      return car.status.toLowerCase().includes(query);
    }
  });
});

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
