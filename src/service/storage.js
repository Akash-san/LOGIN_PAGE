export const storageUser = (data) => {
    localStorage.setItem("idToken", data)
}
export const getItems = () => {
    return localStorage.getItem("idToken")
}