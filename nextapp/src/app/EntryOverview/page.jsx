'use client';
import React from 'react'
import NewEntry from '../components/NewEntry'

const page = () => {
  return (
    <div className='flex flex-col w-screen h-screen'>
      <p className='w-full h-1/6 text-3xl border-b-2 border-b-[#07111B] flex justify-center items-center '>Password Safe</p>
      <div className='flex flex-row w-full h-5/6 '>
        <div className='flex flex-col gap-2 w-1/3 overflow-y-scroll h-full scrollbar scrollbar-track-transparent scrollbar-thumb-white border-r-2 border-r-[#07111B] p-5 '>list</div>
        <div className='overflow-hidden w-2/3 h-full p-5'>Current Entry</div>
      </div>
    </div>
  )
}

export default page