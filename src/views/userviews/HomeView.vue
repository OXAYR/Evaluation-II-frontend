<template>
  <div>
    <div class="bg-white h-auto">
      <Nav />
      <div class="py-20">
        <Banner />
      </div>
    </div>
    <div class="mt-40 px-24">
      <CarListView />
    </div>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Banner from "@/components/user/Banner.vue";
import CarListView from "./CarListView.vue";
</script>
