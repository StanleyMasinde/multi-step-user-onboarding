# Multi-step User Onboarding with Nuxt 3, Pinia, and Tailwind CSS

## Overview

This project is a multi-step user onboarding application built using Nuxt 3, leveraging its robust ecosystem for rapid development. The decision to use Nuxt over pure Vue was driven by the need for a structured, scalable setup with minimal configuration overhead. Nuxt's built-in features for routing, state management, and server-side rendering enhanced development speed and maintainability.

## Technology Choices

* **Frontend:** Nuxt 3 with Composition API - for a scalable, modular, and maintainable architecture.
* **State Management:** Pinia - the recommended state management solution for Nuxt 3, providing a simple yet powerful API.
* **Styles:** Tailwind CSS - for utility-first, responsive, and maintainable styling.
* **Validation:** VeeValidate and Zod - providing robust form validation with a type-safe approach.

## State Management

This application uses Pinia with persistent state enabled via local storage. The persistent state ensures that user data (including base64-encoded files) is maintained even after page reloads. Local storage is used because the state contains large base64-encoded files that cannot fit in cookies. To prevent SSR-related issues with file previews (which depend on the persisted state), the preview component is wrapped in `<client-only>` to ensure it renders only on the client side.

## Validation

VeeValidate and Zod were used for form validation, ensuring a type-safe approach that is flexible and adaptable. While VeeValidate offers reactive form validation, Zod enhances it with schema validation, making it easier to maintain complex form logic.

## Testing (Planned)

I intended to use Vitest for component testing due to its speed and flexibility. However, I encountered configuration challenges specific to Nuxt 3 (primarily around auto-imported components and modules). Given the time constraints, I was unable to complete the setup. With more time, I would prioritize resolving the Vitest configuration and achieving comprehensive test coverage.

## Mocking API Responses

API responses are mocked using Nuxt's built-in server routes. All mock files are located in the `server/api/` folder. For example, the OTP verification is simulated: inputting **12345** succeeds, while any other input triggers a failure.

## Project Structure

* **`components/`** - Reusable UI components.
* **`composables/`** - Reusable logic and state management.
* **`pages/`** - Page components leveraging Nuxt's file-based routing.
* **`server/api/`** - Mock API routes for testing without a backend.

## Prerequisites

Ensure you have the following installed:

* Node.js (>= 16.x)
* PNPM ([https://pnpm.io](https://pnpm.io))
* Git

## Setup Instructions

1. Clone this repository:

   ```bash
   git clone git@github.com:StanleyMasinde/multi-step-user-onboarding.git
   ```

2. Change into the project directory:

   ```bash
   cd multi-step-user-onboarding
   ```

3. Install all dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

## How to Test OTP

* On the OTP phase, inputting **12345** will be successful. Any other input will simulate a failure.
* API responses are mocked using **Nuxt's built-in server routes**.

## Usage

* Access the application at `http://localhost:3000`
* Follow the guided multi-step onboarding process.

## License

This project is licensed under the MIT License.

## Acknowledgements

* Nuxt 3 for the frontend framework.
* Pinia for state management.
* Tailwind CSS for styling.
