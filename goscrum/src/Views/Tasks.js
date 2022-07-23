import React from 'react'
import { useResize } from '../hooks/useRisize'
import { Header } from '../components/Header'
import { cardsData } from '../data/data'
import { Card } from '../components/Card'
import { TaskForm } from '../components/TaskForm'

export default function Tasks() {

  const { isPhone } = useResize()

  const limitString = str => {
    if(str.length > 170)
    return {string: str.slice(0, 167).concat("..."), addButton: true}
    return { string: str, addButton: false}
  }
  const renderAllCards = () => {
    return cardsData.map( data => <Card key={data.id} data={data}></Card>)
  }

  return (
    <div>
      <main>
        <TaskForm/>
        <section>
          <div>
            <h2>Mis Tareas</h2>
          </div>
          <div>
        {renderAllCards()}
          </div>
        </section>
      </main>

    </div>
  )
}
