import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom, updateAuthAtom } from '../atoms/authAtom';
import { pb } from '../lib/pocketbase';

const Header: React.FC = () => {
  const [isAuth] = useAtom(authAtom);
  const [, updateAuth] = useAtom(updateAuthAtom);

  const handleLogout = () => {
    pb.authStore.clear();
    updateAuth();
  };

  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center text-center">
        <Link to="/" className="text-white md:text-2xl font-bold">Reddit-Like-App</Link>

        <span className='text-4xl mx-1'>|</span>

        <Link to="https://gitea.garandplg.com/GarandPLG/reddit-like-app" className="text-white md:text-xl font-bold">Kod źródłowy</Link>

        <span className='text-3xl mx-1'>|</span>

        {isAuth ? (
          <>
            <Link to="/create-post" className="text-white mr-4">Stwórz post</Link>

            <span className='text-3xl mx-1'>|</span>

            <Link to="/profile" className="text-white mr-4">Profil</Link>

            <span className='text-3xl mx-1'>|</span>

            <button onClick={handleLogout} className="text-white">Wyloguj się</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4">Zaloguj się</Link>
      
            <span className='text-3xl mx-1'>|</span>

            <Link to="/register" className="text-white">Zarejestruj się</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

// komponent odpowiedzialny za nagłówek strony
