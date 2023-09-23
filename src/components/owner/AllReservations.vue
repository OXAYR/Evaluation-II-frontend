<template>
  <div class="container mx-auto px-4">
    <h1
      v-if="currentPath === '/admin/reservations'"
      class="font-bold text-2xl my-8 sm:text-3xl text-left">
      Reservations
    </h1>
    <table class="min-w-full border rounded overflow-hidden">
      <thead class="bg-gray-50 text-blue-950 divide-y divide-gray-500">
        <tr>
          <th class="px-4 py-2">User</th>
          <th class="px-4 py-2">Number of Reservations</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-y-100">
        <tr
          v-for="(userData, index) in userReservations"
          :key="userData.reservationId"
          class="bg-white border-b"
          @dblclick="toggleUserReservations(index)">
          <td class="px-4 py-2">
            {{ userData.userName }}
          </td>
          <td class="px-4 py-2">{{ userData.bookingCount }}</td>
        </tr>

        <tr v-if="expandedRow !== null">
          <td colspan="2">
            <UserReservations :id="userReservations[expandedRow]?.userId" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import UserReservations from "./UserReservations.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const route = useRoute();

const store = useStore();
const expandedRow = ref(null);
const currentPath = ref(route.path);
const userReservations = computed(
  () => store.getters["reservations/getAllReservations"]
);

onMounted(async () => {
  await store.dispatch("reservations/getAllReservation");
});

const toggleUserReservations = (index) => {
  if (expandedRow.value === index) {
    expandedRow.value = null; // Collapse the row if it's already expanded
  } else {
    expandedRow.value = index; // Expand the clicked row
  }
};
</script>
