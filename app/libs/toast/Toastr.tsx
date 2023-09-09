'use client'
import { ToastContainer } from 'react-toastify'
const Toastr = () => {
  return   <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    closeOnClick={true}
    pauseOnHover={true}
    draggable={true}
    theme="colored"
  />
}
export default Toastr