import React, { createContext, useContext, useState, useEffect } from 'react';

export type Post = {
  id: string;
  uri: string;
  type: 'image' | 'video';
  legenda: string;
  userName: string;
  userProfilePicture: string;
  userId: string;
  likes: number;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Post) => void;
};

const PostContext = createContext<PostContextType>({
  posts: [],
  addPost: () => { },
});

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  // MOCKS AQUI
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        uri: 'https://img.freepik.com/fotos-premium/um-gato-branco-brincando-com-uma-bola-de-futebol_922700-42.jpg',
        type: 'image',
        legenda: 'Gatinho no treino 🐱⚽️',
        userName: 'joao_fut',
        userProfilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
        userId: 'u1',
        likes: 120,
      },
      {
        id: '2',
        type: 'image',
        legenda: 'Foco no objetivo!',
        uri: 'https://img.freepik.com/fotos-premium/um-time-de-futebol-feminino-treinando-na-chuva-mulher-jogando-futebol_962764-84013.jpg',
        userName: 'maria_atleta',
        userProfilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
        userId: 'u2',
        likes: 85,
      },
      // ...adicione até 10 se quiser
    ];

    mockPosts.forEach(addPost);
  }, []);

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
