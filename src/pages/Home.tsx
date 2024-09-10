import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import Post from '../components/Post';

interface PostType {
  id: string;
  title: string;
  content: string;
  user: string;
  votes: number;
  created: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const records = await pb.collection('posts').getFullList<PostType>({
          sort: '-votes',
          expand: 'user',
        });
        setPosts(records);
      } catch (error) {
        console.error('Błąd przy pobieraniu postów:', error);
      }
    };

    fetchPosts();

    pb.realtime.subscribe('posts', (e) => {
      const updatedRecord = e.record as PostType;

      if (e.action === 'create') {
        setPosts((prevPosts) => [updatedRecord, ...prevPosts].sort((a, b) => b.votes - a.votes));
      } else if (e.action === 'update') {
        setPosts((prevPosts) => 
          [...prevPosts.map((post) => 
            post.id === updatedRecord.id ? updatedRecord : post
          )].sort((a, b) => b.votes - a.votes)
        );
      } else if (e.action === 'delete') {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== updatedRecord.id)
        );
      }
    });

    return () => {
      pb.realtime.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Najwyżej oceniane posty</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;

// Strona głowna, tutaj wyświetlają się posty.
