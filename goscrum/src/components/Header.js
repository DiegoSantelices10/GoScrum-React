import React from 'react'
import { useNavigate } from 'react-router-dom' 

export default function Header() {

const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem("logged")
  navigate("/login", { replace: true})

}

  return (
    <header className="flex justify-between items-center">
        <title>GO SCRUM</title>
        <div onClick={handleLogout}>X</div>
    </header>
  )
}
