import React from 'react'
import { useNavigate } from 'react-router-dom' 
import { FiLogOut } from "react-icons/fi";



export default function Header() {

const navigate = useNavigate()

const handleLogout = () => {
  sessionStorage.removeItem("token")
  navigate("/login", { replace: true})

}

  return (
    <header className="flex justify-between items-center p-3 bg-light relative shadow h-16">
        <h1 className='font-bold text-lg'>GoScrum</h1>
          <div className="flex items-center gap-x-5">
            <div className="font-semibold">{sessionStorage.getItem("userName")}</div>
              <div className="hover:bg-black hover:text-white transition-all" onClick={handleLogout}>
                <FiLogOut size={25}/>
              </div>
            </div>
          
    </header>
  )
}
