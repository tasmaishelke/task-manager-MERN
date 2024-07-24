import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const EditUser = () => 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => 
    {
      setLoading(true);
      axios
      .get(`http://localhost:3000/user/details`,
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
          setEmail(res.data.email)
          setLoading(false);
        })
      .catch((error) => 
        {
          setLoading(false);
          alert('An error happened. Please Check console');
          console.log(error);
        });
    }, [])

  const handleEditUser = () => 
    {
      const data = 
        {
          username,
          password,
          email
        }
      setLoading(true);
      axios
        .patch(`http://localhost:3000/user/details`, data,
          {
            headers: 
            {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
          }
        )      
        .then((res) => 
          {
            setLoading(false);
            console.log(res.data);
            enqueueSnackbar('User Edited Successfully', { variant : 'success'})
            navigate('/user/show');
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
      <h1 className='text-3xl my-4'>Edit User</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            placeholder="Enter New Email"
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Password</label>
          <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditUser}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditUser