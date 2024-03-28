import React, { useState } from 'react';
import { ReactComponent as GoogleSvg } from '../Assets/google-icon.svg';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

const LoginBox = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
  });

  const [resetSuccess, setResetSuccess] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      error: '', // Clear any previous errors when the user starts typing
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation - check if email and password are not empty
    if (!email || !password) {
      setFormData({ ...formData, error: 'Please enter E-Mail AND Password' });
      return;
    }

    setPersistence(auth, browserLocalPersistence);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");

        console.log(user);
      })
      .catch((error) => {
        // Handle login errors
        console.error(error);

        setFormData({ email: '', password: '' });
      });

  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error(error);
      setResetSuccess('Please type your email in the input box.');
    }
  };

  const googleAuth = () => {
    setPersistence(auth, browserLocalPersistence);

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        navigate("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  const { email, password, error } = formData;

  return (
    <div className="flex flex-col bg-secondary w-fit p-10 items-center rounded-lg">
      <h2 className="font-semibold text-center mb-7 text-3xl text-text-color">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            className='mb-5 p-2 rounded-md bg-text-color'
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder='Email'
          />

          <input
            type="password"
            className='mb-5 p-2 rounded-md bg-text-color'
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder='Password'
          />

          {error && <p className="text-accent-red italic mb-5 text-xs">{error}</p>}

          <button className="text-text-color bg-accent-red font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 hover:bg-accent-blue duration-300" type="submit">Login</button>

          <button
            className="mb-3 text-text-color underline no-underline hover:text-accent-blue duration-300"
            type="button"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>

          {resetSuccess && (
            <p className="text-accent-red italic mb-5 text-xs">{resetSuccess}</p>
          )}

          <h1 className='font-semibold text-3xl text-text-color mb-3'>OR</h1>

        </div>
      </form>

      <button className="flex flex-row items-center text-primary text-lg text-left bg-text-color font-semibold px-5 w-full rounded-md hover:bg-primary hover:text-text-color duration-300" onClick={googleAuth}>
        <GoogleSvg className='w-7 mr-8' />
        <h1>Sign in using Google</h1>
      </button>

      <Link to="/Register" className='mt-7 text-text-color hover:text-accent-blue duration-300'>
        Don't have an account?
      </Link>
    </div>
  );
};

export default LoginBox;
