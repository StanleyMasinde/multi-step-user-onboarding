import { defineStore } from 'pinia'

interface State {
  personalDetails: Partial<PersonalDetails>
  businessDetails: Partial<BusinessDetails>
  currentStep: number
  profilePicError: string
  documentError: string
  logoError: string

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
      },
      businessDetails: {
      },
      currentStep: 1,
      profilePicError: '',
      documentError: '',
      logoError: '',
    }
  },
  actions: {
    async storeProfilePic(file: File) {
      this.personalDetails.profile_image_url = await useFileAsBase64(file)
    },
    setPersonalDetails(name: string, email: string, phone_number: string) {
      this.personalDetails.name = name
      this.personalDetails.email = email
      this.personalDetails.phone_number = phone_number
    },
  },
})
