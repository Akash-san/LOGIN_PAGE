import './login.css'
import React from 'react'
import { useState } from 'react'
import { isAuth } from '../service/Auth'
import { Link, Navigate } from 'react-router-dom'
import { storageUser } from '../service/storage'
import { Register_Url } from '../service/Service'
export default function LoginPage() {
    const initialErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    }

    const [errors, SetErrors] = useState(initialErrors)
    const [loading, setloading] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialErrors;
        let hasError = false
        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }


        if (!hasError) {
            setloading(true)
            Register_Url(inputs).then((response) => {
                storageUser(response.data.idToken)
            }).catch((err) => {
                if (err.code = "ERR_BAD_REQUEST") {
                    SetErrors({ ...errors, custom_error: "Invalid Credentials." })
                }
            }).finally(() => {
                setloading(false)
            })
        }
        SetErrors({ ...errors });
    }

    const [inputs, setInputs] = useState({

        email: "",
        password: ""
    })

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    if (isAuth()) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <div id="loging">
                <form action="/" method="post">
                    <h1>Welcome!</h1>
                    <ul className="tab-group">
                        <li className="tab "><Link to="/">Register</Link> </li>
                        <li className="tab active"><Link to="/login">Log In</Link></li>
                    </ul>
                    <div className="field">
                        <label>
                            Email<span className=""></span>
                        </label>
                        <input type="email" onChange={handleInput} name="email" />
                        {errors.email.required ?

                            <span className="text-danger" >
                                Email is required.
                            </span> : null
                        }
                    </div>

                    <div className="field">
                        <label>
                            Password<span className="req"></span>
                        </label>
                        <input type="password" onChange={handleInput} name="password" />
                        {errors.password.required ?

                            <span className="text-danger" >
                                password is required.
                            </span> : null
                        }

                    </div>

                    {errors.custom_error ?

                        <span className="text-danger err" >
                            {errors.custom_error}
                        </span> : null
                    }

                    {loading ?
                        <div className="loading">
                            <div className="d1"></div>
                            <div className="d2"></div>
                        </div> : null
                    }

                    <button className="button button-block" disabled={loading} onClick={handleSubmit}>Log In</button>

                </form>

            </div>
        </>
    )
}