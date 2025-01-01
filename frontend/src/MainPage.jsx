import React, { useState } from 'react';
import { SlRefresh } from 'react-icons/sl';
import { AiOutlineCopy, AiOutlineSave } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { addPassword } from './db';
import TableComponent from './TableComponent';
import { generateRandomPassword, isValidUrl } from './utils';
import { request, setAuthHeader } from './axios_helper';

const MainPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || '/login';
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [length, setLength] = useState(8);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const generatePassword = async () => {
    if (length < 4 || length > 20) {
      toast('Password should be minimum 4 & maximum 20 characters');
      return;
    }
    //const randomPassword = generateRandomPassword(length);
    //setPassword(randomPassword);
    try {
      const response = await request(
        'GET',
        `/generatedPasswords/new?length=${length}`,
        {},
      );
      //console.log('Password generation successful:', response.data);
      console.log('Password generation successful');
      setPassword(response.data);
    } catch (error) {
      console.error(
        'Password generation failed:',
        error.response ? error.response.data : error.message,
      );
      if (error.response && error.response.status === 401) {
        setAuthHeader(null);
        navigate(redirectPath, { replace: true });
      } else {
        const errorMessage = error.response
          ? `Server responded with status ${error.response.status}: ${error.response.statusText}`
          : `There was an error: ${error.message}`;
        toast(errorMessage);
      }
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast('Password Copied to clipboard');
  };

  const savePassword = async () => {
    if (isValidUrl(website)) {
      console.log('Website:', website, 'Password:', password);
      addPassword(website, password);
      toast('Password saved successfully');
    } else {
      toast('Enter valid URL');
    }
  };

  return (
    <div className="max-w-5xl px-4 mx-auto my-4 pt-4">
      <Toaster
        toastOptions={{
          className: 'bg-cyan-800 text-cyan-100',
          duration: 1000,
          style: {
            background: '#083344',
            color: '#cffafe',
          },
        }}
      />
      <div>
        {/*
        <div className="flex justify-end p-4">
        <button
          className="inline-flex items-center rounded-md bg-teal-900 px-2 py-4 my-4 text-md text-teal-200 drop-shadow-xl hover:bg-teal-800"
          title="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
        <h1 className="text-center text-4xl font-bold text-teal-800">
          Password Generator
        </h1>
*/}
        <div className="flex justify-between items-center py-4">
          <h1 className="text-4xl font-bold text-teal-800">
            Password Generator
          </h1>
          <button
            className="inline-flex items-center rounded-md bg-teal-900 px-2 py-2 text-md text-teal-200 drop-shadow-xl hover:bg-teal-800"
            title="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <input
          className="w-40 rounded-md border-2 border-teal-700 mr-2 px-3.5 py-4 text-slate-900 shadow-sm"
          placeholder="Length:"
          type="number"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <button
          className="inline-flex items-center rounded-md bg-teal-900 px-2 py-4 my-4 text-md text-teal-200 drop-shadow-xl hover:bg-teal-800"
          title="generate-password-button"
          onClick={generatePassword}
        >
          Generate Password
          <span className="ml-4">
            <SlRefresh size={28} />
          </span>
        </button>
        <div className="block flex items-center mt-4">
          <input
            className="w-3/4 rounded-md border-2 border-teal-700 px-3.5 py-4 text-slate-900 shadow-sm"
            placeholder="Password:"
            value={password}
            readOnly
          />
          <button className="ml-4" title="copy-button" onClick={copyPassword}>
            <AiOutlineCopy
              size={32}
              className="text-teal-900 hover:text-blue-600"
            />
          </button>
        </div>

        <div className="block flex items-center mt-4">
          <input
            className="w-3/4 rounded-md border-2 border-teal-700 px-3.5 py-4 text-slate-900 shadow-sm"
            placeholder="Website:"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <button
            className="ml-4 my-2"
            title="save-button"
            onClick={savePassword}
          >
            <AiOutlineSave
              size={32}
              className="text-teal-900 hover:text-blue-600"
            />
          </button>
        </div>

        {/* <div className="mt-4">
          <h2 className="text-lg font-bold">Saved Passwords:</h2>
          {passwords && (
            <ul>
              {passwords.map((entry) => (
                <li key={entry.id}>
                  <span>{entry.website}: </span>
                  <span>{entry.password}</span>
                </li>
              ))}
            </ul>
          )}
        </div> */}
        <TableComponent />
      </div>
    </div>
  );
};

export default MainPage;
