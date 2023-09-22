<template>
  <div class="ml-4 lg:ml-32">
    <div class="my-5 flex flex-col items-center">
      <div
        class="max-w-4xl flex flex-wrap items-center w-full bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div class="w-full sm:w-1/2 justify-center pr-4">
          <h1
            class="font-bold text-2xl sm:text-3xl my-5 text-silver text-center">
            Make A Reservation
          </h1>
          <div class="mb-4 w-full pr-2">
            <label
              for="name"
              class="block text-sm font-bold text-silver text-center"
              >Name</label
            >
            <p class="mt-1 p-2 block w-full border border-gray-300 rounded-md">
              {{ selectedCar.name }}
            </p>
          </div>
          <div class="flex">
            <div class="mb-4 w-full sm:w-1/2 pr-2">
              <label for="model" class="block text-sm font-bold text-silver"
                >Model</label
              >
              <p
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                {{ formatDate(selectedCar.model) }}
              </p>
            </div>
            <div class="mb-4 w-full sm:w-1/2 pl-2">
              <label for="rent" class="block text-sm font-bold text-silver"
                >Rent</label
              >
              <p
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                {{ selectedCar.rent }}
              </p>
            </div>
          </div>
          <div class="flex">
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
          </div>
          <div class="mb-4 w-full">
            <div class="text-gray-500 text-sm flex justify-center">
              Color:
              <div
                class="ml-2 w-5 h-5 rounded-3xl"
                :style="{ background: selectedCar.color }" />
            </div>
          </div>
          <div class="flex">
            <div class="mb-4 w-full sm:w-1/2 pr-2">
              <label for="model" class="block text-sm font-bold text-silver"
                >Start Date</label
              >
              <input
                type="date"
                id="model"
                v-model="reservation.startDate"
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Enter start date" />
            </div>
            <div class="mb-4 w-full sm:w-1/2 pl-2">
              <label for="rent" class="block text-sm font-bold text-silver"
                >End Date</label
              >
              <input
                type="date"
                id="rent"
                v-model="reservation.endDate"
                :min="reservation.startDate"
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Enter End Date" />
            </div>
          </div>
          <p v-if="error.length" class="text-red-600 text-sm">{{ error }}</p>
        </div>
        <div class="w-full sm:w-1/2 pl-2 flex justify-center items-center">
          <img
            src="../../assets/carView.jpg"
            alt="car-view"
            title="car-view"
            class="cursor-pointer" />
        </div>
        <div class="w-full">
          <button
            class="mt-4 w-full py-2 bg-lightBlue font-bold rounded-lg text-black font-serif bg-yellow-300 hover:bg-yellow-400"
            @click="validateReservation()">
            Make A Reservation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const selectedCar = computed(() => store.getters["car/getSelectedCar"]);
const reservation = ref({
  startDate: "",
  endDate: "",
});

console.log("selected Car---->", selectedCar.value);

let error = ref("");

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }
};

const validateReservation = async () => {
  //console.log(car);
  if (reservation.startDate !== "" && reservation.endDate !== "") {
    const newReservation = {
      ...reservation.value,
      carId: selectedCar.value._id,
      rent: selectedCar.value.rent,
    };
    console.log("Data to create car:", newReservation);
    await store.dispatch("reservations/makeAReservation", newReservation);
    router.push("/home/reservations");
  } else {
    error.value = "Please fill in all fields.";
  }
};
</script>

<style scoped></style>
