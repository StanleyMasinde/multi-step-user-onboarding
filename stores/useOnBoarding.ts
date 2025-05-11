import { defineStore } from 'pinia'

interface State {
  personalDetails: Partial<PersonalDetails>
  businessDetails: Partial<BusinessDetails>
  currentStep: number
  profilePicError: string
  documentError: string
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
    }
  },
  actions: {
    async uploadFile(file: File | undefined, type: 'picture' | 'PDF' = 'picture') {
      let maxSize = type == 'PDF' ? 5 : 2
      if (type == 'PDF') {
        maxSize = 5
      }

      if (!file) {
        this.personalDetails.profile_image_url = undefined
        if (type == 'PDF') {
          this.documentError = 'Please upload a PDF document'
        }
        else {
          this.profilePicError = 'Please add profile pic'
        }
        return
      }

      if (file.size > maxSize * 1024 * 1024) {
        this.personalDetails.profile_image_url = undefined
        if (type == 'PDF') {
          this.documentError = `The PDF must be less than ${maxSize}MB`
        }
        else {
          this.profilePicError = `The picture must be less that ${maxSize}MB`
        }

        return
      }

      try {
        const response = await fetch('https://example.com/upload', {
          method: 'POST',
          body: file,
        })

        if (response.ok) {
          const data = await response.json()
          this.personalDetails.profile_image_url = data.url
          this.profilePicError = ''
          this.documentError = ''
        }
        else {
          if (type == 'PDF') {
            this.documentError = 'Failed to upload the PDF.'
          }
          else {
            this.profilePicError = 'Fail to upload the profiel picture'
          }
        }
      }
      catch (error) {
        if (type == 'PDF') {
          this.documentError = 'An error occoured during PDF upload'
        }
        else {
          this.profilePicError = 'An error occoured during picture upload'
        }
        console.error(error)
      }
    },
  },
})
