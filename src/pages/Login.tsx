import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import { useAtom } from 'jotai';
import { updateAuthAtom } from '../atoms/authAtom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, updateAuth] = useAtom(updateAuthAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('users').authWithPassword(email, password);
      updateAuth();
      navigate('/');
    } catch (error) {
      console.error('Błąd logowania:', error);
      alert('Nie udało się zalogować');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Hasło</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Zaloguj</button>
      </form>
      <div className="mt-4">
        <Link to="/forgot-password" className="text-blue-500">Zapomniałeś hasła?</Link>
      </div>
    </div>
  );
};

export default Login;

// Formularz logowania się.
