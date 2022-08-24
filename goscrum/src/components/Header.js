import React from 'react'
import { useNavigate } from 'react-router-dom' 
import { FiLogOut } from "react-icons/fi";
import Swal from 'sweetalert2'


export default function Header() {

const navigate = useNavigate()

const handleLogout = () => {
  Swal.fire({
    title: 'Deseas cerrar sesion?',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem("token")
  navigate("/login", { replace: true})

    } 
  }) 


  
}

  return (
    <header className="flex justify-between items-center p-3  shadow shadow-slate-500/60 h-16">
        <h1 className='font-bold text-lg text-white'>GoScrum</h1>
          <div className="flex items-center gap-x-5">
            <div className="font-semibold text-white ">{sessionStorage.getItem("userName")}</div>
              <button className="hover:bg-black hover:text-white transition-all" onClick={handleLogout}>
                <FiLogOut size={25} className="text-white"/>
              </button>
            </div>
          
    </header>
  )
}
