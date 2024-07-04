import Button from './Button';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage-layout">
      <h1 style={{ fontSize: 'clamp(2rem, 10vw, 5rem)', margin: '0' }}>
        Welcome to Legends of the Hearth
      </h1>
      <p style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)' }}>
        Retold mythological legends from around the globe
      </p>
      <Button>
        <Link className="link" to="/posts/All">
          Explore
        </Link>
      </Button>
    </div>
  );
};

export default Homepage;
