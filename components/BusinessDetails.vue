<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const props = defineProps<{
  industries: string[]
}>()

const onboardingStore = useOnBoardingStore()

const companySizes = [
  { label: 'Self-Employed', value: '1' },
  { label: 'Micro Business (1-9 employees)', value: '1-9' },
  { label: 'Small Business (10-49 employees)', value: '10-49' },
  { label: 'Medium Business (50-249 employees)', value: '50-249' },
  { label: 'Large Business (250-999 employees)', value: '250-999' },
  { label: 'Enterprise (1000+ employees)', value: '1000+' },
]

const businessInfo = z.object({
  name: z.string().nonempty('Please enter the name of your business'),
  logo: z.string(),
  industry: z.string()
    .nonempty('Please select the industry'),
  size: z.string(),
  document: z.string(),
})

const { errors, handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(businessInfo),
})

const { value: name } = useField<string>('name')
const { setValue: setLogo } = useField('logo')
const { value: industry } = useField<string>('industry')
const { setValue: setDocument } = useField('document')
const { value: size } = useField<string>('size')

const onLogoInput = async (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const logoValidationSchema = z.object({
      logo: z.instanceof(File).refine(file => file.size <= 2 * 1024 * 1024, {
        message: 'Logo must be smaller than 2MB',
      }).refine(file => ['image/png', 'image/jpeg'].includes(file.type), {
        message: 'Unsupported file type. Only JPG and PNG allowed',
      }),
    })

    const validateLogo = logoValidationSchema.safeParse({ logo: file })

    if (validateLogo.success) {
      await onboardingStore.storeBusinessLogo(file)
      setLogo(onboardingStore.businessDetails.logo_url)
    }
    else {
      setErrors({
        logo: validateLogo.error.errors[0].message,
      })
    }
  }
}
const onDocumentInput = async (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const documentValidationSchema = z.object({
      document: z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, {
        message: 'Document must be less than 5MB',
      }).refine(file => file.type == 'application/pdf', {
        message: 'Unsupported file type. Only PDFs allowed',
      }),
    })

    const validateDocument = documentValidationSchema.safeParse({ document: file })

    if (validateDocument.success) {
      await onboardingStore.storeBusinessDocument(file)
      setDocument(onboardingStore.businessDetails.business_document)
    }
    else {
      setErrors({
        document: validateDocument.error.errors[0].message,
      })
    }
  }
}

const submitForm = handleSubmit(() => {
  onboardingStore.setBusinessDetails(name.value, industry.value, size.value)
  onboardingStore.currentStep = 3
})

onMounted(() => {
  if (onboardingStore.businessDetails.name) name.value = onboardingStore.businessDetails.name
  if (onboardingStore.businessDetails.logo_url) setLogo(onboardingStore.businessDetails.logo_url)
  if (onboardingStore.businessDetails.business_document) setDocument(onboardingStore.businessDetails.business_document)
  if (onboardingStore.businessDetails.industry) industry.value = onboardingStore.businessDetails.industry
  if (onboardingStore.businessDetails.size) size.value = onboardingStore.businessDetails.size
})
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
    <!-- Title -->
    <h2 class="text-2xl font-semibold text-center mb-6">
      Business details
    </h2>

    <form
      action="#"
      @submit.prevent="submitForm"
    >
      <!-- Business Name Field -->
      <div class="mb-4">
        <label
          for="name"
          class="text-lg font-semibold"
        >Business Name</label>
        <input
          id="name"
          v-model="name"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          autocomplete="organization-title"
          placeholder="Acme Inc"
        >
        <small
          v-if="errors.name"
          class="text-red-500 italic"
        >{{ errors.name }}</small>
      </div>

      <!-- Logo Upload Field -->
      <div class="mb-4">
        <label
          for="logo"
          class="text-lg font-semibold"
        >Logo</label>
        <input
          id="logo"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          accept="image/jpg,image/png"
          type="file"
          @change="(event) => {
            const iEvent = event as InputEvent;
            return onLogoInput(iEvent);
          }"
        >
        <small
          v-if="errors.logo"
          class="text-red-500 italic"
        >{{ errors.logo }}</small>
      </div>

      <!-- Industry Selection -->
      <div class="mb-4">
        <label
          for="industry"
          class="text-lg font-semibold"
        >Industry</label>
        <select
          id="industry"
          v-model="industry"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        >{{ errors.industry }}</small>
      </div>

      <!-- Company Size Selection -->
      <div class="mb-4">
        <label
          for="size"
          class="text-lg font-semibold"
        >Company Size</label>
        <select
          id="size"
          v-model="size"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option
            v-for="(company_size, index) in companySizes"
            :key="index"
            :value="company_size.value"
          >
            {{
              company_size.label }}
          </option>
        </select>
        <small
          v-if="errors.size"
          class="text-red-500 italic"
        >{{ errors.size }}</small>
      </div>

      <!-- Business Document Upload -->
      <div class="mb-4">
        <label
          for="document"
          class="text-lg font-semibold"
        >Business Document</label>
        <input
          id="document"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          accept="application/pdf"
          type="file"
          @change="(event) => {
            const iEvent = event as InputEvent;
            return onDocumentInput(iEvent);
          }"
        >
        <small
          v-if="errors.document"
          class="text-red-500 italic"
        >{{ errors.document }}</small>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-4 flex gap-4 justify-center">
        <button
          type="button"
          class="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-blue-500/60 disabled:cursor-not-allowed w-full"
          @click.prevent="onboardingStore.currentStep = 1"
        >
          Edit personal details
        </button>

        <button
          class="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-blue-500/60 disabled:cursor-not-allowed w-full"
          :disabled="Object.keys(errors).length > 0"
        >
          Verify details
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
