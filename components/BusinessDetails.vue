<script setup lang="ts">
const onboardingStore = useOnBoardingStore()
</script>

<template>
  <div>
    <form action="#">
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="onboardingStore.personalDetails.name"
          type="text"
        >
      </div>
    </form>
  </div>
</template>

<style scoped></style>
