<template>
  <div
    class="card bg-white mt-6 px-4 sm:px-8 py-96 h-full md:py-11 max-w-xs mx-auto">
    <h2 class="text-3xl font-bold text-center">Create Manager</h2>
    <form enctype="multipart/form-data">
      <input
        type="text"
        v-model="form.name"
        placeholder="Username"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />
      <input
        type="email"
        v-model="form.email"
        placeholder="Email"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />
      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />

      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />
    </form>
    <p v-if="validationErrors.confirmPassword" class="text-red text-sm">
      {{ validationErrors.confirmPassword }}
    </p>
    <button
      class="mt-4 px-4 sm:px-8 py-2 sm:py-3 text-white font-medium bg-black hover:bg-gray-900 rounded"
      @click="toValidateForm(form)">
      Register Manager
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const form = ref({
  name: "",
  email: "",
  password: "",
  userRole: "manager",
});

const confirmPassword = ref("");
const validationErrors = ref({
  name: [],
  password: [],
  email: [],
  confirmPassword: [],
});

const store = useStore();
const router = useRouter();

const toValidateForm = () => {
  // Reset validation errors
  validationErrors.value = {
    name: [],
    password: [],
    email: [],
    confirmPassword: [],
  };

  const usernamePattern = /^[A-Z][^\s]*$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+{}[\]:;<>,.?~\/-=\'|"]).{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (form.value.name !== "" && !usernamePattern.test(form.value.name)) {
    validationErrors.value.name.push(
      "Add a number in the name and remove empty spaces"
    );
  } else if (
    form.value.password !== "" &&
    !passwordPattern.test(form.value.password)
  ) {
    validationErrors.value.password.push(
      "Password must start with a capital letter and must contain a number & special character"
    );
  } else if (form.value.password !== confirmPassword.value) {
    validationErrors.value.confirmPassword.push("Password does not match");
  } else if (form.value.email !== "" && !emailPattern.test(form.value.email)) {
    validationErrors.value.email.push("Invalid Email");
  } else {
    toStoreForm(form.value);
  }
};

const toStoreForm = async (formData) => {
  if (
    formData.email !== "" &&
    formData.password !== "" &&
    formData.name !== "" &&
    confirmPassword.value !== ""
  ) {
    console.log("In the component to store--->", formData);
    await store.dispatch("user/registerUser", formData);
    if (Object.keys(validationErrors.value).length === 0) {
      alert("Manager created successfully");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
