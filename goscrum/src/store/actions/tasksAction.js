import { TASKS_FAILURE, TASKS_REQUEST, TASKS_SUCCESS } from '../types'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
const  { REACT_APP_API_ENDPOINT } = process.env


export const tasksRequest = () => ({
    type: TASKS_REQUEST
})

export const tasksSuccess = (data) =>( {
    type: TASKS_SUCCESS,
    payload: data
})

export const tasksFailure = (error) => ({
    type: TASKS_FAILURE,
    payload: error
})


export const getTasks = (path) => dispatch => {
    dispatch(tasksRequest())

    fetch(`${REACT_APP_API_ENDPOINT}task${path}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => dispatch(tasksSuccess(data.result)))
    .catch(error =>dispatch(tasksFailure(error)))

}


export const deleteTask = id => dispatch => {
    dispatch(tasksRequest())
    fetch(`${REACT_APP_API_ENDPOINT}task/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => dispatch(getTasks("")))
    .catch(error =>dispatch(tasksFailure(error)))

}

export const editTaskStatus = data => dispatch => {
    const statusArray = ["NEW", "IN PROGRESS", "FINISHED"]
    let newStatusIndex = ""
if(data.status === "FINISHED") { 
    return (
        Swal.fire({
            title: 'Deseas eliminar la tarea?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${REACT_APP_API_ENDPOINT}task/${data._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                })
                .then(response => response.json())
                .then(data => dispatch(getTasks("")))
                .catch(error =>dispatch(tasksFailure(error)))
                
            }
          })
    
        
    
    )
}  else {
     newStatusIndex = statusArray.indexOf(data.status) > 1 ? 0 : 
    statusArray.indexOf(data.status) + 1
}     
    fetch(`${REACT_APP_API_ENDPOINT}task/${data._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            task: {
                title: data.title,
                importance: data.importance,
                status: statusArray[newStatusIndex],
                description: data.description
            }
        })
    })
    .then(response => response.json())
    .then(data => dispatch(getTasks("")))
    .catch(error =>dispatch(tasksFailure(error)))

}




export const createTask = values => dispatch => {
     fetch(`${REACT_APP_API_ENDPOINT}task`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token")
        },
        body: JSON.stringify({ task: values })
      })
      .then(response => response.json())
      .then(data => { 
        dispatch(getTasks(""))
        toast('🦄 Se creo la tarea correctamente!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
    .catch(error =>dispatch(tasksFailure(error)))

}