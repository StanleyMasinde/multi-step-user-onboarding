<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const onboardingStore = useOnBoardingStore()

const personalInputSchema = z.object({
  name: z.string({ message: 'Name is required' }).nonempty('Name is required'),
  email: z.string({ message: 'E-mail is required' }).email('Please enter a valid E-mail').nonempty('E-mail is required'),
  phone_number: z.string()
    .nonempty('Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format (E.164)'),
  photo: z.string(),
})

const { errors, handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(personalInputSchema),
})

const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: phone_number } = useField<string>('phone_number')
const { errorMessage: photoError, value: photoValue } = useField('photo')

const handleUpload = async (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const photoValidationSchema = z.object({
      photo: z.instanceof(File).refine(file => file.size <= 2 * 1024 * 1024, {
        message: 'Picture must be smaller than 2MB',
      }).refine(file => ['image/png', 'image/jpeg'].includes(file.type), {
        message: 'Unsupported file type. Only JPG and PNG allowed',
      }),
    })

    const photoValidation = photoValidationSchema.safeParse({ photo: file })

    if (photoValidation.success) {
      await onboardingStore.storeProfilePic(file)
      setErrors({
        photo: '',
      })
      photoValue.value = onboardingStore.personalDetails.profile_image_url
    }
    else {
      setErrors({
        photo: photoValidation.error.errors[0].message,
      })
    }
  }
}

const submitForm = handleSubmit(() => {
  onboardingStore.setPersonalDetails(name.value, email.value, phone_number.value)
  onboardingStore.currentStep = 2
})

onMounted(() => {
  // Try and set values from the persisted state
  onMounted(() => {
    if (onboardingStore.personalDetails.name) name.value = onboardingStore.personalDetails.name
    if (onboardingStore.personalDetails.email) email.value = onboardingStore.personalDetails.email
    if (onboardingStore.personalDetails.phone_number) phone_number.value = onboardingStore.personalDetails.phone_number
    if (onboardingStore.personalDetails.profile_image_url) photoValue.value = onboardingStore.personalDetails.profile_image_url
  })
})
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center mb-6">
      Personal details
    </h2>

    <form
      action="#"
      @submit.prevent="submitForm"
    >
      <!-- Name Field -->
      <div class="mb-4">
        <label
          for="name"
          class="text-lg font-semibold"
        >Name</label>
        <input
          id="name"
          v-model="name"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          autocomplete="name"
          placeholder="John Doe"
        >
        <small
          v-if="errors.name"
          class="text-red-500 italic"
        >{{ errors.name }}</small>
      </div>

      <!-- Email Field -->
      <div class="mb-4">
        <label
          for="email"
          class="text-lg font-semibold"
        >E-mail</label>
        <input
          id="email"
          v-model="email"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          autocomplete="email"
          placeholder="john@example.com"
        >
        <small
          v-if="errors.email"
          class="text-red-500 italic"
        >{{ errors.email }}</small>
      </div>

      <!-- Phone Number Field -->
      <div class="mb-4">
        <label
          for="phone"
          class="text-lg font-semibold"
        >Phone number</label>
        <input
          id="phone"
          v-model="phone_number"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="tel"
          autocomplete="tel-area-code"
          placeholder="+254712345678"
        >
        <small
          v-if="errors.phone_number"
          class="text-red-500 italic"
        >{{ errors.phone_number }}</small>
      </div>

      <!-- Photo Upload Field -->
      <div class="mb-4">
        <label
          for="photo"
          class="text-lg font-semibold"
        >Photo</label>
        <input
          id="photo"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          accept="image/jpg,image/png"
          type="file"
          @change="(event) => {
            const iEvent = event as InputEvent;
            return handleUpload(iEvent);
          }"
        >
        <small
          v-if="photoError"
          class="text-red-500 italic"
        >{{ photoError }}</small>
      </div>

      <!-- Submit Button -->
      <div class="mt-6">
        <button
          class="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none disabled:bg-blue-500/60 disabled:cursor-not-allowed"
          :disabled="Object.keys(errors).length > 0"
        >
          Proceed to business details
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
