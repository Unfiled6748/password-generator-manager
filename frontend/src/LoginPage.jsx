import React, { useState } from 'react';
import { useAuth } from './auth';
import axios from 'axios';
import { request, setAuthHeader } from './axios_helper';
import { useNavigate, useLocation } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const LoginPage = () => {
  const [user, setUser] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }

      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      setAuthHeader(response.data.token);
      auth.login(user);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message,
      );
      setAuthHeader(null);
      setError('Invalid username or password.');
    }
  };
  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Sign in
                </h3>
                <p className="text-sm mt-4 text-gray-800">
                  Don't have an account{' '}
                  <a
                    href="/signup"
                    className="text-teal-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </a>
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">
                  Username
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => (
                      setUsername(e.target.value), setUser(e.target.value)
                    )}
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="mt-12">
                <button
                  type="button"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-teal-600 hover:bg-teal-900 focus:outline-none"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="md:h-full bg-teal-900 rounded-xl lg:p-12 p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
