<script setup lang="ts">
import Slider from './Home/Slider.vue'
import Features from './Home/Features.vue';
import About from './Home/About.vue';
import Research from './Home/Research.vue';
import Team from './Home/Team.vue';
import Service from './Home/Service.vue';
import Appointment from './Home/Appointment.vue';
import Result from './Home/Result.vue';
import Testimonial from './Home/Testimonial.vue';
import Map from './Home/Map.vue';
import Blog from './Home/Blog.vue';
import Subscribe from './Home/Subscribe.vue';
</script>

<template>
  <!-- Slider Section -->
  <Slider />
  <!-- Features Section -->
  <Features />
  <!-- About Section -->
  <About />
  <!-- Research Section-->
  <Research />
  <!-- Team Section -->
  <Team />
  <!-- Service Section -->
  <Service />
  <!--  Appointment Section -->
  <Appointment />
  <!--  Result Area -->
  <Result />
  <!--  Testimonial Area -->
  <Testimonial />
  <!-- Map Section -->
  <Map />
  <!--  Blog Area -->
  <Blog />
  <!--  Subscribe Area -->
  <Subscribe />
</template>

<style scoped>
iframe {
  border: none;
}
</style>
