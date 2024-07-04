import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import List from './List';
import '../styles/navigation.css';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { PostContext } from './PostContext';

const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { mythosCategories, setActiveCategory } = useContext(PostContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.clear();
      logout();
      navigate('/login');
    }
  };

  const handleCategory = (e) => {
    if (mythosCategories.includes(e.target.textContent)) {
      setActiveCategory(e.target.textContent);
    } else {
      setActiveCategory('All');
    }
  };

  return (
    <nav className="navbar">
      <Logo />

      <List>
        <Button onClick={handleCategory}>
          <Link className="link" to={`/posts/All`}>
            All
          </Link>
        </Button>
        {mythosCategories.map((category, index) => {
          return (
            <Button key={index} onClick={handleCategory}>
              <Link className="link" to={`/posts/${category}`}>
                {category}
              </Link>
            </Button>
          );
        })}
      </List>

      <Button onClick={handleLogout}>
        <Link className="link" to="/login">
          {isAuthenticated ? 'Logout' : 'Login'}
        </Link>
      </Button>
    </nav>
  );
};

export default Navigation;
