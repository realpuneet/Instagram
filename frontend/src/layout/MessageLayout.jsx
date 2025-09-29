import React from 'react'
import { Outlet } from 'react-router'

const MessageLayout = () => {
  return (
    <div className='flex w-full'>
      <aside className='w-[20vw] bg-gray-300 h-screen p-3 text-2xl font-bold text-center'>
        Chats
      </aside>
      <div className='p-5'>
        <Outlet />
      </div>
    </div>
  )
}

export default MessageLayout