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
            <div class="text-lg font-semibold text-blue">{{ car.name }}</div>
            <div class="text-lg font-semibold">Rs. {{ car.rent }} /-</div>
          </div>
          <div class="text-gray-500 text-sm">
            Status:
            <span
              :class="
                car.status === 'available' ? 'text-blue-500' : 'text-red-500'
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
          <div class="flex mt-4">
            <button
              @click="deleteCar(car.id)"
              class="flex-1 bg-red-500 text-black hover:bg-red-600 font-medium rounded-lg p-2 mr-2">
              Delete
            </button>
            <button
              @click="editCar(car.id)"
              class="flex-1 bg-yellow-400 text-black hover:bg-yellow-500 font-medium rounded-lg p-2">
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
const { _id } = JSON.parse(localStorage.getItem("user"));
props.cars.filter((car) => car.managerId === _id);

const editCar = async (carId) => {
  await store.dispatch("car/fetchCarById", carId);
  router.push({ path: `admincars/edit/${carId}` });
};
const emit = defineEmits(["delete-car"]);
const deleteCar = (carId) => {
  var answer = confirm("Do you really want to delete the car?");
  if (answer) {
    emit("delete-car", carId);
  }
};
</script>
