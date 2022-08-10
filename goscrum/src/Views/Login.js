import React from 'react'
import { useFormik } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import * as yup from 'yup';
import Swal from "sweetalert2"


export default function Login() {
    const navigate = useNavigate()
    const required = "*Campo obligatorio"
    const { REACT_APP_API_ENDPOINT } = process.env

    let validationSchema = yup.object().shape({
        userName: yup.string().min(6, "la cantidad minima de caracteres es 6").required(required),
        password: yup.string().required(required)
    });

    const { handleSubmit, handleChange, values, handleBlur, errors, touched } = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema,

        onSubmit: async (values) => {
            const { userName, password } = values
            await fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status_code === 200) {
                        localStorage.setItem("token", data?.result?.token)
                        localStorage.setItem("userName", data?.result?.user.userName)
                        navigate("/", { replace: true })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: 'Incorrecto',
                            text: 'Introduzca credenciales válidas',
                            confirmButtonText: "Aceptar",
                            width: "400px",
                            timer: 10000,
                            timerProgressBar: true,
                        })
                    }
                })
        }
    });




    return (
        <div className="flex items-center justify-center min-h-screen  md:bg-gray-100 ">
            <div className="w-full md:h-auto md:w-96 px-6 py-6 text-left bg-white md:shadow-lg">
                <h3 className="text-2xl font-bold text-center">Goscrum</h3>
                <form onSubmit={handleSubmit}>
                    <h1 className="font-semibold text-center">Ingresa tus datos</h1>
                    <div className="mt-2">
                        <div>
                            <input id="userName"
                                type="text"
                                placeholder="Usuario"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            {errors.userName && touched.userName && <span>{errors.userName}</span>}

                        </div>
                        <div className="mt-4">
                            <input id="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={values.password}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            {errors.password && touched.password && <span>{errors.password}</span>}
                        </div>

                        <div className="flex items-center justify-beetwen gap-2 pt-8">
                            <div className="w-1/2 text-center font-semibold 
                                            hover:text-white hover:bg-blue-600 hover:rounded-lg px-6 py-2 ">
                                <Link to="/register">Registrate</Link>
                            </div>
                            <div className="w-1/2">
                                <button type="submit" 
                                        className="w-full px-6 py-2 text-white font-semibold 
                                                 bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                            </div>
                        </div>


                    </div>
                </form>
            </div>
        </div>

    )
}
