import React, { useState } from 'react'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Spinner from '../components/Spinner'




const Home = () => {

const [showType, setShowType] = useState('signup')
const [loading, setLoading] = useState(false)



  return (
    <div>
      <div className='flex justify-center items-center gap-x-4 m-5'>
        <button 
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('signup')}>
            Sign Up
        </button>

        <button 
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('signin')}>
            Sign In
        </button>
        
        

      </div>
      {loading ? (
          <Spinner />
        ) : showType === 'signup' ? (<SignUp />) : (<SignIn />)}
    </div>
  )
}

export default Home