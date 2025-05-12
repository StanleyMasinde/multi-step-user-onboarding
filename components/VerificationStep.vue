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

onMounted(() => {
  // Due to persistence, this component might render first.
  // The code below is to esure the images are loaded correcty
})
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
        @click.prevent="signUp"
      >
        Submit details
      </button>
    </div>
  </div>
</template>
