export default defineEventHandler(async (event) => {
  // Delay for 2 seconds
  await new Promise(resolve => setTimeout(resolve, 500))

  const body = await readBody(event)
  const { code } = JSON.parse(body)

  if (code === '12345') {
    return {
      status: 'success',
      message: 'Email verified successfully',
    }
  }
  else {
    setResponseStatus(event, 422)
    return {
      status: 'failure',
      message: 'Invalid verification code',
    }
  }
})
