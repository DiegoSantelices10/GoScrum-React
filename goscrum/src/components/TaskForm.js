import { React, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'




export default function TaskForm({ create: createTask }) {

  const dispatch = useDispatch()


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
            resetForm()
            dispatch(createTask(values))
  },
  validationSchema
  })


  return (
 <div className="flex md:items-center justify-center md:rounded-r-3xl">
    <div className="w-full p-6 text-left">
        <h2 className='font-bold text-2xl '>Crea una Tarea</h2>
        <form onSubmit={handleSubmit} >
            <div className="mt-4 md:w-full mx-auto">
                    <div >
                            <input id="title"
                                   type="text" 
                                   placeholder="Titulo de la tarea"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.title}
                                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 
                                            focus:ring-blue-600"/>
                                            {errors.title && touched.title && <span>{errors.title}</span>}
                    </div>
                    <div className="mt-4">
                            <select id="status"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.status}
                                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                                  <option value="" className="text-slate-400">Selecciona un estado</option>
                                  {data?.status?.map( option =>  ( <option id={option} key={option}> {option} </option> ) )}
                                </select>
                                {errors.status && touched.status && <span>{errors.status}</span>}
                    </div>
                    <div className="mt-4">
                            <select id="importance"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.importance}
                                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">                                  
                                 <option value="" className="text-slate-400">Selecciona la importancia</option>
                                 {data?.importance?.map( option =>  ( <option id={option} key={option}> {option} </option> ) )}
                                </select>
                                {errors.importance && touched.importance && <span>{errors.importance}</span>}
                    </div>
                <div className="mt-4">
                            <textarea id="description"
                                      rows="5"
                                      type="text"
                                      placeholder="Descripcion de la tarea..."
                                      onChange={handleChange}
                                      value={values.description}
                                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                </div>
                <div className="flex items-baseline justify-between">
                    <button type="submit" 
                    className="px-6 py-2 my-3 text-white font-semibold w-full 
                    bg-blue-600 rounded-lg hover:bg-blue-900">Crear Tarea</button>
                </div>
            </div>
        </form>
    </div>
</div>

  )
}
