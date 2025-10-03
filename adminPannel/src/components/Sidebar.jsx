import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[30%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 border border-r-0 border-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : ''}`
          }
        >
          <img className='w-5 h-5' src={assets.add_icon} alt="Add Icon" />
          <p className='hidden text-black md:block'>Add Items</p>
        </NavLink>

        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 border border-r-0 border-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : ''}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="List Icon" />
          <p className='hidden md:block'>Lists Items</p>
        </NavLink>

        <NavLink
          to={"/order"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 border border-r-0 border-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : ''}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="Order Icon" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
