<template>
  <div class="my-4 sm:my-12 md:my-8 text-silver text-left">
    <h1 class="font-bold text-2xl sm:text-3xl text-left">Cars You Manage</h1>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <li
        v-for="car in cars"
        :key="car._id"
        class="bg-blue shadow-md rounded-lg group relative hover:shadow-lg">
        <div class="relative">
          <img
            src="../../assets/car.png"
            alt="car image"
            class="w-full h-40 object-cover rounded-t-lg" />
        </div>
        <div class="bg-white p-4 rounded-b-lg">
          <div class="flex justify-between">
            <div class="text-lg font-semibold text-blue">{{ car.name }}</div>
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
              :style="{ background: car.color }">
              <p class="ml-4">{{ car.color }}</p>
            </div>
          </div>
          <div class="flex mt-4">
            <button
              @click="deleteCar(car._id)"
              class="flex-1 bg-red-500 text-black font-medium rounded-lg p-2 mr-2 opacity-0 group-hover:opacity-100">
              Delete
            </button>
            <button
              @click="editCar(car._id)"
              class="flex-1 bg-blue-400 text-black font-medium rounded-lg p-2 opacity-0 group-hover:opacity-100">
              Edit
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  cars: Array,
});

const store = useStore();
const router = useRouter();

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }
};

const editCar = async (carId) => {
  await store.dispatch("car/fetchCarById", carId);
  router.push({ path: `admin/admincars/edit/${carId}` });
};
const emit = defineEmits(["delete-car"]);
const deleteCar = (carId) => {
  console.log(carId);
  var answer = confirm("Do you really want to delete the car?");
  if (answer) {
    emit("delete-car", carId);
  }
};
</script>
