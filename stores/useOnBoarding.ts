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
  size: string
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
    async storeBusinessLogo(file: File) {
      this.businessDetails.logo_url = await useFileAsBase64(file)
    },
    async storeBusinessDocument(file: File) {
      this.businessDetails.business_document = await useFileAsBase64(file)
    },
    setPersonalDetails(name: string, email: string, phone_number: string) {
      this.personalDetails.name = name
      this.personalDetails.email = email
      this.personalDetails.phone_number = phone_number
    },
    setBusinessDetails(name: string, industry: string, size: string) {
      this.businessDetails.name = name
      this.businessDetails.industry = industry
      this.businessDetails.size = size
    },
  },
})
