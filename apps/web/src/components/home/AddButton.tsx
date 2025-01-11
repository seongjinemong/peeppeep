import { useNavigate } from 'react-router-dom'

export function AddButton() {
  const navigate = useNavigate()
  return (
    <button
      className='fixed flex items-center justify-center bg-blue-500 text-white text-4xl rounded-2xl bottom-4 right-4 h-14 w-14 shadow-lg hover:shadow-xl hover:shadow-slate-300 transition-all hover:h-16 hover:w-16'
      onClick={() => navigate('/add')}
    >
      +
    </button>
  )
}
