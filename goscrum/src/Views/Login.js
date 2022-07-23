import React from 'react'
import { replace, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function Login() {

const navigate = useNavigate()


const { handleSubmit, handleChange, values} = useFormik({
    initialValues: {
        username: "",
        password: ""
    },
    validate: values => {

    },
    onSubmit: values =>{
    localStorage.setItem("logged")
    navigate("/task", { replace : true })
    }
})

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
            <div className="mt-4">
                    <div>
                        <label className="block" for="email">Email</label>
                            <input type="text" 
                                   placeholder="Email"
                                   onChange={handleChange}
                                   value={values.username}
                                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 
                                            focus:ring-blue-600"/>
                    </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                            <input type="password" 
                                   placeholder="Password"
                                   onChange={handleChange}
                                   value={values.password}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                </div>
                <div className="flex items-baseline justify-between">
                    <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>
            </div>
        </form>
    </div>
</div>

  )
}
