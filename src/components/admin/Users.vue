<template>
  <div
    class="text-black"
    :class="{ 'lg:mr-96': currentPath === '/manager/users' }">
    <h1
      v-if="currentPath === '/manager/users'"
      class="font-bold text-2xl my-8 sm:text-3xl text-left">
      Users
    </h1>
    <div class="w-full sm:w-auto overflow-x-auto">
      <div v-if="isLoading" class="text-center mt-4">
        <div class="text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <table class="w-full justify-center divide-y divide-gray-500 card">
        <thead class="bg-gray-50 text-blue-950">
          <tr class="font-bold">
            <th class="w-1/3 sm:w-auto px-4 py-2">Name</th>
            <th class="w-1/3 sm:w-auto px-4 py-2">Email</th>
            <th class="w-1/3 sm:w-auto px-4 py-2">User Role</th>
            <th class="w-1/3 sm:w-auto px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="user in users" :key="user._id" class="my-2">
            <td class="w-1/3 sm:w-auto px-4 py-2">{{ user.name }}</td>
            <td class="w-1/3 sm:w-auto px-4 py-2">{{ user.email }}</td>
            <td class="w-1/3 sm:w-auto px-4 py-2">{{ user.userRole }}</td>
            <td class="w-1/3 sm:w-auto px-4 py-2">
              <button
                @click="deleteUser(user)"
                class="bg-black text-white px-2 text-sm rounded-3xl hover:bg-gray-800">
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
import { useStore } from "vuex";
import { onMounted, ref, computed, toRef } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const isLoading = ref(false);
const currentPath = ref(route.path);

console.log("current path------------------>", currentPath);
const fetchUsers = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("user/fetchUsers");
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching users:", error);
    isLoading.value = false;
  }
};

const users = computed(() => {
  const usersRef = toRef(store.getters["user/getAllUsers"]);
  const usersArray = Array.isArray(usersRef.value) ? usersRef.value : [];
  return usersArray.filter((user) => user.userRole.toLowerCase() === "user");
});

const deleteUser = async (user) => {
  try {
    var answer = confirm("Do you really want to delete the user?");
    if (answer) {
      isLoading.value = true;
      console.log("i am user");
      await store.dispatch("user/deleteUserAccount", {
        id: user._id,
      });
      isLoading.value = false;
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
