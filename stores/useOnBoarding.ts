import { defineStore } from 'pinia'

interface State {
  personalDetails: PersonalDetails
  businessDetails: BusinessDetails
  currentStep: number
}

interface PersonalDetails {
  name: string
  email: string
  phone_number: string
  profile_image_url: string
}

interface BusinessDetails {
  name: string
  logo_url: string
  industry: string
  size: number
  business_document: string
}

export const useOnBoardingStore = defineStore('onboarding', {
  state: (): State => {
    return {
      personalDetails: {
        name: '',
        email: '',
        phone_number: '',
        profile_image_url: '',
      },
      businessDetails: {
        name: '',
        logo_url: '',
        industry: '',
        size: 0,
        business_document: '',
      },
      currentStep: 1,
    }
  },
})
