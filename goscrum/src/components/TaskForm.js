import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { toast } from "react-toastify"
export default function TaskForm() {

  let   validationSchema = yup.object().shape({
    title: yup.string()
              .min(6, "la cantidad minima de caracteres es 6")
              .required(),
    status: yup.string().required(),
    priority: yup.string().required()
  });
  const {handleSubmit, handleChange, values, errors, touched, handleBlur} = useFormik({
    initialValues: {
      title: "",
      status: "",
      priority: "",
      description: "",

    },
    
    onSubmit: async function (values) {
     alert()
  },

  validationSchema
  })
  return (
 <div className="h-full flex justify-center items-center">
    <div className="px-8 py-6 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Crea Una Tarea</h3>
        <form onSubmit={handleSubmit}>
            <div className="mt-4 w-80">
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
                                  <option value="nuevo">Nuevo</option>
                                  <option value="proceso">En Proceso</option>
                                  <option value="finalizada">Finalizada</option>
                                </select>
                                {errors.status && touched.status && <span>{errors.status}</span>}
                    </div>
                    <div className="mt-4">
                    <label className="block">Priority</label>
                            <select id="priority"
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   value={values.priority}
                                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                                  <option value="alta">Alta</option>
                                  <option value="media">Media</option>
                                  <option value="baja">Baja</option>
                                </select>
                                {errors.priority && touched.priority && <span>{errors.priority}</span>}
                    </div>
                <div className="mt-4">
                    <label className="block">Description</label>
                            <input id="description"
                                   type="textarea" 
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
