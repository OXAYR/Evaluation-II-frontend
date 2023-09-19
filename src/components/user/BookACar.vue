<template>
  <div class="ml-4 lg:ml-32">
    <div class="my-5 flex flex-col items-center">
      <div
        class="max-w-md flex flex-wrap justify-between w-full bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h1 class="font-bold text-2xl sm:text-3xl my-5 text-silver">
          Add a Car
        </h1>
        <div class="mb-4 w-full">
          <label for="name" class="block text-sm font-bold text-silver"
            >Name</label
          >
          <p
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter name">
            {{ selectedCar.name }}
          </p>
        </div>
        <div class="mb-4 w-full sm:w-1/2 pr-2">
          <label for="model" class="block text-sm font-bold text-silver"
            >Model</label
          >
          <p class="mt-1 p-2 block w-full border border-gray-300 rounded-md">
            {{ formatDate(selectedCar.model) }}
          </p>
        </div>
        <div class="mb-4 w-full sm:w-1/2 pl-2">
          <label for="rent" class="block text-sm font-bold text-silver"
            >Rent</label
          >
          <p class="mt-1 p-2 block w-full border border-gray-300 rounded-md">
            {{ selectedCar.rent }}
          </p>
        </div>
        <div class="mb-4 w-full sm:w-1/2 pr-2">
          <label for="type" class="block text-sm font-bold text-silver"
            >Type</label
          >
          <p
            class="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md">
            {{ selectedCar.type }}
          </p>
        </div>
        <div class="mb-4 w-full sm:w-1/2 pl-2">
          <label for="make" class="block text-sm font-bold text-silver"
            >Make</label
          >
          <p
            class="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md">
            {{ selectedCar.make }}
          </p>
        </div>
        <div class="mb-4 w-full">
          <div class="text-gray-500 text-sm flex">
            Color:
            <div
              class="ml-2 w-5 h-5 rounded-3xl"
              :style="{ background: selectedCar.color }" />
          </div>
        </div>
        <p v-if="error.length" class="text-red-600 text-sm">{{ error }}</p>
        <button
          class="mt-4 w-full py-2 bg-lightBlue font-bold rounded-lg text-black font-serif bg-yellow-300 hover:bg-yellow-400"
          @click="makeAReservation()">
          Make A Reservation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";

const store = useStore();
const selectedCar = computed(() => store.getters["car/getSelectedCar"]);

console.log("selected Car---->", selectedCar.value);

let error = ref("");

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }
};

const validateCar = () => {
  console.log(car);
  if (
    car.name !== "" &&
    car.model !== null &&
    car.rent !== null &&
    car.type !== "" &&
    car.make !== "" &&
    car.color !== ""
  ) {
    console.log("Data to create car:", car.value);
    store.dispatch("car/addCar", car.value);
  } else {
    error.value = "Please fill in all fields.";
  }
};
</script>

<style scoped></style>
