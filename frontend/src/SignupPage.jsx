import React, { useState } from 'react';
import axios from 'axios';
import { request, setAuthHeader } from './axios_helper';
import { useNavigate, useLocation} from 'react-router-dom'; 
import { useAuth } from './auth'
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';

const SignupPage = () => {
    const [user, setUser] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/'
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); 

    const handleSignup = async () => {
        try {
            // Check for empty fields
            if (!firstName || !lastName || !username || !password || !confirmPassword) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await axios.post('http://localhost:8080/register', {
                firstName,
                lastName,
                username,
                password,
            });
            // Handle successful signup
            console.log(response.data);
            setAuthHeader(response.data.token);
            auth.login(user)
            navigate(redirectPath, { replace: true })
        } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setAuthHeader(null);
            setError(error.response ? error.response.data.message : error.message);
        }
    };
{/*
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Signup Page</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <MDBInput wrapperClass='mb-3' id='firstName' placeholder={"First Name"} value={firstName} type='text'
                              onChange={(e) => setFirstName(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' id='lastName' placeholder={"Last Name"} value={lastName} type='text'
                              onChange={(e) => setLastName(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Username' id='username' value={username} type='text'
                        onChange={(e) => (setUsername(e.target.value), setUser(e.target.value))} />
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}/>

                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{height: '40px', width: '100%'}}
                            onClick={handleSignup}>Sign Up
                    </button>

                    <div className="text-center">
                        <p>Already Registered? <a href="/">Login</a></p>
                    </div>

                </MDBContainer>
            </div>
        </div>
    )*/

    return (
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
          <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
{/*
            <div className="text-center mb-12">
              <a href="javascript:void(0)">
                        
                <img src="https://readymadeui.com/signin-image.webp" alt="logo" className='w-40 inline-block' />
              </a>
            </div>
*/}
            <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
                <p className="text-sm mt-4 text-gray-800">Already have an account? <a href="/login" className="text-teal-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</a></p>
            </div>

            <form>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                  <input name="firstName" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                  <input name="lastName" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Username</label>
                  <input name="username" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter username" value={username} onChange={(e) => (setUsername(e.target.value), setUser(e.target.value))} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <input name="password" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                  <input name="cpassword" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
{/*
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label for="remember-me" className="text-gray-800 ml-3 block text-sm">
                    I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                  </label>
                </div>
*/}
         </div>
        {error && <p className="text-danger">{error}</p>}
          <div className="!mt-12">
            <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none" onClick={handleSignup}>
              Create an account
            </button>
          </div>
{/*          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="javascript:void(0);" className="text-teal-600 font-semibold hover:underline ml-1">Login here</a></p>
*/}
        </form>
      </div>
    </div>
    )

    };
};

export default SignupPage;


