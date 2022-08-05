import { React, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { toast } from "react-toastify"




export default function TaskForm() {

const { REACT_APP_API_ENDPOINT: API_ENDPOINT  } = process.env
const required = "*Campo requerido"

const [data, setData] = useState()

useEffect( () => {
 fetch(`${API_ENDPOINT}task/data`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify()
  })
  .then(response => response.json())
  .then(data => { setData(data.result) })
})



  let validationSchema = yup.object().shape({
    title: yup.string()
              .min(6, "la cantidad minima de caracteres es 6")
              .required(),
    status: yup.string().required(required),
    description: yup.string().required(required),
    importance: yup.string().required(required)
  });


  const {handleSubmit, handleChange, values, errors, touched, handleBlur, resetForm} = useFormik({
    initialValues: {
      title: "",
      status: "",
      importance: "",
      description: "",

    },
    onSubmit: async function (values) {
      await fetch(`${API_ENDPOINT}task`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ task: values })
      })
      .then(response => response.json())
      .then(data => { 
        console.log(data)
        resetForm()
       alert("la tarea se creo")
      })
  },
  validationSchema
  })


  return (
 <div className="w-full flex justify-center">
    <div className="w-3/4 md:px-2 md:py-2 text-left md:bg-white md:shadow-lg">
        <form onSubmit={handleSubmit} >
            <div className="mt-4 w-4/5 mx-auto">
                    <div >
                        <label className="block">Title</label>
                            <input id="title"
                                   onBlur={handleBlur}
                                   type="text" 
                                   onChange={handleChange}
                                   value={values.title}
                                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 
                                            focus:ring-blue-600"/>
                                            {errors.title && touched.title && <span>{errors.title}</span>}
                    </div>
                    <div className="mt-4">
                    <label className="block">Status</label>
                            <select id="status"
                                  onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.status}
                                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                                  <option value="">Selecciona un estado</option>
                                  {data?.status?.map( option =>  ( <option id={option} key={option}> {option} </option> ) )}
                                </select>
                                {errors.status && touched.status && <span>{errors.status}</span>}
                    </div>
                    <div className="mt-4">
                    <label className="block">Importance</label>
                            <select id="importance"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.importance}
                                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">                                  
                                 <option value="">Selecciona un estado</option>
                                 {data?.importance?.map( option =>  ( <option id={option} key={option}> {option} </option> ) )}
                                </select>
                                {errors.importance && touched.importance && <span>{errors.importance}</span>}
                    </div>
                <div className="mt-4">
                    <label className="block">Description</label>
                            <textarea id="description"
                                      type="text"
                                   onChange={handleChange}
                                   value={values.description}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                </div>
                <div className="flex items-baseline justify-between">
                    <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>

  )
}
