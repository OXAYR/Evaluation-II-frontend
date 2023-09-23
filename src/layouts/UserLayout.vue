<template>
  <div>
    <Nav />
    <div class="mt-40 px-24">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
</script>
