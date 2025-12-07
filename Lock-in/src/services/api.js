const BASE_URL = "http://localhost:3000"

export async function callApi(path, body) {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, 
      {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body) ?? "",
            credentials: 'include'
      }
    )
    const data = await response.json()
    return {
      ok: response.ok,
      status: response.status,
      data
    }
  } catch (err) {
    console.log(err.message)
  }
}

export async function getApi(path) {
  try {
    const response = await fetch(`${BASE_URL}/${path}`,
      {
        method: "GET",
        credentials: 'include'
      }
    )
    const data = await response.json()
    return {
      ok: response.ok,
      status: response.status,
      data
    }
  } catch (err) {
    console.log(err.message)
  }
}