import React from 'react'
import useResize from '../hooks/useResize'
import Header from '../components/Header'
import { cardsData } from '../data/data'
import Card from '../components/Card'
import TaskForm from '../components/TaskForm'
import { ToastContainer, toast } from "react-toastify"


export default function Tasks() {

  const { isPhone } = useResize()


  const renderAllCards = () => {
    return cardsData.map(data => <Card key={data.id} data={data}></Card>)
  }

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
            {isPhone ? renderAllCards() : (
              <div className="flex justify-around ">
                <div className="relative w-60">
                  <h1 className=" font-semibold">Nuevas</h1>
                  <div className="bg-white p-3 rounded-md shadow-md border text-sm">
                    <div className="absolute right-3">X</div>
                    <h3 className="text-base font-bold">Tarea 1</h3>
                    <h5 className="font-semibold">Diego Santelices</h5>
                    <h6 className="font-medium mb-2">10/05/88  15:34hs.</h6>
                    <button className="bg-red-500 text-xs font-semibold text-white p-1 w-20 rounded  hover:bg-red-400 transition-colors">NEW</button>
                    <button className="bg-red-500 text-xs font-semibold text-white p-1 w-20 rounded ml-1 hover:bg-red-400 transition-colors">LOW</button>
                    <p className="font-normal">esto es una descripcion de prueba para el proyecto de ateras de alkemy challenge</p>
                  </div>
                </div>
                <div className="relative w-60">
                  <h1 className=" font-semibold">En proceso</h1>
                  <div className="bg-white p-3 rounded-md shadow-md border text-sm">
                    <div className="absolute right-3">X</div>
                    <h3 className="text-base font-bold">Tarea 1</h3>
                    <h5 className="font-semibold">Diego espero</h5>
                    <h6 className="font-medium mb-2">10/05/88  15:34hs.</h6>
                    <button className="bg-red-500 text-xs font-semibold text-white p-1 w-20 rounded  hover:bg-red-400 transition-colors">PROCESS</button>
                    <button className="bg-red-500 text-xs font-semibold text-white p-1 w-20 rounded ml-1 hover:bg-red-400 transition-colors">MEDIUM</button>
                    <p className="font-normal">esto es una descripcion de prueba para el proyecto de ateras de alkemy challenge</p>
                  </div>
                </div>
                <div className="relative w-60">
                  <h1 className=" font-semibold">Finalizadas</h1>
                  <div className="bg-white p-3 rounded-md shadow-md border text-sm">
                    <div className="absolute right-3">X</div>
                    <h3 className="text-base font-bold">Tarea 1</h3>
                    <h5 className="font-semibold">Diego Santelices</h5>
                    <h6 className="font-medium mb-2">10/05/88  15:34hs.</h6>
                    <button className="bg-red-500 text-xs font-semibold text-white p-1 w-20 rounded  hover:bg-red-400 transition-colors">FINISHED</button>
                    <button className="bg-red-500 text-xs font-semibold text-white p-1 w-20 rounded ml-1 hover:bg-red-400 transition-colors">HIGH</button>
                    <p className="font-normal">esto es una descripcion de prueba para el proyecto de ateras de alkemy challenge</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

    </div>
  )
}
