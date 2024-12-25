import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default function App() {
  return (
      <div className="App">
      <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path = "/main" element={<MainPage/>}/>
            </Routes>
      </Router>
      </div>
  )
}


