<template>
  <div id="app">
    <VideoConverter />
  </div>
</template>

<script setup>
import VideoConverter from './components/VideoConverter.vue';
</script>

<style>
:root {
  color-scheme: light dark;
  --primary-color: #04baab;
  --bg-color: light-dark(#F2F2F2, #151515);
  --bg-color-secondary: light-dark(#ccc, #333);
  --color: light-dark(black, white);
  &:has(input[name="color-scheme"][value="light"]:checked) {
    color-scheme: light;
    --switcher-color-light: var(--primary-color);
    --switcher-color-dark: transparent;
  }
  &:has(input[name="color-scheme"][value="dark"]:checked) {
    color-scheme: dark;
    --switcher-color-dark: var(--primary-color);
    --switcher-color-light: transparent;
  }
}



body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--bg-color);
  color: var(--color);
}
</style>