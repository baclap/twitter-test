export default function normalizeUsername(username) {
    username = username.trim()
    if (username.charAt(0) === '@') {
        username = username.slice(1, username.length)
    }
    return username
}
