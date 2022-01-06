import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export function failureToast(msg) {
  /* console.log('message', msg)
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
  }) */
  const notify = () => toast('Wow so easy!')

  return (
    <div>
      <button type="button" onClick={notify}>
        Notify!
      </button>
      <ToastContainer />
    </div>
  )
}

export function successToast(msg) {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
  })
}
