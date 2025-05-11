<script setup lang="ts">
const onboardingStore = useOnBoardingStore()
</script>

<template>
  <div>
    <!-- Step 1 -->
    <PersonalDetails v-show="onboardingStore.currentStep == 1" />

    <!-- Step 2 -->
    <BusinessDetails v-show="onboardingStore.currentStep == 2" />

    <!-- Verification -->
    <Verification v-show="onboardingStore.currentStep == 3" />
  </div>
</template>
