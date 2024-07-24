import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';


const ShowTask = () => 
{
  const [task, setTasks] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => 
    {
      setLoading(true);
      axios
        .get(`http://localhost:3000/task/${id}`,
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
            setTasks(res.data);
            console.log(res.data);
            setLoading(false);
          })
        .catch((error) => 
          {
            console.log(error);
            setLoading(false);
          });
    }, []);
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Task</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex justify-center items-center'>

          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{task._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{task.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Note</span>
              <span>{task.note}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Created By</span>
              <span>{task.createdBy}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(task.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
              <span>{new Date(task.updatedAt).toString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowTask