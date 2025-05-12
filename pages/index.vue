<script setup lang="ts">
import { ClientOnly } from '#components'

const onboardingStore = useOnBoardingStore()
const router = useRouter()
const childLoading = ref<boolean>(false) // An excuse to use props and events

const onVerificationSuccess = () => {
  onboardingStore.verifyingCode = false
  router.push('/success')
}

const { data } = useAsyncData('industries', () => $fetch('/api/industries'))
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
      <ClientOnly
        fallback-tag="span"
        fallback="Loading personal details"
      >
        <PersonalDetails v-show="onboardingStore.currentStep == 1" />
      </ClientOnly>

      <!-- Step 2 -->
      <ClientOnly
        fallback-tag="span"
        fallback="Loading business details"
      >
        <BusinessDetails
          v-if="data"
          v-show="onboardingStore.currentStep == 2"
          :industries="data"
        />
      </ClientOnly>

      <!-- Verification -->
      <ClientOnly
        fallback-tag="span"
        fallback="Preparing preview"
      >
        <VerificationStep v-show="onboardingStore.currentStep == 3" />
      </ClientOnly>
    </div>
  </div>
</template>
