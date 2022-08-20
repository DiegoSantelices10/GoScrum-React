import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid'
import { Link, useNavigate } from 'react-router-dom'
import { FormControlLabel, Switch } from '@mui/material'
import Swal from "sweetalert2"



export default function Register() {

  const [data, setData] = useState("")

  const navigate = useNavigate()
  const required = "*Campo obligatorio"
  const { REACT_APP_API_ENDPOINT } = process.env

  useEffect( () => {
         fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
          .then(response => response.json())
          .then(data => { setData(data.result)}) 
  }, [data])

 

  let validationSchema = yup.object().shape({
    userName: yup.string().min(6, "la cantidad minima de caracteres es 6").required(required),
    password: yup.string().required(required),
    email: yup.string().email().required(required),
    role: yup.string().required(required),
    continent: yup.string().required(required),
    region: yup.string().required(required),
  });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value)
    if (value !== "America") setFieldValue("region", "Otro")
  }

  const { handleSubmit, handleChange, values, errors, touched, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      teamID: "",
      role: "",
      continent: "",
      region: "",
      switch: false,
    }, validationSchema, 

    onSubmit: async () => {
      const teamID = !values.teamID ? uuidv4() : values.teamID
  
      await fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          user: {
            userName: values.userName,
            password: values.password,
            email: values.email,
            teamID,
            role: values.role,
            continent: values.continent,
            region: values.region
          }
        })
      })
      .then(response => response.json())
      .then(data => { 
        Swal.fire({
          icon: "success",
          title: 'Usuario creado',
          text: 'Con exito',
          width: "400px",
          timer: 10000,
          timerProgressBar: true,
      })
        navigate("/login" , {replace: true})  
      }) 
  }

  })


  return (
    <div className="flex items-center justify-center min-h-screen md:bg-gray-100">
    <div className="w-full md:h-auto md:w-96 px-6 py-6 text-left bg-white md:shadow-lg">
        <h3 className="text-2xl font-bold text-center">REGISTRATE</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <input id="userName"
                type="text"
                placeholder="Usuario nuevo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              {errors.userName && touched.userName && <span className="text-sm text-red-900">{errors.userName}</span>}
            </div>
            <div>
              <input id="password"
                type="password"
                placeholder="Password nuevo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              {errors.password && touched.password && <span className="text-sm text-red-900">{errors.password}</span>}
            </div>
            <div>
              <input id="email"
                type="email"
                placeholder="Correo electronico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              {errors.email && touched.email && <span className="text-sm text-red-900">{errors.email}</span>}
            </div>
           
            <FormControlLabel
                control={<Switch
                          value={values.switch}
                          onChange={() => setFieldValue("switch", !values.switch)}
                          name="switch"
                          color="primary"/>} 

                          label="Perteneces a un equipo creado?"
                          className="px-2 pt-2 text-sm font-semibold" />


            {values.switch && 
            ( <div>
                <input id="teamID"
                type="text"
                placeholder="Ingresa el ID de tu equipo."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.teamID}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              </div>)}

            <div >
              <select id="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                <option value="">Selecciona un Rol</option>
                {data?.Rol?.map( option =>  (<option key={option} value={option}> {option} </option>) )}
              </select>
              {errors.role && touched.role && <span className="text-sm text-red-900">{errors.role}</span>}
            </div>
 


            <div className="mt-4">
              <select id="continent"
                onBlur={handleBlur}
                onChange={e => handleChangeContinent(e.currentTarget.value)}
                value={values.continent}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                <option value="">Selecciona un Continente</option>
                {data?.continente?.map( option =>  ( <option key={option} value={option} > {option} </option> ) )}
               
              </select>
              {errors.continent && touched.continent && <span className="text-sm text-red-900">{errors.continent}</span>}
            </div>
            {values.continent === "America" && (
              <div className="mt-4">
                <select id="region"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.region}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                  <option value="">Selecciona una Region</option>
                {data?.region?.map( option =>  ( <option key={option} value={option}> {option} </option> ) )}
                </select>
                {errors.region && touched.region && <span className="text-sm text-red-900">{errors.region}</span>}
              </div>
            )}
              <div className="flex items-center justify-beetwen gap-2 pt-8">
                            <div className="w-1/2 text-center font-semibold text-sm 
                                            hover:text-white hover:bg-blue-600 hover:rounded-lg px-6 py-2 ">
                                <Link to="/login">Ya tienes cuenta</Link>
                            </div>
                            <div className="w-1/2">
                                <button type="submit" 
                                        className="w-full px-6 py-2 text-white font-semibold 
                                                 bg-blue-600 rounded-lg hover:bg-blue-900">Registrate</button>
                            </div>
                        </div>
            

          </div>
        </form>
      </div>
    </div>

  )
}
