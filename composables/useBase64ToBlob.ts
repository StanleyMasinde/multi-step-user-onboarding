export const useBase64ToBlob = (base64: string) => {
  const mimeType = base64.match(/^data:(image\/(png|jpeg)|application\/pdf);base64,/)?.[1]
  const byteChars = atob(base64.split(',')[1])
  const byteNumbers = new Array(byteChars.length)
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}
