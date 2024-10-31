import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


export default function Navbar() {
  const{user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const userSignOut = async () => {
    try {
      await axios.get('/signout');
      setUser(null);
      navigate('/');
      
    } catch (error) {
      console.error("Sign out failed", error);
    }

  };



  return (
    <header className="bg-blue-500 p-5 border border-black shawdow-xl">
    <nav className='flex justify-between items-center '>
      
      <div className="space-x-6 ml-auto">
        {!user && (
          <>
          <Link to="/" className="text-white font-bold hover:text-gray-400 transition duration-300">
           Home
        </Link>
        <Link to="/register" className="text-white font-bold hover:text-gray-400 transition duration-300">
          Register
        </Link>
        <Link to="/login" className="text-white font-bold hover:text-gray-400 transition duration-300">
          Login
        </Link>
        </>
        )}
        {user && (
          <>
          <Link to="/Dashboard" className="text-white font-bold hover:text-gray-400 transition duration-300">
          Dashboard
        </Link>
        <button onClick = {userSignOut} className='text-white font-bold hover:text-gray-400 transition duration-300'>
        Sign out
        </button>
        </>
        )}
      </div>
    </nav>
  </header>
  );
}