import React, { useState } from 'react';
import { pb } from '../lib/pocketbase';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('users').requestPasswordReset(email);
      setMessage('Mail z resetem hasła został wysłany.');
    } catch (error) {
      console.error('Błąd z resetem hasła:', error);
      setMessage('Nie udało się wysłać maila z resetem hasła.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Zapomniałem hasła</h1>
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Resetuj hasło</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ForgotPassword;

// Formularz przypominania hasła.
