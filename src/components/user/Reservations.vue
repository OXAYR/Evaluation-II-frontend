<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-3xl font-semibold mb-4">My Reservations</h1>
    <ul>
      <li
        v-for="reservation in reservations"
        :key="reservation.id"
        class="mb-4 p-4 border rounded-lg">
        <div>
          <p class="text-lg font-semibold">
            Reservation ID: {{ reservation.id }}
          </p>
          <p class="text-base">Car Name: {{ reservation.name }}</p>
          <p class="text-base">
            Start Date: {{ formatDate(reservation.startDate) }}
          </p>
          <p class="text-base">
            End Date: {{ formatDate(reservation.endDate) }}
          </p>
          <p class="text-base">Rent: {{ reservation.rent }}</p>
          <div class="mt-2">
            <button
              @click="editReservation(reservation.id)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">
              Edit
            </button>
            <button
              @click="deleteReservation(reservation.id)"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const reservations = computed(
  () => store.getters["reservations/getReservation"]
);
console.log("in the component reservations---->:", reservations.value);

const editReservation = (reservationId) => {
  const router = useRouter();
  router.push(`/edit-reservation/${reservationId}`);
};

const deleteReservation = (reservationId) => {
  store.dispatch("reservations/deleteReservation", reservationId);
};

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
};

onMounted(async () => {
  await store.dispatch("reservations/getTheReservation");
});
</script>
