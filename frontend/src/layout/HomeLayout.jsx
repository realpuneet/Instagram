import React from 'react'
import { Outlet } from 'react-router'
import SideMenu from '../components/SidebarComponents/SideMenu';

const HomeLayout = () => {
  return (
    <div className='flex w-full bg-black h-screen  text-white'>
        <aside className='w-[20%]  border-r-1 border-zinc-500'>
            <div className='w-full bg-gray-300'>
                <SideMenu />
            </div>
        </aside>
        <div className='w-[65%]'>
            <Outlet />
        </div>
    </div>
  )
}

export default HomeLayout
