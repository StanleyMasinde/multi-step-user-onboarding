<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits(['success', 'loading'])

const { errors, handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(z.object({
    code: z.string({ message: 'OTP can not be blank' }).length(5, 'Code must be exactly 5 characters'),
  })),
})

const { value: code } = useField('code')

const verifyCode = async () => {
  try {
    emit('loading', true)
    const res = await fetch('/api/verify-email', {
      method: 'POST',
      body: JSON.stringify({ code: code.value }),
    })

    emit('loading', false)
    if (res.ok) {
      emit('success', true)
      return true
    }
    setErrors({
      code: 'Invalid code please try again',
    })
  }
  catch (err) {
    emit('loading', false)
  }
}

const submitForm = handleSubmit(async () => {
  await verifyCode()
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 class="text-xl mb-4 text-center">
        Sign up was successful, please check your email for verification code
      </h2>
      <form @submit.prevent="submitForm">
        <input
          v-model="code"
          type="text"
          maxlength="5"
          placeholder="Enter your OTP"
          class="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
        >
        <div
          v-if="errors.code"
          id="error-message"
          class="text-red-500 text-sm mb-2"
        >
          {{ errors.code }}
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg disabled:bg-blue-500/50 cursor-pointer disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Please wait' : 'Verify' }}
        </button>
      </form>
    </div>
  </div>
</template>
