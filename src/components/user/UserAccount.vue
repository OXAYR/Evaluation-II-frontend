<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-semibold mb-4">Account Settings</h1>

      <div class="mb-4">
        <label class="block font-semibold mb-2">Name:</label>
        <p class="bg-gray-200 p-2 rounded">{{ name }}</p>
      </div>

      <div class="mb-4">
        <label class="block font-semibold mb-2">Email:</label>
        <p class="bg-gray-200 p-2 rounded">{{ email }}</p>
      </div>

      <button
        @click="update(_id)"
        class="bg-blue-300 text-black px-4 py-2 rounded-lg hover:bg-blue-400 mr-2">
        Edit
      </button>

      <button
        @click="deleteUserAccount(_id)"
        class="bg-red-400 text-black px-4 py-2 rounded-lg hover:bg-red-500">
        Delete Account
      </button>
      <button
        @click="logout()"
        class="bg-indigo-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-indigo-600">
        Log out
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const { name, email, _id, userRole } = JSON.parse(localStorage.getItem("user"));

const update = (index) => {
  console.log("sending in params----->", index);
  if (userRole.toLowerCase() === "user")
    router.push({ path: `/home/user/account/${index}` });
  else {
    router.push({ path: `/${userRole.toLowerCase()}/account/${index}` });
  }
};

const logout = () => {
  localStorage.clear();
  store.$reset;
  router.push("/");
};

const deleteUserAccount = (index) => {
  var answer = confirm("Do you really want to delete your account?");
  if (answer) {
    store.dispatch("user/deleteUserAccount", index).then(() => {
      router.push("/");
    });
  }
};
</script>

<style></style>
