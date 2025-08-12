import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import { Analytics } from '@vercel/analytics/react';
const Main = () => {
  return (
    <div>
      <div className=" mx-auto absolute w-full top-0 z-50">

        <Navbar />
      </div>
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <Footer />
      <Analytics />
    </div>
  )
}

export default Main
