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

const { errors, handleSubmit, setErrors, setValues } = useForm({
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
      onboardingStore.storeProfilePic(file)
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
</script>

<template>
  <div class="p-5">
    <form
      action="#"
      @submit.prevent="submitForm"
    >
      <div>
        <label
          for="name"
          class="text-lg"
        >
          Name
        </label>
        <input
          id="name"
          v-model="name"
          class="w-full"
          type="text"
          autocomplete="name"
          placeholder="John Doe"
        >
        <small
          v-if="errors.name"
          class="text-red-500 italic"
        >{{ errors.name }}</small>
      </div>

      <div>
        <label
          for="email"
          class="text-lg"
        >
          E-mail
        </label>
        <input
          id="email"
          v-model="email"
          class="w-full"
          type="email"
          autocomplete="email"
          placeholder="john@example.com"
        >
        <small
          v-if="errors.email"
          class="text-red-500 italic"
        >{{ errors.email }}</small>
      </div>

      <div>
        <label
          for="phone"
          class="text-lg"
        >
          Phone number
        </label>
        <input
          id="phone"
          v-model="phone_number"
          class="w-full"
          type="tel"
          autocomplete="tel-area-code"
          placeholder="+254712345678"
        >
      </div>
      <small
        v-if="errors.phone_number"
        class="text-red-500 italic"
      >{{ errors.phone_number }}</small>

      <div>
        <label
          for="photo"
          class="text-lg"
        >
          Photo
        </label>
        <input
          id="photo"
          class="w-full border p-2"
          accept="image/jpg,image/png"
          type="file"
          @change="(event) => {
            const iEvent = event as InputEvent
            return handleUpload(iEvent)
          }"
        >
      </div>
      <small
        v-if="photoError"
        class="text-red-500 italic"
      >
        {{ photoError }}</small>

      <div class="mt-2">
        <button
          class="bg-blue-500 text-white p-2 disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed"
          :disabled="Object.keys(errors).length > 0 || onboardingStore.profilePicError != ''"
        >
          Proceed to business details
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
