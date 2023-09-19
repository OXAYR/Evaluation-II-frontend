<template>
  <CarList :cars="allCars" @reserve-car="reserveCar" />
</template>

<script setup>
import CarList from "@/components/user/CarList.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

const allCars = computed(() => store.getters["car/getCars"]);

const reserveCar = (car) => {
  console.log("Adding in the cart------------>", car);
  store.dispatch("cart/createCart", car);
};

onMounted(() => {
  store.dispatch("car/fetchCars");
});
</script>
