import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTask = () => 
{
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()

  const handleSaveTask = () => 
    {
      const data = 
        {
          title,
          note,
        }
        console.log(data);
      setLoading(true);
      axios
        .post('http://localhost:3000/task', data,
          {
            headers: 
            {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
          })
        .then(() => 
          {
            setLoading(false);
            enqueueSnackbar('Task Created Successfully', { variant : 'success'})
            navigate('/task/show');
          })
        .catch((error) => 
          {
            setLoading(false);
            // alert('An error happened. Please Check console');
            enqueueSnackbar('Error', { variant : 'error'})

            console.log(error);
          });
    };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Task</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTask}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateTask