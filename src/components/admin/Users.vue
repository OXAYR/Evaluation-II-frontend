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
      <table class="w-full">
        <thead>
          <tr class="font-bold divide-x divide-lightestBlue">
            <th class="w-1/3 sm:w-auto">Name</th>
            <th class="w-1/3 sm:w-auto">Email</th>
            <th class="w-1/3 sm:w-auto">User Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" class="my-2">
            <td class="w-1/3 sm:w-auto px-4 sm:px-3 sm:mx-3">
              {{ user.name }}
            </td>
            <td class="w-1/3 sm:w-auto px-4 sm:px-3 sm:mx-3">
              {{ user.email }}
            </td>
            <td class="w-1/3 sm:w-auto px-4 sm:px-3 py-2 sm:mx-3">
              <div class="flex items-center justify-center">
                <div class="text-center">
                  {{ user.userRole }}
                </div>
              </div>
            </td>
            <td>
              <button @click="deleteUser(user)">x</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const userBeingEdited = ref(null);
const editedUserRole = ref(null);
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

const users = computed(() => store.getters["user/getAllUsers"]);

const deleteUser = async (user) => {
  try {
    var answer = confirm("Do you really want to delete the user?");
    if (answer) {
      isLoading.value = true;
      if (user.userRole.toLowerCase() === "manager") {
        console.log("i am admin");
        // await store.dispatch("user/deleteManager", {
        //   id: user._id,
        // });
      } else {
        console.log("i am user");
        // await store.dispatch("user/deleteUserAccount", {
        //   id: user._id,
        // });
      }
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
