import { React, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'




export default function TaskForm({ create: createTask, closeModal }) {

  const dispatch = useDispatch()


const { REACT_APP_API_ENDPOINT: API_ENDPOINT  } = process.env
const required = "*Campo requerido"

const [data, setData] = useState()

useEffect( () => {
 fetch(`${API_ENDPOINT}task/data`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    body: JSON.stringify()
  })
  .then(response => response.json())
  .then(data => { setData(data.result) })
})



  let validationSchema = yup.object().shape({
    title: yup.string()
              .min(6, "la cantidad minima de caracteres es 6")
              .required(required),
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
    <div className=" p-4 pt-5 md:h-auto rounded-md  text-center bg-slate-900 md:bg-slate-800  ">
        <h2 className='font-bold text-2xl text-white'>Crea una Tarea</h2>
        <div className="flex md:items-center justify-center  w-full  h-full">
        <form onSubmit={handleSubmit} className="w-full h-full">
            <div className="mt-4 md:w-full mx-auto">
                    <div >
                            <input id="title"
                                   type="text" 
                                   placeholder="Titulo de la tarea"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.title}
                                   className="w-full px-4 py-2 mt-2 border-none rounded-md bg-slate-500 text-white
                                   focus:outline-none focus:ring-2 
                                            focus:ring-white"/>
                                            {errors.title && touched.title && <span className='text-left text-white text-xs'>{errors.title}</span>}
                    </div>
                    <div className="mt-4 px-3  rounded   bg-slate-500 text-white">
                            <select id="status"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.status}
                                  className="w-full py-2  border-none rounded-md focus:outline-none bg-slate-500 text-white">
                                  <option value="" >Selecciona un estado</option>
                                  {data?.status?.map( option =>  ( <option id={option} key={option}> {option} </option> ) )}
                                </select>
                    </div>
                    {errors.status && touched.status && <span className='text-left text-white text-xs'>{errors.status}</span>}

                    <div className="mt-4 px-3  rounded-md  bg-slate-500 text-white">
                            <select id="importance"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.importance}
                                  className="w-full  py-2   border-none rounded-md bg-slate-500 text-white focus:outline-none">                                  
                                 <option value="" >Selecciona la importancia</option>
                                 {data?.importance?.map( option =>  ( <option id={option} key={option}> {option} </option> ) )}
                                </select>
                    </div>
                    
                    {errors.importance && touched.importance && <span className='relative w-full text-left text-white text-xs'>{errors.importance}</span>}

                    <div className="mt-4">
                            <textarea id="description"
                                      rows="5"
                                      type="text"
                                      placeholder="Descripcion de la tarea..."
                                      onChange={handleChange}
                                      value={values.description}
                                      className="w-full px-4 py-2 mt-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white"/>
                    </div>
                <div className="flex items-baseline justify-between">
                    <button type="submit" 
                    className="px-6 py-2 mt-3 text-white font-semibold w-full 
                    bg-slate-600 rounded-md hover:bg-stone-500"
                    onClick={() => closeModal()}>Crear Tarea</button>
                </div>
            </div>
        </form>
    </div>
</div>

  )
}
