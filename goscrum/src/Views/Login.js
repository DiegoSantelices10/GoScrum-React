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
                        sessionStorage.setItem("token", data?.result?.token)
                        sessionStorage.setItem("userName", data?.result?.user.userName)
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
        <div className="flex items-center justify-center min-h-screen bg-slate-800  md:bg-slate-900 ">
            <div className="w-full md:h-auto md:w-96 px-6 py-6 text-left rounded-xl bg-slate-800 md:shadow-md md:shadow-slate-500/60">
                <h3 className="text-2xl font-bold text-center text-white">Goscrum</h3>
                <form onSubmit={handleSubmit}>
                    <h1 className="font-semibold text-center text-white">Ingresa tus datos</h1>
                    <div className="mt-2">
                        <div>
                            <input id="userName"
                                type="text"
                                placeholder="Usuario"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                className="w-full px-4 py-2 mt-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white" />
                            {errors.userName && touched.userName && <span className="text-white text-xs">{errors.userName}</span>}

                        </div>
                        <div className="mt-4">
                            <input id="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={values.password}
                                className="w-full px-4 py-2 mt-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white" />
                            {errors.password && touched.password && <span className="text-white text-xs">{errors.password}</span>}
                        </div>

                        <div className="flex items-center justify-beetwen gap-2 pt-8">
                            <div className="w-1/2 text-center font-semibold 
                                             text-white hover:bg-cyan-500 hover:rounded-lg px-6 py-2 ">
                                <Link to="/register">Registrate</Link>
                            </div>
                            <div className="w-1/2">
                                <button type="submit" 
                                        className="w-full px-6 py-2 text-white font-semibold 
                                                 bg-cyan-600 rounded-lg hover:bg-cyan-500">Login</button>
                            </div>
                        </div>


                    </div>
                </form>
            </div>
        </div>

    )
}
