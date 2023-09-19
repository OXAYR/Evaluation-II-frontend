<template>
  <div class="my-8 sm:my-16 md:my-32 text-silver">
    <h1 class="font-bold text-2xl sm:text-3xl text-left">Movies</h1>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <li
        v-for="item in cars"
        :key="item.id"
        class="p-4 sm:p-7 bg-blue shadow-md rounded-lg flex flex-col justify-between group">
        <div class="items-center">
          <div class="text-lg font-semibold">{{ item.name }}</div>
          <p class="text-gray-500 text-sm line-clamp-2">
            {{ formatDate(item.model) }}
          </p>
          <div> {{ item.rent }}</div>
          <div> {{ item.type }}</div>
          <div> {{ item.make }}</div>
          <div> {{ item.status }}</div>
          <div> {{ item.color }}</div>
          
        </div>
        <div>
          <img src="../../assets/car.jpg" alt="carimage" class="ml-auto" />
        </div>

        <div
          class="mt-4 sm:mt-7 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            @click="reservedCar(item)"
            class="border bg-yellow text-white hover:bg-silver hover:text-blue font-medium rounded p-2 m-2">
            Book me
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  cars: Object,
});

//const emit = defineEmits(["add-ticket"]);
const reservedCar = (obj) => {
  this.$router.push({ path: `/book/${obj.id}` });

  //emit("reserved", car);
};

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }
  return "";
};
</script>
