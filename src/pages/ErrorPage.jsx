
import { useNavigate } from 'react-router-dom'
import logo from '../../src/assets/logo.png'
import { FaHome } from 'react-icons/fa'
const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <img src={logo} alt="" />
          <h1 className='mt-10 text-2xl font-semibold text-gray-800  md:text-3xl'>
            Something Went Wrong!
          </h1>

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto '>
            <button
              onClick={() => navigate('/')}
              className='flex items-center justify-center w-1/2 px-5 py-1 text-sm text-white transition-colors duration-200 bg-secondary border rounded-lg gap-x-2 sm:w-auto   hover:bg-primary '
            >
              Back to Home <FaHome />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
