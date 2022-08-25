import React, { useState, useEffect } from 'react'
import useResize from '../hooks/useResize'
import Header from '../components/Header'
import Card from '../components/Card'
import Panel from '../components/Panel'
import TaskForm from '../components/TaskForm'
import { ToastContainer } from "react-toastify"
import debounce from 'lodash.debounce'
import CardSkeleton from '../components/CardSkeleton'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { getTasks, deleteTask, editTaskStatus, createTask } from '../store/actions/tasksAction'

import { Backdrop, Box, Modal, Fade } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 370,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "20px",
  
};




export default function Tasks() {

  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState(null)
  const [search, setSearch] = useState(null)
  const [renderList, setRenderList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tasksFormWho, setTasksFormWho] = useState("ALL")
  const { isPhone } = useResize()

  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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

  const handleDelete = id => {
    Swal.fire({
      title: 'Deseas eliminar la tarea?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id))
      }
    })
  }
  const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  return (
    <div className='w-full max-h-full  p-0 m-0'>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TaskForm create={createTask} closeModal={handleClose} />
          </Box>
        </Fade>
      </Modal>

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
      <div className="md:flex md:p-4 md:pt-8 md:gap-x-4" >
        <div className="px-4 py-5 md:px-0  w-full md:w-1/5 md:h-full">
            <button onClick={handleOpen}
              className="w-full md:w-full  px-6 py-2 text-white font-semibold bg-slate-700 rounded-lg hover:bg-slate-600">
              Tarea Nueva
            </button>
        </div>

        <div className="md:w-4/5 ">
          <Panel searchTask={handleSearch} tasksFormWho={setTasksFormWho} changeImportance={handleChangeImportance} />
          <div className="md:flex md:justify-between md:mt-3" >
            {isPhone ? (!renderList?.length ? (<div className="text-white">No hay tareas creadas</div>)
              : !isLoading ? (<CardSkeleton />)
                : renderAllCards())

              : !renderList?.length ? (<div className='text-center text-white font-semibold w-full '>No Hay Tareas Creadas</div>)
                : !isLoading ? (<CardSkeleton />)

                  : (<>
                    <div className="w-1/3">
                      <h1 className=" font-bold text-center text-white">Nuevas</h1>
                      {renderColumnCards("NEW")}
                    </div>
                    <div className="w-1/3">
                      <h1 className=" font-bold text-center text-white">En proceso</h1>
                      {renderColumnCards("IN PROGRESS")}

                    </div>
                    <div className="w-1/3">
                      <h1 className="font-bold text-center text-white">Finalizadas</h1>
                      {renderColumnCards("FINISHED")}

                    </div>
                  </>)
            }

          </div>
        </div>

      </div>


    </div>
  )
}
