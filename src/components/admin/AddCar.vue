<template>
  <div class="ml-4 lg:ml-12">
    <div class="my-5 flex flex-col items-center">
      <div
        class="max-w-md flex flex-wrap justify-between w-full bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h1 class="font-bold text-2xl sm:text-3xl my-5 text-silver">
          {{ isUpdate ? "Update Car" : "Add a Car" }}
        </h1>
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
            type="date"
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
          <select
            id="type"
            v-model="car.type"
            class="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md">
            <option value="" disabled>Select type</option>
            <option value="Sedan">Sedan</option>
            <option value="Suv">Suv</option>
            <option value="Crossover Suv">Crossover SUV</option>
            <option value="Truck">Truck</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sports Car">Sports Car</option>
            <option value="Family Car">Family Car</option>
            <option value="Super Car">Super Car</option>
          </select>
        </div>
        <div class="mb-4 w-full sm:w-1/2 pl-2">
          <label for="make" class="block text-sm font-bold text-silver"
            >Make</label
          >
          <select
            id="make"
            v-model="car.make"
            class="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md">
            <option value="" disabled>Select Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Nissan">Nissan</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Mercedes">Mercedes</option>
            <option value="BMW">BMW</option>
            <option value="Lemo">Lemo</option>
          </select>
        </div>
        <div class="mb-4 w-full">
          <label for="color" class="block text-sm font-bold text-silver"
            >Color</label
          >
          <div class="color-picker flex justify-center gap-5 mt-3">
            <div
              v-for="option in colorOptions"
              :key="option"
              @click="selectColor(option)"
              :style="{ backgroundColor: option }"
              class="color-option w-9 h-9 rounded-full text-center border border-grey cursor-pointer transition-transform transform hover:scale-110"
              :class="{ 'border-black': car.color === option }">
              <p class="text-sm mt-9">{{ option }}</p>
            </div>
          </div>
        </div>
        <p v-if="error.length" class="text-red-600 text-sm">{{ error }}</p>
        <button
          class="mt-4 w-full py-2 bg-lightBlue font-bold rounded text-black font-serif bg-blue-300 hover:bg-blue-400"
          @click="validateCar()">
          {{ isUpdate ? "Update" : "Add" }} Car
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const currentRoute = ref(route.path);
const store = useStore();
const selectedCar = computed(() => store.getters["car/getSelectedCar"]);

const isUpdate = computed(() => {
  return currentRoute.value.includes("/edit/");
});

const car = ref({
  name: isUpdate.value ? selectedCar.value?.name : "",
  model: isUpdate.value ? selectedCar.value?.model : new Date(),
  rent: isUpdate.value ? selectedCar.value?.rent : null,
  type: isUpdate.value ? selectedCar.value?.type : "",
  make: isUpdate.value ? selectedCar.value?.make : "",
  color: isUpdate.value ? selectedCar.value?.color : "",
});

let error = ref("");

const colorOptions = [
  "red",
  "blue",
  "black",
  "grey",
  "white",
  "skyBlue",
  "darkRed",
];

const selectColor = (selectedColor) => {
  console.log("Selected color------->", selectedColor);
  car.value.color = selectedColor;
  console.log("car color------->", car.color);
};
const validateCar = async () => {
  console.log("car in the add to car", car.value);
  if (
    car.name !== "" &&
    car.model !== null &&
    car.rent !== null &&
    car.type !== "" &&
    car.make !== "" &&
    car.color !== ""
  ) {
    isUpdate.value
      ? await store.dispatch("car/updateCar", {
          indx: selectedCar.value._id,
          updateCar: car.value,
        })
      : await store.dispatch("car/addCar", car.value);
    router.push("/manager");
  } else {
    error.value = "Please fill in all fields.";
  }
};
</script>

<style scoped></style>
