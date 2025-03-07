import Sidebar from './components/Sidebar'
import React from 'react'
import NotesComponent from './components/NotesComponent'
import Header from './components/Header'

const Dashbaord = () => {
  return (
    <main className=' flex'>
      <div>
        <Sidebar />
      </div>
      <div className='w-full'>
        <Header />
        <NotesComponent />
      </div>
    </main>
  )
}

export default Dashbaord