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
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          this.personalDetails.profile_image_url = reader.result as string
        }
      }

      reader.readAsDataURL(file)
    },
    setPersonalDetails(name: string, email: string, phone_number: string) {
      this.personalDetails.name = name
      this.personalDetails.email = email
      this.personalDetails.phone_number = phone_number
    },
  },
})
