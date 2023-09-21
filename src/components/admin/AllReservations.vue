<template>
  <div class="container mx-auto px-4 py-8">
    <table class="min-w-full border rounded-lg overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2">User</th>
          <th class="px-4 py-2">Number of Reservations</th>
        </tr>
      </thead>
      <tbody>
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

const store = useStore();
const expandedRow = ref(null);

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
