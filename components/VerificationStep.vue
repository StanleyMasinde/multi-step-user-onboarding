<script setup lang="ts">
const onboardingStore = useOnBoardingStore()

// Sign up
const signUp = async () => {
  try {
    onboardingStore.isLoading = true
    const profilePic = useBase64ToBlob(onboardingStore.personalDetails.profile_image_url || '')
    const logo = useBase64ToBlob(onboardingStore.businessDetails.logo_url || '')
    const businessDocument = useBase64ToBlob(onboardingStore.businessDetails.business_document || '')

    const formData = new FormData()
    formData.append('full_name', onboardingStore.personalDetails.name || '')
    formData.append('phone_number', onboardingStore.personalDetails.phone_number || '')
    formData.append('email', onboardingStore.personalDetails.email || '')
    formData.append('photo', profilePic)
    formData.append('business_name', onboardingStore.businessDetails.name || '')
    formData.append('logo', logo)
    formData.append('industry', onboardingStore.businessDetails.industry || '')
    formData.append('company_size', onboardingStore.businessDetails.size || '')
    formData.append('business_document', businessDocument)

    const response = await fetch('/api/signup', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Sign-up successful:', data)
    }
    else {
      console.error('Error during sign-up:', response.statusText)
    }
    onboardingStore.isLoading = false
    onboardingStore.verifyingCode = true
  }
  finally {
    onboardingStore.isLoading = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col m-5 gap-6">
    <!-- Title -->
    <div class="w-full text-center">
      <h1 class="text-4xl font-semibold mb-6">
        Verification & Summary
      </h1>
    </div>

    <!-- Personal Details Section -->
    <div class="w-full border p-6 rounded-lg shadow-lg bg-white">
      <h2 class="text-3xl font-semibold mb-4">
        Personal Details
      </h2>

      <div class="space-y-3">
        <p class="text-lg">
          <span class="font-semibold">Name:</span> {{ onboardingStore.personalDetails.name }}
        </p>
        <p class="text-lg">
          <span class="font-semibold">Phone:</span> {{ onboardingStore.personalDetails.phone_number }}
        </p>
        <p class="text-lg">
          <span class="font-semibold">Email:</span> {{ onboardingStore.personalDetails.email }}
        </p>

        <div class="mt-3 text-center">
          <figure class="inline-block">
            <img
              :src="onboardingStore.personalDetails.profile_image_url"
              alt="Profile picture"
              class="aspect-square h-24 rounded-full border-2 border-gray-300"
            >
            <figcaption class="text-sm text-gray-500">
              Profile Picture
            </figcaption>
          </figure>
        </div>
      </div>

      <div class="mt-4 text-center text-gray-500 text-sm">
        <p>Please review your personal information before proceeding.</p>
      </div>
    </div>

    <!-- Business Details Section -->
    <div class="w-full border p-6 rounded-lg shadow-lg bg-white">
      <h2 class="text-3xl font-semibold mb-4">
        Business Details
      </h2>

      <div class="space-y-3">
        <p class="text-lg">
          <span class="font-semibold">Business Name:</span> {{ onboardingStore.businessDetails.name }}
        </p>
        <p class="text-lg">
          <span class="font-semibold">Industry:</span> {{ onboardingStore.businessDetails.industry }}
        </p>
        <p class="text-lg">
          <span class="font-semibold">Company Size:</span> {{ onboardingStore.businessDetails.size }}
        </p>

        <div class="mt-3 text-center">
          <figure class="inline-block">
            <img
              class="aspect-square h-24 rounded-full border-2 border-gray-300"
              :src="onboardingStore.businessDetails.logo_url"
              alt="Business logo"
            >
            <figcaption class="text-sm text-gray-500">
              Business Logo
            </figcaption>
          </figure>
        </div>

        <div class="mt-4 border rounded-lg overflow-hidden">
          <iframe
            :src="onboardingStore.businessDetails.business_document"
            class="w-full h-72"
            frameborder="0"
            title="Business Document"
          />
        </div>
      </div>

      <div class="mt-4 text-center text-gray-500 text-sm">
        <p>
          Please ensure the details above are accurate. If any changes are needed, you can edit them before
          finalizing.
        </p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-6 flex gap-4 justify-center">
      <button
        type="button"
        class="bg-blue-500 text-white p-3 rounded-lg shadow-md disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed w-full"
        @click.prevent="onboardingStore.currentStep = 2"
      >
        Back to Business Details
      </button>

      <button
        class="bg-blue-500 text-white p-3 rounded-lg shadow-md disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed w-full"
        @click.prevent="signUp"
      >
        Submit Details
      </button>
    </div>

    <!-- Start Over Button -->
    <div class="mt-6 flex justify-center">
      <button
        type="button"
        class="bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-40"
        @click.prevent="onboardingStore.$reset()"
      >
        Start Over
      </button>
    </div>
  </div>
</template>
