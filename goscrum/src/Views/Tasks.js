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
    <div className='bg-gray-100 flex flex-col h-screen'>
      <Header />
      <main className='flex items-center h-full'>
      <ToastContainer />
        <section className="w-1/3">
        <TaskForm />
        </section>
            
        <section className="container mx-auto w-2/3 h-full ">
          <div>
            <h2 className='font-bold text-2xl'>Mis Tareas</h2>
          </div>
          <div>
            {isPhone ? renderAllCards() : (
              <div className="flex justify-between items-center">
                <div className="relative w-72 ">
                  <h1 className=" font-semibold">Nuevas</h1>
                  <div className="bg-white p-1 rounded shadow-lg border">
                    <div className="absolute right-1">X</div>
                    <h3>Tarea 1</h3>
                    <h6>10/05/88 10:34hs</h6>
                    <h5>Diego Santelices</h5>
                    <button className="bg-red-500 text-white p-1 w-24 rounded  hover:bg-red-400 transition-colors">Nuevo</button>
                    <button className="bg-red-500 text-white p-1 w-24 rounded ml-1 hover:bg-red-400 transition-colors">Alta</button>
                    <p>Description fake</p>
                  </div>
                </div>
                <div className="relative w-72 ">
                  <h1 className=" font-semibold">En proceso</h1>
                  <div className="bg-white p-1 rounded shadow-lg border">
                    <div className="absolute right-1">X</div>
                    <h3>Tarea 1</h3>
                    <h6>12/04/88 13:30hs.</h6>
                    <h5>Diego Santelices</h5>
                    <button className="bg-red-500 text-white p-1 w-24 rounded  hover:bg-red-400 transition-colors">En proceso</button>
                    <button className="bg-red-500 text-white p-1 w-24 rounded ml-1 hover:bg-red-400 transition-colors">Media</button>
                    <p>description fake</p>
                  </div>
                </div>
                <div className="relative w-72 ">
                  <h1 className=" font-semibold">Finalizadas</h1>
                  <div className="bg-white p-1 rounded shadow-lg border">
                    <div className="absolute right-1">X</div>
                    <h3>Tarea 1</h3>
                    <h6>20/03/21 21:30hs.</h6>
                    <h5>Diego Santelices</h5>
                    <button className="bg-red-500 text-white p-1 w-24 rounded  hover:bg-red-400 transition-colors">Finalizada</button>
                    <button className="bg-red-500 text-white p-1 w-24 rounded ml-1 hover:bg-red-400 transition-colors">Baja</button>
                    <p>description fake</p>
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
