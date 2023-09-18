<template>
  <div
    class="card bg-white mt-8 sm:mt-16 md:mt-32 Login px-4 sm:px-8 py-6 md:py-11 max-w-xs mx-auto">
    <h2 class="text-3xl font-medium text-center">Sign Up</h2>
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
        v-model="form.confirmPassword"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />
      <!-- <input
        type="file"
        name="profileImage"
        @change="onFileChange"
        accept="image/*"
      /> -->
    </form>
    <p v-if="validationErrors" class="text-red text-sm">
      {{ validationErrors }}
    </p>
    <button
      class="mt-4 px-4 sm:px-8 py-2 sm:py-3 text-white bg-blue hover:bg-lightBlue rounded-full"
      @click="toValidateForm(form)">
      Register
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
});

const confirmPassword = ref("");
const validationErrors = ref({
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
});

const store = useStore();
const router = useRouter();

const toValidateForm = (obj) => {
  validationErrors.value = [];
  const usernamePattern = /^(?=.*[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/\\-='|"'])\S+/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\\-='|"']).{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (obj.username !== "" && !usernamePattern.test(obj.username)) {
    validationErrors.name.value.push(
      "Add a number in the name and remove empty spaces"
    );
  } else if (obj.password !== "" && !passwordPattern.test(obj.password)) {
    validationErrors.password.value.push(
      "Password must start with a capital letter and must contain a number & special character"
    );
  } else if (obj.password !== confirmPassword.value) {
    validationErrors.confirmPassword.value.push("Password does not match");
  } else if (obj.email !== "" && !emailPattern.test(obj.email)) {
    validationErrors.email.value.push("Invalid Email");
  } else {
    toStoreForm(obj);
  }
};

const toStoreForm = async (obj) => {
  if (
    obj.value.email !== "" &&
    obj.value.password !== "" &&
    obj.value.name !== "" &&
    obj.value.confirmPassword !== ""
  ) {
    console.log("In the component to store--->", form.value);
    await store.dispatch("user/registerUser", form.value);
    if (!validationErrors.value) router.push("/");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
