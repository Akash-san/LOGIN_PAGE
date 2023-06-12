import React, { useState } from 'react'
import { isAuth } from '../service/Auth'
import { RegisterApi } from '../service/Service'
import { storageUser } from '../service/storage';
import { Link, Navigate } from "react-router-dom"

import './RegisterPage.css'



function RegisterPage() {
    const initialErrors = {
        firstName: { required: false },
        lastName: { required: false },
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
        if (inputs.firstName == "") {
            errors.firstName.required = true;
            hasError = true;
        }
        if (inputs.lastName == "") {
            errors.lastName.required = true;
            hasError = true;
        }
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
            RegisterApi(inputs).then((response) => {
                storageUser(response.data.idToken)
            }).catch((err) => {
                if (err.response.data.error.message == "EMAIL_EXISTS") {
                    SetErrors({ ...errors, custom_error: "Already Email has been Register" })
                }
                else if (err.response.data.error.message == "WEAK_PASSWORD : Password should be at least 6 characters") {
                    SetErrors({ ...errors, custom_error: "Password should be at least 6 characters" })
                }
            }).finally(() => {
                setloading(false)
            })
        }
        SetErrors({ ...errors });
    }

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }
    //y reg is not redirect
    if (isAuth()) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <div className="form">

                <ul className="tab-group">
                    <li className="tab active"><Link to="/register">Register</Link> </li>
                    <li className="tab"><Link to="/login">Log In</Link></li>
                </ul>

                <div >
                    <div >
                        <h1>Register for Free!</h1>

                        <form onSubmit={handleSubmit} action="/" method="post">

                            <div className="top-row">
                                <div className="field-wrap">
                                    <label>
                                        First Name<span className="req">*</span>
                                    </label>
                                    <input type="text" onChange={handleInput} name="firstName" />
                                    {errors.firstName.required ?
                                        <span className="text-danger" >
                                            First Name is required.
                                        </span> : null
                                    }

                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Last Name<span className="req">*</span>
                                    </label>
                                    <input type="text" onChange={handleInput} name="lastName" />
                                    {errors.lastName.required ?
                                        <span className="text-danger" >
                                            Last Name is required.
                                        </span> : null

                                    }
                                </div>
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Email<span className="req">*</span>
                                </label>
                                <input type="email" onChange={handleInput} name="email" />
                                {errors.email.required ?

                                    <span className="text-danger" >
                                        Email is required.
                                    </span> : null
                                }
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Password<span className="req">*</span>
                                </label>
                                <input type="password" onChange={handleInput} name="password" />

                                {errors.password.required ?
                                    <span className="text-danger" >
                                        Password is required.
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
                            <button type="submit" disabled={loading} onSubmit={handleSubmit} className="button button-block">Register</button>

                        </form>


                    </div>



                </div>

            </div>
        </>


    )
}

export default RegisterPage