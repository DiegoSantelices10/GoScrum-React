import React from 'react'
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'




export default function Panel({searchTask, changeImportance, tasksFormWho}) {
    return (
        <div className=" px-4 pt-6 md:rounded-2xl md:bg-slate-800">
            <div>
                <h2 className='font-bold text-2xl text-white '>Mis Tareas</h2>
                <div className=" md:flex justify-center items-center md:gap-4 mt-3">
                    <div className="w-full">
                        <input type="text"
                            className='w-full px-4 py-2 border-none rounded-md bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-white'
                            placeholder="Buscar por titulo.."
                            onChange={searchTask} />
                    </div>
                    <div className="w-full md:w-1/2 my-2">
                        <select id="status"
                            onChange={changeImportance}
                            className="w-full px-4 py-2 border-none text-white bg-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white">
                            <option  value="ALL">Selecciona una prioridad</option>
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
                        onChange={e => tasksFormWho(e.currentTarget.value)}
                    >
                        <FormControlLabel
                            value="ALL"
                            control={<Radio />}
                            label='Todas'
                            className="text-white"
                        />
                        <FormControlLabel
                            value="ME"
                            control={<Radio />}
                            label='Mis Tareas'
                            className="text-white"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}
