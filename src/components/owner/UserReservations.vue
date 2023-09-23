<template>
  <div class="container card mx-auto mt-8">
    <ul>
      <li
        v-for="reservation in reservations"
        :key="reservation.id"
        class="mb-4 p-4 border rounded-lg">
        <div>
          <p class="text-base">Car Name: {{ reservation.name }}</p>
          <p class="text-base">
            Start Date: {{ formatDate(reservation.startDate) }}
          </p>
          <p class="text-base">
            End Date: {{ formatDate(reservation.endDate) }}
          </p>
          <p class="text-base">Rent: {{ reservation.rent }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  id: String,
});

const userId = ref(props.id);

console.log("id--------->", userId.value);

const reservations = computed(
  () => store.getters["reservations/getReservation"]
);
console.log("in the component reservations---->:", reservations.value);

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
};

onMounted(async () => {
  await store.dispatch("reservations/getTheReservation", userId.value);
});
</script>
