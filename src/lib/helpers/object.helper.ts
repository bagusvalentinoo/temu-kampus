export const filterNonNullValues = (obj: object) => {
  // Initialize a new object to store the filtered values
  const filteredObj: any = {}

  // Loop through each key-value pair in the object
  for (const [key, value] of Object.entries(obj)) {
    // Check if the value is not null
    if (value !== null) {
      // Add the key-value pair to the new object
      filteredObj[key] = value
    }
  }

  // Return the filtered object
  return filteredObj
}
