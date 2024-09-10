import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import { useAtom } from 'jotai';
import { updateAuthAtom } from '../atoms/authAtom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [, updateAuth] = useAtom(updateAuthAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Hasła nie są takie same!");
      return;
    }
    try {
      const createdUser = await pb.collection('users').create({
        email,
        username,
        password,
        passwordConfirm,
      });

      if (createdUser) {
        await pb.collection('users').requestVerification(email);
        alert('Udana rejestracja. Sprawdź swój adres email aby aktywować konto.');
      }

      navigate('/login');
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      alert('Nieudana rejestracja');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Zarejestruj się</h1>
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
          <label htmlFor="username" className="block mb-1">Nazwa użytkownika</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <label htmlFor="passwordConfirm" className="block mb-1">Powtórz hasło</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;

// Formularz rejestracji.
