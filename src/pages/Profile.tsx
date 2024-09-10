import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import { useAtom } from 'jotai';
import { updateAuthAtom } from '../atoms/authAtom';

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, updateAuth] = useAtom(updateAuthAtom);

  useEffect(() => {
    if (pb.authStore.model) {
      setEmail(pb.authStore.model.email);
    }
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert("Hasła nie są takie same");
      return;
    }

    try {
      const data: Record<string, any> = { email };
      if (newPassword) {
        data.password = newPassword;
        data.passwordConfirm = confirmPassword;
      }

      await pb.collection('users').update(pb.authStore.model!.id, data);
      alert('Profile updated successfully');
      updateAuth();
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Jesteś pewien, że chcesz usunąć konto? Tej akcji nie da się cofnąć.')) {
      try {
        await pb.collection('users').delete(pb.authStore.model!.id);
        pb.authStore.clear();
        updateAuth();
        alert('Konto poprawnie usunięte');
      } catch (error) {
        console.error('Błąd z usuwaniem konta:', error);
        alert('Nie udało się usunąc konta.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
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
          <label htmlFor="newPassword" className="block mb-1">Nowe hasło</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Powtórz nowe hasło</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Zaktualizuj profil</button>
      </form>
      <button onClick={handleDeleteAccount} className="w-full mt-4 bg-red-500 text-white py-2 rounded">Usuń konto</button>
    </div>
  );
};

export default Profile;

// Formularz zmieniania profilu użytkownika
