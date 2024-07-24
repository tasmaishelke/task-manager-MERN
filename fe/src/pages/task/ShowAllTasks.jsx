import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { SlMenu } from "react-icons/sl";
import TasksCard from '../../components/TasksCard'

const ShowAllTasks = () => 
{
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => 
    {
      setLoading(true)
      axios
        .get('http://localhost:3000/task', 
          {
            headers: 
            {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
          })
        .then((res) => 
          {
            setTasks(res.data.tasks)
            // console.log(res.data.tasks);
            console.log(res.data);
            setLoading(false)
          })
        .catch((error) => 
          {
            console.log(error);
          })
    }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <Link to='/user/show'>
          <SlMenu />
        </Link>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Tasks list</h1>
        <Link to='/task/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
        

      </div>
      
      {loading ? (
        <Spinner />
      ) : (<TasksCard tasks={tasks}/>) }
    </div>
  )
}

export default ShowAllTasks