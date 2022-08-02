import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid'
import { Link, useNavigate } from 'react-router-dom'
import { FormControlLabel, Switch } from '@mui/material'



export default function Register() {

  const [data, setData] = useState("")

  const navigate = useNavigate()
  const required = "*Campo obligatorio"
  const { REACT_APP_API_ENDPOINT } = process.env

  useEffect(() => {
  fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
          .then(response => response.json())
          .then(data => { setData(data.result)}) 


  }, [])

 

  let validationSchema = yup.object().shape({
    userName: yup.string().min(6, "la cantidad minima de caracteres es 6").required(required),
    password: yup.string().required(required),
    email: yup.string().email().required(required),
    //teamID: yup.string().required(),
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
        console.log(data?.result?.user?.teamID)
        navigate("/registered/" + data?.result?.user?.teamID, {replace: true})  
      }) 
  }

  })


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Registrate</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 w-80">
            <div>
              <input id="userName"
                type="text"
                placeholder="Usuario nuevo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              {errors.userName && touched.userName && <span>{errors.userName}</span>}
            </div>
            <div>
              <input id="password"
                type="password"
                placeholder="Password nuevo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              {errors.password && touched.password && <span>{errors.password}</span>}
            </div>
            <div>
              <input id="email"
                type="email"
                placeholder="Correo electronico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              {errors.email && touched.email && <span>{errors.email}</span>}
            </div>
           
            <FormControlLabel
                control={<Switch
                          value={values.switch}
                          onChange={() => setFieldValue("switch", !values.switch)}
                          name="switch"
                          color="secondary"/>} 
                          label="Perteneces a un equipo creado" />


            {values.switch && 
            ( <div>
                <label className="block">Por favor, ingresa un ID de equipo</label>
                <input id="teamID"
                onBlur={handleBlur}
                type="text"
                onChange={handleChange}
                value={values.teamID}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              </div>)}

            <div className="mt-4">
              <label className="block">Rol</label>
              <select id="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                <option value="">Selecciona un Rol</option>
                {data?.Rol?.map( option =>  (<option id={option} value={option}> {option} </option>) )}
              </select>
              {errors.role && touched.role && <span>{errors.role}</span>}
            </div>
 


            <div className="mt-4">
              <label className="block">Continente</label>
              <select id="continent"
                onBlur={handleBlur}
                onChange={e => handleChangeContinent(e.currentTarget.value)}
                value={values.continent}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                <option value="">Selecciona un Continente</option>
                {data?.continente?.map( option =>  ( <option id={option} value={option}> {option} </option> ) )}
               
              </select>
              {errors.continent && touched.continent && <span>{errors.continent}</span>}
            </div>
            {values.continent === "America" && (
              <div className="mt-4">
                <label className="block">Region</label>
                <select id="region"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.region}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                  <option value="">Selecciona una Region</option>
                {data?.region?.map( option =>  ( <option id={option} value={option}> {option} </option> ) )}
                </select>
                {errors.region && touched.region && <span>{errors.region}</span>}
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Registrate</button>
            </div>
            <div>
              <Link to="/login">Ir al login</Link>
            </div>
            

          </div>
        </form>
      </div>
    </div>

  )
}
