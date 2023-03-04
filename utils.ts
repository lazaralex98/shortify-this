export function generateRandomString(length = 7) {
  return (Math.random() + 1).toString(36).substring(length)
}
