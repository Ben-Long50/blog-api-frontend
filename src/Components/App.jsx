import Navigation from './Navigation';
import AuthProvider from './AuthContext';
import { Outlet } from 'react-router-dom';
import '../styles/main.css';
import MythosProvider from './PostContext';

const App = () => {
  return (
    <AuthProvider>
      <MythosProvider>
        <Navigation />
        <Outlet />
      </MythosProvider>
    </AuthProvider>
  );
};

export default App;
