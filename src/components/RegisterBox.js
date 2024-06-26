import React, { useState } from 'react';
import { ReactComponent as GoogleSvg } from '../Assets/google-icon.svg';
import { auth, database, provider } from '../firebase';
import { createUserWithEmailAndPassword, getAuth, setPersistence, browserLocalPersistence, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';

const RegisterBox = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    error: '',
  });

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

    const { email, password, passwordConfirm } = formData;

    // Basic validation - check if email and password are not empty
    if (!email || !password) {
      setFormData({ ...formData, error: 'Please enter E-Mail AND Password' });
      return;
    } else if (password.length < 8) {
      setFormData({ ...formData, error: 'Password\'s length should be at least 8 characters' })
      return;
    } else if (password !== passwordConfirm) {
      setFormData({ ...formData, error: 'Passwords are not matching' });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        setDoc(doc(database, "userChats", uid), {});

        // Remove the next line if you don't use the 'response' variable
        // const response = await axios.post('/api/register', {
        //   email: email,
        //   displayName: username,
        //   name: firstname,
        //   lastname: lastname
        // });
        const newUser = {
          email: email,
          files: [],
          canvases: [],
        };

        if (newUser) {
          await setDoc(doc(database, "Users", email), newUser);

          // res.status(201).json(user);
        }

        navigate("/Tutorial");
        console.log(user);
        // console.log(response);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);

        // Reset the form fields
        setFormData({ 
          firstname: '', lastname: '',
          email: '', password: '', passwordConfirm: '', error: "E-Mail is already in use" });
        return;
      });
  };




  const googleAuth = () => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/Login");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage)
      });
  };

  const { email, password, passwordConfirm, error } = formData;

  return (
    <div className="flex flex-col bg-secondary w-fit p-10 items-center rounded-lg">
      <h2 className="font-semibold text-center mb-7 text-3xl text-text-color">Sign Up</h2>
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

          <input
            type="password"
            className='mb-5 p-2 rounded-md bg-text-color'
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleInputChange}
            placeholder='Confirm Password'
          />

          {error && <p className="text-accent-red italic mb-5 text-xs">{error}</p>}

          <button className="text-text-color bg-accent-red font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 hover:bg-accent-blue duration-300" type="submit">Sign Up</button>

          <h1 className='font-semibold text-3xl text-text-color mb-5'>OR</h1>
        </div>
      </form>

      <button className="flex flex-row items-center text-primary text-lg text-left bg-text-color font-semibold px-5 w-full rounded-md hover:bg-primary hover:text-text-color duration-300" onClick={googleAuth}>
        <GoogleSvg className='w-7 mr-8' />
        <h1>Sign in using Google</h1>
      </button>
    </div>
  );
};

export default RegisterBox;
