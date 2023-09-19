<template>
  <div class="ml-4 lg:ml-32">
    <h1 class="font-bold text-2xl sm:text-3xl text-left my-5 text-silver">
      Add a Car
    </h1>
    <div class="my-5 flex flex-col items-center">
      <div
        class="max-w-md flex flex-wrap justify-between w-full bg-blue-100 rounded-lg shadow-md p-4 sm:p-6">
        <div class="mb-4 w-full">
          <label for="name" class="block text-sm font-bold text-silver"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="car.name"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter name" />
        </div>
        <div class="mb-4 w-full sm:w-1/2 pr-2">
          <label for="model" class="block text-sm font-bold text-silver"
            >Model</label
          >
          <input
            type="text"
            id="model"
            v-model="car.model"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter model" />
        </div>
        <div class="mb-4 w-full sm:w-1/2 pl-2">
          <label for="rent" class="block text-sm font-bold text-silver"
            >Rent</label
          >
          <input
            type="text"
            id="rent"
            v-model="car.rent"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter rent" />
        </div>
        <div class="mb-4 w-full sm:w-1/2 pr-2">
          <label for="type" class="block text-sm font-bold text-silver"
            >Type</label
          >
          <input
            type="text"
            id="type"
            v-model="car.type"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter type" />
        </div>
        <div class="mb-4 w-full sm:w-1/2 pl-2">
          <label for="make" class="block text-sm font-bold text-silver"
            >Make</label
          >
          <input
            type="text"
            id="make"
            v-model="car.make"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter make" />
        </div>
        <div class="mb-4 w-full">
          <label for="status" class="block text-sm font-bold text-silver"
            >Status</label
          >
          <input
            type="text"
            id="status"
            v-model="car.status"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter status" />
        </div>
        <div class="mb-4 w-full">
          <label for="color" class="block text-sm font-bold text-silver"
            >Color</label
          >
          <input
            type="text"
            id="color"
            v-model="car.color"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter color" />
        </div>
        <p v-if="error.length" class="text-red-600 text-sm">{{ error }}</p>
        <button
          class="mt-4 w-full py-2 bg-lightBlue font-bold rounded-full text-white font-serif hover:bg-lightestBlue"
          @click="validateForm(car)">
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();

const car = ref({
  name: "",
  model: "",
  rent: "",
  type: "",
  make: "",
  status: "",
  color: "",
});

let error = ref("");

const validateForm = (car) => {
  if (
    car.name !== "" &&
    car.model !== "" &&
    car.rent !== "" &&
    car.type !== "" &&
    car.make !== "" &&
    car.status !== "" &&
    car.color !== ""
  ) {
    console.log("Data to create car:", car);
    store.dispatch("cars/addCar", car);
  } else {
    error.value = "Please fill in all fields.";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
