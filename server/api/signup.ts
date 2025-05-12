export default defineEventHandler(async (event) => {
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    message: 'Sign-up successful',
  }
})
