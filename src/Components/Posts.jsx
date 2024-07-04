import '../styles/form.css';
import '../styles/post.css';
import { Outlet } from 'react-router-dom';

const Posts = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

export default Posts;
