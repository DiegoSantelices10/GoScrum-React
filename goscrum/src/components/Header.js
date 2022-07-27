import React from 'react'
import { useNavigate } from 'react-router-dom' 

export default function Header() {

const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem("logged")
  navigate("/login", { replace: true})

}

  return (
    <header className="flex justify-between items-center p-3 bg-light shadow h-16">
        <h1>GO SCRUM</h1>
        <div className="hover:bg-black hover:text-white transition-all" onClick={handleLogout}>X</div>
    </header>
  )
}
