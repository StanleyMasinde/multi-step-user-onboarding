<script setup lang="ts">
const onboardingStore = useOnBoardingStore()
</script>

<template>
  <div class="min-h-screen flex flex-col align-middle m-5 gap-3">
    <div class="w-full border p-5">
      <h1 class="text-3xl">
        Personal details
      </h1>

      <div>
        <p>Name: {{ onboardingStore.personalDetails.name }}</p>
        <p>Phone: {{ onboardingStore.personalDetails.phone_number }}</p>
        <p>Email: {{ onboardingStore.personalDetails.email }}</p>
        <div class="mt-3">
          <figure>
            <img
              :src="onboardingStore.personalDetails.profile_image_url"
              alt="Profile picture"
              class="aspect-square h-24"
            >
            <figcaption>Profile picture</figcaption>
          </figure>
        </div>
      </div>
    </div>

    <div class="border p-5">
      <h1 class="text-3xl">
        Business details
      </h1>

      <div>
        <p>Name: {{ onboardingStore.businessDetails.name }}</p>
        <p>Industry: {{ onboardingStore.businessDetails.industry }}</p>
        <p>Company Size: {{ onboardingStore.businessDetails.size }}</p>
        <div>
          <figure>
            <img
              class="aspect-square h-24"
              :src="onboardingStore.businessDetails.logo_url"
              alt="Logo"
            >
            <figcaption>Business logo</figcaption>
          </figure>
        </div>

        <div class="border flex flex-col">
          <iframe
            :src="onboardingStore.businessDetails.business_document"
            type="Business doc"
          />
        </div>
      </div>
    </div>

    <div class="mt-2 flex gap-2 justify-center">
      <button
        type="button"
        class="bg-blue-500 text-white p-2 disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed w-full"
        @click.prevent="onboardingStore.currentStep = 2"
      >
        Edit business details
      </button>

      <button
        class="bg-blue-500 text-white p-2 disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed w-full"
      >
        Submit details
      </button>
    </div>
  </div>
</template>

<style scoped></style>
