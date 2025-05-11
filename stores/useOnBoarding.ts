import { defineStore } from 'pinia'

interface State {
  personalDetails: Partial<PersonalDetails>
  businessDetails: Partial<BusinessDetails>
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
      personalDetails: {},
      businessDetails: {},
    }
  },
})
