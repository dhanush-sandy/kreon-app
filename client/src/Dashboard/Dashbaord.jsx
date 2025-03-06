import Sidebar from './components/Sidebar'
import React from 'react'
import NotesComponent from './components/NotesComponent'
import TaskManagement from './components/TaskManagement'

const Dashbaord = () => {
  return (
    <main className=' flex'>
      <Sidebar />
      <NotesComponent />
      <TaskManagement />
    </main>
  )
}

export default Dashbaord