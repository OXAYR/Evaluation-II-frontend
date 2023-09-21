<template>
  <div class="container mx-auto px-4 py-8">
    <table class="min-w-full border rounded-lg overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2">User</th>
          <th class="px-4 py-2">Number of Reservations</th>
        </tr>
      </thead>
      {{
        userReservations.userName
      }}
      <tbody>
        <tr
          v-for="userData in userReservations"
          :key="userData.reservationId"
          class="bg-white border-b">
          <td class="px-4 py-2">
            {{ userData.userName }}
          </td>
          <td class="px-4 py-2">{{ userData.bookingCount }}</td>
          <!-- <UserReservations /> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
// import UserReservations from "@/components/admin/UserReservations.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
//import UserReservationsVue from "./UserReservations.vue";

const store = useStore();

const userReservations = computed(
  () => store.getters["reservations/getReservation"]
);

onMounted(async () => {
  await store.dispatch("reservations/getAllReservation");
});
</script>
