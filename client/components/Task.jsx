import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const Task = ({ taskItem }) => {
  return (
    <div className='flex w-full items-center my-1'>
        <div className='flex-2 w-full h-10 bg-slate-300 rounded flex items-center p-2'>
            <h1 className='font-medium'>{taskItem}</h1>
        </div>
        <div className="px-1 flex-1 text-gray-500 cursor-pointer text-2xl w-full flex justify-center h-full items-center">
          <button
          >
            <FaRegTrashAlt />
          </button>
        </div>
    </div>
  )
}

export default Task