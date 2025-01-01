import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth';
import { RequireAuth } from './RequireAuth';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <MainPage />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}
