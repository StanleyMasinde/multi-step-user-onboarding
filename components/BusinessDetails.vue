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
          Business Name
        </label>
        <input
          id="name"
          v-model="name"
          class="w-full"
          type="text"
          autocomplete="organization-title"
          placeholder="Acme Inc"
        >
        <small
          v-if="errors.name"
          class="text-red-500 italic"
        >{{ errors.name }}</small>
      </div>

      <div>
        <label
          for="logo"
          class="text-lg"
        >
          Logo
        </label>
        <input
          id="logo"
          class="w-full border p-2"
          accept="image/jpg,image/png"
          type="file"
          @change="(event) => {
            const iEvent = event as InputEvent
            return onLogoInput(iEvent)
          }"
        >
      </div>
      <small
        v-if="errors.logo"
        class="text-red-500 italic"
      >
        {{ errors.logo }}
      </small>

      <div>
        <label
          for="industry"
          class="text-lg"
        >
          Industry
        </label>
        <select
          id="industry"
          v-model="industry"
          class="w-full"
          type="text"
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

      <div>
        <label
          for="industry"
          class="text-lg"
        >
          Company size
        </label>
        <select
          id="industry"
          v-model="size"
          class="w-full"
          type="text"
        >
          <option
            v-for="(company_size, index) in companySizes"
            :key="index"
            :value="company_size.value"
          >
            {{ company_size.label }}
          </option>
        </select>
        <small
          v-if="errors.size"
          class="text-red-500 italic"
        >{{ errors.size }}</small>
      </div>

      <div>
        <label
          for="document"
          class="text-lg"
        >
          Business document
        </label>
        <input
          id="logo"
          class="w-full border p-2"
          accept="application/pdf"
          type="file"
          @change="(event) => {
            const iEvent = event as InputEvent
            return onDocumentInput(iEvent)
          }"
        >
      </div>
      <small
        v-if="errors.document"
        class="text-red-500 italic"
      >
        {{ errors.document }}
      </small>

      <div class="mt-2 flex gap-2 justify-center">
        <button
          type="button"
          class="bg-blue-500 text-white p-2 disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed w-full"
          :disabled="Object.keys(errors).length > 0"
          @click.prevent="onboardingStore.currentStep = 1"
        >
          Edit personal details
        </button>

        <button
          class="bg-blue-500 text-white p-2 disabled:bg-blue-500/60 cursor-pointer disabled:cursor-not-allowed w-full"
          :disabled="Object.keys(errors).length > 0"
        >
          Verify details
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
