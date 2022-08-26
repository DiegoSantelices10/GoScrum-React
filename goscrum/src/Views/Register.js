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
      switch: true,
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
            region: values.region,
          }
        })
      })
      .then(response => response.json())
      .then(data => { 
        Swal.fire({
          icon: "success",
          title: 'Usuario creado con exito',
          html: '<p>Copia el id para compartir con tu equipo</p>' +
                `<p>${teamID}</p>`,
          width: "400px",
          timer: 10000,
          timerProgressBar: true,
      })
        navigate("/login" , {replace: true})  
      }) 
  }

  })


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800  md:bg-slate-900 ">
    <div className="w-full md:h-auto md:w-96 px-6 py-6 text-left rounded-xl bg-slate-800 md:shadow-md md:shadow-slate-500/60">
        <h3 className="text-2xl font-bold text-center text-white">¡Crea tu cuenta!</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <input id="userName"
                type="text"
                placeholder="Usuario nuevo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                className="w-full p-2 px-3 mt-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white"/>
              {errors.userName && touched.userName && <span className="text-sm text-white">{errors.userName}</span>}
            </div>
            <div className="mt-2">
              <input id="password"
                type="password"
                placeholder="Password nuevo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                className="w-full p-2 px-3 mt-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white"/>
              {errors.password && touched.password && <span className="text-sm text-white">{errors.password}</span>}
            </div>
            <div className="mt-2">
              <input id="email"
                type="email"
                placeholder="Correo electronico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                className="w-full p-2 mt-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white"/>
              {errors.email && touched.email && <span className="text-sm text-white">{errors.email}</span>}
            </div>
           
            <FormControlLabel
                control={<Switch
                          value={values.switch}
                          onChange={() => setFieldValue("switch", !values.switch)}
                          name="switch"
                          color="primary"/>} 

                          label="Perteneces a un equipo creado?"
                          className="px-2 pt-2 text-sm  text-white" />
                          
                       {values.switch &&  
                              ( <div>
                                    <input id="teamID"
                                    type="text"
                                    placeholder="Ingresa el ID de tu equipo."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.teamID}
                                    className="w-full p-2 px-3 my-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white"/>
                              </div>)
                        }  

            
            <div className="mt-2 p-2 bg-slate-500 rounded-md">
              <select id="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                className="w-full  border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white">
                <option value="">Selecciona un Rol</option>
                {data?.Rol?.map( option =>  (<option key={option} value={option}> {option} </option>) )}
              </select>
              {errors.role && touched.role && <span className="text-sm text-white">{errors.role}</span>}
            </div>
 


            <div className="mt-4 p-2 bg-slate-500 rounded-md">
              <select id="continent"
                onBlur={handleBlur}
                onChange={e => handleChangeContinent(e.currentTarget.value)}
                value={values.continent}
                className="w-full  border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white">
                <option value="">Selecciona un Continente</option>
                {data?.continente?.map( option =>  ( <option key={option} value={option} > {option} </option> ) )}
               
              </select>
              {errors.continent && touched.continent && <span className="text-sm text-white">{errors.continent}</span>}
            </div>
            {values.continent === "America" && (
              <div className="mt-4">
                <select id="region"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.region}
                  className="w-full px-4 py-2 mt-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <option value="">Selecciona una Region</option>
                {data?.region?.map( option =>  ( <option key={option} value={option}> {option} </option> ) )}
                </select>
                {errors.region && touched.region && <span className="text-sm text-white">{errors.region}</span>}
              </div>
            )}
              <div className="flex items-center justify-beetwen gap-2 pt-8">
                            <div className="w-1/2 text-center font-semibold text-sm 
                                            text-white hover:bg-cyan-500 hover:rounded-lg px-6 py-2 ">
                                <Link to="/login">Ya tienes cuenta</Link>
                            </div>
                            <div className="w-1/2">
                                <button type="submit" 
                                        className="w-full px-6 py-2 text-white font-semibold 
                                                 bg-cyan-600 rounded-lg hover:bg-cyan-500">Registrate</button>
                            </div>
                        </div>
            

          </div>
        </form>
      </div>
    </div>

  )
}
