<template>
  <div
    class="text-silver"
    :class="{ 'lg:mr-96': currentPath === '/admin/users' }">
    <h1
      v-if="currentPath === '/admin/users'"
      class="font-bold text-2xl my-8 sm:text-3xl text-left">
      Users
    </h1>
    <div class="w-full sm:w-auto overflow-x-auto">
      <div v-if="isLoading" class="text-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="font-bold divide-x divide-lightestBlue">
            <th class="w-1/3 sm:w-auto px-4 py-2">Name</th>
            <th class="w-1/3 sm:w-auto px-4 py-2">Email</th>
            <th class="w-1/3 sm:w-auto px-4 py-2">User Role</th>
            <th class="w-1/3 sm:w-auto px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" class="my-2">
            <td class="w-1/3 sm:w-auto px-4 py-2">{{ user.name }}</td>
            <td class="w-1/3 sm:w-auto px-4 py-2">{{ user.email }}</td>
            <td class="w-1/3 sm:w-auto px-4 py-2">{{ user.userRole }}</td>
            <td class="w-1/3 sm:w-auto px-4 py-2">
              <button
                @click="deleteUser(user)"
                class="bg-black text-white px-2 py-1 rounded-2xl hover:bg-gray-800">
                x
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    const date = new Date(dateString);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
};
const { _id } = JSON.parse(localStorage.getItem("user"));
onMounted(async () => {
  await store.dispatch("reservations/getTheReservation", _id);
});
</script>
