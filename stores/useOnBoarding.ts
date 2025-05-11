import { defineStore } from "pinia";

interface State {
	personalDetails: Partial<PersonalDetails>
	businessDetails: Partial<BusinessDetails>
}

interface PersonalDetails {
	name: String
	email: String
	phone_number: String
	profile_image_url: String
}

interface BusinessDetails {
	name: String
	logo_url: String
	industry: String
	size: number
	business_document: String
}

export const useOnBoardingStore = defineStore('onboarding', {
	state: (): State => {
		return {
			personalDetails: {},
			businessDetails: {}
		}
	}
})
