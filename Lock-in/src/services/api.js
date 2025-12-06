const BASE_URL = "http://localhost:3000"

export async function getProjects() {
  try {
    const response = await fetch(`${BASE_URL}/projects`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err.message)
  }
}