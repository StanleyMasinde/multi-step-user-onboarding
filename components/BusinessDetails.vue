<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const onboardingStore = useOnBoardingStore()
const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Energy',
  'Hospitality',
  'Entertainment',
  'E-commerce',
]

const businessInfo = z.object({
  name: z.string().nonempty('Please enter the name of your business'),
  logo: z.instanceof(File).refine(file => file.size <= 2 * 1024 * 1024, { message: 'Logo must be smaller than or equal to 2MB' }),
  industry: z.string()
    .nonempty('Please select the industry'),
  size: z.number().gt(0, 'Company size has to be bigger than zero'),
  document: z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, { message: 'The document must be smaller than or equal to 5MB' }),
})

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(businessInfo),
})

const { value: name } = useField('name')
const { setValue: setLogo } = useField('logo')
const { value: industry } = useField('industry')
const { setValue: setDocument } = useField('document')

const handleUpload = async (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file?.type == 'application/pdf') {
    setDocument(file)
    await onboardingStore.uploadFile(file, 'document')
  }
  else {
    setLogo(file)
    await onboardingStore.uploadFile(file, 'logo')
  }
}

const submitForm = handleSubmit(() => {
  if (!onboardingStore.personalDetails.profile_image_url) {
    onboardingStore.profilePicError = 'Pleas add a profile picture'
    return
  }
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
          for="photo"
          class="text-lg"
        >
          Logo
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
        v-if="onboardingStore.logoError"
        class="text-red-500 italic"
      >
        {{ onboardingStore.logoError }}
      </small>

      <div>
        <label
          for="industry"
          class="text-lg"
        >
          Name
        </label>
        <select
          id="industry"
          v-model="industry"
          class="w-full"
          type="text"
          autocomplete="name"
          placeholder="John Doe"
        >
          <option
            v-for="(ind, index) in industries"
            :key="index"
            :value="ind"
          >
            {{ ind }}
          </option>
        </select>
        <small
          v-if="errors.industry"
          class="text-red-500 italic"
        >{{ errors.name }}</small>
      </div>

      <div class="mt-2">
        <button
          class="bg-blue-500 text-white p-2 disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed"
          :disabled="Object.keys(errors).length > 0 || onboardingStore.profilePicError != ''"
        >
          Verify details
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
