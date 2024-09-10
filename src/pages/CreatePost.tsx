import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pb } from '../lib/pocketbase';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('posts').create({
        title,
        content,
        user: pb.authStore.model!.id,
        votes: 0,
      });
      navigate('/');
    } catch (error) {
      console.error('Błąd przy tworzeniu posta:', error);
      alert('Nie udało się stworzyć posta');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stwórz post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Tytuł</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Zawartość</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows={5}
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Stwórz post</button>
      </form>
    </div>
  );
};

export default CreatePost;

// Formularz dodawania posta.
