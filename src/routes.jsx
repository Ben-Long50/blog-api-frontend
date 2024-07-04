import App from './Components/App';
import ErrorPage from './Components/ErrorPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import LoginForm from './Components/LoginForm.jsx';
import SignupForm from './Components/SignupForm.jsx';
import Posts from './Components/Posts.jsx';
import PostDetail from './Components/PostDetail.jsx';
import PostList from './Components/PostList.jsx';
import Homepage from './Components/Homepage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Homepage />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
      <Route path="posts" element={<Posts />}>
        <Route path=":category" element={<PostList />} />
        <Route path=":category/:postId" element={<PostDetail />} />
      </Route>
    </Route>,
  ),
);

export default router;
