import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'


const ShowUser = () => 
{
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

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
            setUser(res.data);
            console.log(res);
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
      <h1 className='text-3xl my-4'>Show User</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex justify-center items-center'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl  align w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{user._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Username</span>
              <span>{user.username}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Email</span>
              <span>{user.email}</span>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
              
              <Link to={`/user/edit`}>
                <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
              </Link>
              <Link to={`/user/delete`}>
                <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
              </Link>
            </div>          
          </div>
        </div>

      )}
    </div>
  )
}

export default ShowUser