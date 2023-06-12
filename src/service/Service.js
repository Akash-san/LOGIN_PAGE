import axios from "axios"
axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1"
const key_api = "AIzaSyAHrgXd2FrjSlHvz1k1eLDZygnve2FeH5k"
const registerUrl = `/accounts:signUp?key=${key_api}`
const registerSignIn = `/accounts:signInWithPassword?key=${key_api}`
export const RegisterApi = (inputs) => {
    let data = { displayName: inputs.name, email: inputs.email, password: inputs.password }
    return axios.post(registerUrl, data)
}

export const Register_Url = (inputs) => {
    let data = { email: inputs.email, password: inputs.password }
    return axios.post(registerSignIn, data)
}