import React from 'react'
import { useParams } from "react-router-dom"
export default function Registrered() {
    
const { teamID } = useParams()
    
return (
    <div>Usuario registrado el team ID: {teamID}</div>
  )
}
