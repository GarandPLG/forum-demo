import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'jotai';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';

const App: React.FC = () => {
  return (
    <Provider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto mt-4 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

// Rdzenny komponent aplikacji. Tutaj używany jest nagłowek
// oraz definiowane są adresy url oraz
// jaki komponent się pod nimi znajduje.