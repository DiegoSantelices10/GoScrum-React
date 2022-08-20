import React, { useState, useEffect } from 'react'
import useResize from '../hooks/useResize'
import Header from '../components/Header'
import Card from '../components/Card'
import TaskForm from '../components/TaskForm'
import { ToastContainer } from "react-toastify"
import debounce from 'lodash.debounce'
import CardSkeleton from '../components/CardSkeleton'
import { useSelector, useDispatch } from 'react-redux'

import { getTasks, deleteTask, editTaskStatus, createTask } from '../store/actions/tasksAction'
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'

export default function Tasks() {


  const [list, setList] = useState(null)
  const [search, setSearch] = useState(null)
  const [renderList, setRenderList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tasksFormWho, setTasksFormWho] = useState("ALL")
  const { isPhone } = useResize()

  const dispatch = useDispatch()


  const { error, tasks } = useSelector(state => {
    return state.tasksReducer
  })

  useEffect(() => {
    dispatch(getTasks(tasksFormWho === "ME" ? "/me" : ""))
  }, [tasksFormWho, dispatch])


  useEffect(() => {
    if (tasks?.length) {
      console.log(tasks)
      setList(tasks)
      setRenderList(tasks)
      setTimeout(() => {
        setIsLoading(true)
      }, 3000);
    } else {
      
    }
  }, [tasks])


  useEffect(() => {
    if (search) {
      setRenderList(list.filter(data => data.title.startsWith(search)))
    } else {
      setRenderList(list)
    }
  }, [search, list])

  if (error) return <div>Hay un error</div>

  const handleChangeImportance = (e) => {
    e.currentTarget.value === "ALL" ? setRenderList(list) : setRenderList(list.filter(data => data.importance === e.currentTarget.value))
  }

  const renderAllCards = () => {
    return renderList?.map(data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}></Card>)
  }

  const renderColumnCards = (text) => {
    return renderList?.filter(data => data.status === text)
      .map(data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />)
  }

  const handleSearch = debounce((e) => {
    setSearch(e?.target?.value)
  }, 1000)

  const handleDelete = id => dispatch(deleteTask(id))
  const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  return (
    <div className='flex flex-col h-screen'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <main className='md:flex md:h-full '>
        <section className="md:w-1/4 w-full md:h-full md:rounded-r-3xl bg-gray-100 shadow-md">
          <TaskForm create={createTask} />
        </section>

        <section className="container px-3 md:px-4  mx-auto md:w-3/4 h-full ">
          <div className="md:bg-gray-100 px-4 pt-6 md:rounded-b-3xl">
            <div>
              <h2 className='font-bold text-2xl'>Mis Tareas</h2>
              <div className="md:flex justify-center items-center md:gap-4 mt-6">
                <div className="w-full my-2">
                  <input type="text"
                    className='w-full px-4 py-2 border rounded-md'
                    placeholder="Buscar por titulo.."
                    onChange={handleSearch} />
                </div>
                <div className="w-full md:w-1/2 my-2">
                  <select id="status"
                    onChange={handleChangeImportance}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    <option className='text-gray-400' value="ALL">Selecciona una prioridad</option>
                    <option value="HIGH">Alta</option>
                    <option value="MEDIUM">Media</option>
                    <option value="LOW">Baja</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-3 py-2">
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
            </div>
          </div>
          <div>
            {isPhone ? (!renderList?.length ? (<div>No hay tareas creadas</div>) : !isLoading ?  ( <CardSkeleton/> ) : renderAllCards()) :
              (<div className="flex justify-between gap-x-5 mt-5">
                {!renderList?.length ? ( <div className='text-center font-semibold w-full '>No Hay Tareas Creadas</div> ) 
                : !isLoading ? ( <CardSkeleton/> ):(
                    <>
                      <div className="w-full">
                        <h1 className=" font-bold text-center">Nuevas</h1>
                        {renderColumnCards("NEW")}
                      </div>
                      <div className=" w-full">
                        <h1 className=" font-bold text-center">En proceso</h1>
                        {renderColumnCards("IN PROGRESS")}

                      </div>
                      <div className="w-full">
                        <h1 className="font-bold text-center">Finalizadas</h1>
                        {renderColumnCards("FINISHED")}

                      </div>
                    </>
                  )


                }
              </div>
              )
            }
          </div>
        </section>
      </main>

    </div>
  )
}
