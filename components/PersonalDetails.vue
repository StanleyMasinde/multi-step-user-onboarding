<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const onboardingStore = useOnBoardingStore()

const validationSchema = yup.object({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email('Please enter a valid E-mail').required(),
  phone_number: yup.string()
    .required('Phone number is required')
    .matches(/^\+2547\d{8}$/, 'Phone number must be in +2547XXXXXXXX format'),
})

const { handleSubmit, errors } = useForm({
  validationSchema,
})

const { value: name } = useField<string>('name', () => onboardingStore.personalDetails.name)
const { value: email } = useField<string>('email', () => onboardingStore.personalDetails.email)
const { value: phone_number } = useField<string>('phone_number', () => onboardingStore.personalDetails.phone_number)

const submitForm = handleSubmit(() => {
  console.log('Form submitted with:')
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
          autocomplete="tel-national"
          placeholder="+254712345678"
        >
      </div>
      <small
        v-if="errors.phone_number"
        class="text-red-500 italic"
      >{{ errors.phone_number }}</small>

      <div class="mt-2">
        <button
          class="bg-blue-500 text-white p-2 disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed"
          :disabled="Object.keys(errors).length > 0"
        >
          Proceed to business details
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
