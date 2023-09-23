<template>
  <div>
    <div class="bg-white">
      <Nav />
      <Banner />
    </div>
    <div class="mt-40 px-24">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Banner from "@/components/user/Banner.vue";
</script>
