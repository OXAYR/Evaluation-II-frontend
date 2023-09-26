<template>
  <AdminCarList :cars="allCars" @delete-car="deleteCar" />
</template>

<script setup>
import AdminCarList from "@/components/admin/AdminCarList.vue";
import { useStore } from "vuex";
import { onMounted, computed, watchEffect, watch } from "vue";

const store = useStore();

const allCars = computed(() => store.getters["car/getSelectedCar"]);
let shouldFetchFilteredCar = true;
const deleteCar = (index) => {
  store.dispatch("car/deleteCar", index);
};

watchEffect(() => {
  console.log("in the watcheffect----->", allCars.value);
});
const { _id } = JSON.parse(localStorage.getItem("user"));
onMounted(() => {
  if (shouldFetchFilteredCar) {
    store.dispatch("car/fetchCarsByManagerId", _id);
    shouldFetchFilteredCar = false;
  }
});
</script>
