<template>
  <div class="container card mx-auto mt-8">
    <h1 class="text-3xl font-semibold mb-4">My Reservations</h1>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="p-4 border-b">Car Name</th>
          <th class="p-4 border-b">Start Date</th>
          <th class="p-4 border-b">End Date</th>
          <th class="p-4 border-b">Rent</th>
          <th class="p-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="reservation in reservations"
          :key="reservation.id"
          class="border-b">
          <td class="p-4">{{ reservation.name }}</td>
          <td class="p-4">{{ formatDate(reservation.startDate) }}</td>
          <td class="p-4">{{ formatDate(reservation.endDate) }}</td>
          <td class="p-4">{{ reservation.rent }}</td>
          <td class="p-4">
            <button
              @click="deleteReservation(reservation.carId)"
              class="bg-black text-white px-2 rounded-2xl hover:bg-gray-800">
              x
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const reservations = computed(
  () => store.getters["reservations/getReservation"]
);
console.log("in the component reservations---->:", reservations.value);

const deleteReservation = (reservationId) => {
  const answer = confirm("Do you really want to delete the reservation?");
  if (answer) {
    console.log("reservation id----->", reservationId);
    store.dispatch("reservations/deleteReservation", reservationId);
  }
};

const formatDate = (dateString) => {
  if (dateString) {
    console.log(dateString);
    const date = new Date(dateString);
    const  month  = parseInt(date.getMonth())+1
    return date.getDate() + "/" + month+ "/" + date.getFullYear();
  }
};
const { _id } = JSON.parse(localStorage.getItem("user"));
onMounted(async () => {
  await store.dispatch("reservations/getTheReservation", _id);
});
</script>
