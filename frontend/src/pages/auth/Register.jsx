import { useRef, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';
import { register } from '../../services/authService';
import Nav from '../../components/Nav';
import './css/register.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useIsLogined from '../../hooks/useIsLogined';
import Loading from './../../components/Loading';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { isLogined, loading } = useIsLogined();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (isLogined) {
    navigate('/home');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      const response = await register({
        username,
        email,
        password,
        confirmPassword,
      });
      //change json to string
      console.log(response.link);
      toast.success(response.message);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className='blur-box'>
        <Nav />

        {/* <Nav /> */}
        <div className='blur'>
          <form onSubmit={handleSubmit} className='rg-box'>
            <fieldset>
              <legend>
                <h2>Sign in</h2>
                <p className='underline'></p>
              </legend>

              <ul>
                <li>
                  <i className='bi bi-person'></i>
                  {/* <label htmlFor='username'>Username</label> */}
                  <input
                    type='text'
                    id='username'
                    ref={usernameRef}
                    placeholder='Enter username'
                  />
                </li>
                <li>
                  <i className='bi bi-envelope'></i>
                  {/* <label htmlFor='email'>Email</label> */}
                  <input
                    type='email'
                    id='email'
                    ref={emailRef}
                    placeholder='Enter email'
                  />
                </li>
                <li>
                  <i className='bi bi-lock'></i>
                  {/* <label htmlFor='password'>Password</label> */}
                  <input
                    type='password'
                    id='password'
                    ref={passwordRef}
                    placeholder='Enter password'
                  />
                </li>
                <li>
                  <i className='bi bi-check'></i>

                  <input
                    type='password'
                    id='confirmPassword'
                    ref={confirmPasswordRef}
                    placeholder='Confirm password'
                  />
                </li>
              </ul>
              <div className='blur-btn'>
                <button type='submit' className='btn'>
                  Register
                </button>
              </div>
              <p>
                Already have an account?{' '}
                <Link to='/login' type='submit'>
                  Click here Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
