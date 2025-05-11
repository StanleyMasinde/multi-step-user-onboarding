export const useFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string)
      }
    }

    reader.onerror = (err) => {
      reject(err)
    }

    reader.readAsDataURL(file)
  })
}
