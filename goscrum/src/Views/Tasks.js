import React, { useState, useEffect } from 'react'
import useResize from '../hooks/useResize'
import Header from '../components/Header'
import Card from '../components/Card'
import TaskForm from '../components/TaskForm'
import { ToastContainer, toast } from "react-toastify"
import debounce from 'lodash.debounce'

import { useSelector, useDispatch } from 'react-redux'

import { getTasks, deleteTask, editTaskStatus } from '../store/actions/tasksAction'
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'

export default function Tasks() {


  const [list, setList] = useState(null)
  const [search, setSearch] = useState(null)
  const [renderList, setRenderList] = useState(null)
  const [tasksFormWho, setTasksFormWho] = useState("ALL")
  const { isPhone } = useResize()
  
  const dispatch = useDispatch()
  const { loading, error, tasks } = useSelector(state => {
    return state.tasksReducer
  })

console.log(tasks)
  useEffect(() => { dispatch(getTasks(tasksFormWho === "ME" ? "/me" : "")) 
                  }, [tasksFormWho, dispatch])


  useEffect(() => {
    if (tasks?.length) {
      setList(tasks)
      setRenderList(tasks)
    }
  }, [tasks])


  useEffect(() => {
    if (search) {
      setRenderList(list.filter(data => data.title.startsWith(search)))
    } else {
      setRenderList(list)
    }
  }, [search])

  if(error) return <div>Hay un error</div>

  const handleChangeImportance = (e) => {
    e.currentTarget.value === "ALL" ? setRenderList(list) : setRenderList(list.filter(data => data.importance === e.currentTarget.value))
  }

  const renderAllCards = () => {
    return renderList?.map(data => <Card key={data._id} data={data} deleteCard={handleDelete}  editCardStatus={handleEditCardStatus}></Card>)
  }

  const renderColumnCards = (text) => {
    return renderList?.filter(data => data.status === text)
      .map(data => <Card key={data._id} data={data} deleteCard={handleDelete}  editCardStatus={handleEditCardStatus} />)
  }

  const handleSearch = debounce((e) => { setSearch(e?.target?.value)
  }, 1000)

  const handleDelete = id => dispatch(deleteTask(id))
  const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  return (
    <div className='flex flex-col h-screen bg-slate-100'>
      <Header />
      <main className='md:flex h-full'>
        <ToastContainer />
        <section className="md:w-2/6">
          <div>
            <h2 className='font-bold text-2xl text-center'>Crea una Tarea</h2>
          </div>
          <TaskForm />
        </section>

        <section className="container mx-auto md:w-4/6 h-full ">
          <div>
            <h2 className='font-bold text-2xl text-center'>Mis Tareas</h2>
          </div>
          <div>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                onChange={e => setTasksFormWho(e.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label='Todas'
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label='Mis Tareas'
                />

              </RadioGroup>
            </FormControl>
            <div>
              <input type="text"
                className='w-full px-4 py-2 border rounded-md'
                placeholder="Buscar por titulo.."
                onChange={handleSearch} />
            </div>
            <div className="mt-4">
              <select id="status"
                onChange={handleChangeImportance}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                <option value="">Selecciona una prioridad</option>
                <option value="HIGH">Alta</option>
                <option value="MEDIUM">Media</option>
                <option value="LOW">Baja</option>
              </select>
            </div>
          </div>
          <div>
            {isPhone ? (!renderList?.length ? (<div>No hay tareas creadas</div>) : renderAllCards()) :
              (<div className="flex justify-around ">
                {!renderList?.length ? (<div>No hay Tareas Creadas</div>) :
                  (<>
                    <div className="relative w-60">
                      <h1 className=" font-semibold">Nuevas</h1>
                      {renderColumnCards("NEW")}
                    </div>
                    <div className="relative w-60">
                      <h1 className=" font-semibold">En proceso</h1>
                      {renderColumnCards("IN PROGRESS")}

                    </div>
                    <div className="relative w-60">
                      <h1 className=" font-semibold">Finalizadas</h1>
                      {renderColumnCards("FINISHED")}

                    </div>
                  </>)}

              </div>
              )}
          </div>
        </section>
      </main>

    </div>
  )
}
