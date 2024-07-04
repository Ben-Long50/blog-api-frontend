import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [mythosCategories, setMythosCategories] = useState([]);
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem('posts');
    const parsedPosts = JSON.parse(storedPosts);
    return Array.isArray(parsedPosts) ? parsedPosts : [];
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const { apiUrl } = useContext(AuthContext);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/active`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.log(response);
          navigation('/login');
          throw new Error('Forbidden');
        }
        const data = await response.json();
        setPosts(data);
        localStorage.setItem('posts', JSON.stringify(data));
        const categories = data.map((post) => {
          return post.mythos;
        });
        const uniqueCategories = categories.reduce(
          (accumulator, currentValue) => {
            if (!accumulator.includes(currentValue)) {
              accumulator.push(currentValue);
            }
            return accumulator;
          },
          [],
        );
        setMythosCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeCategory !== 'All') {
      setFilteredPosts(
        posts.filter((post) => {
          if (post.mythos === activeCategory) {
            return post;
          }
        }),
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [activeCategory, posts]);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        filteredPosts,
        setFilteredPosts,
        mythosCategories,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
