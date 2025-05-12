# Multi-step User Onboarding

## Technologies Used

* Frontend: Nuxt 3 with Composition API
* State Management: Pinia
* Styles: Tailwind CSS
* Package Manager: PNPM

## Prerequisites

Ensure you have the following installed:

* Node.js (>= 16.x)
* PNPM ([https://pnpm.io](https://pnpm.io))
* Git

## Setup Instructions

1. Clone this repository

   ```bash
   git clone https://github.com/StanleyMasinde/multi-step-user-onboarding.git
   ```

2. Change into the project directory

   ```bash
   cd multi-step-user-onboarding
   ```

3. Install all dependencies using PNPM

   ```bash
   pnpm install
   ```

4. Start the development server

   ```bash
   pnpm dev
   ```

## How to Test OTP

* On the OTP phase, inputting **12345** will be successful. Any other input will fail. This is how failure is simulated.
* API responses are mocked using **Nuxt's built-in server routes**. No actual backend is connected.

## Usage

* Access the application at `http://localhost:3000`
* Follow the guided multi-step onboarding process

## License

This project is licensed under the MIT License.

## Acknowledgements

* Nuxt 3 for the frontend framework
* Pinia for state management
* Tailwind CSS for styling
