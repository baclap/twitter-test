export function check200Status(response) {
    if (response.status === 200) {
        return response
    } else {
        const error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    return response.json()
}
