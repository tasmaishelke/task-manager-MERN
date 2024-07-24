import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowAllTasks from './pages/task/ShowAllTasks'
import CreateTask from './pages/task/CreateTask'
import ShowTask from './pages/task/ShowTask'
import EditTask from './pages/task/EditTask'
import DeleteTask from './pages/task/DeleteTask'

import ShowUser from './pages/user/ShowUser'
import EditUser from './pages/user/EditUser'
import DeleteUser from './pages/user/DeleteUser'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/task/show' element={<ShowAllTasks />} />
      <Route path='/task/create' element={<CreateTask />} />
      <Route path='/task/details/:id' element={<ShowTask />} />
      <Route path='/task/edit/:id' element={<EditTask />} />
      <Route path='/task/delete/:id' element={<DeleteTask />} />

      <Route path='/user/show' element={<ShowUser />} />
      <Route path='/user/edit/' element={<EditUser />} />
      <Route path='/user/delete/' element={<DeleteUser />} />

    </Routes>
    
  )
}

export default App