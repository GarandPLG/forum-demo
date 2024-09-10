import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';
import { pb } from '../lib/pocketbase';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    user: string;
    votes: number;
    created: string;
  };
  onVoteChange?: (postId: string, newVotes: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onVoteChange }) => {
  const [isAuth] = useAtom(authAtom);
  const [username, setUsername] = useState<string>('');
  const [votes, setVotes] = useState(post.votes);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await pb.collection("users").getOne(post.user);
        setUsername(user.username);
      } catch (error) {
        console.error('Błąd przy pobieraniu nazwy użytkownika:', error);
        setUsername('Nieznany użytkownik');
      }
    };
    fetchUsername();
  }, [post.user]);

  useEffect(() => {
    const subscribeToPost = async () => {
      try {
        pb.realtime.subscribe(`posts/${post.id}`, (e) => {
          if (e.action === 'update' && e.record.id === post.id) {
            setVotes(e.record.votes);
          }
        });
      } catch (error) {
        console.error('Błąd przy renderowaniu głosów in real time:', error);
      }
    };

    subscribeToPost();

    return () => {
      pb.realtime.unsubscribe(`posts/${post.id}`);
    };
  }, [post.id]);

  const handleVote = async (type: 'up' | 'down') => {
    if (!isAuth) {
      alert('Musisz się zalogować, by móc głosować.');
      return;
    }

    const newVotes = type === 'up' ? votes + 1 : votes - 1;
    setVotes(newVotes);

    try {
      await pb.collection('posts').update(post.id, { votes: newVotes });
      if (onVoteChange) {
        onVoteChange(post.id, newVotes);
      }
    } catch (error) {
      console.error('Błąd przy głosowaniu:', error);
      setVotes(votes);
      alert('Nie udało się dodać głosu. Spróbuj jeszcze raz.');
    }
  };

  return (
    <div className="bg-white p-4 rounded mt-2">
      <div className='mb-4'>
        <span className="mt-4 mr-4">
          <button onClick={() => handleVote('up')} className="mr-2">👍</button>
          <span>{votes}</span>
          <button onClick={() => handleVote('down')} className="ml-2">👎</button>
        </span>
        
        <span className='text-xl'>|</span>
        
        <span className="mb-4 mx-4 text-gray-500 text-lg">
          {username}
        </span>
        
        <span className='text-xl'>|</span>
        
        <span className="my-2 ml-4">{new Date(post.created).toLocaleString()}</span>
      </div>
      <h3 className="text-2xl font-bold">{post.title}</h3>
      <p className="mt-2">{post.content}</p>
    </div>
)};

export default Post;

// Komponent odpowiedzialny za renderowanie pojedynczego posta.
