<script setup lang="ts">
const onboardingStore = useOnBoardingStore()
const router = useRouter()
const childLoading = ref<boolean>(false) // An excuse to use props and events

const onVerificationSuccess = () => {
  router.push('/success')
}
</script>

<template>
  <div>
    <!-- Loading indicator -->
    <div
      v-if="onboardingStore.isLoading"
      class="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4"
    >
      <div class="flex space-x-2">
        <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
        <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150" />
        <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300" />
      </div>
      <p class="text-gray-700 text-lg font-medium">
        Submitting your information please wait...
      </p>
    </div>

    <!-- Verifiy code -->
    <EmailVerification
      v-else-if="onboardingStore.verifyingCode"
      :is-loading="childLoading"
      @loading="(ev) => childLoading = ev"
      @success="onVerificationSuccess"
    />

    <div v-else>
      <!-- Step 1 -->
      <PersonalDetails v-show="onboardingStore.currentStep == 1" />

      <!-- Step 2 -->
      <BusinessDetails v-show="onboardingStore.currentStep == 2" />

      <!-- Verification -->
      <VerificationStep v-show="onboardingStore.currentStep == 3" />
    </div>
  </div>
</template>
