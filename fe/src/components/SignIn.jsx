import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';


const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleSignIn = () =>
        {
            const data = 
                {
                    email,
                    password
                }  
            setLoading(true); 
            axios
                .post('http://localhost:3000/auth/signin', data)
                .then((res) => 
                    {
                        // const { accessToken } = res.data
                        console.log(res.data.accessToken);
                        localStorage.setItem('token', res.data.accessToken);
                        axios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`;
                        setLoading(false);
                        enqueueSnackbar('User Signed-In Successfully', { variant : 'success'})
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
            <h1 className='text-3xl my-4 flex justify-center items-center'>Sign In</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Email</label>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2  w-full '
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
                <button className='p-2 bg-sky-300 m-8' onClick={handleSignIn}>
                Sign In
                </button>
                
                
            </div>
    </div>
    )
}

export default SignIn