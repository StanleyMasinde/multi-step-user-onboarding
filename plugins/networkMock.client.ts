export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Mocked Fetch Enabled in Development')

    globalThis.fetch = async (input: RequestInfo, init?: RequestInit) => {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

      return Promise.resolve(
        new Response(
          JSON.stringify({
            url: 'https://mocked-server.com/uploads/mock-file.jpg',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      )
    }
  }
})
