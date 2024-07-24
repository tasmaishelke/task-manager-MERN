import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const EditTask = () => 
{
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

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
          setTitle(res.data.title)
          setNote(res.data.note);
          setLoading(false);
        })
      .catch((error) => 
        {
          setLoading(false);
          alert('An error happened. Please Check console');
          console.log(error);
        });
    }, [])

  const handleEditTask = () => 
    {
      const data = 
        {
          title,
          note
        }
      setLoading(true);
      axios
        .patch(`http://localhost:3000/task/${id}`, data,
          {
            headers: 
            {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
          }
        )      
        .then(() => 
          {
            setLoading(false);
            enqueueSnackbar('Task Edited Successfully', { variant : 'success'})
            navigate('/task/show');
          })
        .catch((error) => 
          {
            setLoading(false);
            enqueueSnackbar('Error', { variant : 'error'})
            console.log(error);
          });
    };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Task</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Note</label>
          <input
            type='text'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditTask}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditTask