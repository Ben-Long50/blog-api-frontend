import '../styles/logo.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
      <div className="logo">
        <h1 className="logo-line-1">Legends</h1>
        <h1 className="logo-line-2">
          <span className="minor-words">of the</span> Hearth
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
