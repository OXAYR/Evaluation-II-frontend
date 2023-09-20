<template>
  <AdminCarList :cars="allCars" @delete-car="deleteCar" />
</template>

<script setup>
import AdminCarList from "@/components/admin/AdminCarList.vue";
import { useStore } from "vuex";
import { onMounted, computed, watchEffect } from "vue";

const store = useStore();

const allCars = computed(() => store.getters["car/getCars"]);

const deleteCar = (index) => {
  store.dispatch("car/deleteCar", index);
};

watchEffect(() => {
  console.log("in the watcheffect----->", allCars.value);
});

onMounted(() => {
  store.dispatch("car/fetchCars");
});
</script>
